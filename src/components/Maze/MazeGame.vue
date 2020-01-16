<template>
  <div>
    <MazeControl @startAStar="startAStar()"></MazeControl>
    <MazeBoard :x="this.x" :y="this.y"></MazeBoard>
  </div>
</template>

<script>
import Mazebox from "./../../classses/Mazebox";

export default {
  name: "MazeGame",
  data() {
    return {
      x: 10,
      y: 10,
      openList: new Array(),
      closedList: new Array(),
      game: []
    };
  },
  methods: {
    startAStar(startNode) {
      this.game = new Array();
      this.openList = new Array();
      this.closedList = new Array();
      /* function isInClosed(Box) {
        for (let i in closedList) {
          if ((closedList[i] = Box)) {
            return true;
          }
        }
        return false;
      }

     
    */
      //Generate Game Board With Mazebox objects

      for (let i = 1; i < this.y + 1; i++) {
        let row = [];
        for (let j = 1; j < this.x + 1; j++) {
          let piece = document.getElementById((i - 1) * this.x + j);
          row.push(new Mazebox(i - 1, j - 1, piece.__vue__));
        }
        this.game.push(row);
      }

      let startX = 1;
      let startY = 2;
      let endX = 9;
      let endY = 9;

      //HArd coded staer atm
      this.game[startY][startX].vue.bg = "lime";
      //Hard coded end;
      this.game[endX][endY].vue.bg = "grey";

      //Find Path
      //add start node to open list
      this.addToOpen(startX, startY);

      let current;
      while (this.openList.length > 0) {
        //Get loewst f
        let lowIndex = 0;

        for (let i = 0; i < this.openList.length; i++) {
          if (this.openList[i].f < this.openList[lowIndex].f) {
            lowIndex = i;
          }
        }
        current = this.openList[lowIndex];

        ///If done
        if (current.x == endX && current.y == endY) {
          console.log("Found end ");
          let curr = current;
          let out = [];
          while (curr.parent) {
            out.push(curr);
            curr = curr.parent;
          }
          console.log(out);
          return out.reverse();
        }

        //Not founbd end
        this.removeFromOpen(current);
        this.closedList.push(current);

        let neighbour = this.getNeighbour(current);

        for (let i = 0; i < neighbour.length; i++) {
          let obj = neighbour[i];
          if (this.isInClosed(obj)) {
            //console.log("Block is in closed list");
            continue;
          }
          // console.log("Current g", g, current);
          let g = current.g + 1;
          let bestG = false;

          if (!obj.visited) {
            //console.log("Block is not visited");
            bestG = true;
            obj.h = this.calcH(obj, endX, endY);

            obj.visited = true;
            this.addToOpen(obj.x, obj.y);
          } else if (g < obj.g) {
            //console.log("Better g than before");
            bestG = true;
          }
          if (bestG) {
            console.log("Best g so far");

            obj.parent = current;
            console.log("Set parretn");
            obj.g = g;
            console.log(g);
            obj.vue.g = g;
            obj.f = obj.g + obj.h;
          }
        }
      }

      console.log(this.closedList);
    },
    calcG(game, x, y, ex, ey) {
      game[y][x].vue.g = Math.abs(ex - x) + Math.abs(ey - y);
    },
    calcH(Box, x, y) {
      Box.vue.h =
        Math.pow(Math.abs(x - Box.x), 2) + Math.pow(Math.abs(y - Box.y), 2);
      return Box.vue.h;
    },
    addToOpen(x, y) {
      this.openList.push(this.game[y][x]);
      this.game[y][x].vue.openList = true;
    },
    removeFromOpen(box) {
      for (let i in this.openList) {
        if ((this.openList[i] = box)) {
          let obj = this.openList.splice(i, 1);
          obj[0].vue.openList = false;
          return obj[0];
        }
      }
    },
    getNeighbour(Box) {
      let g = this.game;
      let out = [];
      let x = Box.x;
      let y = Box.y;

      if (this.game[x - 1] && this.game[x - 1][y]) {
        out.push(this.game[x - 1][y]);
      }
      if (this.game[x + 1] && this.game[x + 1][y]) {
        out.push(this.game[x + 1][y]);
      }
      if (this.game[x][y - 1] && this.game[x][y - 1]) {
        out.push(this.game[x][y - 1]);
      }
      if (this.game[x][y + 1] && this.game[x][y + 1]) {
        out.push(this.game[x][y + 1]);
      }

      return out;
    },
    isInClosed(Box) {
      for (let i = 0; i < this.closedList.length; i++) {
        if (this.closedList[i] == Box) return true;
      }
      return false;
    }
  }
};
</script>

<style>
</style>
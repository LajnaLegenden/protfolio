/* eslint-disable no-console */
<template>
  <div @mousemove="mouseEnter($event)" class="board" refs="mazeBoard">
    <div class="row" v-for="row in y" :key="row">
      <MazeBox
        @newNode="newNode(data)"
        v-for="i in x"
        :key="i"
        :row="row"
        :x="x"
        v-bind:id="(row - 1)*x + i"
      ></MazeBox>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  props: {
    x: {
      type: Number
    },
    y: {
      type: Number
    }
  },
  methods: {
    mouseEnter(event) {
      if (!window.mouseDown) {
        return;
      }
      let elements = document.elementsFromPoint(event.x, event.y);
      if (elements[0].classList.contains("piece")) {
        let el = elements[0];
        if (el.__vue__ && el.__vue__.bg != "green") {
          let tmpVue = el.__vue__;
          tmpVue.bg = "green";
          tmpVue.$forceUpdate();
        }
      }
    }
  },
  mounted() {
    window.vm.mazeBoard = this;
  }
};
</script>

<style scoped>
.board {
  width: 100% !important;
  height: 100% !important;
  display: grid;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}

.row {
  display: flex;
  justify-content: center;
}
</style>
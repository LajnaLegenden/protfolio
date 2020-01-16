/* eslint-disable no-console */
<template>
  <div class="piece" :style="style">{{this.g}}:{{this.h}}: {{this.f}}</div>
</template>

<script>
export default {
  name: "Block",
  data() {
    return {
      bg: "white",
      g: 0,
      h: 0,
      closedList: false,
      wall: false,
      gChanged: false
    };
  },
  props: {
    row: {
      type: Number
    },
    x: {
      type: Number
    }
  },
  methods: {},
  computed: {
    style() {
      let size = parseInt(window.innerHeight / this.x) - 2;

      return {
        height: size + "px",
        "grid-row": this.row,
        width: size + "px",
        "background-color": this.bg
      };
    },
    f() {
      return this.h + this.g;
    }
  }
};
</script>

<style scoped>
.piece {
  border: 1px solid rgba(0, 0, 0, 0.4);
}
</style>
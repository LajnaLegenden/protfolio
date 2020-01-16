<template>
  <div>
    <MazeGame></MazeGame>
  </div>
</template>

<script>
export default {
  name: "Maze",
  mounted() {
    window.mouseDown = false;
    document.body.onmousedown = function() {
      mouseDown = true;
    };
    document.body.onmouseup = function() {
      mouseDown = false;
    };
  }
};
</script>

<style>
</style>
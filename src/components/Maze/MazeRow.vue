<template>
  <div class="row"></div>
</template>

<script>
export default {
  name: "Row",
  props: {
    x: {
      type: Number
    },
    row: {
      type: Number
    }
  }
};
</script>

<style scoped>
.row {
  height: 10%;
}
</style>
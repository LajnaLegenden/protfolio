<template>
  <div>
    <button @click="startAStar()">A *</button>
  </div>
</template>

<script>
export default {
  name: "Control",
  methods: {
    startAStar() {
      this.$emit("startAStar");
    }
  }
};
</script>

<style>
</style>
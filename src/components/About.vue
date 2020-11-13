<template>
  <div class="about component bit">
    <h3 class="title">About</h3>
    <p>{{ modelValue }}</p>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    modelValue: String,
  },
};
</script>

<style scoped>
.about {
  border-color: saddlebrown;
}
</style>

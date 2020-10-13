<template>
  <div class="about component bit">
    <h3 class="title">About</h3>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.about {
  border-color: saddlebrown;
}
</style>

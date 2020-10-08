<template>
  <div class="about component">
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

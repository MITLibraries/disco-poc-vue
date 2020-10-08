<template>
  <div class="button component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.button {
  border-color: darkgreen;
}
</style>

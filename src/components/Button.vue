<template>
  <div class="button component">
    <p>
      <a href="#" class="btn button-primary">{{ msg }}</a>
    </p>
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

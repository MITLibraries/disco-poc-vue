<template>
  <div class="help component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Help",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.help {
  border-color: sienna;
}
</style>

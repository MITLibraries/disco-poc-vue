<template>
  <div class="related component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Related",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.related {
  border-color: purple;
}
</style>

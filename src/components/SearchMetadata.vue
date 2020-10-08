<template>
  <div class="searchmetadata component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchMetadata",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.searchmetadata {
  border-color: yellow;
}
</style>

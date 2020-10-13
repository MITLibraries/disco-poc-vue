<template>
  <div class="pagination component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.pagination {
  border-color: teal;
}
</style>

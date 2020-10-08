<template>
  <div class="facet component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Facet",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.facet {
  border-color: blue;
}
</style>

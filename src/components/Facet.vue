<template>
  <div class="facet component">
    <p>{{ facetTitle }}</p>
  </div>
</template>

<script>
export default {
  name: "Facet",
  props: {
    facet: String
  },
  computed: {
    facetTitle: function() {
      return this.facet + " facet";
    }
  }
};
</script>

<style scoped>
.facet {
  border-color: blue;
}
</style>

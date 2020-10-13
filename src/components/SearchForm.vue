<template>
  <div class="searchform component">
    <p>{{ msg }}</p>
    <SearchMetadata msg="This is the search metadata." />
  </div>
</template>

<script>
import SearchMetadata from "./SearchMetadata.vue";

export default {
  name: "Search Form",
  components: {
  	SearchMetadata
  },
  props: {
    msg: String
  }
};
</script>

<style scoped>
.searchform {
  border-color: orange;
}
</style>

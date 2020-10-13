<template>
  <form class="searchform component form-horizontal">
    <div class="form-group">{{ msg }}</div>
    <SearchMetadata msg="This is the search metadata." />
  </form>
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

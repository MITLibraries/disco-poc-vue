<template>
  <div class="searchform component form-horizontal">
    <div class="form-group">
      <label for="b-search-main">Search the MIT Libraries</label>
      <input id="b-search-main" type="search" name="q" placeholder="Enter your search" v-model="query" />
      <div><button v-on:click="newSearch">Search</button></div>
    </div>
    <SearchMetadata msg="This is the search metadata." />
  </div>
</template>

<script>
import SearchMetadata from "./SearchMetadata.vue";

export default {
  name: "Search Form",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    newSearch () {
      this.$emit('searched', this.newSearchQuery);
    }
  },
  computed: {
    // newSearchQuery is computed based on user input. At this level we only
    // trim whitespace and truncate very long queries at 1500 characters
    // (breaking on a word boundary). Additional target-specific formatting
    // may happen in the context of each API.
    //
    // Regex from https://www.nfollmer.com/2016/07/06/truncate-string-word-break-javascript/
    newSearchQuery: function() {
      var newQuery = this.query.trim();
      if ( newQuery.length > 1500 ) {
        newQuery = newQuery.substring(0,1500).replace(/\s+\S*$/,"");
      }
      return newQuery;
    }
  },
  components: {
  	SearchMetadata
  }
};
</script>

<style scoped>
.searchform {
  border-color: orange;
}
</style>

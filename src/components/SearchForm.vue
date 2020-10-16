<template>
  <div>
    <form class="form-group">
      <label for="b-search-main" class="field-label">Search the MIT Libraries</label>
      <div class="form-horizontal">
        <input class="field field-text form-input" id="b-search-main" type="text" name="query" placeholder="Enter your search" v-model="query" />
        <button class="btn button-primary form-action" v-on:click="newSearch">Search</button>
      </div>
      <pre>Raw query: _{{ query }}_</pre>
      <pre>Parsed query: _{{ newSearchQuery }}_</pre>
    </form>
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
    newSearch: function (event) {
      if (event) {
        event.preventDefault()
      }
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
</style>

<template>
  <div v-bind:class="layoutClass">
    <div v-if="status.loading" class="panel panel-info">
      <div class="panel-heading">Loading...</div>
    </div>
    <div v-if="status.errored" class="panel panel-danger">
      <div class="panel-heading">Something went wrong</div>
      <div class="panel-body">
        <p>{{ status.error_message.message }}</p>
        <pre>{{ status.error_message }}</pre>
      </div>
    </div>
    <div v-if="showSidebar" class="col1q">
      <Facet v-for="facet in facets" v-bind:facet="facet" v-bind:key="facet" />
    </div>
    <div v-bind:class="contentClass">
      <Item
        v-for="(result, index) in results"
        v-bind:result="result"
        v-bind:index="index"
        v-bind:key="result.id"
      />
      <Pagination v-if="showPagination" msg="Pagination bar" />
    </div>
  </div>
</template>

<script>
import Facet from "@/components/Facet.vue";
import Item from "@/components/Item.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Results",
  components: {
    Facet,
    Item,
    Pagination
  },
  data() {
    return {
      facets: [],
      hits: 0,
      results: [],
      results_per_page: process.env.VUE_APP_RESULTS_PER_PAGE || 5,
      status: {
        error_message: "",
        errored: false,
        loading: false
      }
    };
  },
  props: {
    rawQuery: String
  },
  computed: {
    contentClass: function() {
      return this.showSidebar ? "col3q" : "content-main";
    },
    layoutClass: function() {
      return this.showSidebar ? "layout-1q3q" : "";
    },
    showPagination: function() {
      return this.hits > this.results_per_page ? true : false;
    },
    showSidebar: function() {
      return this.facets.length ? true : false;
    }
  },
  methods: {
    fetchSearch: function() {
      this.query = this.$route.query.q;
      if (this.query) {
        console.log(
          "App has been instructed to do a search for '" + this.query + "'"
        );
        this.results = [];
        this.searchTimdex(this.query);
      }
    },
    searchTimdex: function(query) {
      const axios = require("axios").default;
      this.status.loading = true;
      axios
        .get(String(process.env.VUE_APP_TIMDEX_API) + "/search?q=" + query)
        .then(
          response => (
            (this.results = response.data.results),
            (this.hits = response.data.hits),
            this.$emit("results", { hits: this.hits, query: this.query })
          )
        )
        .catch(
          error => (
            (this.status.errored = true),
            (this.status.error_message = error),
            (this.results = [])
          )
        )
        .finally(() => (this.status.loading = false));
    }
  },
  created() {
    this.fetchSearch();
  },
  watch: {
    $route: "fetchSearch"
  }
};
</script>

<style scoped lang="scss"></style>

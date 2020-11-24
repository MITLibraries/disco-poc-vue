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
    <div v-bind:class="contentClass" v-if="this.status.loading == false">
      <SearchMetadata v-model:searchterm="searchterm" v-model:hits="hits" />
      <div v-if="hits == 0">
        <p>Sorry, no results found for {{ searchterm }}.</p>
      </div>
      <Item
        v-for="(result, index) in results"
        v-bind:result="result"
        v-bind:index="index"
        v-bind:key="result.id"
      />
      <Pagination :hits="hits" :per_page="per_page" />
    </div>
  </div>
</template>

<script>
import Facet from "@/components/Facet.vue";
import Item from "@/components/Item.vue";
import Pagination from "@/components/Pagination.vue";
import SearchMetadata from "@/components/SearchMetadata.vue";
var qs = require("qs");

const axios = require("axios").default;

export default {
  name: "Results",
  components: {
    Facet,
    Item,
    Pagination,
    SearchMetadata,
  },
  data() {
    return {
      facets: [],
      hits: null,
      page: this.$route.query.page || "1",
      results: [],
      per_page: 20,
      status: {
        error_message: "",
        errored: false,
        loading: false,
      },
    };
  },
  computed: {
    contentClass: function () {
      return this.showSidebar ? "col3q" : "content-main";
    },
    layoutClass: function () {
      return this.showSidebar ? "layout-1q3q" : "";
    },
    showSidebar: function () {
      return this.facets.length ? true : false;
    },
  },
  methods: {
    async searchTimdex() {
      this.status.loading = true;
      this.searchterm = this.$route.query.q;
      try {
        let timdexURL = String(process.env.VUE_APP_TIMDEX_API) + "/search?";
        let query = qs.stringify(this.$route.query);
        let response = await axios.get(timdexURL + query);
        this.results = response.data.results;
        this.hits = response.data.hits;
        this.status.loading = false;
      } catch (error) {
        this.status.errored = true;
        this.status.loading = false;
        this.results = [];
        this.status.error_message = error;
        this.status.error_message =
          "Starting over may help. If it does not, please let us know!";
      }
    },
  },
  created() {
    this.searchTimdex();
  },
  watch: {
    $route: "searchTimdex",
  },
};
</script>

<template>
  <div :class="layoutClass">
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
      <Facet
        v-for="(facetList, facetHeader, index) in facetLists"
        :facetList="facetList"
        :facetHeader="facetHeader"
        :facetDisplayName="facetHeaderFixer(facetHeader)"
        :key="index"
      >
      </Facet>
    </div>
    <div v-bind:class="contentClass" v-if="this.status.loading == false">
      <SearchMetadata
        v-model:searchterm="searchterm"
        v-model:hits="hits"
        v-model:per_page="per_page"
      />
      <div v-if="hits == 0">
        <p>Sorry, no results found for {{ searchterm }}.</p>
      </div>
      <Item
        v-for="(result, index) in results"
        :result="result"
        :index="index"
        :key="result.id"
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

const qs = require("qs");
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
      hits: null,
      page: this.$route.query.page || "1",
      results: [],
      facetLists: [],
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
      return this.facetLists ? true : false;
    },
    per_page: function () {
      if (process.env.VUE_APP_RESULTS_PER_PAGE) {
        return parseInt(process.env.VUE_APP_RESULTS_PER_PAGE);
      }
      return 20;
    },
  },
  methods: {
    async searchTimdex() {
      this.status.loading = true;
      this.searchterm = this.$route.query.q;
      try {
        let timdexURL = String(process.env.VUE_APP_TIMDEX_API) + "/search?";
        let newQuery = this.$route.query;

        // TIMDEX needs facets that accept arrays to always be arrays
        for (let param in newQuery) {
          if (
            (param == "contributor" ||
              param == "content_format" ||
              param == "language" ||
              param == "subject") &&
            typeof newQuery[param] == "string"
          ) {
            newQuery[param] = newQuery[param].split();
          }
        }
        let query = qs.stringify(newQuery, { arrayFormat: "brackets" });
        let response = await axios.get(timdexURL + query);
        this.results = response.data.results;
        this.hits = response.data.hits;
        this.facetLists = response.data.aggregations;
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
    facetHeaderFixer: function (facetHeader) {
      if (facetHeader == "content_type") {
        return "Content type";
      } else if (facetHeader == "contributor") {
        return "Author/contributor";
      } else if (facetHeader == "literary_form") {
        return "Literary form";
      } else if (facetHeader == "content_format") {
        return "Format";
      } else if (facetHeader == "source") {
        return "Source of data";
      } else {
        return facetHeader.charAt(0).toUpperCase() + facetHeader.slice(1);
      }
    },
  },
  created() {
    this.searchTimdex();
  },
  watch: {
    $route() {
      this.searchTimdex();
    },
  },
};
</script>

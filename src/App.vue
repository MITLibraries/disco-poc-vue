<template>
  <div class="wrap-page">
    <Header />
    <Breadcrumb msg="This is the breadcrumb." />
    <div class="wrap-outer-content layout-band">
      <div class="wrap-content">
        <div class="layout-band">
          <SearchForm @searched="doSearch" />
          <SearchMetadata
            v-if="showSearchMetadata"
            v-model:query.lazy="query"
            v-model:status="status"
            v-model:hits="hits"
          />
        </div>
        <div v-bind:class="layoutBand">
          <div v-if="sidebarLeft" class="col1q">
            <Facet
              v-for="facet in facets"
              v-bind:facet="facet"
              v-bind:key="facet"
            />
          </div>
          <div v-bind:class="layoutContent">
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

            <Item
              v-for="(result, index) in results"
              v-bind:result="result"
              v-bind:index="index"
              v-bind:key="result.id"
            />
            <Pagination v-if="showPagination" msg="Pagination bar" />
            <Record v-if="record" v-model="record" />
          </div>
          <div v-if="sidebarRight" class="col1q-r">
            <Related
              v-for="related in relateds"
              v-bind:related="related"
              v-bind:key="related"
            />
          </div>
        </div>
        <Help v-if="help" v-model="help" />
        <About v-if="about" v-model="about" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import About from "./components/About.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import Facet from "./components/Facet.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Help from "./components/Help.vue";
import Item from "./components/Item.vue";
import Pagination from "./components/Pagination.vue";
import Record from "./components/Record.vue";
import Related from "./components/Related.vue";
import SearchForm from "./components/SearchForm.vue";
import SearchMetadata from "./components/SearchMetadata.vue";

export default {
  name: "App",
  components: {
    About,
    Breadcrumb,
    Facet,
    Footer,
    Header,
    Help,
    Item,
    Pagination,
    Record,
    Related,
    SearchForm,
    SearchMetadata
  },
  data() {
    return {
      about: undefined,
      facets: [],
      help: undefined,
      hits: 0,
      query: "",
      record: undefined,
      results_per_page: process.env.VUE_APP_RESULTS_PER_PAGE || 5,
      relateds: [],
      results: [],
      status: {
        error_message: "",
        errored: false,
        loading: false,
        ready: false
      }
    };
  },
  methods: {
    doSearch: function(query) {
      if (query) {
        this.query = query;
        this.results = [{ id: 1, title: "Retrieving results..." }];
        this.searchTimdex(query);
      }
    },
    searchTimdex: function(query) {
      const axios = require("axios").default;
      this.status.loading = true;
      this.status.ready = false;
      axios
        .get(String(process.env.VUE_APP_TIMDEX_API) + query)
        .then(
          response => (
            (this.results = response.data.results),
            (this.hits = response.data.hits),
            (this.status.ready = true)
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
  computed: {
    layoutBand: function() {
      if (this.sidebarLeft && this.sidebarRight) {
        return "layout-1q2q1q";
      } else if (this.sidebarLeft) {
        return "layout-1q3q";
      } else if (this.sidebarRight) {
        return "layout-3q1q";
      }
      return "";
    },
    layoutContent: function() {
      if (this.sidebarLeft && this.sidebarRight) {
        return "content-main";
      } else if (this.sidebarLeft) {
        return "col3q";
      } else if (this.sidebarRight) {
        return "col3q";
      }
      return "";
    },
    showPagination: function() {
      return this.hits > this.results_per_page ? true : false;
    },
    showSearchMetadata: function() {
      if (this.query === "") {
        return false;
      }
      if (this.status.errored === true) {
        return false;
      }
      return true;
    },
    sidebarLeft: function() {
      return this.facets.length ? true : false;
    },
    sidebarRight: function() {
      return this.relateds.length ? true : false;
    }
  }
};
</script>

<style>
@import "./assets/css/libraries-main.min.css";

.component {
  border: 0.4rem solid black;
}
</style>

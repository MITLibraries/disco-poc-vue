<template>
  <div class="wrap-page">
    <Header />
    <Breadcrumb msg="This is the breadcrumb." />
    <div class="wrap-outer-content layout-band">
      <div class="wrap-content">
        <div class="layout-band">
          <SearchForm @searched="receiveSearch" />
          <SearchMetadata
            v-if="showSearchMetadata"
            v-model:query.lazy="query"
            v-model:status="status"
            v-model:hits="hits"
          />
        </div>
        <div v-bind:class="layoutBand">
          <div v-bind:class="layoutContent">
            <router-view @results="receiveSummary" />
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
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Help from "./components/Help.vue";
import Related from "./components/Related.vue";
import SearchForm from "./components/SearchForm.vue";
import SearchMetadata from "./components/SearchMetadata.vue";

export default {
  name: "App",
  components: {
    About,
    Breadcrumb,
    Footer,
    Header,
    Help,
    Related,
    SearchForm,
    SearchMetadata,
  },
  data() {
    return {
      about: undefined,
      help: undefined,
      hits: 0,
      query: "",
      record: undefined,
      relateds: [],
      results: [],
      status: {
        error_message: "",
        errored: false,
        loading: false,
        ready: false,
      },
    };
  },
  methods: {
    receiveSearch: function (query) {
      this.query = query;
      this.$router.push({ name: "Results", query: { q: this.query, page: 1 } });
    },
    receiveSummary: function (data) {
      this.hits = data.hits;
      this.query = data.query;
    },
  },
  computed: {
    layoutBand: function () {
      if (this.sidebarRight) {
        return "layout-3q1q";
      }
      return "";
    },
    layoutContent: function () {
      if (this.sidebarRight) {
        return "col3q";
      }
      return "";
    },
    showSearchMetadata: function () {
      if (this.query === "") {
        return false;
      }
      if (this.status.errored === true) {
        return false;
      }
      return true;
    },
    sidebarRight: function () {
      return this.relateds.length ? true : false;
    },
  },
};
</script>

<style>
@import "./assets/css/bento.min.css";
@import "./assets/css/libraries-main.min.css";
</style>

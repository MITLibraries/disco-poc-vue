<template>
  <div class="wrap-page">
    <Header />
    <Breadcrumb msg="This is the breadcrumb." />
    <div class="wrap-outer-content layout-band">
      <div class="wrap-content">
        <div class="layout-band">
          <SearchForm @searched="receiveSearch" />
        </div>
        <div v-bind:class="layoutBand">
          <div v-bind:class="layoutContent">
            <router-view @results="receiveSummary" />
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
import SearchForm from "./components/SearchForm.vue";

export default {
  name: "App",
  components: {
    About,
    Breadcrumb,
    Footer,
    Header,
    Help,
    SearchForm,
  },
  data() {
    return {
      hits: 0,
      query: "",
      help: "",
      about: "",
      sidebarRight: false,
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
  },
};
</script>

<style>
@import "./assets/css/bento.min.css";
@import "./assets/css/libraries-main.min.css";
</style>

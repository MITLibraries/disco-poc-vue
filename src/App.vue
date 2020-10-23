<template>
  <div class="wrap-page">
    <Header />
    <Breadcrumb msg="This is the breadcrumb." />
    <div class="wrap-outer-content layout-band">
      <div class="wrap-content">
        <div class="layout-band">
          <SearchForm @searched="doSearch" />
        </div>
        <div class="layout-1q2q1q layout-band">
          <div class="col1q">
            <Facet msg="Subject facet" />
            <Facet msg="Author facet" />
            <Facet msg="Publisher facet" />
            <Facet msg="Title facet" />
          </div>
          <div class="content-main">
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
            <Pagination msg="Pagination bar" />
            <Record msg="Full record for display" />
          </div>
          <div class="col1q-r">
            <Related msg="Related libraries" />
            <Related msg="Related items" />
            <Related msg="Related librarians" />
            <Related msg="Related links" />
          </div>
        </div>
        <Help msg="This is the help area." />
        <About msg="This is the about panel." />
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
    SearchForm
  },
  data() {
    return {
      query: "",
      results: [],
      status: {
        error_message: "",
        errored: false,
        loading: false
      }
    };
  },
  methods: {
    doSearch: function(query) {
      if (query) {
        console.log("App has been instructed to search for _" + query + "_");
        this.query = query;
        this.results = [{ id: 1, title: "Retrieving results..." }];
        this.searchTimdex(query);
      }
    },
    searchTimdex: function(query) {
      const axios = require("axios").default;
      this.status.loading = true;
      axios
        .get("https://timdex.mit.edu/api/v1/search?q=" + query)
        .then(response => (this.results = response.data.results))
        .catch(
          error => (
            (this.status.errored = true),
            (this.status.error_message = error),
            (this.results = [])
          )
        )
        .finally(() => (this.status.loading = false));
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

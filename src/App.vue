<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Breadcrumb msg="This is the breadcrumb." />
    <SearchForm msg="This is the search form." />
    <div class="row">
      <div class="sidebar">
        <Facet msg="Subject facet" />
        <Facet msg="Author facet" />
        <Facet msg="Publisher facet" />
        <Facet msg="Title facet" />
      </div>
      <div class="content">
        <Item msg="Search result item" />
        <Item msg="Search result item" />
        <Item msg="Search result item" />
        <Pagination msg="Pagination bar" />
        <Record msg="Full record for display" />
      </div>
      <div class="sidebar">
        <Related msg="Related libraries" />
        <Related msg="Related items" />
        <Related msg="Related librarians" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb.vue";
import Facet from "./components/Facet.vue";
import Item from "./components/Item.vue";
import Pagination from "./components/Pagination.vue";
import Record from "./components/Record.vue";
import Related from "./components/Related.vue";
import SearchForm from "./components/SearchForm.vue";

export default {
  name: "App",
  components: {
    Breadcrumb,
    Facet,
    Item,
    Pagination,
    Record,
    Related,
    SearchForm,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.component {
  border: 5px solid black;
}

.row {
  display: flex;
  flex-direction: row;
}
.sidebar {
  flex: 1 1 auto;
}
.content {
  flex: 2 1 auto;
}
</style>

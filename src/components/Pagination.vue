<template>
  <nav class="pagination component">
    <p v-if="onlyPage() && this.hits > 0">Viewing all results</p>

    <span v-if="firstPage()">
      <button id="firstPage" @click="changeUrlQuery('page', firstPage())">
        « First
      </button>
    </span>

    <span v-if="prevPage()" class="page">
      <button
        id="prevPage"
        rel="previous"
        @click="changeUrlQuery('page', prevPage())"
      >
        ‹ Previous
      </button>
    </span>

    <span v-if="nextPage()" class="page">
      <button
        id="nextPage"
        rel="next"
        @click="changeUrlQuery('page', nextPage())"
      >
        Next ›
      </button>
    </span>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    hits: Number,
    per_page: Number,
  },
  methods: {
    pageNum() {
      if (this.$route.query.page) {
        return parseInt(this.$route.query.page);
      }
      return 1;
    },
    onlyPage() {
      if (this.hits <= this.per_page) {
        return true;
      }
    },
    firstPage() {
      if (this.pageNum() > 2) {
        return 1;
      }
    },
    nextPage() {
      if (this.pageNum() * this.per_page < this.hits) {
        return this.pageNum() + 1;
      }
    },
    prevPage() {
      if (this.pageNum() != 1) {
        return this.pageNum() - 1;
      }
    },
    changeUrlQuery(paramName, changeTo) {
      const newQuery = Object.assign({}, this.$route.query);

      newQuery[paramName] = changeTo.toString();

      this.$router.push({
        query: newQuery,
      });
    },
  },
};
</script>

<style scoped></style>

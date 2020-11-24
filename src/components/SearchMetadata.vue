<template>
  <div class="panel panel-info">
    <div class="panel-heading">Search Results</div>
    <div class="panel-body">Searched for: "{{ searchterm }}"</div>
    <div v-if="hits > 0" class="panel-footer">
      Viewing records {{ start() }} to {{ end() }} of {{ hits }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchMetadata",
  props: {
    hits: Number,
    searchterm: String,
  },
  methods: {
    page() {
      if (this.$route.query.page) {
        return parseInt(this.$route.query.page);
      }
      return 1;
    },
    per_page() {
      return 20;
    },
    start() {
      return this.per_page() * (this.page() - 1) + 1;
    },
    end() {
      return Math.min(this.page() * this.per_page(), this.hits);
    },
  },
};
</script>

<style scoped></style>

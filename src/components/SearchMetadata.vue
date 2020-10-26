<template>
  <div v-bind:class="panelStatus" class="panel">
    <div class="panel-heading">{{ panelHeading }}</div>
    <div class="panel-body">"{{ query }}"</div>
    <div class="panel-footer">{{ status }}</div>
  </div>
</template>

<script>
export default {
  name: "SearchMetadata",
  props: {
    hits: Number,
    query: String,
    status: Object
  },
  computed: {
    panelHeading: function() {
      if (this.status.ready == true) {
        return "Results summary: " + this.hits + " results";
      } else if (this.status.loading == true) {
        return "Loading results...";
      }
      return "Search Metadata:";
    },
    panelStatus: function() {
      if (this.status.ready == true) {
        return "panel-success";
      }
      return "panel-info";
    }
  }
};
</script>

<style scoped></style>

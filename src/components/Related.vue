<template>
  <div class="related component">
    <p>{{ panelTitle }}</p>
  </div>
</template>

<script>
export default {
  name: "Related",
  props: {
    related: String,
  },
  computed: {
    panelTitle: function () {
      return "Related " + this.related;
    },
  },
};
</script>

<style scoped>
.related {
  border-color: purple;
}
</style>

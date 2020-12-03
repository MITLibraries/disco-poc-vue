<template>
  <dl v-if="facetList && facetList.length" class="facet">
    <dt>{{ facetHeader }}</dt>
    <dd v-for="(facet, index) in facetList" :key="index">
      <input
        type="checkbox"
        :id="facetHeader + '_' + facet.name"
        :value="facet.name"
        v-model="checkedFacets"
      />
      <label :for="facetHeader + '_' + facet.name">
        {{ facet.name }} {{ "(" + facet.count + ")" }}</label
      >
    </dd>
  </dl>
</template>

<script>
export default {
  name: "Facet",
  data() {
    return {
      checkedFacets: [],
    };
  },
  props: {
    facetList: Array,
    facetHeader: String,
  },
  methods: {
    applyFacets: function () {
      let facetHeader = this.facetHeader;
      let facetsToApply;

      // facetsToApply needs to be a string for some facets and an array for
      // others, or else the TIMDEX call will fail
      if (
        facetHeader == "content_type" ||
        facetHeader == "literary_form" ||
        facetHeader == "source"
      ) {
        facetsToApply = this.checkedFacets[0];
      } else {
        facetsToApply = this.checkedFacets;
      }

      // We need to copy the route query instead of assigning it to a variable
      // for Vue reasons
      const newQuery = Object.assign({}, this.$route.query);
      newQuery["page"] = 1;

      if (facetsToApply && facetsToApply.length) {
        newQuery[facetHeader] = facetsToApply;
      } else {
        delete newQuery[facetHeader];
      }

      this.$router.push({ query: newQuery });
    },
    updateFacetsFromURL: function (query) {
      this.checkedFacets = [];
      for (const param in query) {
        if (this.facetHeader == param && typeof query[param] == "string") {
          this.checkedFacets.push(query[param]);
        } else if (this.facetHeader == param && Array.isArray(query[param])) {
          query[param].forEach((facet) => {
            this.checkedFacets.push(facet);
          });
        }
      }
    },
  },
  mounted() {
    if (this.$route.query) {
      this.updateFacetsFromURL(this.$route.query);
    }
  },
  watch: {
    $route(to) {
      this.updateFacetsFromURL(to.query);
    },
    checkedFacets() {
      this.applyFacets();
    },
  },
};
</script>

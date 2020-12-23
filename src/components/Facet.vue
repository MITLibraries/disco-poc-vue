<template>
  <dl v-if="facetList && facetList.length" class="list-unbulleted">
    <dt>{{ facetDisplayName }}</dt>
    <dd v-for="(facet, index) in facetList" :key="index" class="copy-sup">
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
const _ = require("lodash");

export default {
  name: "Facet",
  data() {
    return {
      checkedFacets: [],
      facetsUpdatedFromURL: false,
    };
  },
  props: {
    facetList: Array,
    facetHeader: String,
    facetDisplayName: String,
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

      // Set page to 1 unless facets were updated from URL
      if (this.facetsUpdatedFromURL == false) {
        newQuery["page"] = "1";
      }

      if (facetsToApply && facetsToApply.length) {
        newQuery[facetHeader] = facetsToApply;
      } else {
        delete newQuery[facetHeader];
      }

      this.$router.push({ query: newQuery });
      this.facetsUpdatedFromURL = false;
    },
    updateFacetsFromURL: function (query) {
      this.checkedFacets = [];
      const facetParams = _.omit(query, ["page", "q"]);

      for (const param in facetParams) {
        if (
          this.facetHeader == param &&
          typeof facetParams[param] == "string"
        ) {
          this.checkedFacets.push(facetParams[param]);
        } else if (
          this.facetHeader == param &&
          Array.isArray(facetParams[param])
        ) {
          facetParams[param].forEach((facet) => {
            this.checkedFacets.push(facet);
          });
        }
      }
      this.facetsUpdatedFromURL = true;
    },
  },
  mounted() {
    if (this.$route.query) {
      this.updateFacetsFromURL(this.$route.query);
    }
  },
  watch: {
    $route(to) {
      if (to.query) {
        this.updateFacetsFromURL(to.query);
      }
    },
    checkedFacets() {
      this.applyFacets();
    },
  },
};
</script>

<style>
.wrap-content dt,
.wrap-content dd {
  margin-bottom: 0.5em;
}
</style>

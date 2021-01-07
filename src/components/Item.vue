<template>
  <div class="item">
    <h3>
      <router-link :to="{ name: 'Record', params: { recordId: result.id } }">{{
        result.title
      }}</router-link>
    </h3>
    <p>{{ result.content_type }} | {{ result.publication_date }}</p>
    <ul v-if="result.contributors" class="list-inline-pipe contributors">
      <li
        v-for="contributor in result.contributors"
        v-bind:key="contributor.value"
      >
        {{ contributor.value }} ({{ contributor.kind || "contributor" }})
      </li>
    </ul>
    <ul v-if="result.subjects" class="list-unbulleted copy-sup">
      <li v-for="subject in result.subjects" v-bind:key="subject">
        {{ subject }}
      </li>
    </ul>
    <p v-if="result.source_link">
      <a :href="result.source_link"
        >View in {{ normalizeSource(result.source) || "source" }}</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    result: Object,
  },
  methods: {
    normalizeSource: function (source) {
      return source == "MIT Aleph" ? "MIT Barton Catalog" : source;
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  .list-inline-pipe.contributors {
    li:after {
      margin-left: 0;
      content: "; ";
    }

    li:last-child:after {
      content: "";
    }
  }
}
</style>

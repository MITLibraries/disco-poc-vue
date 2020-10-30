<template>
  <div class="item">
    <h3>
      <router-link :to="{ name: 'Record', params: { recordId: result.id } }">{{
        result.title
      }}</router-link>
    </h3>
    <p>{{ result.content_type }} | {{ result.publication_date }}</p>
    <ul class="list-inline-pipe contributors">
      <li
        v-for="contributor in result.contributors"
        v-bind:key="contributor.value"
      >
        {{ contributor.value }} ({{ contributor.kind }})
      </li>
    </ul>
    <ul class="list-unbulleted copy-sup">
      <li v-for="subject in result.subjects" v-bind:key="subject">
        {{ subject }}
      </li>
    </ul>
    <p><a :href="result.source_link">View in Aleph</a></p>

    <ItemStatus v-if="showStatus" msg="Item status field" />
    <Button v-for="button in buttons" v-bind:key="button" msg="Button" />
  </div>
</template>

<script>
import Button from "./Button.vue";
import ItemStatus from "./ItemStatus.vue";

export default {
  name: "Item",
  components: {
    Button,
    ItemStatus
  },
  props: {
    result: Object
  },
  computed: {
    buttons: function() {
      return [];
    },
    showStatus: function() {
      return this.result.realtime_holdings_link == "Not Yet Implemented"
        ? false
        : true;
    }
  }
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

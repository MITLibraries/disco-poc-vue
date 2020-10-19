<template>
  <div class="item">
    <h3>{{ result.title }}</h3>
    <p>
      {{ result.content_type }} | {{ result.publication_date }}
    </p>
    <ul>
      <li
        v-for="(contributor) in result.contributors"
        v-bind:key="contributor.value">
        {{ contributor.value }} ({{ contributor.kind }})
      </li>
    </ul>
    <div class="panel">
      <div class="panel-heading">API data</div>
      <div class="panel-body">
        <pre>
          {{ result }}
        </pre>
      </div>
      <div class="panel-footer">
        <a :href="result.source_link">View in Aleph</a>
      </div>
    </div>


    <ItemStatus msg="Item status field" />
    <Button msg="Button" />
    <Button msg="Button" />
  </div>
</template>

<script>
import Button from './Button.vue'
import ItemStatus from './ItemStatus.vue'

export default {
  name: "Item",
  components: {
  	Button,
  	ItemStatus
  },
  props: {
    result: Object
  }
};
</script>

<style scoped lang="scss">
.item {
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  .panel-body pre {
    font-size: 12px;
  }
}
</style>

<template>
  <div class="item">
    <h3>{{ result.title }}</h3>
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
}
</style>

<template>
  <div class="record component">
    <p>{{ msg }}</p>
    <ItemStatus msg="Item status field" />
    <Button msg="Button" />
    <Button msg="Button" />
    <Button msg="Button" />
  </div>
</template>

<script>
import Button from "./Button.vue";
import ItemStatus from "./ItemStatus.vue";

export default {
  name: "Record",
  components: {
    Button,
    ItemStatus
  },
  props: {
    msg: String
  }
};
</script>

<style scoped>
.record {
  border-color: lime;
}
</style>

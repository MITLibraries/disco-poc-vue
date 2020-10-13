<template>
  <div class="itemstatus component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "ItemStatus",
  props: {
    msg: String
  }
};
</script>

<style scoped>
.itemstatus {
  border-color: lightgreen;
}
</style>

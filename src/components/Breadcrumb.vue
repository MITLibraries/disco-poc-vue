<template>
  <div class="breadcrumb component">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb {
  border-color: red;
}
</style>

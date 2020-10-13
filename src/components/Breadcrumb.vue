<template>
  <div class="breadcrumb component wrap-outer-breadcrumb layout-band">
    <div class="wrap-breadcrumb" role="navigation" aria-label="breadcrumbs">
      <div class="breadcrumbs">
        <a href="https://libraries.mit.edu" title="MIT Libraries">{{ msg }}</a>
      </div>
    </div>
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

<template>
  <div class="help component gridband">
    <div class="inline-action well">
      <div class="message">{{ modelValue }}</div>
      <div class="actions">
        <a class="btn button-primary" href="https://libraries.mit.edu/ask/"
          >Ask Us</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Help",
  props: {
    modelValue: String,
  },
};
</script>

<style scoped>
.help {
  border-color: sienna;
}
</style>

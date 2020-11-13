<template>
  <div class="wrap-outer-breadcrumb layout-band">
    <div class="wrap-breadcrumb" role="navigation" aria-label="breadcrumbs">
      <div class="breadcrumbs">
        <span v-for="link in trail" v-bind:key="link.url">
          <a :href="link.url">{{ link.text }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  created() {
    this.reset();
  },
  data() {
    return {
      trail: [],
    };
  },
  methods: {
    add: function (link) {
      this.trail.push({
        text: link.text,
        url: link.url,
      });
    },
    reset: function () {
      this.trail = [
        {
          text: "Libraries home",
          url: "https://libraries.mit.edu/",
        },
        {
          text: "Search",
          url: "/",
        },
      ];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.breadcrumbs {
  span {
    margin-right: 0.5rem;

    a {
      margin-right: 0.5rem;
    }
  }
  span:after {
    content: "\00BB";
  }

  span:last-child:after {
    content: "";
  }
}
</style>

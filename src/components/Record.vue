<template>
  <div class="gridband layout-3q1q wrap-full-record">
    <div class="col3q box-content region full-record" data-region="Full record">
      <div v-if="status.loading" class="panel panel-info">
        <div class="panel-heading">Loading...</div>
      </div>
      <div v-if="status.errored" class="panel panel-danger">
        <div class="panel-heading">Something went wrong</div>
        <div class="panel-body">
          <p>{{ status.error_message.message }}</p>
          <pre>{{ status.error_message }}</pre>
        </div>
      </div>

      <div class="discover-full-record-basic-info">
        <div class="record-image">
          <img :alt="'cover for ' + result.title" />
        </div>
        <h2 class="record-title">
          <span class="sr">Title: </span>{{ result.title }}
        </h2>
        <p>
          <span v-if="result.content_type" class="record-type"
            ><span class="sr">Type: </span>{{ result.content_type }}</span
          >
          <span v-if="result.publication_date" class="record-year"
            >Published {{ result.publication_date }}</span
          >
        </p>
        <p v-if="result.contributors" class="record-authors">
          <span v-if="result.contributors.length > 1" class="sr"
            >Authors:
          </span>
          <span v-else class="sr">Author: </span>
          <span
            class="record-author"
            v-for="contributor in result.contributors"
            v-bind:key="contributor.value"
          >
            <a data-type="Author" href="#">{{ contributor.value }}</a>
          </span>
        </p>
      </div>
      <div class="discovery-full-record-availability">
        <h3 class="section-title sr">Availability</h3>
      </div>
      <div class="discovery-full-record-more-info">
        <h3 class="section-title">More information</h3>
        <ul class="list-moreinfo">
          <li>
            <span class="label">Document type: </span>{{ result.content_type }}
          </li>

          <li v-if="result.contributors">
            <span v-if="result.contributors.length > 1" class="label"
              >Authors:
            </span>
            <span v-else class="label">Author: </span>
            <span
              v-for="contributor in result.contributors"
              v-bind:key="contributor.value"
              class="record-author"
              >{{ contributor.value }}</span
            >
          </li>

          <li v-if="result.imprint">
            <span class="label">Publication info:</span> {{ result.imprint[0] }}
          </li>

          <li v-if="result.isbns">
            <span class="label">ISBN: </span>
            <span
              v-for="(isbn, index) in result.isbns"
              :key="index"
              class="isbn"
              >{{ isbn }} <span v-if="result.isbns.length > 1">, </span></span
            >
          </li>

          <li v-for="(language, index) in result.languages" v-bind:key="index">
            <span class="label">Language: </span>{{ language }}
          </li>

          <li v-if="result.physical_description">
            <span class="label">Physical description: </span
            >{{ result.physical_description }}
          </li>

          <li><span class="label">Database: </span>{{ result.source }}</li>
        </ul>

        <h3 v-if="result.subjects" class="section-title">Subject:</h3>
        <ul class="list-subjects">
          <li v-for="(subject, index) in result.subjects" v-bind:key="index">
            <a data-type="Subject" href="#">{{ subject }}</a>
          </li>
        </ul>

        <h3 v-if="result.summary" class="section-title">Abstract/summary</h3>
        <div class="section-content">
          {{ result.summary }}
        </div>

        <h3 v-if="result.notes" class="section-title">Notes</h3>
        <div class="section-content">
          <span v-for="(note, index) in result.notes" v-bind:key="index">
            {{ note }}<br
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Record",
  props: {
    modelValue: String
  },
  data() {
    return {
      result: Object,
      status: {
        error_message: "",
        errored: false,
        loading: false
      }
    };
  },
  methods: {
    fetchRecord: function() {
      let recordId = this.$route.params.recordId;
      if (recordId) {
        console.log(
          "App has been instructed to retrieve record " + recordId + " "
        );
        this.recordId = recordId;
        this.result = { id: 1, title: "Retrieving record..." };
        this.callTimdex(recordId);
      }
    },
    callTimdex: function(recordId) {
      const axios = require("axios").default;
      this.status.loading = true;
      console.log(process.env.VUE_APP_TIMDEX_API);
      axios
        .get(String(process.env.VUE_APP_TIMDEX_API) + "/record/" + recordId)
        .then(response => (this.result = response.data))
        .catch(
          error => (
            (this.status.errored = true),
            (this.status.error_message = error),
            (this.result = {})
          )
        )
        .finally(() => (this.status.loading = false));
    }
  },
  created() {
    this.fetchRecord();
  },
  watch: {
    $route: "fetchRecord"
  }
};
</script>

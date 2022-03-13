<template>
  <v-container class="align-start justify-center fill-height" fluid>
    <v-card class="mx-6 my-6 pa-4">
      <v-row class="mx-1 my-6 light-blue darken-3 pt-4 pb-4 d-flex align-center justify-space-between">
        <h2 class="my-2 mx-4 grey--text text--lighten-5">Özet Raporlar</h2>
        <router-link to="home" class="text-decoration-none">
          <v-btn class="light-blue darken-3 mx-4 py-6" small dark>
            <v-icon medium>mdi-home</v-icon>
          </v-btn>
        </router-link>
      </v-row>
      <v-card-title>
        <v-text-field v-model="search" color="light-blue darken-3" append-icon="mdi-magnify" label="Ara" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="reportItems" class="elevation-1" :search="search">
        <template v-slot:[`item.Total`]="{ item }">
          <v-chip label :color="getColor(item.Total)" dark>
            <v-avatar left>
              <v-icon>mdi-account-cash</v-icon>
            </v-avatar>
            {{ item.Total }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Report",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Şirket",
          align: "start",
          sortable: false,
          value: "COMPANY_NAME",
        },
        { text: "Partner", value: "PARTNER_NAME" },
        { text: "Partner Tipi", value: "PARTNER_TYPE" },
        { text: "Total", value: "Total" },
        { text: "Satış", value: "Satış" },
        { text: "Tahsilat", value: "Tahsilat" },
        { text: "Alış", value: "Alış" },
        { text: "Ödeme", value: "Ödeme" },
      ],
      //reportItems: [],
    };
  },

  methods: {
    getColor(Total) {
      if (Total > 0) return "red";
      else if (Total < 0) return "green";
      else return "orange";
    },
  },

  mounted() {
    this.$store.dispatch("loadReportList");
  },
  computed: {
    ...mapState(["reportItems"]),
  },
};
</script>

<style>
h1 {
  color: gray;
}
.v-chip .v-chip__content {
  min-width: 100px;
}
</style>
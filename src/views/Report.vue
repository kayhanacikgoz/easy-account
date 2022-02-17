<template>

  <v-card class="mx-6 my-6 ">
    <h1 class="mx-3 my-2">Özet Raporlar</h1>
    <router-link to="home" class="text-decoration-none">
      <v-btn class="mx-3 my-2" color="orange" fab small dark>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Ara" single-line hide-details></v-text-field>
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
color:gray;
}
.v-chip .v-chip__content {
  min-width: 100px;
}
</style>
<template>
  <v-container class="align-start justify-center fill-height" fluid>
    <v-card class="mx-5 my-5 pa-4">
        <v-row class="mx-1 my-6 deep-orange lighten-1 pt-4 pb-4 d-flex align-center justify-space-between">
          <h2 class="my-2 mx-5 grey--text text--lighten-5">Fatura Listesi</h2>
          <router-link to="home" class="text-decoration-none">
            <v-btn class="mx-5 my-2 deep-orange lighten-1 py-6" small dark>
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>
        </v-row>
      <v-card-title>
        <v-text-field v-model="search" color="deep-orange lighten-1" append-icon="mdi-magnify" label="Ara" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" color="deep-orange lighten-1" :items="tranItems" style="cursor:pointer" class="elevation-1" :search="search" @click:row="expandRow">

      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "List",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "No",
          align: "start",
          //sortable: false,
          value: "MASTER_TRAN_ID",
        },
        { text: "Tarih", value: "MASTER_TRAN_DATE" },
        { text: "Partner", value: "PARTNER_NAME" },
        { text: "Firma", value: "SUBCOMP_LABEL" },
        { text: "Ref.Tutar", value: "MASTER_TRAN_AMOUNT_R" },
        { text: "Tutar", value: "MASTER_TRAN_AMOUNT" },
        { text: "Birim", value: "SUBCURR_LABEL" },
        { text: "Hesap Türü", value: "SUBACC_LABEL" },
        { text: "Dönem", value: "MASTER_TRAN_DONEM" },
      ],
    };
  },

  methods: {
    ...mapActions([
      'loadFaturaDetay',
    ]),
    expandRow(row) {
      this.tranItems.map((item, index) => {
        item.selected = item === row
        this.$set(this.tranItems, index, item)
      })
      this.loadFaturaDetay(row.MASTER_TRAN_ID)
      
      this.$router.push({name: 'FaturaDetay', params: {id : row.MASTER_TRAN_ID  }})    

    }
  
  
  },

  mounted() {
    this.$store.dispatch("loadTranList");
  },
  computed: {
    ...mapState(["tranItems"]),
  },
};
</script>

<style scoped>
h1 {
color:gray;
}
</style>
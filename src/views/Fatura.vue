<template>
  <v-container class="align-center justify-center fill-height" fluid>
    <v-card width="90%" color="" :loading="isUpdating" elevation="10" class="pa-8">
      <v-row>
        <router-link to="home" class="text-decoration-none">
          <v-btn class="mx-3 my-2" color="orange" fab small dark>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>
        <h1 class="mx-3 my-2">Yeni Fatura</h1>
      </v-row>
      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-container>
          <v-form>
            <v-container>
              <v-row>
                <v-row>
                  <v-col class="d-flex" cols="12" sm="2">
                    <v-text-field value="0" label="Numara" filled disabled></v-text-field>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="5">
                    <v-select
                      :items="firma"
                      item-text="text"
                      item-value="value"
                      label="Firma"
                      v-model="firmaPost"
                      name="firmaPost"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="5">
                    <v-select
                      :items="hesapTuru"
                      item-text="text"
                      item-value="value"
                      label="Hesap Türü"
                      v-model="hesapTuruPost"
                      name="hesapTuruPost"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex" cols="12" sm="4">
                    <v-select
                      :items="partnerItems"
                      item-text="MASTER_PARTNER_NAME"
                      item-value="MASTER_PARTNER_ID"
                      label="Partner"
                      v-model="loadPartnerList"
                      name="loadPartnerList"
                      outlined
                    ></v-select>
                  </v-col>

                  <!--<v-col class="d-flex" cols="12" sm="4" md="4">
                    <v-select
                      :items="partnertype"
                      item-text="text"
                      item-value="value"
                      label="Partner Tipi"
                      v-model="partnertypePost"
                      name="partnertypePost"
                      solo
                    ></v-select>
                  </v-col>-->
                  <v-col cols="12" sm="6" md="4">
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="tarihPost"
                          label="Fatura Tarihi"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="tarihPost" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
              <!--     <v-col class="d-flex" cols="12" sm="4" md="4">
                    <v-select :items="donem" item-text="text" item-value="value" label="Dönem" v-model="donemPost" name="donemPost" solo></v-select>
                  </v-col> -->
                  <v-col class="d-flex" cols="12" sm="4" md="4">
                    <v-select
                      :items="paraBirimi"
                      item-text="text"
                      item-value="value"
                      label="Para Birimi"
                      v-model="paraBirimiPost"
                      name="paraBirimiPost"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Tutar" v-model="tutarPost" name="tutarPost" solo dense></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-textarea solo name="aciklamaPost" label="Açıklama" v-model="aciklamaPost"></v-textarea>
                  </v-col>
                </v-row>
              </v-row>
              <v-row> </v-row>
              <v-row>
                <v-btn v-on:click="addFatura" color="info" dark> kaydet </v-btn>
                <!--<v-btn 
                            to="Fatura"
                            x-large
                            class="ml-5"
                            color="red"
                            dark
                            >
                            temizle
                            </v-btn>-->
              </v-row>
            </v-container>
          </v-form>
        </v-container>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import sisu9_std_list from "../components/StandartServices/sisu9_std_list";
import { mapState } from "vuex";

export default {
  data() {
    return {
      paraBirimi: [],
      menu: false,
      durum: [],
      hesapTuru: [],
      firma: [],
      donem: [],
      tarih: "",
      partnertype: [],
      loadPartnerList: [],
      tutar: "",
      aciklama: "",
      autoUpdate: true,
      isUpdating: false,
      paraBirimiPost: null,
      durumPost: null,
      hesapTuruPost: null,
      firmaPost: null,
      tutarPost: "",
      aciklamaPost: "",
      donemPost: "",
      partnertypePost: "",
      // partnerItems: "",
      Liste: [],
      tarihPost: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      modal: false,
      menu2: false,
    };
  },
  components: {
    //
  },
  async created() {
    let std_list = new sisu9_std_list("accountype");
    std_list.callService();
    this.hesapTuru = std_list.Liste;

    std_list = new sisu9_std_list("company");
    std_list.callService();
    this.firma = std_list.Liste;

    std_list = new sisu9_std_list("donem");
    std_list.callService();
    this.donem = std_list.Liste;

    std_list = new sisu9_std_list("partnertype");
    std_list.callService();
    this.partnertype = std_list.Liste;

    std_list = new sisu9_std_list("usertype");
    std_list.callService();
    this.kullaniciTipi = std_list.Liste;

    std_list = new sisu9_std_list("currency");
    std_list.callService();
    this.paraBirimi = std_list.Liste;


    this.$store.dispatch("loadPartnerList");
  },
  methods: {
    async addFatura() {
      let formData = new FormData();
      formData.append("company_id", this.firmaPost);
      formData.append("tutar", this.tutarPost);
      formData.append("account_type", this.hesapTuruPost);
      formData.append("currency_type", this.paraBirimiPost);
      formData.append("note", this.aciklamaPost);
      formData.append("partner_id", this.loadPartnerList);
      formData.append("trans_date", this.tarihPost);
      formData.append("tran_user_id", 2);

      let result = await axios.post("https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_add", formData, {
        "Content-type": "application/x-www-form-urlencoded",
      });

      if (result.status == 200 && result.data.msg.MSG_TYPE == "S") {
        alert(result.data.msg.MSG_CONTENT)
        console.log(result.data.transaction)
        this.$router.go();
      } else {
        alert("Kayıt eklenemedi!");
      }
    },
  },
  /* mounted() {
    this.$store.dispatch("loadPartnerList");
  }, */
  computed: {
    ...mapState(["partnerItems"]),
  },
};
</script>
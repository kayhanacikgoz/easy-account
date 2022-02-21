<template>
  <v-container class="align-center justify-center fill-height" fluid>
    <v-card width="90%" color="" :loading="isUpdating" elevation="10" class="pa-8">
     
        <v-container class="d-flex justify-start flex-wrap">
            <v-row>
          <router-link to="/list" class="text-decoration-none">
            <v-btn class="mx-3 my-2" color="orange" fab small dark>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
            <h1 class="mx-3 my-2">Fatura Detay</h1>
            </v-row>
          <!--   <v-btn
            large
            to="/list"
            color="info"
            class="ma-2 white--text"
            >
                <v-icon left dark>mdi-home</v-icon>
                Anasayfa
            </v-btn> -->
        </v-container>
    
      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-container>
          <v-form>
            <v-container>
              <v-row>
                <v-row>
                  <v-col class="d-flex" cols="12" sm="2">
                    <v-text-field :value="tranDetails[0].MASTER_TRAN_ID" label="Numara" filled></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="5">
                    <v-select
                      :items="firma"
                      item-text="text"
                      item-value="value"
                      :label="tranDetails[0].SUBCOMP_LABEL"
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
                      :label="tranDetails[0].SUBACC_LABEL"
                      v-model="hesapTuruPost"
                      name="hesapTuruPost"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex" cols="12" sm="4">
                    <v-select
                      :items="donem"
                      item-text="text"
                      item-value="value"
                      :label="tranDetails[0].MASTER_TRAN_DONEM"
                      v-model="donemPost"
                      name="donemPost"
                      solo
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="4">
                    <v-select
                      :items="partner"
                      item-text="text"
                      item-value="value"
                      label="Kayhan Açıkgöz"
                      v-model="partnerPost"
                      name="partnerPost"
                      disabled
                      solo
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="4">
                    <v-select
                      :items="paraBirimi"
                      item-text="text"
                      item-value="value"
                      :label="tranDetails[0].SUBCURR_LABEL"
                      v-model="paraBirimiPost"
                      name="paraBirimiPost"
                      solo
                    ></v-select>
                  </v-col>
                </v-row>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    :label="tranDetails[0].MASTER_TRAN_AMOUNT"
                    :value="tranDetails[0].MASTER_TRAN_AMOUNT"
                    v-model="tutarPost"
                    name="tutarPost"
                    solo
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" sm="6">
                  <v-textarea
                    solo
                    name="aciklamaPost"
                    :label="tranDetails[0].MASTER_TRAN_NOTE"
                    :value="tranDetails[0].MASTER_TRAN_NOTE"
                    v-model="aciklamaPost"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row align="center" justify="space-between">
                <!-- <v-btn v-on:click="updateFatura" color="info" dark> değiştir </v-btn> -->


                <v-dialog v-model="dialog_edit" persistent max-width="350">
                  <template v-slot:activator="{ on, degistir }">
                    <v-btn color="info" dark v-bind="degistir" v-on="on"> Değiştir </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h6  flex-wrap">Fatura değiştirilecektir!</v-card-title>
                    <v-card-text>Faturayı değiştirmek istediğinizden emin misiniz?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="dialog_edit = false"> Vazgeç </v-btn>
                      <v-btn color="green darken-1" text @click="dialog_edit = false" v-on:click="updateFatura"> Değiştir </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog> 


                <v-dialog v-model="dialog_delete" persistent max-width="350">
                  <template v-slot:activator="{ on, silme }">
                    <v-btn color="error" dark v-bind="silme" v-on="on"> Sil </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h6"> Faturayı silmek istediğinizden emin misiniz? </v-card-title>
                    <v-card-text>Fatura silme işlemi geri alınamaz...</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog_delete = false"> Vazgeç </v-btn>
                      <v-btn color="red darken-1" text @click="dialog_delete = false" v-on:click="deleteFatura"> Sil </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!--    <v-btn
                        v-on:click="deleteFatura"
                        x-large
                        color="error"
                        dark
                        >
                        sil
                        </v-btn> -->
              </v-row>
            </v-container>
          </v-form>
        </v-container>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import sisu9_std_list from "../components/StandartServices/sisu9_std_list";
import axios from "axios";
export default {
  name: "FaturaDetay",
  data() {
    return {
      name: "AHmet",
      id: "",
      title: "",
      paraBirimi: [],
      menu: false,
      durum: [],
      hesapTuru: [],
      firma: [],
      donem: [],
      partner: [],
      tutar: "",
      aciklama: "",
      autoUpdate: true,
      isUpdating: false,
      paraBirimiPost: null,
      durumPost: null,
      hesapTuruPost: null,
      firmaPost: null,
      tutarPost: "",
      partnerPost: "",
      aciklamaPost: "",
      donemPost: "",
      Liste: [],
      dialog_edit: false,
      dialog_delete: false,
    };
  },
  async created() {
    let std_list = new sisu9_std_list("status");
    std_list.callService();
    this.durum = std_list.Liste;

    std_list = new sisu9_std_list("accountype");
    std_list.callService();
    this.hesapTuru = std_list.Liste;

    std_list = new sisu9_std_list("company");
    std_list.callService();
    this.firma = std_list.Liste;

    std_list = new sisu9_std_list("donem");
    std_list.callService();
    this.donem = std_list.Liste;

    std_list = new sisu9_std_list("usertype");
    std_list.callService();
    this.kullaniciTipi = std_list.Liste;

    std_list = new sisu9_std_list("currency");
    std_list.callService();
    this.paraBirimi = std_list.Liste;
  },
  methods: {
    async updateFatura() {
      if (this.paraBirimiPost == null) {
        this.paraBirimiPost = this.tranDetails[0].MASTER_TRAN_CURRENCY;
      }
      if (this.firmaPost == null) {
        this.firmaPost = this.tranDetails[0].MASTER_TRAN_COMPANY;
      }
      if (this.tutarPost == "") {
        this.tutarPost = this.tranDetails[0].MASTER_TRAN_AMOUNT;
      }
      if (this.hesapTuruPost == null) {
        this.hesapTuruPost = this.tranDetails[0].MASTER_TRAN_ACCOUNT;
      }
      if (this.aciklamaPost == "") {
        this.aciklamaPost = this.tranDetails[0].MASTER_TRAN_NOTE;
      }
      if (this.donemPost == null) {
        this.donemPost = this.tranDetails[0].MASTER_TRAN_DONEM;
      }

      let formData = new FormData();
      formData.append("islem_id", this.tranDetails[0].MASTER_TRAN_ID);
      formData.append("company_id", this.firmaPost);
      formData.append("tutar", this.tutarPost);
      formData.append("account_type", this.hesapTuruPost);
      formData.append("currency_type", this.paraBirimiPost);
      formData.append("note", this.aciklamaPost);
      formData.append("partner_id", 6);
      formData.append("trans_date", "2022-05-05");
      formData.append("tran_user_id", 2);

      let result = await axios.post("https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_edit", formData, {
        "Content-type": "application/x-www-form-urlencoded",
      });

      if (result.status == 200 && result.data.msg.MSG_TYPE == "S") {
        //alert(result.data.msg.MSG_CONTENT)
        //console.log(result.data.transaction)
        this.$router.push("/list");
      } else {
        alert(result.data.msg.MSG_CONTENT);
      }
    },
    async deleteFatura() {
      let formData = new FormData();
      formData.append("islem_id", this.tranDetails[0].MASTER_TRAN_ID);

      let result = await axios.post("https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_delete", formData, {
        "Content-type": "application/x-www-form-urlencoded",
      });

      if (result.status == 200 && result.data.msg.MSG_TYPE == "S") {
        //alert(result.data.msg)
        //console.log(result.data.msg)
        this.$router.push("/list");
      } else {
        alert(result.data.msg);
      }
    },
  },
  computed: {
    ...mapState(["tranDetails"]),
  },
};
</script>
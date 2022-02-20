<template>
<v-container class="align-center justify-center fill-height" fluid>
  <v-card
    width="90%"
    color=""
    :loading="isUpdating"
    elevation="10"
    class="pa-8"
  >
    <v-row>
        <v-container class="d-flex justify-start flex-wrap">
            <v-btn
            large
            to="home"
            color="info"
            class="ma-2 white--text"
            >
                <v-icon left dark>mdi-home</v-icon>
                Anasayfa
            </v-btn>
        </v-container>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row>
        <v-container>
            <v-form>
                <v-container>
                    <v-row>
                        <v-row>
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="2"
                            >
                                <v-text-field
                                    :value= tranDetails[0].MASTER_TRAN_ID
                                    label="Numara"
                                    filled
                                    
                                ></v-text-field>
                            </v-col>
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="5"
                            >
                                <v-select
                                :items="firma"
                                item-text="text"
                                item-value="value"
                                :label= tranDetails[0].SUBCOMP_LABEL
                                v-model="firmaPost"
                                name="firmaPost"
                                outlined
                                ></v-select>
                            </v-col>
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="5"
                            >
                                <v-select
                                :items="hesapTuru"
                                item-text="text"
                                item-value="value"
                                :label= tranDetails[0].SUBACC_LABEL
                                v-model="hesapTuruPost"
                                name="hesapTuruPost"
                                outlined
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="4"
                            >
                                <v-select
                                :items="donem"
                                item-text="text"
                                item-value="value"
                                :label= tranDetails[0].MASTER_TRAN_DONEM
                                v-model= "donemPost"
                                name="donemPost"
                                solo
                                ></v-select>
                            </v-col>    
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="4"
                            >
                                <v-select
                                    :items="partner"
                                    item-text="text"
                                    item-value="value"
                                    label="Kayhan Açıkgöz"
                                    v-model= "partnerPost"
                                    name="partnerPost"
                                    disabled
                                    solo
                                ></v-select>
                            </v-col>    
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="4"
                            >
                                <v-select
                                    :items = paraBirimi 
                                    item-text="text"
                                    item-value="value"
                                    :label= tranDetails[0].SUBCURR_LABEL
                                    v-model= "paraBirimiPost"
                                    name="paraBirimiPost"
                                    solo
                                ></v-select>
                            </v-col>            
                        </v-row>
                    </v-row>
                    <v-row>
                        <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        >
                            <v-text-field
                            :label= tranDetails[0].MASTER_TRAN_AMOUNT
                            :value= tranDetails[0].MASTER_TRAN_AMOUNT
                            v-model="tutarPost"
                            name="tutarPost"
                            solo
                            dense
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="6"
                        sm="6"
                        >
                            <v-textarea
                            solo
                            name="aciklamaPost"
                            :label= tranDetails[0].MASTER_TRAN_NOTE
                            :value= tranDetails[0].MASTER_TRAN_NOTE
                            v-model="aciklamaPost"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-btn
                        v-on:click="updateFatura"
                        x-large
                        color="info"
                        dark
                        >
                        kaydet
                        </v-btn>
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
import sisu9_std_list from '../components/StandartServices/sisu9_std_list'
import axios from 'axios'
export default {
    name: 'FaturaDetay',
    data() {
        return {
            name: 'AHmet',
            id: '',
            title: '',
            paraBirimi: [],
            menu: false,
            durum: [],
            hesapTuru: [],
            firma: [],
            donem: [],
            partner: [],
            tutar: '',
            aciklama: '',
            autoUpdate: true,
            isUpdating: false,
            paraBirimiPost: null,
            durumPost: null,
            hesapTuruPost: null,
            firmaPost: null,
            tutarPost: '',
            partnerPost: '',
            aciklamaPost: '',
            donemPost: '',
            Liste: [],
        }
    },
    async created() {
        let std_list = new sisu9_std_list('status');
        std_list.callService();
        this.durum = std_list.Liste

        std_list = new sisu9_std_list('accountype')
        std_list.callService();
        this.hesapTuru = std_list.Liste

        std_list = new sisu9_std_list('company')
        std_list.callService();
        this.firma = std_list.Liste

        std_list = new sisu9_std_list('donem')
        std_list.callService();
        this.donem = std_list.Liste

        std_list = new sisu9_std_list('usertype')
        std_list.callService();
        this.kullaniciTipi = std_list.Liste

        std_list = new sisu9_std_list('currency')
        std_list.callService();
        this.paraBirimi = std_list.Liste
    }, 
    methods: {
        async updateFatura() {
            if (this.paraBirimiPost == null) {this.paraBirimiPost = this.tranDetails[0].MASTER_TRAN_CURRENCY;}
            if (this.firmaPost == null) {this.firmaPost = this.tranDetails[0].MASTER_TRAN_COMPANY;}
            if (this.tutarPost == '') {this.tutarPost = this.tranDetails[0].MASTER_TRAN_AMOUNT;}
            if (this.hesapTuruPost == null) {this.hesapTuruPost = this.tranDetails[0].MASTER_TRAN_ACCOUNT;}
            if (this.aciklamaPost == '') {this.aciklamaPost = this.tranDetails[0].MASTER_TRAN_NOTE;}
            if (this.donemPost == null) {this.donemPost = this.tranDetails[0].MASTER_TRAN_DONEM;}
            
            let formData = new FormData();
            formData.append('islem_id', this.tranDetails[0].MASTER_TRAN_ID)
            formData.append('company_id', this.firmaPost);
            formData.append('tutar', this.tutarPost);
            formData.append('account_type', this.hesapTuruPost);
            formData.append('currency_type', this.paraBirimiPost);
            formData.append('note', this.aciklamaPost);
            formData.append('partner_id', 6);
            formData.append('trans_date', "2022-05-05");
            formData.append('tran_user_id', 2);

            let result = await axios.post ( "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_edit",
            formData,{'Content-type': 'application/x-www-form-urlencoded'} )

            if (result.status==200 && result.data.msg.MSG_TYPE =="S") {
                alert(result.data.msg.MSG_CONTENT)
                console.log(result.data.transaction)
            } else {
                alert(result.data.msg.MSG_CONTENT)
            }
        },
    },
    computed: {
        ...mapState(["tranDetails"]),
    },
}
</script>
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
                                value="0"
                                label="Numara"
                                filled
                                disabled
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
                            label="Firma"
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
                            label="Hesap Türü"
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
                            sm="6"
                            >
                                <v-select
                                :items="durum"
                                item-text="text"
                                item-value="value"
                                label="Durum"
                                v-model="durumPost"
                                name="durumPost"
                                solo
                                ></v-select>
                            </v-col>  
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="6"
                            md="6"
                            >
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
                        </v-row>
                        </v-row>
                        <v-row>
                             
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                            label="Tutar"
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
                            label="Açıklama"
                            v-model="aciklamaPost"
                            ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn
                            v-on:click="addFatura"
                            x-large
                            color="info"
                            dark
                            >
                            kaydet
                            </v-btn>
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
import axios from 'axios'
import sisu9_std_list from '../components/StandartServices/sisu9_std_list'

  export default {
    data () {
        return {
            paraBirimi: [],
            menu: false,
            durum: [],
            hesapTuru: [],
            firma: [],
            tutar: '',
            aciklama: '',
            autoUpdate: true,
            isUpdating: false,
            paraBirimiPost: null,
            durumPost: null,
            hesapTuruPost: null,
            firmaPost: null,
            tutarPost: '',
            aciklamaPost: '',
            datePost: '',
            userIdPost: '',
            Liste: [],
        }
    },
    components: {
        //
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

        /*std_list = new sisu9_std_list('donem')
        std_list.callService();
        this.donem = std_list.Liste*/

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
        async addFatura() {

            let formData = new FormData();
            formData.append('company_id', this.firmaPost);
            formData.append('tutar', this.tutarPost);
            formData.append('account_type', this.hesapTuruPost);
            formData.append('currency_type', this.paraBirimiPost);
            formData.append('note', this.aciklamaPost);
            formData.append('partner_id', 6);
            formData.append('trans_date', "2022-05-05");
            formData.append('tran_user_id', 2);

            let result = await axios.post ( "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=transaction_add",
            formData,{'Content-type': 'application/x-www-form-urlencoded'} )

            if (result.status==200 && result.data.msg.MSG_TYPE =="S") {
                alert(result.data.msg.MSG_CONTENT)
                console.log(result.data.transaction)
            } else {
                alert("Kayıt eklenemedi!")
            }
        },
    },
}
</script>
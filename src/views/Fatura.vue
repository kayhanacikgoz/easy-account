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
        <v-container class="d-flex justify-space-around flex-wrap">
            <v-btn
            to="home"
            color="info"
            class="ma-2 white--text"
            >
                <v-icon left dark>mdi-home</v-icon>
                Anasayfa
            </v-btn>
            <v-btn
            color="success"
            class="ma-2 white--text"
            >
                <v-icon left dark>mdi-format-list-bulleted</v-icon>
                Ekle 
            </v-btn>
            <v-btn
            color="warning"
            class="ma-2 white--text"
            >
                <v-icon left dark>mdi-pencil</v-icon>
                Düzenle
            </v-btn>
            <v-btn
            color="secondary"
            class="ma-2 white--text"
            >
                <v-icon left dark>mdi-eye</v-icon>
                Gürüntüle   
            </v-btn>
            <v-btn
            color="error"
            class="ma-2 white--text"
            >
            <v-icon left dark>mdi-delete</v-icon>
            Sİl 
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
                            sm="3"
                        >
                            <!--<v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="dates"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-combobox
                                        v-model="dates"
                                        multiple
                                        chips
                                        small-chips
                                        label="Vade Tarihi"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-combobox>
                                </template>
                                <v-date-picker
                                v-model="dates"
                                multiple
                                no-title
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(dates)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>-->
                        </v-col>

                        <v-col
                            class="d-flex"
                            cols="12"
                            sm="4"
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
                            sm="4"
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
                            sm="4"
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
                            sm="4"
                            >
                                <!-- <v-select
                                :items="kullaniciTipi"
                                item-text="text"
                                item-value="value"
                                label="Kullanıcı Tipi"
                                v-model="kullaniciTipiPost"
                                name="kullaniciTipiPost"
                                solo
                                ></v-select> -->
                            </v-col>   
                        <v-col
                        class="d-flex"
                        cols="12"
                        sm="4"
                        >
                            <!-- <v-select
                            :items="donem"
                            item-text="text"
                            item-value="value"
                            label="Cari Dönem"
                            v-model="donemPost"
                            name="donemPost"
                            solo
                            ></v-select> -->
                        </v-col>   
                        </v-row>
                        </v-row>
                        <v-row>
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="4"
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
                            <v-col
                            cols="12"
                            sm="4"
                            md="4"
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
                            md="4"
                            sm="4"
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
                            <v-btn 
                            x-large
                            class="ml-5"
                            color="red"
                            dark
                            >
                            temizle
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
import axios from 'axios'
import sisu9_std_list from '../components/StandartServices/sisu9_std_list'

  export default {
    data () {
        return {
            paraBirimi: [],
            menu: false,
            durum: [],
            hesapTuru: [],
            //donem: [],
            firma: [],
            tutar: '',
            aciklama: '',
            //kullaniciTipi: [],
            autoUpdate: true,
            isUpdating: false,
            firmaIndex: null,
            paraBirimiPost: null,
            durumPost: null,
            hesapTuruPost: null,
            //donemPost: null,
            firmaPost: null,
            //kullaniciTipiPost: null,
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
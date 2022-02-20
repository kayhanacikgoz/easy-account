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
                            sm="6"
                            >
                                <!--<v-select
                                :items="durum"
                                item-text="text"
                                item-value="value"
                                label="Durum"
                                v-model="durumPost"
                                name="durumPost"
                                solo
                                ></v-select>-->
                            </v-col>      
                            <v-col
                            class="d-flex"
                            cols="12"
                            sm="6"
                            >
                                <v-select
                                item-text="text"
                                item-value="value"
                                :label= tranDetails[0].SUBCURR_LABEL
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
            tutar: '',
            aciklama: '',
            autoUpdate: true,
            isUpdating: false,
            firmaIndex: null,
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
    computed: {
        ...mapState(["tranDetails"]),
    },
}
</script>
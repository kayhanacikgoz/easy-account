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
            <v-icon left dark>mdi-home</v-icon>Anasayfa</v-btn>
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
                                :value= tranDetails[0].MASTER_TRAN_ID
                                label="Numara"
                                filled
                                
                            ></v-text-field>
                        </v-col>

                        <v-col
                            class="d-flex"
                            cols="12"
                            sm="3"
                        >
                        </v-col>

                        <v-col
                            class="d-flex"
                            cols="12"
                            sm="4"
                        >
                            <v-select
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
                            item-text="text"
                            item-value="value"
                            label="Hesap Türü Post"
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
                         
                            </v-col>   
                        <v-col
                        class="d-flex"
                        cols="12"
                        sm="4"
                        >
                           
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
                            md="4"
                            sm="4"
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
import { mapState } from "vuex";
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
    computed: {
        ...mapState(["tranDetails"]),
    },
}
</script>
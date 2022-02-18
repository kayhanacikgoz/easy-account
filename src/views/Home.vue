<template>
  <v-app>
    <v-main>
      <v-container class="align-start fill-height" fluid>
        <v-row class="justify-space-between" rows="1" >
          <h4 class="mt-4 ml-4"><span class="font-weight-regular">Hoşgeldin</span> {{userInfo.member.MEMBER_NICK}}</h4>
          <v-btn class="mt-4 mr-4" color="deep-orange" text>
            <h3 v-on:click="logout">Logout</h3>
          </v-btn>
        </v-row>
        
        <v-row rows="11" align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card
              min-height="50vh" elevation="12"
              class="mx-auto d-flex flex-column">
                <v-row dense class="justify-center pa-10 pb-3">
                  <v-card width="100%" color="light-blue darken-2" dark>
                    <router-link to="fatura" class="text-decoration-none">
                      <v-btn block height="100%" text>
                        <h3>Fatura Girişi</h3>    
                      </v-btn>
                    </router-link>
                  </v-card>
                </v-row>
                <v-row dense class="justify-center pa-10 pt-3">
                  <v-card width="100%" color="deep-orange" dark>
                    <router-link to="list" class="text-decoration-none">
                      <v-btn block height="100%" text>
                        <h3>Faturaların Listesi</h3>
                      </v-btn>
                    </router-link>
                  </v-card>
                </v-row>
                <v-row dense class="justify-center pa-10 pt-3">
                  <v-card width="100%" color="green lighten-1" dark>
                    <router-link to="report" class="text-decoration-none">
                      <v-btn block height="100%" text>
                        <h3>Müşteri Raporu</h3>
                      </v-btn>
                    </router-link>
                  </v-card>
                </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    
  },
  data () {
    return {
      
      isGiris: Boolean,
      
    }
  },
  mounted() {
    this.$store.dispatch('loadUserInfo');
  },
  computed: {
    
    ...mapState([
          'userInfo'
      ]),
    }, 
    
  methods: {
    ...mapActions(['updateIsCikis']),
     logout() {
            
      let formData = new FormData();
      formData.append('none','none');
      let result =  axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=logout",
        formData,
        {
        'Content-type': 'application/x-www-form-urlencoded'
      }
      )
        this.updateIsCikis();
        localStorage.setItem("user-info",JSON.stringify(result))
        this.$router.push({name: 'Login'})
        alert("Çıkış Yaptınız")
    }
    
  },
}
</script>

<style>

</style>


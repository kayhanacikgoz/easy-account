<template>
  <v-app>
    <v-main>
      <v-container class="align-start fill-height" fluid>
        <v-row class="justify-space-between" rows="1" >
          <h4 class="mt-4 ml-4"><span class="font-weight-regular">Hoşgeldin</span></h4>
          <v-btn class="mt-4 mr-4" color="deep-orange" text>
            <h3 @click="logout">Logout</h3>
          </v-btn>
        </v-row>
        
        <v-row rows="11" align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card
              min-height="50vh" elevation="12"
              class="mx-auto d-flex pa-7 flex-wrap">
                <v-column dense class="justify-center pa-2 align-stretch flex-grow-1">
                  <router-link to="fatura" class="text-decoration-none">
                    <v-card height="100%" color="green lighten-1 d-flex align-center justify-center" dark>
                      <v-btn block class="pa-5" text>
                        <h3>Fatura GİrİŞİ</h3>    
                      </v-btn>
                    </v-card>
                  </router-link>
                </v-column>
                <v-column dense class="justify-center pa-2 flex-grow-1">
                  <router-link to="list" class="text-decoration-none">
                    <v-card height="100%" color="deep-orange lighten-1 d-flex align-center justify-center" dark>                  
                      <v-btn block class="pa-5" text>
                        <h3>Faturaların Lİstesİ</h3>
                      </v-btn>               
                    </v-card>
                  </router-link>
                </v-column>
                <v-column dense class="justify-center pa-2 flex-grow-1">
                  <router-link to="report" class="text-decoration-none">
                    <v-card height="100%" color="light-blue darken-3 d-flex align-center justify-center" dark>                  
                      <v-btn block class="pa-5" text>
                        <h3>Müşterİ Raporu</h3>
                      </v-btn>                   
                    </v-card>
                  </router-link>
                </v-column>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data () {
    return {
      //
    }
  },
  mounted() {
    //
  },
  computed: {
    ...mapGetters({ User: "StateUser" }),
  }, 
    
  methods: {
    async logout() {
      await this.$store.dispatch('LogOut');
      this.$router.push('/login');
    },
  },
}
</script>

<style>

</style>


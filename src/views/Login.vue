<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window>
                <v-window-item>
                  <v-row>
                    <v-col cols="12" md="8" class="">
                      <v-card-text class="mt-8">
                        <h3 class="text-center display-2 light-blue--text text--darken-2 mb-5">Giriş Yapın</h3>
                        <h5></h5>
                        <v-form>
                          <h4 v-if="state" class="red--text">Kullanıcı adı veya şifreniz hatalı. Lütfen tekrar deneyiniz.</h4>
                          <v-text-field
                          id="email"
                          label="Email"
                          name="email"
                          prepend-icon="email"
                          type="text"
                          color="light-blue darken-2" 
                          v-model="email"
                          />
                          <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="lock"
                          type="password"
                          color="light-blue darken-2" 
                          v-model="password"
                          />
                          <div class="text-center mt-3">
                            <v-btn v-on:click="login" value="Login" rounded color="light-blue darken-2 mb-5 mr-3" dark>Giriş Yap</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="light-blue darken-2">
                      <v-card-text class="white--text mt-8">
                        <h1 class="text-center display-1 mb-5">Hoşgeldiniz</h1>
                        <h4 class="text-center">Uygulamayı kullanmak için kayıt olun.</h4>
                      </v-card-text>
                      <div class="text-center mb-8">
                        <router-link to="" class="text-decoration-none"><v-btn rounded outlined dark @click="step++">Kayıt Ol</v-btn></router-link>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      state: ''
    }
  },
  methods: {
    async login() {

      let formData = new FormData();

        formData.append('email', this.email);
        formData.append('password', this.password);
            
      let result = await axios.post(
        "https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=login",
        formData,
        {
        'Content-type': 'application/x-www-form-urlencoded'
      }
        
      )
      console.log(formData)
      if (result.status==200 && result.data.MSG_TYPE =="S") {
        this.$router.push({name: 'Home'})
        import('../views/Home.vue')
        // mert
        
      } else {
        this.state = true
      }

    }
    
  },
}
</script>

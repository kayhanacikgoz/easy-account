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
                        <v-form @submit.prevent="submit">
                          <h4 v-if="showError" id="error" class="red--text">Kullanıcı adı veya şifreniz hatalı. Lütfen tekrar deneyiniz.</h4>
                          <v-text-field
                          id="email"
                          label="Email"
                          name="email"
                          type="email"
                          color="light-blue darken-2" 
                          v-model="form.email"
                          />
                          <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          type="password"
                          color="light-blue darken-2" 
                          autocomplete="current-password"
                          v-model="form.password"
                          />
                          <div class="text-center mt-3">
                            <v-btn type="submit" rounded color="light-blue darken-2 mb-5 mr-3" dark>Giriş Yap</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="light-blue darken-2">
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
import { mapActions } from "vuex";

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      showError: false,
    }
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          this.$router.push("/home");
          this.showError = false;
      } catch(error) {
          this.showError = true
      }
    },
  },
 
}
</script>

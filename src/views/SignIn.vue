<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="card" outlined>
              <v-row align="center" justify="center">
                <v-img :src="require('../../public/logo_hd.png')" max-width="160"></v-img>
                <v-container>
                  <h2>Sign in into MyMap</h2>
                </v-container>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="username"
                      outlined
                      label="Username or email address"
                      name="username"
                      prepend-inner-icon="person"
                      type="text"
                      color="orange"
                    />
                    <v-text-field
                      id="password"
                      v-model="password"
                      outlined
                      label="Password"
                      name="password"
                      prepend-inner-icon="lock"
                      type="password"
                      color="orange"
                    />
                  </v-form>
                  <p>
                    If you don't have an account, you can
                    <router-link to="/signup">create</router-link>one now.
                  </p>
                </v-card-text>
                <v-spacer />
                <v-card-actions>
                  <v-btn color="orange" @click="signIn">Sign In</v-btn>
                </v-card-actions>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  props: {
    source: String
  },
  data: () => ({
    username: "",
    password: ""
  }),
  methods: {
    signIn: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          user => {
            alert(user.username + "has been signed in successfully.");
            this.$router.push({
              path: "/",
              query: {
                id: this.username
              }
            });
            //console.log('successfully signed in')
          },
          error => {
            alert(error.message);
            //console.log('failed signing in')
          }
        );
    }
  }
};
</script>

<style scoped>
.card {
  padding: 50px;
}
</style>
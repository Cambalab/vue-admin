<template>
  <v-container fill-height class="background-image">
    <v-layout align-center justify-center>
      <v-flex xs4 class="text-xs-center">
        <v-card :name="UI_NAMES.AUTH_CONTAINER" class="card-container">
          <v-card-title primary-title :name="UI_NAMES.AUTH_CONTAINER_TITLE">
            <h3 class="headline mb-0 text-capitalize">
              {{UI_CONTENT.AUTH_CONTAINER_TITLE}}
            </h3>
          </v-card-title>
          <v-form
            class="input-padding"
            ref="form"
            v-model="valid"
            lazy-validation
          >

            <v-text-field
              :label="UI_CONTENT.AUTH_LABEL_USERNAME"
              :name="UI_NAMES.AUTH_USERNAME_INPUT"
              required
              :rules="emailRules"
              v-model="email"
            ></v-text-field>

            <v-text-field
              :label="UI_CONTENT.AUTH_LABEL_PASSWORD"
              :name="UI_NAMES.AUTH_PASSWORD_INPUT"
              required
              :rules="passwordRules"
              type="password"
              v-model="password"
            ></v-text-field>

            <v-btn
              class="text-xs-center extra-spacing"
              @click="validate"
              color="success"
              :disabled="!valid"
              :name="UI_NAMES.AUTH_SIGN_IN_BUTTON"
            >
              {{UI_CONTENT.AUTH_LABEL_SIGN_IN_BUTTON}}
            </v-btn>

          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import AuthTypes from '@va-auth/types'

export default {
  name: 'Login',

  props: {

  },

  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    password: '',
    UI_NAMES,
    UI_CONTENT
  }),

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        const params = { email: this.email, password: this.password }
        this.$store.dispatch(`auth/${AuthTypes.AUTH_LOGIN_REQUEST}`, params)
      }
    },
  }
}
</script>

<style scoped>
  .card-container {
    border-radius: 6px
  }

  .background-image {
    background-image: url(../../../../public/background.png);
    height: 90vh;
       -moz-background-size: 100% 100%;           /* Gecko 1.9.2 (Firefox 3.6) */
         -o-background-size: 100% 100%;           /* Opera 9.5 */
    -webkit-background-size: 100% 100%;           /* Safari 3.0 */
            background-size: 100% 100%;           /* Gecko 2.0 (Firefox 4.0) and other CSS3-compliant browsers */
    margin: 0;
    min-width: 100%;
  }

  .input-padding > div.v-input {
    padding: 4px 24px;
  }

  .extra-spacing {
    margin-bottom: 18px
  }
</style>

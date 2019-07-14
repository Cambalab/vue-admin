<template>
  <v-container fill-height class="background-image">
    <v-layout align-center justify-center>
      <v-flex xs11 sm8 md4 class="text-xs-center">
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
          >

            <v-text-field
              color="teal"
              :label="UI_CONTENT.AUTH_LABEL_USERNAME"
              :ref="UI_NAMES.AUTH_USERNAME_INPUT"
              :name="UI_NAMES.AUTH_USERNAME_INPUT"
              required
              :rules="emailRules"
              v-model="email"
            />

            <v-text-field
              color="teal"
              :label="UI_CONTENT.AUTH_LABEL_PASSWORD"
              :ref="UI_NAMES.AUTH_PASSWORD_INPUT"
              :name="UI_NAMES.AUTH_PASSWORD_INPUT"
              required
              :rules="passwordRules"
              type="password"
              v-model="password"
            />

            <v-btn
              class="text-xs-center extra-spacing"
              @click="validate"
              color="green"
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

export default {
  name: 'Login',

  data: () => {
    const {
      AUTH_ALERT_EMAIL_REQUIRED,
      AUTH_ALERT_INVALID_EMAIL,
      AUTH_ALERT_PASSWORD_REQUIRED,
    } = UI_CONTENT
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || AUTH_ALERT_EMAIL_REQUIRED,
        v =>  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) || AUTH_ALERT_INVALID_EMAIL
      ],
      passwordRules: [
        v => !!v || AUTH_ALERT_PASSWORD_REQUIRED,
      ],
      password: '',
      UI_NAMES,
      UI_CONTENT
    }
  },

  props: {
    va: {
      type: Object,
      required: true
    }
  },

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.va.login(this.email, this.password)
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

  .extra-spacing {
    margin-bottom: 18px
  }

  .input-padding > div.v-input {
    padding: 4px 24px;
  }

</style>

<template>
  <div fill-height :name="UI_NAMES.CUSTOM_AUTH">
    <v-layout>
      <v-flex xs12 sm8 md4 class="text-xs-center">
        <v-card :name="UI_NAMES.CUSTOM_AUTH_CONTAINER">
          <v-card-title primary-title :name="UI_NAMES.CUSTOM_AUTH_CONTAINER_TITLE">
            <h3 class="headline mb-0 text-capitalize">
              {{UI_CONTENT.CUSTOM_AUTH_CONTAINER_TITLE}}
            </h3>
          </v-card-title>
          <v-form
            class="input-padding"
            ref="form"
            v-model="valid"
          >

            <v-text-field
              color="#009688"
              :label="UI_CONTENT.CUSTOM_AUTH_LABEL_USERNAME"
              :name="UI_NAMES.CUSTOM_AUTH_USERNAME_INPUT"
              required
              :rules="usernameRules"
              v-model="username"
            />

            <v-text-field
              color="#009688"
              :label="UI_CONTENT.CUSTOM_AUTH_LABEL_PASSWORD"
              :name="UI_NAMES.CUSTOM_AUTH_PASSWORD_INPUT"
              required
              :rules="passwordRules"
              type="password"
              v-model="password"
            />

            <v-btn
              absolute
              class="extra-spacing"
              @click="validate"
              color="#4CAF50"
              :disabled="!valid"
              :name="UI_NAMES.CUSTOM_AUTH_SIGN_IN_BUTTON"
            >
              {{UI_CONTENT.CUSTOM_AUTH_LABEL_SIGN_IN_BUTTON}}
            </v-btn>

          </v-form>
        </v-card>
      </v-flex>
      <v-flex hidden-xs-only sm4 md8 class="va-img-sector">
        <div class="va-img-container">
          <img class="va-img"
            src="../assets/vue-admin-logo.png"
          />
          <h3 class="headline mt-3">
            Welcome to Vue-Admin!
          </h3>
        </div>
        <div class="credit-container">
          <p>
            <img class="camba-icon" src="../assets/camba-icon.png" />
            With
            <v-icon small color="#388E3C">favorite</v-icon>
            <v-icon small color="#7B1FA2">favorite</v-icon>
            <v-icon small color="#D32F2F">favorite</v-icon> by
            <a href="https://camba.coop/" target="_blank" rel="noopener noreferrer">Cambá Coop</a>
            in Buenos Aires, Argentina
            <img class="camba-icon" src="../assets/camba-icon.png" />
          </p>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: 'AuthCustomView',
  data: function () {
    const {
      CUSTOM_AUTH_ALERT_USERNAME_REQUIRED,
      CUSTOM_AUTH_ALERT_PASSWORD_REQUIRED,
    } = UI_CONTENT
    return {
      username: '',
      password: '',
      valid: false,
      usernameRules: [
        v => !!v || CUSTOM_AUTH_ALERT_USERNAME_REQUIRED
      ],
      passwordRules: [
        v => !!v || CUSTOM_AUTH_ALERT_PASSWORD_REQUIRED,
      ],
      UI_NAMES,
      UI_CONTENT,
    }
  },
  props: {
    va: {
      type: Object,
      required: true
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.va.login(this.username, this.password)
      }
    }
  }
}
</script>
<style scoped>
  .extra-spacing {
    margin-bottom: 18px
  }

  .input-padding > div.v-input {
    padding: 4px 24px;
  }

  .layout {
    height: 100vh;
    overflow: hidden;
    min-height: 500px;
  }

  .v-card {
    height: 100%;
  }

  .va-img-sector {
    position: relative;
    text-align: center;
    background-color: #edfcde;
  }

  .va-img-container {
    margin-top: 20vh;
  }

  .va-img {
    margin: auto;
  }

  .camba-icon {
    height: 16px;
  }

  .credit-container {
    position: absolute;
    bottom: 0;
    margin-bottom: 25px;
    width: 100%;
  }

  a {
    text-decoration: none;
  }
</style>

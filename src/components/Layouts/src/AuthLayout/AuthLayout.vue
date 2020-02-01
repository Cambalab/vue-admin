<template>
  <div fill-height :name="UI_NAMES.AUTH">
    <v-layout>
      <v-flex xs6 sm6 md4 lg4>
        <v-card :name="UI_NAMES.AUTH_CONTAINER">
          <v-card-title
            class="va-auth-title-container"
            :name="UI_NAMES.AUTH_CONTAINER_TITLE"
          >
            <component :is="authFormTitle" />
          </v-card-title>
          <v-form class="va-auth-form input-padding" ref="form" v-model="valid">
            <v-flex container sm10 md8 lg8>
              <v-text-field
                color="#009688"
                :label="UI_CONTENT.AUTH_LABEL_USERNAME"
                :name="UI_NAMES.AUTH_USERNAME_INPUT"
                :ref="UI_NAMES.AUTH_USERNAME_INPUT"
                required
                :rules="usernameRules"
                v-model="username"
              />

              <v-text-field
                color="#009688"
                :label="UI_CONTENT.AUTH_LABEL_PASSWORD"
                :name="UI_NAMES.AUTH_PASSWORD_INPUT"
                :ref="UI_NAMES.AUTH_PASSWORD_INPUT"
                required
                :rules="passwordRules"
                type="password"
                v-model="password"
              />
              <div class="va-auth-submit-container">
                <v-btn
                  class="va-auth-submit-button"
                  @click="validate"
                  color="#009688"
                  :disabled="!valid"
                  :name="UI_NAMES.AUTH_SIGN_IN_BUTTON"
                  :ref="UI_NAMES.AUTH_SIGN_IN_BUTTON"
                >
                  {{ UI_CONTENT.AUTH_LABEL_SIGN_IN_BUTTON }}
                </v-btn>
              </div>
            </v-flex>
          </v-form>
        </v-card>
      </v-flex>
      <v-flex hidden-xs-only sm6 md8 lg10 class="va-auth-right-panel">
        <div class="va-auth-main-content-container">
          <component :is="authMainContent" />
        </div>
        <div class="va-auth-footer-container">
          <component :is="authFooter" />
        </div>
      </v-flex>
      <v-snackbar
        :name="UI_NAMES.AUTH_SNACKBAR"
        :ref="UI_NAMES.AUTH_SNACKBAR"
        v-model="snackbar"
        color="error"
      >
        {{ snackbarText }}
        <v-btn color="white" text @click="snackbar = false">
          <strong>{{ UI_CONTENT.AUTH_SNACKBAR_CLOSE }}</strong>
        </v-btn>
      </v-snackbar>
    </v-layout>
  </div>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import defaults from './defaults'

export default {
  name: 'AuthLayout',
  props: {
    authFormTitle: {
      type: Object,
      default: () => defaults().props.authFormTitle,
    },
    authMainContent: {
      type: Object,
      default: () => defaults().props.authMainContent,
    },
    authFooter: {
      type: Object,
      default: () => defaults().props.authFooter,
    },
    usernameRules: {
      type: Array,
      default: () => defaults().props.usernameRules,
    },
    passwordRules: {
      type: Array,
      default: () => defaults().props.passwordRules,
    },
    va: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      valid: false,
      username: '',
      password: '',
      UI_NAMES,
      UI_CONTENT,
      snackbar: false,
      snackbarText: '',
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.va.login(this.username, this.password)
      }
    },
  },
}
</script>

<style scoped>
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

.va-auth-title-container {
  justify-content: center;
}

.va-auth-right-panel {
  position: relative;
  text-align: center;
  background-color: #edfcde;
}

.va-auth-form {
  text-align: left;
}

.va-auth-submit-container {
  position: relative;
  text-align: right;
  margin-left: 20px;
}

.va-auth-submit-button {
  color: #edfcde;
}

.va-auth-main-content-container {
  margin-top: 20vh;
}

.va-auth-footer-container {
  position: absolute;
  bottom: 0;
  margin-bottom: 25px;
  width: 100%;
}
</style>

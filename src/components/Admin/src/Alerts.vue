<template>
  <v-snackbar
    :name="UI_NAMES.AUTH_SNACKBAR"
    :ref="UI_NAMES.AUTH_SNACKBAR"
    v-model="snackbar.isVisible"
    :color="snackbar.color"
  >
    {{ snackbar.text }}
    <v-btn color="white" text @click="hideSnackbar">
      <strong>{{ UI_CONTENT.AUTH_SNACKBAR_CLOSE }}</strong>
    </v-btn>
  </v-snackbar>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import AuthTypes from '@va-auth/types'
import { Types as AlertTypes } from '@store/modules/alerts'

export default {
  name: 'Alerts',
  created() {
    this.$store.subscribe(mutation => {
      const { namespace, AUTH_LOGIN_SUCCESS } = AuthTypes
      if (mutation.type === `${namespace}/${AUTH_LOGIN_SUCCESS}`) {
        const { namespace, ALERTS_SHOW_SNACKBAR } = AlertTypes
        const { email: username } = mutation.payload
        this.$store.commit(`${namespace}/${ALERTS_SHOW_SNACKBAR}`, {
          color: 'success',
          text: UI_CONTENT.AUTH_SNACKBAR_LOGIN_SUCCESS.with({ username }),
        })
      }
    })
  },
  computed: {
    snackbar: {
      get() {
        const { namespace, ALERTS_GET_SNACKBAR_STATUS } = AlertTypes
        const getter = `${namespace}/${ALERTS_GET_SNACKBAR_STATUS}`
        return this.$store.getters[getter]
      },
      set() {
        const { namespace, ALERTS_HIDE_SNACKBAR } = AlertTypes
        this.$store.commit(`${namespace}/${ALERTS_HIDE_SNACKBAR}`)
      },
    },
  },
  data() {
    return { UI_CONTENT, UI_NAMES }
  },
  methods: {
    hideSnackbar() {
      this.snackbar.isVisible = false
    },
  },
}
</script>

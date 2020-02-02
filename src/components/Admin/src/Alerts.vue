<template>
  <v-snackbar
    :name="UI_NAMES.AUTH_SNACKBAR"
    :ref="UI_NAMES.AUTH_SNACKBAR"
    v-model="snackbar.isVisible"
    :color="snackbar.color"
  >
    <p :ref="UI_NAMES.SNACKBAR_TEXT">{{ snackbar.text }}</p>
    <v-btn
      color="white"
      text
      @click="hideSnackbar"
      :ref="UI_NAMES.AUTH_SNACKBAR_BUTTON"
    >
      <strong>{{ UI_CONTENT.SNACKBAR_CLOSE_TEXT }}</strong>
    </v-btn>
  </v-snackbar>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import { Types as AlertTypes } from '@store/modules/alerts'

export default {
  name: 'Alerts',
  computed: {
    snackbar: {
      get() {
        const { namespace, ALERTS_GET_SNACKBAR_STATUS } = AlertTypes
        const getter = `${namespace}/${ALERTS_GET_SNACKBAR_STATUS}`
        return this.$store.getters[getter]
      },
    },
  },
  data() {
    return { UI_CONTENT, UI_NAMES }
  },
  methods: {
    hideSnackbar() {
      const { namespace, ALERTS_HIDE_SNACKBAR } = AlertTypes
      this.$store.commit(`${namespace}/${ALERTS_HIDE_SNACKBAR}`)
    },
  },
}
</script>

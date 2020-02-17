<template>
  <v-card>
    <v-card-title>
      <slot name="title">
        <TextField type="h5" :name="NAME_UNAUTHORIZED_HEADER_CONTAINER"
          :value="UNAUTHORIZED_HEADER_CONTENT"
        />
      </slot>
    </v-card-title>
    <v-card-text>
      <slot name="text">
        <TextField type="p" :name="NAME_UNAUTHORIZED_MESSAGE_CONTAINER"
          :value="UNAUTHORIZED_MESSAGE_CONTENT"
        />
      </slot>
      <v-btn
        :name="NAME_BUTTON_GO_BACK"
        class="m-0"
        color="success"
        v-on:click="goBack"
      >
        {{ BUTTON_GO_BACK_CONTENT }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'
import { TextField } from '@components/UiComponents'

export default {
  name: 'UnauthorizedLayout',
  components: {
    TextField,
  },
  data: () => {
    return {
      NAME_UNAUTHORIZED_HEADER_CONTAINER:
        UI_NAMES.UNAUTHORIZED_HEADER_CONTAINER,
      NAME_UNAUTHORIZED_MESSAGE_CONTAINER:
        UI_NAMES.UNAUTHORIZED_MESSAGE_CONTAINER,
      NAME_BUTTON_GO_BACK: UI_NAMES.BUTTON_GO_BACK,

      UNAUTHORIZED_HEADER_CONTENT: UI_CONTENT.UNAUTHORIZED_HEADER,
      UNAUTHORIZED_MESSAGE_CONTENT: UI_CONTENT.UNAUTHORIZED_MESSAGE,
      BUTTON_GO_BACK_CONTENT: UI_CONTENT.BUTTON_GO_BACK,
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
}
</script>

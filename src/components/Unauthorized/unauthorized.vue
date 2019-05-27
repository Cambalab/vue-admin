<template>
  <v-card>
    <v-card-title :name="'UNAUTHORIZED_NAME_CONTAINER_HEADER'">
      <slot name="title">
        <h2>
          {{ UNAUTHORIZED_DEFAULT_HEADER }}
        </h2>
      </slot>
    </v-card-title>
    <v-card-text :name="'UNAUTHORIZED_NAME_CONTAINER_MESSAGE'">
      <slot name="text">
        <p>
          {{ UNAUTHORIZED_DEFAULT_MESSAGE }}
        </p>
      </slot>
    </v-card-text>
  </v-card>
</template>
<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAME from '@constants/ui.element.names'
export default {
  name: "Unauthorized",
  data: () => {
    return {
      UNAUTHORIZED_DEFAULT_HEADER: UI_CONTENT.UNAUTHORIZED_DEFAULT_HEADER,
      UNAUTHORIZED_DEFAULT_MESSAGE: UI_CONTENT.UNAUTHORIZED_DEFAULT_MESSAGE,
      UNAUTHORIZED_NAME_CONTAINER_HEADER: UI_NAME.UNAUTHORIZED_DEFAULT_CONTAINER_HEADER,
      UNAUTHORIZED_NAME_CONTAINER_MESSAGE: UI_NAME.UNAUTHORIZED_DEFAULT_CONTAINER_MESSAGE,
    }
  }
}
</script>

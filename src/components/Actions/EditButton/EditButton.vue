<template>
  <div>
    <v-tooltip
    bottom>
      <v-btn
      :name="`${name}`"
      @click="onEdit()"
      slot="activator"
      icon>
        <i class="v-icon material-icons">
          {{editButtonContent()}}
        </i>
      </v-btn>
      <span>Edit</span>
    </v-tooltip>
  </div>
</template>

<script>
import UI_CONTENT from '../../../constants/ui.content.default'

export default {
  name: "EditButton",

  props: {
    name: {
      type: String,
      default: null
    },
    resourceId: {
      type: [Number, String]
    },
    resourceName: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    onEdit() {
      this.$router.push({ name: `${this.resourceName}/edit`, params: { id: this.resourceId } });
    },
    editButtonContent() {
      return UI_CONTENT.RESOURCE_EDIT_BUTTON
    }
  },
};
</script>

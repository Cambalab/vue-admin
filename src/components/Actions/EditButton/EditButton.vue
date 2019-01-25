<template>
  <div>
    <v-tooltip
    bottom>
      <v-btn
      :name="editButtonName()"
      @click="onEdit()"
      slot="activator"
      icon>
        <i class="v-icon material-icons">
          {{UI_CONTENT.RESOURCE_EDIT_BUTTON}}
        </i>
      </v-btn>
      <span>Edit</span>
    </v-tooltip>
  </div>
</template>

<script>
import UI_CONTENT from '@constants/ui.content.default'
import UI_NAMES from '@constants/ui.element.names'

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
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      UI_CONTENT,
      UI_NAMES
    }
  },
  methods: {
    onEdit() {
      this.$router.push({ name: `${this.resourceName}/edit`, params: { id: this.resourceId } });
    },
    editButtonName() {
      return this.index !== undefined
      ? UI_NAMES.RESOURCE_EDIT_BUTTON.with({ resourceName: this.resourceName, index: this.index })
      : UI_NAMES.RESOURCE_EDIT_BUTTON.with({ resourceName: this.resourceName })
    }
  },
};
</script>

<template>
  <div>
    <v-tooltip bottom>
      <v-btn
        :name="`${name}`"
        @click="onDelete()"
        slot="activator"
        icon>
        <i class="v-icon material-icons">
          {{UI_CONTENT.RESOURCE_DELETE_BUTTON}}
        </i>
      </v-btn>
      <span>Delete</span>
    </v-tooltip>
  </div>
</template>

<script>
import UI_CONTENT from '../../../constants/ui.content.default'

export default {
  name: "Delete",

  props: {
    name: {
      type: String,
      default: null
    },
    resourceId: {
      type: [Number, String]
    },
    resourceName: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      UI_CONTENT
    }
  },

  methods: {
    onDelete() {
      const resourceName = this.resourceName + "/destroy";
      this.$store.dispatch(resourceName, { id: this.resourceId });
      return this.$router.push({ path: `/${this.resourceName}`});
    }
  },
};
</script>

<template>
  <v-text-field :name="name" v-model="inputValue" :label="placeHolder" required>
  </v-text-field>
</template>

<script>
export const defaults = () => {
  return {
    props: {
      placeHolder: '',
      value: '',
      name: 'va-text-field',
    },
  }
}

export default {
  name: 'TextField',
  props: {
    placeHolder: {
      type: String,
      default: defaults().props.placeHolder,
    },
    value: {
      type: [String, Number],
      default: defaults().props.value,
    },
    name: {
      type: String,
      default: defaults().props.name,
    },
  },
  data() {
    return {
      inputValue: this.value,
    }
  },
  watch: {
    inputValue: function(newVal) {
      this.$emit('change', newVal)
    },
  },
}
</script>

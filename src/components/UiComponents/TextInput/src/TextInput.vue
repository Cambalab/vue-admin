<template>
  <v-text-field :name="name" v-model="inputValue" :label="placeHolder" required>
  </v-text-field>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    placeHolder: {
      type: String,
      default: '',
    },
    value: [String, Number],
    name: {
      type: String,
      default: 'va-input',
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
  computed: {},
}
</script>

<template>
  <v-text-field
    v-model="inputValue"
    :label="placeHolder"
    required>
  </v-text-field>
</template>

<script>
export default {
  name: "Input",
  props:{
    placeHolder: {
      type: String,
      default: "Input"
    },
    value: [String, Number]
  },
  data() {
    return {
      inputValue: this.value
    }
  },
  watch: {
    inputValue: function(newVal) {
      this.$emit('change', newVal);
    }
  },
  computed:{
  }
};
</script>

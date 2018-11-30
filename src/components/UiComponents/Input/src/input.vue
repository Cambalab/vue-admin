<template>
  <v-text-field
      v-model="content"
      :label=placeHolder
      @input="onChange"
      required>
  </v-text-field>
</template>

<script>
export default {
  name: "Input",
  props:{
    placeHolder: {
      type:String,
      default:"Input"
    }
    content: [String, Number]
  },
  data() {
    return {}
  },
  computed:{
  },
  methods:{
    onChange(event) {
      this.$emit('change', event);
    }
  }
};
</script>

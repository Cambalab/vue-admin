<template>
  <input :placeholder="placeHolder" @input="onChange"/>
</template>

<script>
export default {
  name: "Input",
  props:{
    placeHolder: String
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

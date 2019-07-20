<template>
  <v-menu
    lazy
    v-model="menu"
    transition="scale-transition"
    offset-y
    full-width
    :max-width="dateInputMaxWidth"
    min-width="290px"
    :disabled="disabled"
    v-bind="vMenuProps"
  >
    <v-text-field
      slot="activator"
      :label="placeHolder"
      :name="name"
      :readonly="readonly"
      :disabled="disabled"
      v-model="formattedDate"
    ></v-text-field>
    <v-date-picker v-model="date" v-bind="datePickerProps">
    </v-date-picker>
  </v-menu>
</template>

<script>
import ELEMENTS_PROPS from '@constants/ui.elements.props'

export default {
  name: "DateInput",
  props: {
    placeHolder: {
      type: String
    },
    value: {
      type: [String, Number],
      default: new Date().toISOString()
    },
    name: {
      type: String,
      default: 'va-date-input'
    },
    readonly: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    datePickerProps: {
      type: Object,
      default: null
    },
    vMenuProps: {
      type: Object,
      default: null
    },
    format: {
      type: Function,
      default: null
    },
    parse: {
      type: Function,
      default: null
    },
    valid: {
      type: Function,
      default: null
    }
  },
  data() {
    const formattedDate = this.format(this.parse(this.value))
    return {
      date: this.constructDate(this.value),
      formattedDate,
      menu: false,
      dateInputMaxWidth: this.calculateCorrectDefaultMaxWidth()
    }
  },
  watch: {
    date: function(newVal) {
      let formattedDate = newVal
      if (newVal && this.format) {
        const [year, month, day] = newVal.split('-')
        formattedDate = this.format({ year, month, day })
        this.formattedDate = formattedDate
        const value = new Date(formattedDate).toISOString()
        this.$emit('change', value);
      }
    },
    formattedDate: function(newVal) {
      if (this.valid && this.valid(newVal)) {
        this.date = this.constructDate(newVal)
      } else {
        this.date = null
        this.$emit('invalid', newVal)
      }
    }
  },
  methods: {
    canParse(aDate) {
      return this.parse && aDate
    },
    constructDate(aDate) {
      if (this.canParse(aDate)) {
        const { day, year, month } = this.parse(aDate)
        return [year, month, day].join('-')
      }
      return this.value
    },
    calculateCorrectDefaultMaxWidth() {
      return this.datePickerProps && this.datePickerProps.landscape
        ? ELEMENTS_PROPS.dateInputMaxWidthLandscape
        : ELEMENTS_PROPS.dateInputMaxWidthNoLandscape
    }
  }
}
</script>

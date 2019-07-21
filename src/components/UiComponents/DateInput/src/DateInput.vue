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
    <v-date-picker v-model="date" v-bind="vDatePickerProps">
    </v-date-picker>
  </v-menu>
</template>

<script>
import ELEMENTS_PROPS from '@constants/ui.elements.props'

export default {
  name: "DateInput",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    format: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      default: 'va-date-input'
    },
    placeHolder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: true
    },
    parse: {
      type: Function,
      required: true
    },
    vDatePickerProps: {
      type: Object,
      default: () => ({
        noTitle: true
      })
    },
    vMenuProps: {
      type: Object,
      default: () => ({})
    },
    valid: {
      type: Function,
      required: true
    },
    value: {
      type: [String, Number],
      default: new Date().toISOString()
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
      if (newVal) {
        const formattedDate = this.format(this.parse(newVal))
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
        const { day, year, month } = this.vDateInputParse(aDate)
        return [year, month, day].join('-')
      }
      return this.value
    },
    vDateInputParse(aDate) {
      const [year, month, day] = aDate.substr(0, 10).split('-')
      return { day, month, year }
    },
    calculateCorrectDefaultMaxWidth() {
      return this.datePickerProps && this.datePickerProps.landscape
        ? ELEMENTS_PROPS.dateInputMaxWidthLandscape
        : ELEMENTS_PROPS.dateInputMaxWidthNoLandscape
    }
  }
}
</script>

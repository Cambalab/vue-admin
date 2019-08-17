<template>
  <v-menu
    v-model="menu"
    v-bind="vMenuProps"
    full-width
    min-width="290px"
    :max-width="dateInputMaxWidth"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="formattedDate"
        clearable
        :label="placeholder"
        readonly
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      v-bind="vDatePickerProps"
    />
  </v-menu>
</template>

<script>
import defaults from './defaults'
import ELEMENTS_PROPS from '@constants/ui.elements.props'

export default {
  name: "DateInput",
  props: {
    disabled: {
      type: Boolean,
      default: defaults().props.disabled
    },
    format: {
      type: Function,
      default: defaults().props.format,
      required: true
    },
    name: {
      type: String,
      default: defaults().props.name
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: defaults().props.readonly
    },
    parse: {
      type: Function,
      default: defaults().props.parse,
      required: true
    },
    vDatePickerProps: {
      type: Object,
      default: defaults().props.vDatePickerProps
    },
    vMenuProps: {
      type: Object,
      default: defaults().props.vMenuProps
    },
    value: {
      type: [String, Number],
      default: new Date().toISOString(true)
    }
  },
  data() {
    return {
      date: this.parseDate(this.value),
      dateInputMaxWidth: this.calculateCorrectDefaultMaxWidth(),
      formattedDate: this.formatDate(this.value),
      menu: false,
    }
  },

  watch: {
    date: function(newDate) {
      if (newDate) {
        const formattedDate = this.formatDate(newDate)
        this.formattedDate = formattedDate
        const value = this.parseDate(newDate)
        this.$emit('change', value)
      }
    },
  },

  methods: {
    parseDate(date) {
      return date ? this.parse(date) : date
    },
    formatDate(date) {
      return this.format(date)
    },
    calculateCorrectDefaultMaxWidth() {
      return this.datePickerProps && this.datePickerProps.landscape
        ? ELEMENTS_PROPS.dateInputMaxWidthLandscape
        : ELEMENTS_PROPS.dateInputMaxWidthNoLandscape
    }
  }
}

</script>

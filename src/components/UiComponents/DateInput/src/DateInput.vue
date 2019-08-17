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
        :value="computedDateFormattedMomentjs"
        clearable
        :label="placeholder"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      v-bind="vDatePickerProps"
      @change="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
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
    valid: {
      type: Function,
      default: defaults().props.valid,
      required: true
    },
    value: {
      type: [String, Number],
      default: new Date().toISOString()
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dateInputMaxWidth: this.calculateCorrectDefaultMaxWidth()
    }
  },

  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
  },

  methods: {
    calculateCorrectDefaultMaxWidth() {
      return this.datePickerProps && this.datePickerProps.landscape
        ? ELEMENTS_PROPS.dateInputMaxWidthLandscape
        : ELEMENTS_PROPS.dateInputMaxWidthNoLandscape
    }
  }
}

</script>

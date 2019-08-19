import defaults from '@components/UiComponents/DateInput/src/defaults'

export default {
  props: {
    disabled: defaults().props.disabled,
    format: () => {},
    name: defaults().props.name,
    parse: () => {},
    placeholder: 'select a date',
    readonly: defaults().props.readonly,
    vDatePickerProps: defaults().props.vDatePickerProps(),
    vMenuProps: defaults().props.vMenuProps(),
  }
}

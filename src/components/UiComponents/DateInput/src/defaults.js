import {
  handleEmptyProp
} from '@handlers/error/src'

/**
 * Defaults - Default attributes for the DateInput component
 *
 * @return {Object} An object containing props and methods
 */
export default () => {
  const component = 'DateInput'

  function _vDatePickerProps() {
    return { noTitle: true }
  }

  function _vMenuProps() {
    return {}
  }

  /**
   * DateInput default props
   */
  const disabled         = false
  const format           = handleEmptyProp({ prop: 'format', at: component })
  const name             = 'va-date-input'
  const parse            = handleEmptyProp({ prop: 'parse', at: component })
  const readonly         = true
  const vDatePickerProps = _vDatePickerProps
  const vMenuProps       = _vMenuProps

  return {
    props: {
      disabled,
      format,
      name,
      parse,
      readonly,
      vDatePickerProps,
      vMenuProps,
    }
  }
}

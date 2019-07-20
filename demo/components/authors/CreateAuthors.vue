<template>
  <Create>
    <input source="name" placeHolder="Name" />
    <input source="lastname" placeHolder="Last name" />
    <input source="birthdate" placeHolder="Birthdate" type="DateInput"
      :datePickerProps="datePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
      :valid="validDate"
      :readonly="readonly" />
  </Create>
</template>

<script>
import Create from '@components/Actions/Create'
import dateInputMethods from './authors-date-input-methods'

export default {
  name: 'CreateAuthors',
  components: {
    Create
  },
  data() {
    const { parseDate, formatDate, validDate } = dateInputMethods
    return {
      datePickerProps: {
        locale: 'en-us',
        type: 'date',
        noTitle: true
      },
      vMenuProps: {
        nudgeRight: 0,
        closeOnContentClick: true
      },
      readonly: true,
      parseDate,
      formatDate,
      validDate
    }
  }
}
</script>

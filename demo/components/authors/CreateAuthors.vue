<template>
  <Create>
    <input source="name" placeHolder="Name" />
    <input source="lastname" placeHolder="LastName" />
    <input source="birthdate" placeHolder="Birthdate" type="DateInput"
      :datePickerProps="datePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
      :valid="validDate" />
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
        nudgeRight: 40,
        closeOnContentClick: true
      },
      parseDate,
      formatDate,
      validDate
    }
  }
}
</script>

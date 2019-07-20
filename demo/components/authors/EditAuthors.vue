<template>
  <Edit>
    <input source="id" placeHolder="Id" />
    <input source="name" placeHolder="Name" />
    <input source="lastname" placeHolder="Last name" />
    <input source="birthdate" placeHolder="Birthdate" type="DateInput"
      :datePickerProps="datePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
      :valid="validDate" />
  </Edit>
</template>

<script>
import Edit from '@components/Actions/Edit'
import dateUtils from '@demo/utils/dates'

export default {
  name: 'EditAuthors',
  components: {
    Edit
  },
  data() {
    const { parseDate, formatDate, validDate } = dateUtils
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
      parseDate,
      formatDate,
      validDate
    }
  }
}
</script>

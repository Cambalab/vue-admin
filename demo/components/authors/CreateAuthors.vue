<template>
  <Create>
    <input source="name" placeHolder="Name" />
    <input source="lastname" placeHolder="Last name" />
    <input source="birthdate" placeholder="Birthdate" type="DateInput"
      :vDatePickerProps="vDatePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
      :valid="validDate"
      :readonly="readonly" />
  </Create>
</template>

<script>
import Create from '@components/Actions/Create'
import dateUtils from '@demo/utils/dates'

export default {
  name: 'CreateAuthors',
  components: {
    Create
  },
  data() {
    const { parseDate, formatDate, validDate } = dateUtils
    return {
      vDatePickerProps: {
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

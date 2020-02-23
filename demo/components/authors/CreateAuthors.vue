<template>
  <Create>
    <TextField source="name" placeHolder="Name" />
    <TextField source="lastname" placeHolder="Last name" />
    <DateField
      source="birthdate"
      placeholder="Birthdate"
      :vDatePickerProps="vDatePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
      :readonly="readonly"
    />
  </Create>
</template>

<script>
import Create from '@components/Actions/Create'
import dateUtils from '@demo/utils/dates'

export default {
  name: 'CreateAuthors',
  components: {
    Create,
  },
  data() {
    const { parseDate, formatDate } = dateUtils
    return {
      vDatePickerProps: {
        locale: 'en-us',
        type: 'date',
        noTitle: true,
      },
      vMenuProps: {
        nudgeRight: 0,
        closeOnContentClick: true,
      },
      readonly: true,
      parseDate,
      formatDate,
    }
  },
}
</script>

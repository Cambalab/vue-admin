<template>
  <Edit>
    <TextField source="id" placeHolder="Id" />
    <TextField source="name" placeHolder="Name" />
    <TextField source="lastname" placeHolder="Last name" />
    <DateField
      source="birthdate"
      placeholder="Birthdate"
      :vDatePickerProps="vDatePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
    />
  </Edit>
</template>

<script>
import Edit from '@components/Actions/Edit'
import dateUtils from '@demo/utils/dates'

export default {
  name: 'EditAuthors',
  components: {
    Edit,
  },
  data() {
    const { parseDate, formatDate } = dateUtils
    return {
      vDatePickerProps: {
        locale: 'en',
        type: 'date',
        noTitle: true,
      },
      vMenuProps: {
        nudgeRight: 0,
        closeOnContentClick: true,
      },
      parseDate,
      formatDate,
    }
  },
}
</script>

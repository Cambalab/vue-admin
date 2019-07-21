# DateInput

### Usage

In order to Vue Admin understand what kind of input the View should render, we must provide a value to a **type** property to the `input` in the template.

```vue
<template>
  <Create>
    <input source="birthdate"
      placeHolder="Birthdate"
      type="DateInput"
      :datePickerProps="datePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
      :valid="validDate"
    />
  </Create>
</template>
<script>
import Create from 'vue-admin-js'

export default {
  name: 'MyComponent',
  components: {
    Create
  },
  data() {
    return {
      datePickerProps: {
        locale: 'en-us',
        type: 'date',
        noTitle: true
      },
      vMenuProps: {
        nudgeRight: 40,
        closeOnContentClick: true
      }
    }
  },
  methods: {
    parseDate (aDate) {
      const [year, month, day] = aDate.substr(0, 10).split('-')
      return { day, month, year }
    },
    formatDate ({ day, month, year }) {
      return `${month}/${day}/${year}`
    },
    validDate (aDate) {
      const rgx = new RegExp(/\d{4}\/\d{2}\/\d{2}/)
      return rgx.test(aDate)
    }
  }  
}
</script>
```

*It is recommended to implement the parse, format and/or valid functions in a separate module for re-usability*

### Supported properties
The DateInput component supports the following properties:
*   **placeHolder**: The placeholder for the input field (as previously);
*   **value**: The value to init the component (as previously);
*   **name**: The name of the component (as previously);
*   **readonly**: A Boolean indicating if the date in the input field can be modified manually (readonly = false) or only with the datepicker (readonly = true);
*   **disabled**: A Boolean indicating if the field is disabled;
*   **datePickerProps**: An Object with the fields matching the [DatePicker api](https://vuetifyjs.com/en/components/date-pickers#api) and the possible values for them;
*   **vMenuProps**: An Object with the fields matching the [Vuetify menu component api](https://vuetifyjs.com/en/components/menus#api) and the possible values for them;
*   **format**: A Function that receives an object with the form `{ day, month, year }` and returns a string with the formatted date to show in the input field
*   **parse**: A Function that receives a Date formatted string and returns an object like the following `{ day, month, year }`.
*   **valid**: A Function that receives a string as a parameter, which the user can evaluate its validity as a date or not, and returns a Boolean <true = valid | false = invalid>.

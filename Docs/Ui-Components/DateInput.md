# DateInput

### Usage

In order to Vue Admin understand what kind of input the View should render, we must provide a value to a **type** property to the `input` in the template.

```vue
<template>
  <Create>
    <input source="birthdate"
      placeHolder="Birthdate"
      type="DateInput"
      :vDatePickerProps="vDatePickerProps"
      :vMenuProps="vMenuProps"
      :parse="parseDate"
      :format="formatDate"
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
      vDatePickerProps: {
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
    parseDate (date) {
      // parse your date value to a valid date string (ISOString for example)
      return new Date(date).toISOString()
    },
    formatDate (date) {
      // format your date to a desirable string for the v-text-field to show
      return `${month}/${day}/${year}`
    },
  }  
}
</script>
```

*It is recommended to implement the parse and/or format functions in a separate module for re-usability*

### Supported properties
The DateInput component supports the following properties:
*   **placeHolder**: The placeholder for the input field (as previously);
*   **value**: The value to init the component (as previously);
*   **name**: The name of the component (as previously);
*   **readonly**: A Boolean indicating if the date in the input field can be modified manually (readonly = false) or only with the datepicker (readonly = true);
*   **disabled**: A Boolean indicating if the field is disabled;
*   **vDatePickerProps**: An Object with the fields matching the [DatePicker api](https://vuetifyjs.com/en/components/date-pickers#api) and the possible values for them;
*   **vMenuProps**: An Object with the fields matching the [Vuetify menu component api](https://vuetifyjs.com/en/components/menus#api) and the possible values for them;
*   **format**: A Function that receives a Date formatted string and returns returns a string value to show in the text-field of the DateInput component.
*   **parse**: A Function that receives a date value and must return a valid string that represents a date for the v-date-picker component

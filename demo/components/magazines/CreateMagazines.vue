<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img src="banner.png" aspect-ratio="4" />
        <v-card-title primary-title>
          <h3 class="headline mb-2">New Magazine</h3>
        </v-card-title>
        <div>
          <v-form>
            <v-container>
              <v-layout column>
                <v-flex xs12>
                  <v-text-field
                    :name="names.elementField('name')"
                    @input="storeValue($event, 'name')"
                    label="Name"
                  />
                  <v-text-field
                    :name="names.elementField('issue')"
                    @input="storeValue($event, 'issue')"
                    label="Issue"
                  />
                <v-text-field
                  :name="names.elementField('publisher')"
                  @input="storeValue($event, 'publisher')"
                  label="Publisher"
                />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </div>
        <v-card-actions>
          <v-btn
            :name="names.submitButton"
            color="orange"
            class="submit-button"
            @click="submit"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>

/**
 * This is a custom component for creating magazines using a form, with a name,
 * issue number and a publisher.
 * When passed through the Resource, this custom component is automatically
 * 'injected' with a 'va' prop used to create magazine entities.
 * This prop contains getter and setter functions that must be used by your UI
 * components, such as buttons, inputs, etc.
 */

// This is only used for e2e demo tests
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: 'CreateMagazines',
  props: {
    // This prop will be assigned by Vue Admin for you to use the functions
    // shown below.
    va: {
      type: Object,
      required: true
    }
  },
  data() {
    // This is only needed for e2e demo tests
    const resourceName = 'magazines'
    const view = 'create'
    const names = {
      elementField: (field) => UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName,
        view,
        field
      }),
      submitButton: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({
        resourceName,
        view
      })
    }
    return {
      names
    }
  },
  methods: {
    storeValue(value, resourceKey) {
      // The updateEntity method receives a key of your resource object and a
      // value to update it's state in the store. At the moment you will have to
      // specify the key name to be modified when using this method.
      this.va.updateEntity({ resourceKey, value })
    },
    submit() {
      // Use this function when your 'magazines' entity is ready to be sent to
      // your apiUrl
      this.va.submitEntity()
    }
  },
  mounted: function() {
    this.va.initEntity()
  },
}

</script>

<style>

.submit-button {
  color: white !important
}

</style>

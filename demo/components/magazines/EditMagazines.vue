<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img src="banner.png" aspect-ratio="4" />
        <v-card-title primary-title>
          <h3 class="headline mb-2">Edit Magazine</h3>
        </v-card-title>
        <div>
          <v-form v-if="entity">
            <v-container>
              <v-layout column>
                <v-flex xs12>
                  <v-text-field
                    :name="names.containerField('name')"
                    @input="storeValue($event, 'name')"
                    v-model="entity.name"
                    label="Name"
                  />
                  <v-text-field
                    :name="names.containerField('issue')"
                    @input="storeValue($event, 'issue')"
                    v-model="entity.issue"
                    label="Issue"
                  />
                  <v-text-field
                    :name="names.containerField('publisher')"
                    @input="storeValue($event, 'publisher')"
                    v-model="entity.publisher"
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
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>

/**
 * This is a custom component for editing magazines using a form, with a name,
 * issue number and a publisher.
 * When passed through the Resource, this custom component is automatically
 * 'injected' with a 'va' prop used to edit magazine entities.
 * This prop contains getter and setter functions that must be used by your UI
 * components, such as buttons, inputs, etc.
 */

// This is only used for e2e demo tests
import UI_NAMES from '@constants/ui.element.names'

export default {
  name: 'EditMagazines',
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
    const view = 'edit'
    const names = {
      containerField: (field) => UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName,
        view,
        field
      }),
      submitButton: UI_NAMES.RESOURCE_VIEW_SUBMIT_BUTTON.with({
        resourceName,
        view
      })
    }
    return { names }
  },
  created() {
    // With fetchEntity you can have your 'resourceName' entity initialised.
    this.va.fetchEntity()
  },
  computed: {
    entity() {
      // getEntity gets initialised data from the store
      return this.va.getEntity()
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
  }
};

</script>

<style>

.submit-button {
  color: white !important
}

</style>

<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="banner.png"
          aspect-ratio="4"
        />
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-2">This is a Custom Show Form</h3>
            <p>
              Although we provide default components for Show views, Vue Admin
              ships with a <i>kind of injected</i> set of functions for those
              components declared in <b>Resource</b> as a view, that can be used
              for updating your resource entity and submitting it to your api.
            </p>
            <p>
              The Vuex store is the middleware where data is saved until a
              submit action is triggered. This seems to be the easiest way to
              save data and call actions from <b>any</b> custom component, such
              as inputs, textfields, buttons, etc...
            </p>
            <p>
              This is one of the two proposals when we thought about user
              customization:
              <ul>
                <li>
                  letting a user build their own components with any UI
                  frameworkand provide a simple API for updating and storing
                </li>
                <li>
                  build our own UI components with a single framework (possibly
                  Vuetify) and expose them to the user in the form of Buttons,
                  Inputs, TextFields, DataTables, ..., as fixed templates.
                </li>
              </ul>
            </p>
          </div>
        </v-card-title>
        <div>
          <v-form v-if="entity">
            <v-container>
              <v-layout column>
                <v-flex xs12>
                  <v-text-field
                    :name="UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
                      resourceName,
                      view,
                      field: 'name'
                    })"
                    v-model="entity.name"
                    disabled
                    label="Name"
                  />
                  <v-text-field
                    :name="UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
                      resourceName,
                      view,
                      field: 'issue'
                    })"
                    v-model="entity.issue"
                    disabled
                    label="Issue"
                  />
                <v-text-field
                  :name="UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
                    resourceName,
                    view,
                    field: 'publisher'
                  })"
                  v-model="entity.publisher"
                  disabled
                  label="Publisher"
                />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </div>
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
  name: 'ShowMagazines',
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
    return {
      resourceName: 'magazines',
      view: 'show',
      UI_NAMES
    }
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
  }
};

</script>

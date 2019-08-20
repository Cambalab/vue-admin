<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="banner.png"
          aspect-ratio="4"
        />
        <v-card-title primary-title>
          <h3 class="headline mb-2">Magazine</h3>
        </v-card-title>
        <div>
          <v-form v-if="entity">
            <v-container>
              <v-layout column>
                <v-flex xs12>
                  <v-text-field
                    :name="names.containerField('name')"
                    v-model="entity.name"
                    disabled
                    label="Name"
                  />
                  <v-text-field
                    :name="names.containerField('issue')"
                    v-model="entity.issue"
                    disabled
                    label="Issue"
                  />
                <v-text-field
                  :name="names.containerField('publisher')"
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
    const resourceName = 'magazines'
    const view = 'show'
    const names = {
      containerField: (field) => UI_NAMES.RESOURCE_VIEW_ELEMENT_FIELD.with({
        resourceName,
        view,
        field
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
  }
};

</script>

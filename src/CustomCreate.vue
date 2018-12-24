<template>
  <SimpleFormWrapper>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          />
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">This is a Custom Create Form</h3>
              <div>We still need to decouple the v-text-field input events and submit button functionality from this file</div>
              <div>The Vuex store is used to persist data, this could be the easiest way to save data and call actions from wrapped components such as input, textfield, button, etc...</div>
            </div>
          </v-card-title>
          <div>
            <v-form>
              <v-container>
                <v-layout column>
                    <v-flex xs12>
                      <TextInputWrapper source="name">
                        <v-text-field
                          name="name"
                          @input="storeValue($event, 'name')"
                          label="Name"
                        ></v-text-field>
                    </TextInputWrapper>
                    <TextInputWrapper source="issue">
                      <v-text-field
                        name="issue"
                        @input="storeValue($event, 'issue')"
                        label="Issue"
                      ></v-text-field>
                  </TextInputWrapper>
                  <TextInputWrapper source="publisher">
                    <v-text-field
                      name="publisher"
                      @input="storeValue($event, 'publisher')"
                      label="Publisher"
                    ></v-text-field>
                </TextInputWrapper>
                    </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </div>

          <v-card-actions>
            <ButtonWrapper>
              <v-btn
                flat
                color="orange"
                @click="submit"
                >
                Create
              </v-btn>
            </ButtonWrapper>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </SimpleFormWrapper>
</template>
<script>

import {
  ButtonWrapper,
  SimpleFormWrapper,
  TextInputWrapper
} from './components/Wrappers'
import Router from './router'

export default {
  name: 'CustomCreate',
  components: {
    ButtonWrapper,
    SimpleFormWrapper,
    TextInputWrapper
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    entity () {
      return this.$store.state.entities.createForm.magazines
    }
  },
  methods: {
    storeValue(value, key) {
      const moduleName = 'entities/updateCreateForm';
      this.$store.commit(moduleName, { value, key, entity: this.name });
    },
    submit() {
      const resourceName = this.name + "/create";
      // TODO: The then, catch could possibly be moved to the store using vuex-crud callbacks. Read #34 for docs - sgobotta
      this.$store.dispatch(resourceName, { data: this.entity })
        .then((res) => {
          const { status } = res
          if ([200, 201].indexOf(status) !== -1) {
            Router.redirect({ router: this.$router, resource: this.name, view: 'list', id: 'id' })
            return res
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
        })
    }
  }
};
</script>

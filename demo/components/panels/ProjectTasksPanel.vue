<template>
  <material-card class="card-tabs" color="green">
    <template v-slot:header>
      <v-tabs
        v-model="tabs"
        background-color="transparent"
        slider-color="white"
      >
        <span
          class="subheading font-weight-light mx-3"
          style="align-self: center"
          >Tasks:</span
        >
        <v-tab class="mr-3">
          <v-icon class="mr-2">
            mdi-bug
          </v-icon>
          Bugs
        </v-tab>
        <v-tab class="mr-3">
          <v-icon class="mr-2">
            mdi-code-tags
          </v-icon>
          Website
        </v-tab>
        <v-tab>
          <v-icon class="mr-2">
            mdi-cloud
          </v-icon>
          Server
        </v-tab>
      </v-tabs>
    </template>

    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="n in 3" :key="n">
        <v-list three-line class="py-0">
          <v-list-item @click="complete(0)">
            <v-list-item-action class="align-self-center">
              <v-checkbox :value="list[0]" color="green" />
            </v-list-item-action>

            <v-list-item-title>
              Sign contract for "What are conference organized afraid of?"
            </v-list-item-title>

            <div class="d-flex">
              <v-tooltip top content-class="top">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="v-btn--simple"
                    color="green"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip top content-class="top">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="v-btn--simple"
                    color="danger"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="error">
                      mdi-close
                    </v-icon>
                  </v-btn>
                </template>
                <span>Close</span>
              </v-tooltip>
            </div>
          </v-list-item>

          <v-divider />

          <v-list-item @click="complete(1)">
            <v-list-item-action class="align-self-center">
              <v-checkbox :value="list[1]" color="green" />
            </v-list-item-action>

            <v-list-item-title>
              Lines From Great Russian Literature? Or E-mails From My Boss?
            </v-list-item-title>

            <div class="d-flex">
              <v-tooltip top content-class="top">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="v-btn--simple"
                    color="green"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip top content-class="top">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="v-btn--simple"
                    color="danger"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="error">
                      mdi-close
                    </v-icon>
                  </v-btn>
                </template>
                <span>Close</span>
              </v-tooltip>
            </div>
          </v-list-item>

          <v-divider />

          <v-list-item @click="complete(2)">
            <v-list-item-action class="align-self-center">
              <v-checkbox :value="list[2]" color="green" />
            </v-list-item-action>

            <v-list-item-title>
              Flooded: One year later, assessing what was lost and what was
              found when a ravaging rain swept through metro Detroit
            </v-list-item-title>

            <div class="d-flex">
              <v-tooltip top content-class="top">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="v-btn--simple"
                    color="green"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip top content-class="top">
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    class="v-btn--simple"
                    color="danger"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="error">
                      mdi-close
                    </v-icon>
                  </v-btn>
                </template>
                <span>Close</span>
              </v-tooltip>
            </div>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </material-card>
</template>

<script>
export default {
  name: 'ProjectTasksPanel',
  data() {
    return {
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false,
      },
    }
  },
}
</script>

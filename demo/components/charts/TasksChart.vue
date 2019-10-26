<template>
  <material-chart-card
    :data="dataCompletedTasksChart.data"
    :options="dataCompletedTasksChart.options"
    color="green"
    type="Line"
  >
    <h3 class="title font-weight-light">
      Completed Tasks
    </h3>
    <p class="category d-inline-flex font-weight-light">
      Last Last Campaign Performance
    </p>

    <template v-slot:actions>
      <v-icon class="mr-2" small>
        mdi-clock-outline
      </v-icon>
      <span class="caption grey--text font-weight-light"
        >campaign sent 26 minutes ago</span
      >
    </template>
  </material-chart-card>
</template>

<script>
export default {
  name: 'TasksChart',
  data() {
    return {
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0.75,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 10,
          },
        },
      },
    }
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index]
    },
  },
}
</script>

<template>
  <material-chart-card
    :data="dailySalesChart.data"
    :options="dailySalesChart.options"
    color="info"
    type="Line"
  >
    <h4 class="title font-weight-light">
      Daily Sales
    </h4>

    <p class="category d-inline-flex font-weight-light">
      <v-icon color="green" small>
        mdi-arrow-up
      </v-icon>
      <span class="green--text">55%</span>&nbsp;increase in today's sales
    </p>

    <template v-slot:actions>
      <v-icon class="mr-2" small>
        mdi-clock-outline
      </v-icon>
      <span class="caption grey--text font-weight-light">
        updated 4 minutes ago
      </span>
    </template>
  </material-chart-card>
</template>

<script>
export default {
  name: 'SalesChart',
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 10,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 20,
          },
        },
      },
    }
  },
}
</script>

<template>
  <material-chart-card
    :data="articlesSubscriptionsChart.data"
    :options="articlesSubscriptionsChart.options"
    :responsive-options="articlesSubscriptionsChart.responsiveOptions"
    color="red"
    type="Bar"
  >
    <h4 class="title font-weight-light">
      Email Subscription
    </h4>
    <p class="category d-inline-flex font-weight-light">
      Last Campaign Performance
    </p>

    <template v-slot:actions>
      <v-icon class="mr-2" small>
        mdi-clock-outline
      </v-icon>
      <span class="caption grey--text font-weight-light"
        >updated 10 minutes ago</span
      >
    </template>
  </material-chart-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SubscriptionsChart',
  data() {
    return {
      subscriptions: [],
      articlesSubscriptionsChart: {
        data: {
          labels: [
            'Ja',
            'Fe',
            'Ma',
            'Ap',
            'Mai',
            'Ju',
            'Jul',
            'Au',
            'Se',
            'Oc',
            'No',
            'De',
          ],
          series: [],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1500,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 10,
          },
        },
        responsiveOptions: [
          [
            'screen and (max-width: 640px)',
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0]
                },
              },
            },
          ],
        ],
      },
    }
  },
  created() {
    this.getSubscriptions()
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index]
    },
    getSubscriptions() {
      axios
        .get('http://localhost:8888/api/subscriptions', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
          },
        })
        .then(res => {
          console.log(res)
          const { data } = res
          this.articlesSubscriptionsChart.data.labels = data.map(
            s => s.shortMonth
          )
          this.articlesSubscriptionsChart.data.series.push(
            data.map(s => s.subscriptions)
          )
        })
        .catch(err => console.log(err))
    },
  },
}
</script>

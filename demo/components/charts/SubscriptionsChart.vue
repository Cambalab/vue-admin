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
      <span class="caption grey--text font-weight-light">
        updated {{ updatedAt }}
      </span>
    </template>
  </material-chart-card>
</template>

<script>
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  name: 'SubscriptionsChart',
  data() {
    return {
      subscriptions: [],
      updatedAt: '',
      articlesSubscriptionsChart: {
        data: {
          labels: [],
          series: [],
        },
        options: {
          axisX: {
            showGrid: true,
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
          // eslint-disable-next-line
          console.log(res)
          const {
            data: { updatedAt, subscriptions },
          } = res
          this.articlesSubscriptionsChart.data.labels = subscriptions.map(
            s => s.shortMonth
          )
          this.articlesSubscriptionsChart.data.series.push(
            subscriptions.map(s => s.subscriptions)
          )
          this.updatedAt = timeAgo.format(new Date(updatedAt))
        })
        // eslint-disable-next-line
        .catch(err => console.log(err))
    },
  },
}
</script>

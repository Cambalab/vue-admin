<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg4>
        <SalesChart />
      </v-flex>
      <v-flex md12 sm12 lg4>
        <SubscriptionsChart />
      </v-flex>
      <v-flex md12 sm12 lg4>
        <TasksChart />
      </v-flex>

      <v-flex md12 sm12 lg3>
        <RevenueStats />
      </v-flex>
      <v-flex md12 sm12 lg3>
        <StorageStats />
      </v-flex>
      <v-flex md12 sm12 lg3>
        <IssuesStats />
      </v-flex>
      <v-flex md12 sm12 lg3>
        <FollowersStats />
      </v-flex>

      <v-flex md12 sm12 lg6>
        <EmployeeSimpleTable />
      </v-flex>

      <v-flex md12 sm12 lg6>
        <ProjectTasksPanel />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SubscriptionsChart from './charts/SubscriptionsChart'
import SalesChart from './charts/SalesChart'
import TasksChart from './charts/TasksChart'

import EmployeeSimpleTable from './tables/EmployeeSimpleTable'

import RevenueStats from './stats/RevenueStats'
import StorageStats from './stats/StorageStats'
import IssuesStats from './stats/IssuesStats'
import FollowersStats from './stats/FollowersStats'

import ProjectTasksPanel from './panels/ProjectTasksPanel'

export default {
  name: 'CustomHomeLayout',
  components: {
    SubscriptionsChart,
    SalesChart,
    TasksChart,
    EmployeeSimpleTable,
    RevenueStats,
    StorageStats,
    ProjectTasksPanel,
    IssuesStats,
    FollowersStats,
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index]
    },
  },
}
</script>

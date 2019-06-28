<template>
  <Sidebar>
    <Heading heading="A Heading" href="/!#/"/>
    <Node title="Entities" icon="keyboard_arrow_up" icon-alt="keyboard_arrow_down">
      <Link title="Articles" path="/articles" icon="list" />
      <Link title="Magazines" path="/magazines" icon="list" />
      <Link title="Authors" path="/authors" icon="list" />
    </Node>
    <Action title="Sign Out" :action="logout" icon="power_settings_new" />
  </Sidebar>
</template>
<script>
import { Sidebar, Node, Link, Action, Heading } from '@components/UiComponents'

export default {
  name: 'CustomSidebar',
  components: {
    Sidebar, Node, Link, Action, Heading
  },
  props: {
    va: {
      type: Object,
      required: true
    }
  },
  methods: {
    logout() {
      return this.va.logout()
    }
  }
}
</script>

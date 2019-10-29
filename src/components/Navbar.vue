<template>
  <nav>

    <v-toolbar flat app>
        <v-icon left @click="drawer = !drawer"  class="grey--text">menu</v-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Simple</span>
        <span>Bonds</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey">
        <span>Log in</span>
        <v-icon right>apps</v-icon>
      </v-btn>
    </v-toolbar>

     <v-navigation-drawer left temporary app dark v-model="drawer" class="black">
        <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
</v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
export default {
  data() {
    return {
    drawer: false,
     links: [
        { icon: 'dashboard', text: 'Bonds', route: '/' },
        { icon: 'person', text: 'Investors', route: '/Investors' },
        { icon: 'money', text: 'Make an investment', route: '/Invest' },
        { icon: 'attach_money', text: 'All investments', route: '/Investments' },
      ]
    }
  }
}
</script>

<style>
</style>
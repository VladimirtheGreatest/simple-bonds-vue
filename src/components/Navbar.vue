<template>
  <nav>

    <v-app-bar dark app>
         <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">Simple</span>
        <span>Bonds</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
          <v-icon left>apps</v-icon>
        <span color="white">Log in</span>
    
      </v-btn>
    </v-app-bar>

     <v-navigation-drawer left app dark v-model="drawer" class="black">
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
        { icon: 'money', text: 'Calculate', route: '/Calculate' },
        { icon: 'person', text: 'Investors', route: '/Investors' },
        { icon: 'attach_money', text: 'All investments', route: '/Investments' },
      ]
    }
  }
}
</script>

<style>
</style>
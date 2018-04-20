<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      right
      app
    >
      <v-list dense>
        <v-list-tile @click="changeComponent(0),drawer = !drawer">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="changeComponent(1),drawer = !drawer">
          <v-list-tile-action>
            <v-icon>business</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Select Data</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark fixed app>
      <v-spacer></v-spacer>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <component v-bind:is="currentComponent"></component>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="cyan" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import SelectData from "./SelectData";
import Dashboard from './Dashboard'
export default {
  name: "layout",
  comments: {
    SelectData,
    Dashboard
  },
  data: () => ({
    drawer: null,
    currentComponent: ""
  }),

  props: {
    source: String
  },
  methods: {
    changeComponent(id) {
      switch (id) {
        case 0:
          this.currentComponent = Dashboard
        case 1:
          this.currentComponent = SelectData;


      }
    }
  }
};
</script>

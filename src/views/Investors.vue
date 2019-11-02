<template>
  <div class="Investors">
      <v-container fluid >
          <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
            <v-row v-else >
              <v-row>
                <v-col >
 <v-parallax src="../images/simple.jpg"></v-parallax>
                </v-col>
              </v-row>
            <v-carousel dark hide-delimiters show-arrows show-arrows-on-hover >
    <v-carousel-item v-for="investor in investors" :key="investor.id">
      <v-sheet height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">
             <v-list shaped class="mx-auto" max-width="600" tile>
        <v-list-item >
          <v-list-item-icon>
               <v-subheader>Investor</v-subheader>
            <v-icon size="40">person</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><h1>{{ investor.first_name }} {{ investor.last_name }}</h1></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-btn :to="investor.route">Portfolio</v-btn>
        </v-list>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
          </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    data() {
    return {
      //I will fetch the information from the api and I will store investors as a state, after that I will render all investors on the website
      investors: [],
      loading : true
    }
  },
 created () {
    this.fetchData()
  },
methods: {
    fetchData() {
    fetch('http://165.227.229.49:8000/investors', {
    method: 'GET',
    "timeout": 0,
    headers: {
        "Accept": "application/json",
        "Authorization": "4ee6VsMCJLVjPwpsRSEy5K3WzQqkO6cL"
    },
  }).then(response => response.json())
    .then(object => {
      //this is the array of investors which we are getting from the object that is returned as a promise, invidividual investor is stored as an object inside of the array
      const investors = object.data;
      investors.forEach(item => {
          const data = {
                      last_name: item.last_name,
                      first_name: item.first_name,
                      id: item.id,
                      route: `/Investor/${ item.id }`  //this is the route we are getting for the individual investor to access his investments, cancel his investments, see portfolio etc.
              }
       this.investors.push(data)
       this.loading = false
      })
    })
    }
  }
}
</script>

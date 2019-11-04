<template>
  <div class="Investors">
    <h1 class="mt-12 pt-10 mb-10"><b class=" display-2 ">Track your <span class="grey--text">investments</span></b> <br> Secure your capital with <b class="grey--text">simplebonds</b></h1>
      <v-container fluid >
          <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
            <v-row v-else class="mt-10" >
                <!--all investors carousel-->
               <v-col sm="12" md="8" xs="12" >
            <v-carousel dark hide-delimiters show-arrows show-arrows-on-hover >
    <v-carousel-item v-for="investor in investors" :key="investor.id">
      <v-sheet height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3">
             <v-list shaped class="mx-auto" max-width="600" tile>
        <v-list-item >
          <v-list-item-icon>
               <v-subheader id="investor">Investor</v-subheader>
            <v-icon size="30">person</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><h1>{{ investor.first_name }} {{ investor.last_name }}</h1></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-btn :to="investor.route">See Portfolio</v-btn>
        </v-list>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
   </v-col>
    <!--all investors carousel end-->
    <!--random images carousel-->
    <v-col sm="12" md="4" xs="12" >
                    <v-carousel cycle interval="4000" hide-delimiters :show-arrows="false">
                  <v-carousel-item  v-for="(item,i) in items" :key="i" :src="item.src">
                  </v-carousel-item>
                   </v-carousel>
                </v-col>
  <!--random images carousel end-->
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
      loading : true,
      //random images
      items: [
          {
            src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          },
        ]
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

<style scoped>
@media (max-width: 480px) {
  h1{
    font-size: 25px;
  }
  #investor{
    display: none;
  }
}
</style>

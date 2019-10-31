<template>
  <div class="Investor pt-10">
    <v-container fluid>
      <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
      <v-row v-else >
              <v-col  v-for="(investment, index) in investor" :key="investment.id"  sm="12" md="4" xs="12">

                 <v-toolbar dark>


      <v-toolbar-title>Investment</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
          <v-list shaped class="mx-auto" max-width="500" tile>
        <v-list-item >

          <v-list-item-content >
            <v-list-item-icon> <!-- this will generate id for each investment, I will then use that in the API request to delete chosen investment-->
                  <div>
                      </div>
            </v-list-item-icon>
                <v-icon>person</v-icon>
                <v-list-item-title class="mb-5">{{ investment.first_name }} {{ investment.last_name }}</v-list-item-title>
                <v-list-item-title class="mb-5 headline"><span class="font-weight-bold">Bond name:</span> {{ investment.bond_name }}</v-list-item-title>
                 <v-icon>attach_money</v-icon>
                <v-list-item-title class="mb-5"><span class="font-weight-bold">Investment Amount:</span> £{{ investment.amount / 100 }}</v-list-item-title>
                   <v-icon>money</v-icon>
                <v-list-item-title class="mb-5"><span class="font-weight-bold">Investment Type:</span> {{ investment.type }}</v-list-item-title>
                   <v-icon>access_time</v-icon>
                <v-list-item-title class="mb-5"><span class="font-weight-bold">Created at:</span> {{ investment.created_at }}</v-list-item-title>
                   <v-icon>timelapse</v-icon>
                <v-list-item-title class="mb-5"><span class="font-weight-bold">Last update:</span> {{ investment.updated_at}}</v-list-item-title>
                <v-list-item-title class="red--text text-uppercase mt-5" v-if="investment.status !== 'pending'">{{ investment.status }}</v-list-item-title>
                <v-btn :id="investment.id" @click="deleteInvestment(investment.id)" class="red mt-5" v-else>
                <v-icon left size="30">cancel_presentation</v-icon>  Cancel Investment
                </v-btn>
          </v-list-item-content>
        </v-list-item>
        </v-list>
            </v-col>

      </v-row>
       <v-btn class="mt-10" x-large rounded dark to="/Investors"><v-icon size="40">arrow_back</v-icon>Back</v-btn>
    </v-container>



  </div>
</template>


<script>
  //Cancel a pending investment (they cannot cancel investments that are committed or already cancelled) alerts, confirm window pop up


import router from '@/router'
export default {
   data() {
    return {
      //I will fetch the information from the api and I will store the investor as a state, after that I will render all of his investments and I will add a method to cancel his investments
      investor: [],
      loading : true
    }
  },
 created () {
    this.fetchData()
  },
methods: {
    fetchData() {
      const routeId = router.currentRoute.params.investor_id  //I will use this id from the route parameter to identify the investor so I can fetch his investments from the API
       console.log(routeId)
    fetch(`http://165.227.229.49:8000/investors/${ routeId }/investments`, {
    method: 'GET',
    "timeout": 0,
    headers: {
        "Accept": "application/json",
        "Authorization": "4ee6VsMCJLVjPwpsRSEy5K3WzQqkO6cL"
    },
  }).then(response => response.json())
    .then(object => {

       const investorsInvestment = object.data;
      console.log(investorsInvestment)
      investorsInvestment.forEach(item => {
          const data = {
                      amount: item.amount,
                      bond_name: item.bond.name,
                      id: item.id,
                      expected_profit : item.expected_profit,
                      created_at : item.created_at,
                      updated_at : item.updated_at,
                      type : item.type,
                      status : item.status,
                      first_name : item.investor.first_name,
                      last_name : item.investor.last_name,
              }
      this.investor.push(data)
       this.loading = false
      })
    })
  },
  deleteInvestment(id) {
    //implement some alert and confirm button, reload the page as well once cancelled
    (async () => {
       const investmentId = await id;
       const routeId = await router.currentRoute.params.investor_id;
   const rawResponse = await fetch(`http://165.227.229.49:8000/investors/${ routeId }/investments/${ investmentId }`, {
   "method": "DELETE",
     headers: {
       'Accept': 'application/json',
       "Authorization": "4ee6VsMCJLVjPwpsRSEy5K3WzQqkO6cL"
     },
   });
   const content = await rawResponse.json();
   console.log(content);
 })();;
  }
  }
}
</script>

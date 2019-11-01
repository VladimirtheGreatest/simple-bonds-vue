<template >
  <div class="Investor pt-10">
    <v-container fluid>
      <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
      <v-row v-else class="pb-10" >
              <v-col  v-for="(investment) in investor" :key="investment.id"  sm="12" md="4" xs="12">

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
               
            <h1 class="subheading grey--text pt-10">Make an investment</h1>


                 <v-container fluid class="my-5">
             <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
        <v-row v-else align="center">

      
      <v-row class="mb-10">
      <v-col cols="12" md="10" sm="12" >
        <v-text-field
          label="How much do you want to invest?"
          value="0.00"
          prefix="£"
          v-model="money"
          clearable
         outlined
         rounded
         solo
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="2" sm="12">
        <v-radio-group v-model="type" row>
      <v-radio label="On maturity" color="red"  id="one" value="maturity"></v-radio>
      <v-radio label="Quarterly" color="red"  id="two" value="quarterly"></v-radio>
           </v-radio-group>
           </v-col>

      <v-col cols="12">
       <h1>Your investment: £{{ money }}</h1>
      </v-col>

      <v-col cols="12">
      <h1>Interest paid on: {{ type }}</h1>
      </v-col>
           </v-row>
    
         <v-row>
        <v-col v-for="(bond) in bonds" :key="bond.id"  sm="12" md="6" xs="12">
        <v-list shaped dark class="mx-auto" max-width="600" tile>
        <v-list-item >
        <v-list-item-icon>
        <v-icon>money</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
        <v-list-item-title>{{ bond.name }} {{ bond.duration_months }}</v-list-item-title>
        <v-btn :id="bond.id" @click="Invest(bond.id)"> Invest</v-btn>
        </v-list-item-content>
        </v-list-item>
        </v-list>
        </v-col>
          </v-row>
       </v-row>

    </v-container>


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
      loading : true,
      bonds : [],
      type : '',
      money : ''
    }
  },
 mounted () {
    this.fetchData()    //investor`s portfolio
    this.fetchData2()  //bonds
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
    fetchData2() {
     fetch('http://165.227.229.49:8000/bonds', {
     method: 'GET',
     "timeout": 0,
     headers: {
         "Accept": "application/json",
         "Authorization": "4ee6VsMCJLVjPwpsRSEy5K3WzQqkO6cL"
     },
   }).then(response => response.json())
     .then(object => {
       //this is the array of bonds which we are getting from the object that is returned as a promise, invidividual bond is stored as an object inside of the array
       const bonds = object.data;
       bonds.forEach(item => {
           const data = {
                       duration_months: item.duration_months,
                       expected_payout: item.expected_payout,
                       id: item.id,
                       invested_amount: item.invested_amount,
                       maturity_interest: item.maturity_interest,
                       name: item.name,
                       quarterly_interest: item.quarterly_interest
               }
        this.bonds.push(data)
        this.loading = false
       })
     })
   },
   Invest(id) {
     (async () => {
       const money = await this.money * 100;   //how much money do you want to invest
      const bondId = await id;          //unique investment id (chosen by the investor)
       const routeId = await router.currentRoute.params.investor_id;  //I will use this id from the route parameter to identify the investor so I can send his investments to the API
       const type = await this.type;
       console.log(routeId)
   const rawResponse = await fetch(`http://165.227.229.49:8000/investors/${routeId}/investments`, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       "Authorization": "4ee6VsMCJLVjPwpsRSEy5K3WzQqkO6cL"
     },
     body: JSON.stringify({'bond_id': `${bondId}`, 'type': `${type}`, 'amount' : `${money}`}), 
   });
   const content = await rawResponse.json();
   console.log(content);
 })();

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




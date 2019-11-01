<template>
  <div class="Invest pt-10">
    <h1 class="subheading grey--text">Make an investment</h1>

      <v-container fluid class="my-5">
             <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
        <v-row v-else align="center">
          <v-col class="d-flex" cols="12" sm="12">

        <v-select chips  v-model="selectedid" :items="investors"
        label="What is your investor`s unique ID?"
          name="investor"
          item-text="id"
         >
       </v-select>
      </v-col>

      <v-col  v-for="(bond, index) in bonds" :key="bond.id"  sm="12" md="6" xs="12">
<v-list shaped dark class="mx-auto" max-width="600" tile>
<v-list-item >
<v-list-item-icon>
 <v-icon>money</v-icon>
</v-list-item-icon>
<v-list-item-content>
 <v-list-item-title>{{ bond.name }} {{ bond.duration_months }}</v-list-item-title>
   <v-btn :id="bond.id" @click="Invest(bond.id)"> Invest</v-btn> <!-- 2 methods quarterly, maturity, form instead of drop down-->
</v-list-item-content>
</v-list-item>
</v-list>
 </v-col>

       </v-row>


            <span id="identifier">{{selectedid}} </span>
    </v-container>

  </div>
</template>

<script>
export default {
  data () {
    return {
    investors: [],
    bonds : [],
    selectedid : '',
    loading : true
  }
},
  created () {
    this.fetchData()  //investors
    this.fetchData2()  //bonds
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
      const bondId = await id;
       const investor_Id = await  document.getElementById('identifier').textContent;
       console.log(investor_Id)
   const rawResponse = await fetch(`http://165.227.229.49:8000/investors/${investor_Id}/investments`, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       "Authorization": "4ee6VsMCJLVjPwpsRSEy5K3WzQqkO6cL"
     },
     body: JSON.stringify({'bond_id': `${bondId}`, 'type': 'maturity', 'amount' : 150000}),
   });
   const content = await rawResponse.json();
   console.log(content);
 })();

   }
     }
}
</script>


<style scoped>
#identifier{

}
</style>

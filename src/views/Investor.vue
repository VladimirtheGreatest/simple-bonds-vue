<template >
  <div class="Investor pt-10">
    <h1 class="mt-12 pt-10 mb-10"><b class=" display-2 ">Know what you own,<span class="grey--text">and know why you own it.</span></b> <br><b class="grey--text">Do your homework before making a decision.</b></h1>
    <v-container fluid>
      <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
       <!--investors investment start-->
      <v-row v-else class="pb-10" >
              <v-col v-for="(investment, i) in investor"  :key="`A-${i}`"  sm="12" md="4" xs="12">

                 <v-toolbar dark >
                   <v-toolbar-title>Investment</v-toolbar-title>
                    <v-spacer></v-spacer>
                 </v-toolbar>
                <v-list shaped class="mx-auto" max-width="500" tile outlined elevation="12">
             <v-list-item >

          <v-list-item-content >
            <v-list-item-icon> 
                  <div>
                    <v-list-item-title class="mb-5"><v-icon>person</v-icon><span class="font-weight-light">{{ investment.first_name }} {{ investment.last_name }}</span></v-list-item-title>
                      </div>
            </v-list-item-icon>
                <v-list-item-title class="mb-5 headline"><span class="font-weight-bold">Bond name:</span> {{ investment.bond_name }}</v-list-item-title>
                <v-list-item-title class="mb-5"><v-icon>attach_money</v-icon><span class="font-weight-bold">Investment Amount:</span> £{{ investment.amount / 100 }}</v-list-item-title>
                <v-list-item-title class="mb-5"> <v-icon left>money</v-icon><span class="font-weight-bold">Investment Type:</span> {{ investment.type }}</v-list-item-title>
                <v-list-item-title class="mb-5"><v-icon left>access_time</v-icon><span class="font-weight-bold">Created at:</span> {{ investment.created_at }}</v-list-item-title>           
                <v-list-item-title v-if="investment.status !== 'pending'" class="mb-5"><v-icon left>timelapse</v-icon><span class="font-weight-bold">Last update:</span> {{ investment.updated_at}}</v-list-item-title>
                  <v-list-item-title class="green--text text-uppercase mt-3" v-else>{{ investment.status }}</v-list-item-title>
                <v-list-item-title class="red--text text-uppercase mt-5" v-if="investment.status !== 'pending'">{{ investment.status }}</v-list-item-title>
                <v-btn :id="investment.id" @click="deleteInvestment(investment.id)" class="red mt-5" v-else> <!-- this will generate id for each investment, I will then use that in the API request to delete chosen investment-->
                <v-icon left size="30">cancel_presentation</v-icon>  Cancel Investment
                </v-btn>
          </v-list-item-content>
        </v-list-item>
        </v-list>
            </v-col>
      </v-row>
          <!--investors investment end-->  
            <!--Make an investment section start-->     
            <h1 class="subheading black--text pt-10"><v-icon size="30" left>monetization_on</v-icon>Make your <b class="grey--text">money</b> grow</h1>


                 <v-container fluid class="my-5">
             <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
        <v-row v-else align="center">

      <!--make a separate component for this-->
      <v-row class="mb-10">
        <v-col cols="12">
            <div class="flex-center">
             <v-layout>
            <v-flex>
          <v-text-field
          label="How much do you want to invest?"
          value="0.00"
          prefix="£"
          v-model="money"
          clearable
          outlined
          size="100"
        
        ></v-text-field>
            </v-flex>
          </v-layout>
            </div>
             </v-col>

      <v-col cols="12">
       <h1><v-icon size="30">attach_money</v-icon>Your investment: £{{ money }}</h1>
      </v-col>

      <v-col cols="12">
      <h1><v-icon size="30" left>access_time</v-icon>Interest paid on: {{ type }}</h1>
      </v-col>
           </v-row>
            <!--Make an investment section end-->   

        <!--Bonds section-->
         <v-row>
        <v-col v-for="(bond) in bonds" :key="bond.id"  sm="12" md="6" xs="12">
        <v-list outlined elevation="24" rounded class="mx-auto" max-width="600">
        <v-list-item >
        <v-list-item-content>
            <v-list-item-title class="mb-4 mt-4"><h3><v-icon>schedule</v-icon><b><span class="grey--text"> Duration :</span> {{bond.duration_months}} months</b></h3></v-list-item-title>
        <v-list-item-title class="headline mb-1"><h3>{{bond.name}}</h3></v-list-item-title>
             <div class="flex-center">
          <v-radio-group v-model="type" column>
             <v-layout>

            <v-flex class="mr-5">
                <v-list-item-title class=" title font-weight-bold black--text">{{Math.round(bond.maturity_interest*100*100)/100}} %  </v-list-item-title>
                <v-radio label="On maturity" color="black" value="maturity"></v-radio>
            </v-flex>

            <v-flex>
               <v-list-item-title class=" title font-weight-bold black--text ">{{Math.round(bond.quarterly_interest*100*100)/100}} %  </v-list-item-title>
                <v-radio label="Quarterly" color="black" value="quarterly"></v-radio>
            </v-flex>

  

          </v-layout>
           </v-radio-group>
    </div>
     <v-list-item-title class="mb-1">
        <v-btn v-if="money > 0" dark :id="bond.id" @click="Invest(bond.id)"> Invest</v-btn> <!-- this will generate id for each bond, I will then use that in the API request to invest in specific bond-->
          </v-list-item-title>
        </v-list-item-content>
        </v-list-item>
        </v-list>
        </v-col>
          </v-row>
          <!--Bonds section end-->
       </v-row>

    </v-container>
       <v-btn class="mt-10" x-large rounded dark to="/Investors"><v-icon size="40">arrow_back</v-icon>Back</v-btn>
    </v-container>
  </div>
</template>


<script>
import router from '@/router'
import Swal from 'sweetalert2'
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
  //API request fetching all investor`s investments
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
          //API request fetching all bonds
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
      //confirmation for the user

      Swal.fire({
  title: 'Are you sure?',
  text: "Once an investment is made, you will have up to 14 days (a 'cooling-off' period) to cancel your investment, after which time the investment is committed",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#000000',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, I want to invest!'
  }).then((result) => {
  if (result.value) {
    investMe() 
    this.$router.go()
    Swal.fire({
      position: 'center',
      type : 'success',
      title : 'Investment successfull!',
      showConfirmButton: false,
      timer: 1500
    }
    )
    
  }
})
      //API request for making new investment
     const investMe = async () => {
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
 };

  const reload = () => {
      this.investor = []
      this.fetchData()
 };
   },
  deleteInvestment(id) {
    //confirm + alert window
      Swal.fire({
  title: 'Do you want to really cancel this investment?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#000000',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, cancel it!'
}).then((result) => {
  if (result.value) {
    deleteMe() 
    this.$router.go()
      Swal.fire({
      position: 'center',
      type : 'success',
      title : 'Investment has been cancelled!',
      showConfirmButton: false,
      timer: 1500
      })
  }
})

       //API request for cancelling investments
  const deleteMe = async () => {
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
 };
  }
  }
}
</script>

<style  scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>


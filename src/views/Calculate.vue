<template>
  <div class="Calculate">
      <v-container fluid>
           <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
        <!--calculate return start-->
         <v-row v-else >
        <v-col cols="12" md="12" sm="12" >
        <h1 v-if="money > 0" class="mb-10 mt-7">Choose your <b class="grey--text">bond</b> and your <b class="grey--text">interest</b></h1>
        <h1 v-else class="mb-10 mt-7">Calculate the<b class="grey--text"> expected return</b> on a bond when investing a specified amount</h1>
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

         <v-col v-if="money > 0" cols="12" md="6" sm="12" >
      <h1><v-icon size="30">attach_money</v-icon>Your expected return is: {{ ReturnOfInvestment }}</h1>
       <h2><v-icon size="30" left>access_time</v-icon>Duration: {{ duration }} months</h2>
        <h2><v-icon size="30" left>monetization_on</v-icon>Interest paid: {{ Math.round(interest*100*100)/100}} %</h2>
          <h2><v-icon size="30" left>dashboard</v-icon>Your chosen bond: {{ name }}</h2>
      </v-col>

      <v-col v-if="money > 0" cols="12" md="6" sm="12" >
       <h1><v-icon size="30">attach_money</v-icon>Your investment: £{{ money }}</h1>
      </v-col>


              <v-carousel  show-arrows show-arrows-on-hover >
    <v-carousel-item v-for="bond in bonds" :key="bond.id">
      <v-sheet height="100%">
        <v-row class="fill-height" align="center" justify="center">
             <v-card class="mx-auto px-5 mb-5" max-width="600" height="200" outlined elevation="24">
    <v-list-item three-line>
      <v-list-item-content >
         <v-list-item-title class="mb-4 mt-4"><h3><v-icon>schedule</v-icon><b><span> Duration :</span> {{bond.duration_months}} months</b></h3></v-list-item-title>
        <v-list-item-title class="headline mb-4 mt-4"><h3>{{bond.name}}</h3></v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar
        size="50"
         color="black"
      > <v-icon color="white" size="30">attach_money</v-icon></v-list-item-avatar>
    </v-list-item>
          <div v-if="money > 0" class="flex-center">
             <v-layout>
            <v-flex class="mr-10">
                <v-btn @click="Calculate(bond.quarterly_interest, bond.duration_months, bond.name)" class="pr-5"><span class="font-weight-light pr-3">quarterly</span>{{Math.round(bond.quarterly_interest*100*100)/100}}% <span class="font-weight-light text-lowercase">p.a</span></v-btn>
            </v-flex>
            <v-flex>
               <v-btn @click="Calculate(bond.maturity_interest, bond.duration_months, bond.name)"><span class="font-weight-light pr-3">on maturity</span>{{Math.round(bond.maturity_interest*100*100)/100}}% <span class="font-weight-light text-lowercase">p.a</span></v-btn>
            </v-flex>
          </v-layout>
            </div>
  </v-card>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
       </v-row>
         <!--calculate return end-->
   
    </v-container>
    
  </div>
</template>



<script>
import Swal from 'sweetalert2'
export default {
    data() {
    return {
      //I will fetch the information from the api and I will store bonds as a state, after that I will render the content
      bonds: [],
      loading : true,
      ReturnOfInvestment : '',
      money : '',
      duration : '',
      interest : '',
      name : ''
    }
  },
 created () {
    this.fetchData()
  },
methods: {
    fetchData() {
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
    Calculate(interest, duration, name) {
          (async () => {
              await Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Calculating...',
      showConfirmButton: false,
      timer: 1500,
        })
      const investmentInPence = await  this.money * 100;
      const annualInterest = await  interest;
      const bondDuration = await  duration;
      //      E=P+(P∗A/12)∗ D this is the return formula
      const total = await (investmentInPence) + (investmentInPence * annualInterest/12) * bondDuration;
      const poundTotal = await `£${total/100}`
      this.ReturnOfInvestment = await  poundTotal;
       this.duration = await bondDuration;
        this.interest = await annualInterest;
          this.name = await name;
          })();;
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

<template>
<div class="Bonds">
  <h1 class="mt-12 mb-10"><b id="heading" class="grey--text">SIMPLEBONDS</b> <br> The smart way to make your <b class="grey--text">money</b> grow</h1>
  <v-container fluid>
    <v-progress-circular v-if="loading" :size="100" indeterminate color="black"></v-progress-circular>
    <!--all bonds-->
    <v-row v-else>
      <v-col class="mb-5" sm="12" md="12" xs="12">
        <v-btn id="buttonSort" class="black white--text mr-2" @click="Sort()">Sort by highest interest</v-btn>
        <v-btn class="black white--text mr-2" @click="SortDuration()">Sort by duration</v-btn>
        <v-col class="mb-5" sm="12" md="12" xs="12">
          <v-btn class="red" @click="SortHot()">
            <v-icon left>whatshot</v-icon>Hot bonds!
          </v-btn>
        </v-col>
      </v-col>
      <v-col v-for="bond in bonds" :key="bond.id" sm="12" md="6" xs="12">
        <v-card class="mx-auto px-5 mb-5" max-width="600" height="200" outlined elevation="24" rounded>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="mb-4 mt-4">
                <h3>
                  <v-icon>schedule</v-icon><b><span class="grey--text"> Duration :</span> {{bond.duration_months}} months</b>
                </h3>
              </v-list-item-title>
              <v-list-item-title class="mb-2">
                <h2>{{bond.name}}</h2>
              </v-list-item-title>
              <v-list-item-subtitle class="mb-2">
                <v-icon v-if="bond.invested_amount > 5000000" left>trending_up</v-icon>
                <v-icon v-else="" left>trending_flat</v-icon>
                All investments £{{bond.invested_amount / 100}}
              </v-list-item-subtitle>
              <div class="flex-center">
                <v-layout id="interest">
                  <v-flex id="marginzero">
                    <h3><span class="pr-2 grey--text"><b>On maturity</b></span>{{Math.round(bond.maturity_interest*100*100)/100}}% <span class="pa font-weight-bold overline text-lowercase">p.a</span></h3>
                  </v-flex>
                  <v-flex>
                    <h3><span class="pr-2 grey--text"><b>Quarterly</b></span>{{Math.round(bond.quarterly_interest*100*100)/100}}% <span class="pa font-weight-bold overline text-lowercase">p.a</span></h3>
                  </v-flex>
                </v-layout>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <!--all bonds end-->
  </v-container>

</div>
</template>


<script>
import Swal from 'sweetalert2'
import {
  log
} from 'util';
export default {
  data() {
    return {
      //I will fetch the information from the api and I will store them as a state, after that I will render the content
      bonds: [],
      loading: true
    }
  },
  created() {
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
          console.log(bonds)
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
    Sort() {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Sorted by interest',
        showConfirmButton: false,
        timer: 1500,
      })
      return this.bonds.sort((a, b) => b.maturity_interest - a.maturity_interest);
    },
    SortDuration() {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Sorted by duration',
        showConfirmButton: false,
        timer: 1500,
      })
      return this.bonds.sort((a, b) => b.duration_months - a.duration_months);
    },
    SortHot() {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'The best performing bonds',
        showConfirmButton: false,
        timer: 1500,
      })
      return this.bonds.sort((a, b) => b.invested_amount - a.invested_amount);
    },


  }
}
</script>


<style  scoped>
#marginzero {
  margin-right: 20px;
}

@media (min-width: 480px) and (max-width: 1080px) {
  #marginzero {
    margin-right: 10px;
  }
}

@media (max-width: 480px) {
  #buttonSort {
    margin-bottom: 10px;
  }

  #heading {
    font-size: 35px;
  }

  #interest {
    font-size: 10px;
  }

  .pa {
    display: none;
  }

  h1 {
    font-size: 25px;
  }

  #marginzero {
    margin-right: 10px;
  }
}
</style>

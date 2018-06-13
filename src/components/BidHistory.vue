<template>
  <div class="accordion" style="margin-top: 15px;">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
          <button class="btn btn-link" type="button" id="test" data-toggle="collapse" @click="collapsed=!collapsed"
                  data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Bid History</button>
        </h5>
      </div>
      <!-- Bids Table -->
      <div class="collapse show" id="collapseOne" style="max-height: 225px">
        <div class="card-body pre-scrollable"style="max-height: 225px; padding-top: 0px">
          <table class="table"style="max-height: 225px">
            <thead>
            <tr class="content-table">
              <th scope="col">User</th>
              <th scope="col">Amount</th>
              <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="bid in bidHistory">
              <td style="padding: 0 0 0 0;"><small>{{bid.buyerUsername}}</small></td>
              <td style="padding: 0 0 0 0;"><small>${{bid.amount}}</small></td>
              <td style="padding: 0 0 0 0;"><small>{{convertToFormattedTime(bid.datetime)}}</small></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    let moment = require('moment');
    export default {
        name: "BidHistory",
        props: {
          bidHistory: Array
        },
        data() {
            return {
                collapsed: false
            }
        },
        mounted() {
          this.$root.$on('collapsed', data => {
            if (data === false && this.collapsed === false){
              $('#test').click();
            }
          });
        },
        methods: {
          convertToFormattedTime: function (time) {
            return  moment(time).format("h:mm:ss a") + " " + moment(time).format("MMMM Do");
          }
      }
    }
</script>

<style>

</style>

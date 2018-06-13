<template>
  <div>
    <navbar></navbar>
    <div class="container"  style="margin-top: 5%">
      <h1>Won Auctions</h1>
      <auctions-list :auction="auctions" style="margin-top: 5%"></auctions-list>
    </div>
  </div>
</template>

<script>
  import Navbar from "../Navbar";
  import SellerAuctionFilter from "../SellerAuctionFilter";
  import AuctionsList from "../AuctionsList";
  export default {
    name: "WonAuctions",
    components: {Navbar, SellerAuctionFilter, AuctionsList},
    data(){
      return {
        auctions:null
      }
    },
    mounted(){
      this.getCreatedAuctions();
    },
    methods: {
      getCreatedAuctions: function () {
        this.$http.get('http://localhost:4941/api/v1/my_won_auctions')
          .then((response) => {
            console.log(response.data);
            this.auctions = response.data;
          }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>

</style>

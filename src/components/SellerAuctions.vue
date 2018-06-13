<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <h1 v-show="$route.name==='CreatedAuctions'">Created Auctions</h1>
      <h1 v-show="$route.name==='CurrentAuctions'">In-progress Auctions</h1>
      <!--<h1 v-show="$route.name==='CreatedAuctions'">Created Auctions</h1>-->
      <auctions-list :auction="auctions" style="margin-top: 5%"></auctions-list>
    </div>
  </div>
</template>

<script>
    import Navbar from "./Navbar";
    import SellerAuctionFilter from "./SellerAuctionFilter";
    import AuctionsList from "./AuctionsList";
    export default {
        name: "SellerAuctions",
      data() {
          return{
            auctions:[]
          }
      },
      mounted (){
        this.getAuctions();
      },
      methods: {
          getAuctions: function(){
            if (this.$route.path.endsWith("lost")){
              this.$http.get('http://localhost:4941/api/v1/auctions?status=expired&bidder='+window.sessionStorage.getItem("userId"))
                .then((response) => {
                  this.auctions = response.data;
                }).catch((error) => {
                console.log(error);
              });
            }

            if (this.$route.path.endsWith("current")){
              this.$http.get('http://localhost:4941/api/v1/auctions?bidder=' + window.sessionStorage.getItem("userId"))
                .then((response) => {
                  this.auctions = response.data;
                }).catch((error) => {
                  console.log(error);
              });
            }
          }
      },
      components: {AuctionsList, SellerAuctionFilter, Navbar}
    }
</script>

<style scoped>
  .container{
    margin-top: 5%;
  }
</style>

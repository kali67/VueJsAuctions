<template>
  <div>
    <navbar></navbar>
    <div class="container"  style="margin-top: 5%">
      <h1>In-progress Auctions</h1>
      <auctions-list :auction="auctions" style="margin-top: 5%"></auctions-list>
      <nav v-show="auctions.length !== 0" aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li class="page-item" v-bind:class="{disabled:isFirstPage()}">
            <a class="page-link" @click="previousPage">Previous</a>
          </li>
          <li class="page-item" v-bind:class="{disabled:isLast}">
            <a class="page-link" @click="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import Navbar from "../Navbar";
  import SellerAuctionFilter from "../SellerAuctionFilter";
  import AuctionsList from "../AuctionsList";
  export default {
    name: "CurrentBidAuctions",
    components: {Navbar, SellerAuctionFilter, AuctionsList},
    data(){
      return {
        auctions:[],
        startIndex: 0,
        size: 9,
        isLast: false
      }
    },
    mounted(){
      this.getCreatedAuctions();
    },
    methods: {
      getCreatedAuctions: function () {
        this.$http.get('http://localhost:4941/api/v1/auctions?bidder=' + window.sessionStorage.getItem("userId")
          + '&status=active&startIndex=' + this.startIndex + '&count='+this.size)
          .then((response) => {
            this.auctions = response.data;
            this.isLastPage();
          }).catch((error) => {
          console.log(error);
        });
      },
      previousPage: function(){
        this.startIndex -= this.size;
        this.getCreatedAuctions();
      },
      nextPage: function(){
        this.startIndex += this.size;
        this.getCreatedAuctions();
      },
      isLastPage: function() {
        let index = this.startIndex + this.size;
        this.$http.get('http://localhost:4941/api/v1/auctions?bidder=' + window.sessionStorage.getItem("userId")
          +'&status=active&startIndex=' + index + '&count='+this.size)
          .then((response) => {
            this.isLast = response.data.length === 0;
          }).catch((error) =>{
          console.log(error);
        });
      },
      isFirstPage: function(){
        return this.startIndex === 0;
      },
    }
  }
</script>

<style scoped>

</style>

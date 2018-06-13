<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <AuctionFilter v-on:filter="filterAuctions"></AuctionFilter>
      <AuctionsList :auction="auctions"></AuctionsList>
      <nav aria-label="Page navigation example">
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
  import Navbar from "./Navbar";
  import AuctionFilter from "./BuyerAuctionFilter";
  import AuctionsList from "./AuctionsList";
  export default {
    data () {
      return{
        auctions: null,
        startIndex: 0,
        size: 6,
        isLast: false,
        query:""
      }
    },
    components: {AuctionsList, AuctionFilter, Navbar},
    mounted() {
      this.paginatedData();
    },
    methods: {
      paginatedData: function(){
        this.$http.get('http://localhost:4941/api/v1/auctions?' + this.query + '&startIndex=' + this.startIndex + '&count='+this.size)
          .then((response) => {
            this.auctions= response.data;
            this.isLastPage();
          }).catch((error) =>{
          console.log(error);
        });
      },
      previousPage: function(){
        window.scrollTo(0,0);
        this.startIndex -= this.size;
        this.paginatedData();
      },
      nextPage: function(){
        window.scrollTo(0,0);
        this.startIndex += this.size;
        this.paginatedData();
      },
      isLastPage: function() {
        let index = this.startIndex + this.size;
        this.$http.get('http://localhost:4941/api/v1/auctions?' + this.query + '&startIndex=' + index + '&count='+this.size)
          .then((response) => {
            this.isLast = response.data.length === 0;
          }).catch((error) =>{
          console.log(error);
        });
      },
      isFirstPage: function(){
        return this.startIndex === 0;
      },
      filterAuctions: function(query) {
        this.startIndex = 0; //reset
        this.query = query.replace("?","");
        this.paginatedData();
      }
    }
  }
</script>

<style scoped>

  .container{
    margin-top: 5%;
  }

</style>

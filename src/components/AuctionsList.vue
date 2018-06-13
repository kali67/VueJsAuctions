<template>
  <div>
    <div class="container-fluid content-row">
      <div class="row">
        <div v-if="auction === null || auction.length === 0" class="col-md-12 text-center">
         <label>Nothing to display</label>
        </div>
        <div v-else v-for="a in auction" class="card col-sm-12 col-lg-4 col-md-6"
             style="width: 15rem; padding-left: 20px;padding-right: 20px; padding-bottom:20px">
          <img class="card-img-top" :src="getAuctionPhotoPath(a.id)" alt="Card image cap">
          <div class="card-body border">
            <h5 class="card-title">{{a.title}}</h5>
            <div class="row">
              <p class="card-text col-md-12">Reserve: ${{a.reservePrice}}</p>
            </div>
            <div class="row">
              <p class="card-text col-md-12">Current Bid: ${{a.currentBid}}</p>
            </div>
            <hr class="my-4">
            <p class="card-text col-md-12">Ends: {{convertDateUTC(a.endDateTime)}}</p>
          </div>
          <router-link href="#" class="btn btn-primary" :to="{name:'ViewAuction', params:{id:a.id}}">View</router-link>
          <!--<router-link v-show="isOwner()" class="btn btn-primary" :to="{name:'EditAuction', params:{id:a.id}}">Edit</router-link>-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name: "AuctionsList",
      props: {
          auction : Array
      },
      data(){
          return {
            auctions: {},
            startIndex: 0,
            numberAuctions: 0
          }
      },
      methods: {
        getAuctionPhotoPath: function(auctionId) {
          return 'http://localhost:4941/api/v1/auctions/' + auctionId + "/photos";
        },
        convertDateUTC: function(seconds) {
          return new Date(parseInt(seconds)).toUTCString();
        }
      }
    }
</script>

<style scoped>
  .card {
    border: none;
  }
  .border {
    border-width: 2px;
    border-color: black;
  }

  .border:hover {
    border-color: green;
  }

  .card-img-top{
    height: 45%;
  }
</style>

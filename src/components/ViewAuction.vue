<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <div class="row">
      <div id="carouselExampleIndicators" class="carousel slide col-md-8" data-ride="carousel">
        <h3 class="text-left">{{auction.title}}</h3>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" :src="getPhoto($route.params.id)"  style="max-height: 500px; min-height: 450px">
          </div>
        </div>
        <div>
          <br/>
          <p style="font-style: italic">Auction started on {{new Date(parseInt(auction.startDateTime)).toUTCString()}}</p>
          <router-link v-if="isOwner()" class="btn btn-primary" style="width: 100%;" :to="{name:'EditAuction', params:{id:$route.params.id}}">Edit</router-link>
        </div>
        <div class="jumbotron" style="margin-top: 4%;">
          <h1 class="display-4">Description</h1>
          <hr class="my-4">
          <p>{{auction.description}}</p>
        </div>
      </div>
      <div class="col-lg-4 prices" style="padding-left: 0">
        <div class="jumbotron" style="height: 97%;">
          <p class="text-center col-md-12">Closes: {{new Date(parseInt(auction.endDateTime)).toUTCString()}}</p>
          <div class="row custom-row">
            <h6 class="text-left col-md-6 reserve">Current Bid</h6>
            <h4 class="text-right col-md-6">${{currentPrice}}.00</h4>
            <h6 class="text-left col-md-6 reserve">Starting Price</h6>
            <h4 class="text-right col-md-6">${{startingPrice}}.00</h4>
          </div>
          <hr class="my-4">
          <div class="row">
            <small class="text-left col-md-4">Total bids: {{bids.length}}</small>
            <small class="text-center col-md-8">Minimum next bid: ${{getAuctionPrice(auction) + 1}}</small>
          </div>
          <bid-history :bidHistory="bids"></bid-history>
          <div class="row" style="padding-top: 5%;">
            <label class="col-md-4 reserve text-left">Your Bid</label>
            <div class="input-group col-md-8">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">$</span>
              </div>
              <input type="text" class="form-control text-right" v-bind:placeholder=" userBid + getAuctionPrice(auction)" v-model="userBid" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="accordion">
            <button class="btn btn-primary" v-on:click="placeBid()" style="width: 100%; margin-top: 2.5%" >Place bid</button>
          </div>
          <!-- seller -->
          <div class="accordion" style="margin-top: 15px;">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwo" @click="hideCollapse">Seller</button>
                </h5>
              </div>
              <div class="collapse" id="collapseTwo" >
                {{seller}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
    import Navbar from "./Navbar";
    import BidHistory from "./BidHistory";
    export default {
      data() {
        return {
          auction: {},
          userBid: 0,
          bids: [],
          seller: {},
          currentPrice: 0,
          startingPrice: 0
        }
      },
      name: "ViewAuction",
      components: {BidHistory, Navbar},
      mounted() {
          window.scrollTo(0,0);
          this.loadAuction();
          this.getBids();
      },
      methods: {
          loadAuction: function(){
            this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.id)
              .then((response) => {
                this.auction = response.data;
                this.seller = response.data.seller;
                this.currentPrice = response.data.currentBid;
                this.startingPrice = response.data.startingBid;
                this.getSellerInfo();
              }).catch((error) => {
                console.log(error);
              });
          },
        getBids: function() {
            this.$http.get('http://localhost:4941/api/v1/auctions/' + this.$route.params.id + '/bids') //TODO: in auction body
              .then((response) => {
                this.bids = response.data.sort((a, b)=> {
                  return new Date(b.datetime) - new Date(a.datetime);
                });
              })
              .catch((error) => {
                console.log(error);
              })
        },

        getPhoto: function(auctionId){
            return 'http://localhost:4941/api/v1/auctions/' + auctionId + "/photos";
        },
        placeBid: function () {
          this.$http.post('http://localhost:4941/api/v1/auctions/'+
            Number.parseInt(this.$route.params.id) + '/bids?amount=' + Number.parseInt(this.userBid))
            .then(() => {
              this.loadAuction();
              this.getBids(); ///get bids again
              this.$toastr('success', 'Bid placed, you lead.');
            }).catch((error) => {
              if (this.auction.endDateTime < Date.now()){{
                this.$toastr('error', 'Cannot place bid, auction has expired.');
              }} else if (error.status === 401) {
                this.$toastr('error', 'Cannot place bid, unauthorized. Please log in.');
              } else if (this.auction.startDateTime > Date.now()){
                this.$toastr('error', 'Cannot place bid, auction has not started yet.');
              }else {
                this.$toastr('error', 'Cannot place bid, bid amount is less than the current price.');
              }
          });
        },
        getAuctionPrice: function(auction) {
          if (auction.currentBid === 0){
            return auction.startingBid;
          }
          return auction.currentBid;
        },

        hideCollapse: function(){
          $('.collapse').collapse('hide');
        },
        getSellerInfo: function () {
          this.$http.get('http://localhost:4941/api/v1/users/' + this.seller.id)
            .then((response) => {
              this.seller = response.data;
            }).catch((error) => {
            console.log(error);
          })
        },
        isOwner: function(){
          return window.sessionStorage.getItem("userId") === this.auction.seller.id.toString()
        }
      }
    }
</script>

<style scoped>

  .prices{
    margin-top: 3.2%;
  }
  .reserve{
    padding-top: 2%;
  }

  .custom-row{
    margin-top: 20%;
  }
.container{
  margin-top: 5%;
}

</style>

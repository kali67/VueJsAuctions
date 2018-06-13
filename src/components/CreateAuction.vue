<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <form>
        <div class="form-group row">
          <label for="inputTitle" class="col-sm-2 col-form-label text-left">Title</label>
          <div class="col-sm-10">
            <input type="text" v-model="userTitle.value" class="form-control" id="inputTitle" placeholder="Title">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputDescription" class="col-sm-2 col-form-label text-left">Description</label>
          <div class="col-sm-10">
            <textarea class="form-control" v-model="userDescription.value" rows="5" id="inputDescription"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="categories" class="col-md-2 col-form-label text-left">Category</label>
          <div class="col-md-10">
            <select id="categories" class="form-control">
              <option selected>{{userCategory.value}}</option>
              <option v-for="category in categories">{{category.categoryTitle}}</option>
            </select>
          </div>
        </div>
        <hr class="my-5">
        <h4 class="text-left">Photos</h4>
        <img class="card-img-top" :src="getAuctionPhotoPath()" alt="No photo selected" style="width:20%;padding-bottom: 2%">
        <div class="form-group row">
          <div class="col-md-10">
            <label class="float-left">Add/Update Photo</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChanged">
          </div>
        </div>
        <button type="button" v-show="$route.path.endsWith('edit')" class="btn btn-danger" @click="deletePhoto()">Delete</button>
        <hr class="my-5">
        <div class="form-group row">
          <div class="col-md-4">
            <label class="float-left">Starting Price</label>
            <input type="text" class="form-control text-right" v-model="userStart.value" placeholder="0.00" aria-describedby="basic-addon2">
          </div>
          <div class="col-sm-4">
            <label for="inputEndDate" class="float-left">Start Date</label>
            <input type="date" v-model="userStartDate.value" class="form-control" id="inputStartDate" placeholder="">
          </div>
          <div class="col-md-4">
            <label for="inputEndTime" class="float-left">Start Time</label>
            <input type="time" v-model="userStartTime.value" class="form-control" id="inputStartTime" placeholder="">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-4">
            <label class="float-left">Reserve Price</label>
            <input type="text" class="form-control text-right" v-model="userReserve.value" placeholder="0.00" aria-describedby="basic-addon2">
          </div>
          <div class="col-sm-4">
            <label for="inputEndDate" class="float-left">End Date</label>
            <input type="date" v-model="userEndDate.value" class="form-control" id="inputEndDate" placeholder="">
          </div>
          <div class="col-md-4">
            <label for="inputEndTime" class="float-left">End Time</label>
            <input type="time" v-model="userEndTime.value" class="form-control" id="inputEndTime" placeholder="">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="validateForm()">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import Navbar from "./Navbar";
    export default {

      data(){
        return {
          categories: {},
          userCategory:{value:"Category...",valid:false},
          userTitle: {value:"",valid:false},
          userDescription:{value:"",valid:false},
          userStartDate:{value:"",valid:false},
          userStartTime:{value:"", value:false},
          userEndDate:{value:"",valid:false},
          userEndTime:{value:"", valid:false},
          userPhoto:{value:"",valid:false},
          userReserve:{value:0.00, valid:false},
          userStart:{value:0.00, valid:false},
          auctionStart:"",
          auctionId:0,
          imageData:""
      }
    },
    mounted() {
      window.scrollTo(0,0);
      this.getCategories();
      this.setUpData();
    },
    methods: {
      onFileChanged (event) {
        let input = event.target;
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          this.userPhoto.value = input.files[0];
          reader.onload = (e) => {
            this.imageData = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      },
      getCategories: function () {
        this.$http.get('http://localhost:4941/api/v1/categories')
          .then((response) => {
            this.categories = response.data;
          }).catch((error) => {
          console.log(error);
        });
      },
      setUpData: function(){
        if (this.$route.params.id){
           let auctionId = this.$route.params.id;
           this.auctionId = this.$route.params.id;
           this.$http.get('http://localhost:4941/api/v1/auctions/' + auctionId)
             .then((response) => {
               this.userCategory.value = response.data.categoryTitle;
               this.userTitle.value = response.data.title;
               this.userDescription.value = response.data.description;
               this.userStartDate.value = new Date(response.data.startDateTime).toISOString().substring(0,10);
               this.userStartTime.value = new Date(response.data.startDateTime).toISOString().substring(11,19);
               this.userEndDate.value = new Date(response.data.endDateTime).toISOString().substring(0,10);
               this.userEndTime.value = new Date(response.data.endDateTime).toISOString().substring(11,19);
               this.userReserve.value = response.data.reservePrice + ".00";
               this.userStart.value = response.data.startingBid +".00";
               this.auctionStart = new Date(response.data.startDateTime);
             }).catch((error) => {
                console.log(error);
           })
        }
      },
      validateForm: function(){
        let message = "";
        if (document.getElementById("categories").value !== "Category..."){
          this.userCategory.valid = true;
        } else{
          message += " category,";
        }
        if (this.userStartDate.value !== "") {
          this.userStartDate.valid = true;
        } else {
          message += " start date,";
        }
        if (this.userEndDate.value !== ""){
          this.userEndDate.valid = true;
        } else{
          message += " end date,";
        }
        if (this.userTitle.value !== "") {
          this.userTitle.valid = true;
        } else {
          message += " title,";
        }
        if (this.userDescription.value !== ""){
          this.userDescription.valid = true;
        } else {
          message += " description,";
        }

        if (this.userStartTime.value !== ""){
          this.userStartTime.valid = true;
        } else {
          message += " start time (ensure AM/PM is selected),";
        }

        if (this.userEndTime.value !== ""){
          this.userEndTime.valid = true;
        } else {
          message += " end time (ensure AM/PM is selected),";
        }
        if (this.userStart.value > 0){
          this.userStart.valid = true;
        } else {
          message += " starting bid,";
        }

        if (this.userReserve.value > 0){
          this.userReserve.valid = true;
        } else {
          message += " reserve price,";
        }

        if (this.userCategory.valid && this.userStartDate.valid && this.userEndDate.valid && this.userTitle.valid
        && this.userDescription.valid && this.userEndTime.valid && this.userStartTime.valid && this.userReserve.valid
          && this.userStart.valid){
          if (this.$route.name !== 'EditAuction'){
            this.createAuction();
          } else {
            if (this.auctionStart < Date.now()){
              this.$toastr('error', 'Cannot update, auction has already started.');
            } else {
              this.updateAuction();
            }
          }
          this.userCategory.valid = false;
          this.userStartDate.valid  = false;
          this.userEndDate.valid = false;
          this.userTitle.valid = false;
          this.userDescription.valid = false;
          this.userStartTime.valid = false;
          this.userEndTime.valid = false;
          this.userStart.valid = false;
          this.userReserve.valid = false;
        } else {
          message = message.substring(0, message.length -1);
          this.$toastr('error', 'Invalid fields, ' + message);
        }
      },
      upload: function(auctionId) {
          this.$http.post('http://localhost:4941/api/v1/auctions/' + auctionId + '/photos', this.userPhoto.value, {
            emulateJSON: false,
            headers: {
              "Content-Type": "image/jpeg"
            }
          }).then(() => {
            this.$toastr('success', 'Successfully created auction starting on ' + this.userStartDate.value + " at " + this.userStartTime.value);
          },
            () => {
            this.$http.post('http://localhost:4941/api/v1/auctions/' + auctionId + '/photos', this.userPhoto.value, {
              emulateJSON: false,
              headers: {
                "Content-Type": "image/png"
              }
            }).then(() => {
              this.$toastr('success', 'Successfully created auction starting on ' + this.userStartDate.value + " at " + this.userStartTime.value);
            }, () => {
              this.$toastr('error', 'Error uploading photo');
            });
          });
      },
      createAuction: function() {
        this.$http.post('http://localhost:4941/api/v1/auctions', JSON.stringify({
          "categoryId": this.getCategoryId(),
          "title": this.userTitle.value,
          "description": this.userDescription.value,
          "startDateTime": Date.parse(this.userStartDate.value  + " " + this.userStartTime.value, "yyyy-MM-dd HH:mm:ss"),
          "endDateTime": Date.parse(this.userEndDate.value  + " " + this.userEndTime.value, "yyyy-MM-dd HH:mm:ss"),
          "reservePrice": Number.parseInt(this.userReserve.value),
          "startingBid": Number.parseInt(this.userStart.value)
        })).then((response) => {
          this.upload(response.data.id);
        }).catch((error) => {
          this.$toastr('error', 'Error creating, check that the start date is before the end date.');
        })
      },
      updateAuction: function(){
        this.$http.patch('http://localhost:4941/api/v1/auctions/' + this.$route.params.id, JSON.stringify({
          "categoryId": this.getCategoryId(),
          "title": this.userTitle.value,
          "description": this.userDescription.value,
          "startDateTime": Date.parse(this.userStartDate.value  + " " + this.userStartTime.value, "yyyy-MM-dd HH:mm:ss"),
          "endDateTime": Date.parse(this.userEndDate.value  + " " + this.userEndTime.value, "yyyy-MM-dd HH:mm:ss"),
          "reservePrice": Number.parseInt(this.userReserve.value),
          "startingBid": Number.parseInt(this.userStart.value)
        })).then(() => {
          this.upload(this.$route.params.id);
        }).catch((error) => {
          this.$toastr('error', 'Error creating, check that the start date is before the end date.');
        })
      },
      getCategoryId: function () {
        if (document.getElementById("categories").value !== "Category...") {
          let id = 0;
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].categoryTitle === document.getElementById("categories").value) {
              id = this.categories[i].categoryId;
              return id;
            }
          }
        }
      },
      getAuctionPhotoPath: function(){
        if (this.auctionId !== 0 && this.imageData === "" ){
          return 'http://localhost:4941/api/v1/auctions/' + this.auctionId + "/photos";
        } else {
          return this.imageData;
        }
      },
      deletePhoto: function() {
        if (this.auctionStart > Date.now()){
          this.$http.delete('http://localhost:4941/api/v1/auctions/' + this.auctionId + "/photos")
            .then(() => {
              this.$toastr('success', 'Photo deleted.');
              this.imageData = "";
            }).catch(() => {
            this.$toastr('error', 'error deleting photo.');
          });
        } else {
          this.$toastr('error', 'Auction has already started.');
        }
      }
    },
      name: "CreateAuction",
      components: {Navbar}
    }
</script>

<style scoped>
  .container{
    margin-top: 5%;
  }

  .my-5{
    border-width: 2px;
  }


</style>

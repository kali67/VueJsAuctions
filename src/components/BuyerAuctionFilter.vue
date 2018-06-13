<template>
    <div class="jumbotron">
      <h1 class="display-4">Auctions</h1>
      <hr class="my-4">
      <div class="accordion">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" v-on:click="collapsed = !collapsed"
                      data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               Buyer Filter</button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse" style="padding-bottom: 1%" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <select id="categories" class="form-control">
                  <option selected>Category...</option>
                  <option v-for="category in categories">{{category.categoryTitle}}</option>
                  </select>
                </div>
                <div class="col-6">
                  <select id="status" class="form-control">
                    <option selected>Status...</option>
                    <option v-for="status in allStatus">{{status}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group" style="margin-top: 4%">
                <input id="search" type="text" class="form-control col-md-12" placeholder="Search" aria-describedby="basic-addon2">
              </div>
              <button class="btn btn-primary float-right" @click="search" type="button">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'AuctionFilter',
    data() {
      return {
        collapsed: true,
        categories: {},
        allStatus: ["won", "all", "active", "expired","upcoming"],
        userSearch: ""
      }
    },
    mounted() {
      this.getCategories();
    },
    methods: {
      getCategories: function () {
        this.$http.get('http://localhost:4941/api/v1/categories')
          .then((response) => {
            this.categories = response.data;
          }).catch((error) => {
           console.log(error);
        });
      },
      search: function () {
        let query = "?";
        if (document.getElementById("search").value.length > 0){
            query += "q=" + document.getElementById("search").value + "&";
        }
        if (document.getElementById("categories").value !== "Category..."){
          let id = 0;
          for (let i=0; i<this.categories.length; i++) {
            if (this.categories[i].categoryTitle === document.getElementById("categories").value){
              id = this.categories[i].categoryId;
              break;
            }
          }
          query += "category-id=" + id  + "&";
        }
        if (document.getElementById("status").value !== "Status..."){
          query += "status=" +document.getElementById("status").value + "&";
        }

        query = query.substring(0, query.length - 1);
        if (query !== "?"){
          this.$emit('filter', query);
        }
      }
    }
  }
</script>

<style scoped>
  .btn-link:hover{
    text-decoration: none;
  }
  .btn-link{
    text-decoration: none;
  }
</style>

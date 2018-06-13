<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <router-link class="navbar-brand" :to="{name:'Auctions'}">Auction Site</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" v-if="isLoggedIn()" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Selling
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link class="dropdown-item" :to="{name: 'CreateAuction'}">List an Item</router-link>
            <router-link class="dropdown-item" :to="{name: 'CreatedAuctions'}">Created Auctions</router-link>
            <router-link class="dropdown-item" :to="{name: 'SoldAuctions'}">Sold</router-link>
            <router-link class="dropdown-item" :to="{name: 'UnsoldAuctions'}">Unsold</router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Buying
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
            <router-link class="dropdown-item" :to="{name: 'Auctions'}">View Auctions</router-link>
            <router-link class="dropdown-item" v-show="isLoggedIn()" :to="{name: 'CurrentAuctions'}">In-progress Auctions</router-link>
            <router-link class="dropdown-item" v-show="isLoggedIn()" :to="{name: 'WonAuctions'}">Won</router-link>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link"><router-link v-show="isLoggedIn()" :to="{name: 'Account'}" class="navBtn">Account</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><router-link v-show="!isLoggedIn()" :to="{name: 'Login'}" class="navBtn">Login or Register</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link navBtn" v-show="isLoggedIn()" @click="logout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>



<script>
  export default {
    name:'navbar',
    methods: {
      isLoggedIn: function(){
        return window.sessionStorage.getItem("userId") !== null;
      },
      logout: function(){
        window.sessionStorage.removeItem("userId");
        window.sessionStorage.removeItem("sessionKey");
        this.$toastr('success', 'Logged out');
        this.$router.push({name:'Login'});
      }
    }
  }

</script>


<style scoped>
  .navbar-custom {
    background: rgba(28, 48, 55,0.7)
  }

  .navbar-brand{

    color: white;
  }
  .navBtn{
    color: #007bff !important;
    text-decoration: none !important;
  }

  .navBtn:hover{
    color: blue !important;
    text-decoration: none !important;
  }

</style>

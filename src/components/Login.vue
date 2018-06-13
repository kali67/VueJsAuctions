<template>
  <div class="login">
    <navbar></navbar>
      <form class="jumbotron" @submit.prevent="validateUser()">
        <div class="form-group">
          <label class="loginEmail">Email address</label>
          <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter login" v-model="userLogin">
        </div>
        <div class="form-group">
          <label class="loginPassword">Password</label>
          <input type="password" class="form-control"  placeholder="Password" v-model="userPassword">
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Register</button>
      </form>
    <register></register>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar";
  import Register from "../components/Register";
  export default {
    name: 'login',
    components: {Navbar, Register},
    data() {
      return {
        userLogin: "",
        userPassword: ""
      }
    },
    methods: {
      validateUser: function () {
        this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
          email: this.userLogin,
          password: this.userPassword
        })).then((response) => {
            window.sessionStorage.setItem("sessionKey", response.data.token);
            window.sessionStorage.setItem("userId", response.data.id);
            this.$toastr('success', 'Successfully logged in');
            this.$router.push('Auctions');
          },
          () => {
            this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
              username: this.userLogin, //try username is email doesnt work
              password: this.userPassword
            })).then((response) => {
              window.sessionStorage.setItem("sessionKey", response.data.token);
              window.sessionStorage.setItem("userId", response.data.id);
              this.$toastr('success', 'Successfully logged in');
              this.$router.push('Auctions');
            }).catch(() => {
              this.$toastr('error', 'Invalid login credentials');
            });
          });
      }

    }
  }

</script>

<style scoped>

  .jumbotron {
    margin-top: 10%;
    margin-left: 35%;
    margin-right: 35%;
    background: rgba(28, 48, 55,0.5);
  }

  .loginEmail, .loginPassword {
    color: rgba(244,244,244,0.7);
  }

  .login {
    background-image: url("../../img/cityscapeLogin.jpg");
    height: 100%;
  }

</style>

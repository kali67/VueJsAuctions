<template>
    <div>
      <navbar></navbar>
      <h2 style="margin-top: 5%">Account Information</h2>
      <div class="container"style="margin-top: 5%">
        <div class="form-group row" >
          <label for="inputName" class="col-sm-3 col-form-label text-left">Username</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="inputName" v-model="username" readonly>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputLastName" class="col-sm-3 col-form-label text-left">Given Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="inputLastName" v-model="givenName.value">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label text-left" for="inputFamilyName">Family Name</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="inputFamilyName" v-model="familyName.value">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail" class="col-sm-3 col-form-label text-left">Email</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="inputEmail" v-model="email" readonly>
          </div>
        </div>
        <div class="form-group row">
          <label for="accountBalance" class="col-sm-3 col-form-label text-left">Account Balance</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="accountBalance" v-model="accountBalance" readonly>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="validateForm()">Update</button>
        </div>
      </div>
    </div>
</template>

<script>
    import Navbar from "./Navbar";
    export default {
      name: "UserAccount",
      data(){
        return{
          username: "",
          givenName: {value:"", valid:false},
          familyName: {value:"", valid:false},
          email: "",
          accountBalance: ""
        }
      },
      mounted(){
        this.getUserInfo();
      },
      methods: {
        getUserInfo: function () {
          this.$http.get('http://localhost:4941/api/v1/users/' + window.sessionStorage.getItem("userId"))
            .then((response) => {
              this.username = response.data.username;
              this.givenName.value = response.data.givenName;
              this.familyName.value = response.data.familyName;
              this.email = response.data.email;
              this.accountBalance = response.data.accountBalance;
            }).catch((error) => {
              this.$toastr('error', 'Unexpected error ' + error);
          })
        },
        validateForm: function(){
          let regex = new RegExp("^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]*)*$");
          let message = "";
          if (regex.test(this.givenName.value)){
            this.givenName.valid = true;
          } else {
            message += " given name,";
          }
          if (regex.test(this.familyName.value)){
            this.familyName.valid = true;
          } else {
            message += " family name,";
          }
          message = message.substring(0, message.length - 1);
          if (this.familyName.valid && this.givenName.valid){
            this.familyName.valid = false;
            this.givenName.valid = false;
            this.updateUser();
          } else {
            this.$toastr('error', 'Invalid fields' + message);
          }
        },
        updateUser: function() {
          this.$http.patch('http://localhost:4941/api/v1/users/' + window.sessionStorage.getItem("userId"), JSON.stringify({
            "givenName": this.givenName.value,
            "familyName": this.familyName.value
          })).then(() => {
            this.$toastr('success', 'User updated successfully');
          }).catch((error) => {
            this.$toastr('error', 'Unexpected error ' + error);
          })
        }
      },
      components: {Navbar}
    }
</script>

<style scoped>
  .container{
    margin-top: 5%;
  }
</style>

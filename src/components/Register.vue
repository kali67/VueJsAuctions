<template>
    <div class="modal" id="exampleModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title large">Register</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <form class="container">
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label text-left">Given name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputName" v-model="userGivenName.input">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label text-left">Family name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputLastName" v-model="userFamilyName.input">
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label text-left">Email</label>
                  <div class="col-sm-8">
                    <input type="email" class="form-control" id="inputEmail" v-model="userEmail.input">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label text-left">User name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputUsername" v-model="username.input">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label text-left">Password</label>
                  <div class="col-sm-8">
                    <input type="password" class="form-control" id="inputPassword" v-model="userPassword.input">
                  </div>
                </div>
              </form>
              <button class="btn btn-primary" type="submit" v-on:click="validateForm()">Register</button>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
  export default {
    name: 'regModal',
    data() {
      return {
        userEmail: {input:"", valid:false},
        userPassword: {input:"", valid:false},
        userGivenName: {input:"", valid:false},
        userFamilyName: {input:"", valid:false},
        username: {input:"", valid:false}
      }
    },
    methods: {
      validateForm: function(){
        let emailReg = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*" +
          "|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")" +
          "@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4" +
          "][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?" +
          ":[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])");

        let message = "";
        if (emailReg.test(this.userEmail.input)){
          this.userEmail.valid = true;
        } else {
          message += " email address,";
        }

        let regexName = new RegExp("^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]*)*$");

        if (regexName.test(this.userGivenName.input)){
          this.userGivenName.valid = true;
        } else {
          message += " given name,";
        }

        if (regexName.test(this.userFamilyName.input)){
          this.userFamilyName.valid = true;
        } else {
          message += " family name,";
        }

        if (this.username.input.length > 0){
          this.username.valid = true;
        } else {
          message += " username,";
        }

        if (this.userPassword.input.length > 0){
          this.userPassword.valid = true;
        } else {
          message += " password,";
        }
        message = message.substring(0, message.length - 1);
        if (this.userPassword.valid && this.username.valid && this.userGivenName.valid && this.userFamilyName.valid && this.userEmail.valid){
          this.username.valid = false;
          this.userPassword.valid = false;
          this.userGivenName.valid = false;
          this.userFamilyName.valid = false;
          this.userEmail.valid = false;
          this.createUser();
        } else {
          this.$toastr('error', 'Invalid fields' + message);
        }

      },
      createUser: function () {
        this.$http.post('http://localhost:4941/api/v1/users',
          JSON.stringify({
            username: this.username.input,
            givenName: this.userGivenName.input,
            familyName: this.userFamilyName.input,
            email: this.userEmail.input,
            password: this.userPassword.input
          }))
          .then(()=>{
            this.$toastr('success', 'Successfully created your account');
            this.$http.post('http://localhost:4941/api/v1/users/login', {
              email: this.userEmail.input,
              password: this.userPassword.input
            }).then((response) => {
              window.sessionStorage.setItem("sessionKey",response.data.token);
              window.sessionStorage.setItem("userId", response.data.id);
              $('#exampleModal').modal('hide');
              this.$router.push('Auctions');
            });
        }).catch(()=>{
          this.$toastr('error', 'An error has occurred, please enter a new email/username');
        })

      }
    }
  }
</script>


<style scoped>

  .modal-content{
    background: rgba(255, 255, 255,0.9);
  }

</style>

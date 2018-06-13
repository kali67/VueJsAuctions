<template>
  <div>
    <navbar></navbar>
    <div v-if="errorFlag" style="color: red;">
      {{error}}}
    </div>
    <div v-if="$route.params.userId"> <!--if the route has a value-->
      <div id="user">
        <router-link :to="{name:'users'}">Back to Users</router-link>
        <br /> <br />
        <table>
          <tr>
            <td>User ID</td>
            <td>Username</td>
          </tr>
          <tr>
            <td>{{ $route.params.userId }}</td>
            <td>{{ getSingleUser($route.params.userId).username }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div v-else>
      <div id="users">
        <table>
          <tr v-for="user in users">
            <td>{{ user.username }}</td> <!-- route name user and param with user id-->
            <td><router-link :to="{ name: 'user', params: {userId: user.user_id}}">View</router-link></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
  import Navbar from "./Navbar";
  export default {
    components: {Navbar},
    data() {
      return {
        error: "",
        errorFlag: false,
        users: [],
        components: {Navbar}
      }
    },
    mounted: function() {
      this.getUsers();
    },
    methods: {
      getUsers: function(){
        this.$http.get('http://localhost:8081/api/users')
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },
      getSingleUser: function (id) {
        for (let i = 0; i< this.users.length; i++) {
          if (this.users[i].user_id == id) {
            return this.users[i];
          }
        }
      }
    }
  }
</script>



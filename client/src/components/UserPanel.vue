<template>
<div v-if = $store.state.is_logged_in>
  <div class="UserPanel">
      <!-- <h2>Username : {{$store.state.username}}</h2> -->
      <h2>{{$store.state.nickname}}</h2>
      <h2>&#8377;{{$store.state.userbalance}}</h2>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserPanel',
  data(){
      return{
        username:"admin",
        balance:1023
      }
  }
}
</script>

<style scoped>
.UserPanel h2{
  margin:0;
  padding:3px;
  text-align: left;
  margin-left: 10px;
  color:white;
}

  .UserPanel{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color:rgb(34, 34, 34);
        margin: 5px;
        border-radius: 5px;
    }
</style>

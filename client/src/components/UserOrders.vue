<template>
  <div id = "UserOrders">
        <h2 v-if = !$store.state.is_logged_in>Please login first</h2>
        <div v-else>
            <div  v-for = "order in $store.state.my_orders" :key = "order.order_id"
                class = "order">
                <span align = "left">Amount : {{order.amount}}</span><span align = "right">Item ID : {{order.item_id}}</span>
                <span align = "left">Result : {{order.result}}</span><span align = "right">utc : {{order.created_time}}</span>
                <span align = "left">Selected : {{order.selected_no}}</span><span align = "right">Status : {{order.status}}</span>
             </div>
        </div>
  </div>
</template>

<script>

import {mapActions} from 'vuex';
// import store from '../store';

export default {
  name: 'UserOrders',
  components: {
  },
  methods:{
      ...mapActions(['refreshApp']),  
  },

  created:()=>{
    //   store.dispatch('refreshApp')
  }

}
</script>


<style scoped>

.order *{
    margin: 5px;
}

.order {
        padding: 0px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        background-color: rgb(255, 255, 255);
        color:rgb(0, 0, 0);
}

 #UserOrders div{
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    margin: 10px;
     border-radius: 10px;
    
    }


</style>

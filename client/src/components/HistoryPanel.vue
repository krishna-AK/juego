<template>
<div id = "HistoryPanel" v-if = $store.state.is_logged_in>
    <div id = "row_header" style = "{ }">
       <span>period</span><span>id</span><span>result</span>
    </div>
    <div  v-for = "item in $store.state.history" :key = "item.item_id"
    :class = "[(item.result)%2 ==0 ? 'hrow1':'hrow2']">
        <span>{{item.created_time}}</span><span>{{item.item_id}}</span><span>{{item.result}}</span>
    </div>
</div>
</template>

<script>
// import store from '../store.js'
export default {
    name :"HistoryPanel",

    
}
</script>

<style scoped>


     .hrow1{
        padding: 0px;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        background-color: rgb(103, 110, 209);
        color:white;
    }
     .hrow2{
        padding: 0px;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        background-color: rgb(98, 211, 98);
        color:white;
    }
    #row_header{
        
        padding: 0px;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        background-color: rgb(58, 58, 58);
        color: white;
        
    }
    #HistoryPanel div{
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    margin: 5px;
     border-radius: 10px;
    
    }
</style>

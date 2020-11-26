<template>
<div >
  <div id = "OrderPanel" v-if = $store.state.is_logged_in>
      <!-- <div>
      <button>0</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button></div>
      <input type = "text" v-bind:value="amount" > -->
      
  </div>
</div>
</template>

<script>
export default {
  name: 'OrderPanel',
  data(){
      return{
        selected_no:1,
        amount:0
      }
  }
}
</script>

<style scoped>
    button{
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      display: block;
      width: 100%;
      padding:10px;
      border-radius: 7px;
      background-color: rgb(226, 135, 107);
      color:white;
      border: white 0px;
      font-size: 20px;
    }
    #OrderPanel{
    
        padding:10px;
        border-radius: 10px;
        
    }
    input{
        color:rgba(100, 100, 100, 50);
    }
</style>

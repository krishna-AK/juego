<template>
<div v-if = $store.state.is_logged_in>
  <div id = "GameStatus">
      <h2>🕘 {{local_timer}}</h2>
      <h2># {{$store.state.current_item_id}}</h2>
      <button id = "order_button" @click = "openPanel" >ORDER NOW</button>
  </div>

    <div v-if = "getPanelFlag" id = "background_blocker" >
      <div id = "order_panel">
        <button id = "close_button" @click= "closePanel">Close</button><br/>

        <div class = "btn_row">
        <button class = "odd" value="1" @click = selectNum>1</button>
        <button class = "odd" value="3" @click = selectNum>3</button>
        <button class = "odd" value="5" @click = selectNum>5</button>
        </div>

        <div class = "btn_row">
        <button class = "even" value="0" @click = selectNum>0</button>
        <button class = "even" value="2" @click = selectNum>2</button>
        <button class = "even" value="4" @click = selectNum>4</button>
        </div>

        <div class = "btn_row">
        <button class = "amt_btn" value="10" @click = selectAmt>10</button>
        <button class = "amt_btn" value="100" @click = selectAmt>100</button>
        <button class = "amt_btn" value="1000" @click = selectAmt>1000</button>
        </div>


        <h1>&#8377;{{amount}}</h1>
        <button @click = 'placeOrder'>CONFIRM</button>

      </div>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
export default {
  name: 'GameStatus',
  data(){
    return{
      panel_flag : false,
      amount:0,
      no_selected :-1,
      local_timer : "wait",
    }
    },
  computed:{
    getPanelFlag(){
      return this.panel_flag
    },

  },
  methods:{
    openPanel(e){
   
      e.preventDefault();
      // disable scrolling
      document.body.style.overflowY = "hidden"
      this.panel_flag = true
    },
     closePanel(e){
     
      e.preventDefault();
      document.body.style.overflowY = "auto"
      this.panel_flag = false
      this.amount = 0;
      this.no_selected = -1;
    },
    selectNum(e){
      e.preventDefault();
      var elms = document.getElementsByClassName('even_selected');
        var l = elms.length;
        while(l--){
          elms[l].className = 'even';
        } 
      elms = document.getElementsByClassName('odd_selected');
        l = elms.length;
        while(l--){
          elms[l].className = 'odd';
        } 

      this.no_selected = parseInt(e.srcElement.value)
      e.srcElement.className = ((e.srcElement.className === 'even')?'even_selected':'odd_selected')
    },

      selectAmt(e){
      e.preventDefault();
      // var elms = document.getElementsByClassName('btn_amt_selected')
      // var l = elms.length;
      // while(l--){ elms[l].className = 'btn_amt_selected'}

      this.amount += parseInt(e.srcElement.value);

    },
    placeOrder(e){
      e.preventDefault();
      const x = this.amount;
      const y = this.no_selected
      store.dispatch('placeOrder',{amt:x,sno:y})
      this.amount = 0;
      this.no_selected = -1;
      this.closePanel(event)
    }

  },
 
  mounted:function(){
    //   function rTimer(){
    //   // console.log("Timer : refreshed")
    //   if(store.state.is_logged_in){
    //   store.dispatch('refreshTimer')
    //   }
      
    //   setTimeout(()=>rTimer(),5000)
      
    // }

    //  function rAPP(){
    //   // console.log("Timer : refreshed")
    //   if(store.state.is_logged_in){
    //   store.dispatch('refreshApp')
    //   }
      
    //   setTimeout(()=>rAPP(),10000)
      
    // }
    
    // rTimer();
    // rAPP();
    const updateLocalTimer = ()=>{
      this.local_timer = store.state.timer -(parseInt(Date.now()/1000) - parseInt(store.state.last_timestamp))
      if(this.local_timer <= 0){
        this.local_timer = "wait"
        store.state.timer = "wait"
      }
    }
    function syncTimer(){
      if(store.state.is_logged_in === true && store.state.timer == "wait"){
        store.dispatch('refreshApp')
      }else{
        updateLocalTimer()
      }
      setTimeout(syncTimer,1000)
    }

    syncTimer();
   
  }
}
</script>


<style scoped>

  .even{
    background-color: white;
  }
  .odd{
    background-color: white;
  }
  .even_selected{
    background-color: rgb(185, 127, 61);
  }
  .odd_selected{
    background-color: rgb(185, 127, 61);
  }
  #background_blocker{
    top:0px;
    bottom: 0px;
    left:0px;
    right:0px;
    position: fixed;
    background-color: rgba(255, 255, 255, 0);
    z-index: 998;
    /* display:none; */
  }

  #order_panel{
    position: fixed;
    width: 100%;
    top:100%;
    bottom: 0;
    background-color: rgb(115, 44, 148);   
    color:white;
    border-radius: 10px 10px 0px 0px;
    z-index: 999;
    animation: slideup;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    /* animation-timing-function: ease-in; */
    
  }

  @keyframes slideup{
    0% {top:100%}
    100%{top:60%}
  }

  #order_button{
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      display: block;
      width: 100%;
      padding:10px;
      background-color: rgb(226, 135, 107);
      color:white;
      outline: none;
      font-size: 20px;
      margin-bottom: 5px;
      border:none;
      border-radius: 7px;
      transition-duration: 0.1s;
    }

  #order_button:active {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transform: translateY(2px);
}


/* #value_button{

} */
#GameStatus h2{
  margin:0;
  padding :0;
}

  #GameStatus{
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      padding: 5px;
        margin: 5px;
        border-radius: 10px;
    }


</style>

<template>
  <div id = "App">
    <div id = "navbar_top">
      <i v-if = $store.state.back_button_flag class="fa fa-arrow-left 3" aria-hidden="true"></i>
      <div id = "navbar_top_content">
      
        <button v-if = $store.state.is_logged_in id = "menu_button" @click = toggleDD><i class="fa fa-bars 3" aria-hidden="true"></i> </button>
        <div id = "dropdown" v-if = dd_flag>
          <button>Login</button><br/>
          <button>Account</button><br/>
          <button>MyOrders</button><br/>
          <button>Settings</button><br/>
        </div>
      </div>
    </div>
    
    <router-view></router-view><br/>
    <div id = "navbar_bottom" v-if = $store.state.is_logged_in>
      <button @click = gotoGame> Juego</button>
      <button @click = gotoOrders>MyOrders</button>
    </div>
    <div :id = getToastClass :key = $store.state.toast_key v-if = $store.state.toast_flag>{{$store.state.toast_msg}}</div>
  </div>
  
</template>

<script>
// import Title from './components/Title'
import store from './store'
// import {mapActions} from 'vuex';
export default {
  
        name: 'App',

        components: {
          // Title,
        },
      
        data: () => ({
          dd_flag:false,
        }),
        computed:{
            getToastClass(){
              return store.state.toast_class
            }
        },
        methods:{
          // ...mapActions(['tryLogin','refreshApp']),     
          gotoLogin(){
            this.$router.push('/login')
          },
          gotoGame(){
            this.$router.push('/game')
          },
          gotoOrders(){
            this.$router.push('/myorders')
            store.dispatch('refreshApp')
          },
          toggleDD(){
            this.dd_flag = !this.dd_flag
          }
        },
        beforeCreate(){
            this.$router.push('/login')
            // store.dispatch('tryLogin').then(()=>store.dispatch('refreshApp'))        
        }
};
</script>

   <style scoped>
  #navbar_top .fa-arrow-left{
    float:left;
    color:white;
    margin:10px;
  }
  #dropdown{
    position:absolute;
    background-color:rgb(90, 47, 121);
    color:white;
    width:120px;
    right:0px;
    margin-top: 6px;
    text-align: center;
    border-radius: 0 0 5px 5px;
    padding:5px;
  }
  #dropdown button{
    /* border: 1px solid rgba(0, 0, 0, 0.233); */
    border:none;
    background-color: rgba(255, 99, 71, 0);
    width: 120px;
    outline: none !important;
    color:white;
    padding:5px;
  }
  #navbar_top button:active{
    background-color: rgba(0, 0, 0, 0.164);
  }
  #menu_button{
    margin:10px 10px 0 0;
    background-color: rgba(255, 99, 71, 0);
    outline: none !important;
    border:none;
  }

  
  
  .fa-bars{
    color:white;
    /* margin:10px; */
  }
   #navbar_top{
    
     border-radius: 0 0 5px 5px;
     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
     text-align: right;
     background-color:rgb(90, 47, 121);
     left:0;
     right:0;
     top:0;
     height: 40px;
     margin:0;
   }
   #navbar_bottom{
     /* border: 5px solid rgb(17, 0, 255); */
     background-color:rgb(90, 47, 121);
     position :fixed;
     left: 0;
     right:0;
     margin:0;
     height:39px;
     bottom:0;
     display:grid;
     grid-template-columns:1fr 1fr;
   
     
   }
   #navbar_bottom button{
     border : 1px solid rgb(0, 0, 0);
     background-color:rgb(90, 47, 121);
     color:white;
     outline: none !important;
   }
    #App{
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-align: center;
        color: #2c3e50;
        box-sizing: border-box;
        border-radius: 5px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale; 
    }


 #toast_red{
      padding:10px;
      background-color:rgb(190, 68, 68);
      color :white;
      border-radius: 10px;
      position: fixed;
      top:0%;
      width: 50%;
      height: auto;
      left:0;
      right: 0;
      top:5px;
      margin: auto;
      max-width: 300px;
      animation: toastslide;
      animation-timing-function: ease-in-out;
      animation-duration: 2s;
      animation-fill-mode: forwards;
      
    }


    #toast_green{
      padding:10px;
      background-color:rgb(84, 133, 36);
      color :white;
      border-radius: 10px;
      position: fixed;
      top:0%;
      width: 50%;
      height: auto;
      left:0;
      right: 0;
      top:5px;
      margin: auto;
      max-width: 300px;
      animation: toastslide;
      animation-timing-function: ease-in-out;
      animation-duration: 2s;
      animation-fill-mode: forwards;
      
    }

   

    @keyframes toastslide {
      0% {top : -50px;opacity :0}
      25% {top : 5px; opacity : 0.85}
      100%{ opacity:0%;visibility:hidden;}
    }

</style>
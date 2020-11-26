<template>
<div>
    <div id="Game" v-if = $store.state.is_logged_in>
            <UserPanel/>
            <GameStatus/>
            <HistoryPanel/>
       </div>
      <h2 v-else>
          You need to login to view this page.
      </h2>

      <!-- <v-snackbar>Hello</v-snackbar> -->
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import store from '../store'
import UserPanel from './UserPanel.vue'
import GameStatus from './GameStatus.vue'
import HistoryPanel from './HistoryPanel.vue'

export default {
  name: 'Game',
  components:{
      UserPanel,
      GameStatus,
      HistoryPanel
  },
  data(){
      return{
          
      }
  },

  methods :{
      ...mapActions(['tryLogin','refreshApp']),     
      onSubmit(e){
          e.preventDefault();
          store.dispatch('tryLogin').then(()=>store.dispatch('refreshApp'))          
          
      }
  }
}
</script>

<style scoped>
    #Game{
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        text-align: center;
        color: #2c3e50;
        box-sizing: border-box;
        border-radius: 5px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale; 
    }

</style>

<template>
<div id = "LoginPage">
    <Title/>
        <div >
            <div id="loginPanel" v-if = !$store.state.is_logged_in&&!is_registering >
            <form >
            <input type = "text" v-model = $store.state.ph_no placeholder="mobile no"><br/>
            <input type = "password" v-model = $store.state.password placeholder="password"><br/>
            <input @click= "onSubmit" type = "submit" value = "Login">
            </form>
            </div>
            <h2 v-if = $store.state.is_logged_in>
                Logged in as {{$store.state.nickname}}
            </h2>
       </div>
      

      <!-- registrtion panel -->
        
      <div v-if = is_registering id = "registrationPanel">
            <form >
                <input type = "text"  placeholder="mobile number" v-model = r_ph_no><br/>
                <input type = "password"  placeholder="password" v-model = r_password><br/>
                <input type = "password"  placeholder="confirm password" v-model = r_c_password ><br/>
                <input type = "text"  placeholder="name" v-model = r_nickname><br/>
                <input @click= "onRegister" type = "submit" value = "Register">
            </form>
      </div>
      <button  v-if = !$store.state.is_logged_in @click = toggleRegistration>{{button_msg}}</button>
</div>
</template>

<script>
import {mapActions} from 'vuex';
import store from '../store'
import {toast} from '../store'
import Title from './Title'

export default {
  name: 'LoginPanel',
  components:{
      Title,
  },
  data(){
      return{
          is_registering:false,
          r_ph_no:null,
          r_password:null,
          r_c_password:null,
          r_nickname:null,
      }
  },
  computed:{
      button_msg(){
          if(this.is_registering === true){return "close"}
          else{return "New User? Register Here"}
      }
  },
  methods :{
      ...mapActions(['tryLogin','refreshApp']),     
      onSubmit(e){
          e.preventDefault();
          store.dispatch('tryLogin').then(()=>store.dispatch('refreshApp'))          
          
      },
      toggleRegistration(){
          this.is_registering = !this.is_registering
      },
      onRegister(e){
          e.preventDefault()
          if(!this.r_password || this.r_c_password != this.r_password){toast('Password Mismatch',false);return;}
          store.dispatch('tryRegister',{ph_no:this.r_ph_no,password:this.r_password,nick_name:this.r_nickname})
          .then(()=>{this.is_registering = false})
          .catch(()=>{this.is_registering = true})
      }
  }
}
</script>

<style scoped>


    #loginPanel{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color:rgb(90, 47, 121);
          margin: 5px;
          border-radius: 10px;
    }
    #loginPanel *{
        padding:10px;
        margin: 5px;   
        
    }

      #registrationPanel{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color:rgb(90, 47, 121);
          margin: 5px;
          border-radius: 10px;
    }
    #registrationPanel *{
        padding:10px;
        margin: 5px;   
        
    }

</style>

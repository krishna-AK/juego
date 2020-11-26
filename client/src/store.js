import vue from 'vue';
import vuex from 'vuex';
import axios from 'axios';
import router from './main.js'

vue.use(vuex,axios);
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const api = axios.create({
   
    baseURL:"http://13.126.118.19"
    // baseURL:"http://127.0.0.1:5000"
})

// if(/Mobi|Android/i.test(navigator.userAgent)) {
//     api.baseURL = "http://192.168.43.181:5000"
// }

// var isMobile = ('ontouchstart' in document.documentElement || navigator.userAgent.match(/Mobi/));
// if(isMobile)[
//     api.baseURL = "http://192.168.43.181:5000"
// ]

const state = {
            is_logged_in : false,
            current_item_id:'wait',
            timer:"wait",
            password:"",
            ph_no:"",
            nickname:"admin",
            history : [],
            userbalance:0,
            my_orders:null,
            auth_token : "",
            toast_flag : false,
            toast_msg : "Logged in",
            toast_key : 0,
            back_button_flag :false,
            toast_class : "toast_red",
            last_timestamp : "",
    
}

function resetToast(){
    state.toast_flag = false
}

function toast(msg,flag){
    console.log('Toast called')
    if(flag === true){state.toast_class = "toast_green"}
    else{state.toast_class = "toast_red"}
    state.toast_flag = true
    state.toast_key =Date.now()
    state.toast_msg = msg
    setTimeout(()=>resetToast,2000)

}
const getters = {
    getAppData : (state)=>state
}
const actions = {
     tryLogin ({commit}){
        return api.post('/api/login',{"ph_no":state.ph_no,"password":state.password})
        .then((resp)=>{
            // console.log(resp);
            commit('SET_LOGIN',resp.data);
            toast('Hello, '+ resp.data.nickname,true)
            router.push('/game')
        })
        .catch((error) =>
                {console.log(error); 
                if(error.response){toast(error.response.data.msg,false);}
                else{toast('Connection Error',false)}
                }
        )
    },
    tryRegister ({commit},form){
        console.log(commit)
        return api.post('/api/register',{"ph_no":form.ph_no,"password":form.password,"nick_name":form.nick_name})
        .then((resp)=>{
            console.log(resp);
            // commit('SET_LOGIN',resp.data);
            toast('Registration Successful, Please Login',true)
            // router.push('/game')
        })
        .catch((error) =>
                {console.log(error); 
                if(error.response){toast(error.response.data.msg,false);}
                else{toast('Connection Error',false)}
                }
        )
    },

    refreshApp({commit}){
            // console.log("RefreshApp called")
            const headerdata = {headers :{'JWT-Auth':state.auth_token}};
            // console.log(headerdata)
            return api.get('/api/appdata',headerdata)
            .then((resp)=>{console.log(resp);commit('SET_APP_DATA',resp.data)})
            .catch(error=>
            console.log(error))
    },

    refreshTimer({commit}){
        const headerdata = {headers :{'JWT-Auth':state.auth_token}};
            return api.get('/api/timer',headerdata)
            .then((resp)=>{commit('SET_TIMER',resp.data);})
            .catch((error) =>
                    {console.log(error); }
            )
    },

    placeOrder({commit},{amt,sno}){
        console.log(commit)
        const data = {'item_id':state.current_item_id,'amount':amt,'selected_no':sno}
        const headerdata = {headers :{'JWT-Auth':state.auth_token}};
        // console.log(data)
            return api.post('/api/order',data,headerdata)
            .then(()=>{
                console.log('order sucessfully placed');
                toast('Order Placed',true);
                }
            )
            .catch((error) =>{
                console.log(error); 
                if(error.response.data){toast(error.response.data.msg,false);}
                else{toast('Connection Error',false)}
                }
            )
    }
}
const mutations = {
    SET_LOGIN(state,data){

        state.ph_no = data.ph_no;
        state.nickname = data.nickname 
        state.auth_token = data.access_token;
        state.is_logged_in = true
        
        // setTimeout(()=>toast("lol"),5000)
    },
    SET_TIMER(state,data){
        state.timer = data.timer
        state.last_timestamp = data.timestamp
    },

    SET_APP_DATA(state,data){
                state.userbalance = data.balance
                state.my_orders = data.my_orders
                state.current_item_id = data.current_item
                state.timer = data.timer
                state.history = data.history
                state.last_timestamp = data.timestamp

   
    }
}


export default new vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export {toast}




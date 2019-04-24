import Vue from 'vue';
import router from '../../routes.js'

const FbAuth="https://www.googleapis.com/identitytoolkit/v3/relyingparty"
const FbApiKey="AIzaSyAjADkjl2tPPmUJWsVFJCOFT5ofqG3sHvk"
const admin = {
    namespaced : true,
    state:{
         email:'',
         token:'',
         refresh:''
    },
    getters:{

    },
    mutations:{
        auth(state,data){
          state.email=data.email
          state.token=data.idToken
           state.refresh=data.refreshToken
          router.push('/')
        }

    },
    actions:{
         signIn({commit},payload){
             Vue.http.post(`${FbAuth}/verifyPassword?key=${FbApiKey}`,{
                 ...payload,
                 returnSecureToken : true
             })
             .then(res=>res.json())
             .then(response=>{
                 console.log(response)
                 commit('auth',{
                     ...response,
                     type:'signin'
                 })
                 localStorage.setItem("token",response.idToken)
                 localStorage.setItem("refresh",response.refreshToken)
             })
             .catch(error=>{
                 console.log(error)
             })
         }
    }
}

export default admin
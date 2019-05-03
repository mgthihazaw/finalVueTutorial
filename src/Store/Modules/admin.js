import Vue from 'vue';
import router from '../../routes.js'

const FbAuth="https://www.googleapis.com/identitytoolkit/v3/relyingparty"
const FbApiKey="AIzaSyAjADkjl2tPPmUJWsVFJCOFT5ofqG3sHvk"
const admin = {
    namespaced : true,
    state:{
        
         token:'',
         refresh:'',
         authFailed: false
    },
    getters:{
        isAuth(state){
            if(state.token){
                return true;
            }
            return false;
        }
    },
    mutations:{
        auth(state,data){
          
          state.token=data.idToken
           state.refresh=data.refreshToken
          if(data.type==='signin'){
              router.push('/dashboard')
          }
          else{
            router.push('/')
          }
        },
        authFailed(state,type){
            
            if(type=='reset'){
                state.authFailed=false
            }
            else{
                state.authFailed=true
            }
        },
        logoutUser(state){
            state.token=null;
            state.refresh=null;

            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken')
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
                 
                 commit('auth',{
                     ...response,
                     type:'signin'
                 })
                 localStorage.setItem("token",response.idToken)
                 localStorage.setItem("refresh",response.refreshToken)
             })
             .catch(error=>{
               commit("authFailed")
             })
         },
         refreshToken({commit}){
           const refreshToken=localStorage.getItem('refresh');
           
           if(refreshToken!=null){
               Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${FbApiKey}`,{
                grant_type: 'refresh_token',
                refresh_token : refreshToken
               })
               .then(response=>response.json())
               .then(data=>{
                   commit("auth",{
                       idToken: data.id_token,
                       refreshToken:data.refresh_token,
                       type: 'refresh'
                   });
                   localStorage.setItem("token",data.id_token)
                   localStorage.setItem("refresh",data.refresh_token)
               })
           }
         }
    }
}

export default admin
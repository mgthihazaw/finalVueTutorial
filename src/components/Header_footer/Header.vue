<template>
    <header>
        <div class="container header_container">
            <div class="logo">
                <router-link to="/">GameSpot</router-link>
            </div>
            <div class="login" v-if="!isAuth">
                <router-link to="/signin">
                <img :src="require('../../assets/images/login.png')">
                </router-link>
            </div>
            <div v-else>
                <ul>
                    <li>
                    <span @click="logoutUser()">Logout</span>
                    </li>
                    <li><router-link to="/dashboard">Dashboard</router-link></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default {
   computed:{
       isAuth(){
           return this.$store.getters['admin/isAuth']
       },
       
   },
   methods:{

       logoutUser(){
           this.$store.commit('admin/logoutUser');
       }
   }
}
</script>

<style>

</style>

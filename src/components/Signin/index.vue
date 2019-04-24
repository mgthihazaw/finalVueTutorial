<template>
    <div class="container">
       <div class="signin_container">
           <h1>signin</h1>
           <form @submit.prevent="submit">
               <div class="input_field">
                   <label for="email">Email</label>
                   <input type="email" v-model="form.email" >
               </div>
               <div class="input_field">
                   <label for="password">Password</label>
                   <input type="password" v-model="form.password">
               </div>
               <button type="submit">
                       SignIn
               </button>
           </form>
       </div>
    </div>
</template>

<script>
export default {
      data(){
          return {
              form:{
                  email:'',
                  password: ''
              }
          }
      },
      methods:{
          submit(){
             this.$store.dispatch('admin/signIn',this.form)
          }
      }
}
</script>

<style>

</style>

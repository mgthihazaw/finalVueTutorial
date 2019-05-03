<template>
  <div class="container">
    <div class="signin_container">
      <h1>signin</h1>
      <form @submit.prevent="submit">
        <div 
        class="input_field" 
        :class="{invalid :$v.form.email.$error}">
          <label for="email">Email</label>
          <input type="email" @blur="$v.form.email.$touch()" v-model.trim="form.email">
         <div v-if="$v.form.email.$error">
            <p class="error_label" v-if="!$v.form.email.required">
                This field is required
            </p>
            <p class="error_label" v-if="!$v.form.email.email">
                Please insert valid email
            </p>
         </div>
        </div>
        <div class="input_field" :class="{invalid :$v.form.password.$error}">
          <label for="password">Password</label>
          <input 
            type="password" 
            @blur="$v.form.password.$touch()"
            v-model="form.password"

            >
             <div v-if="$v.form.password.$error">
            <p class="error_label" v-if="!$v.form.password.required">
                This field is required
            </p>
            <p class="error_label" v-if="!$v.form.password.minLength">
                At least 4 characters
            </p>
         </div>
        </div>
        <button type="submit">SignIn</button>
        <p class="error_label" v-if="error">
            Something is wrong
        </p>
        <p class="error_label" v-if="authFailed" >
            Please check your email and password
            
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email ,minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
        error:false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength :minLength(4)
      }
    }
  },
  computed:{
      authFailed(){
          
          return this.$store.state.admin.authFailed
      }

  },
  destroyed(){
    this.$store.commit("admin/authFailed",'reset')
  },
  methods: {
    submit() {
    
        if(!this.$v.$invalid){
           this.$store.dispatch("admin/signIn", this.form);
            
        }
        else{
         this.error=true
         setTimeout(()=>{
             this.error=false
         },3000)
        }
      
    }
  }
};
</script>

<style>
.input_field.invalid input,
.input_field.invalid select {
  border: 1px solid red;
}
</style>

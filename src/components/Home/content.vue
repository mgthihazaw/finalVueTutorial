<template>
    <div class="container">
        <div class="home_container">
            <md-card
            v-for="(post,index) in posts"
            :key="index">
              <md-card-media>
                  <img :src="require(`../../assets/images/featured/${post.img}`)" alt="">
              </md-card-media>
              <md-card-header>
                  <h2 class="title">{{ post.title }}</h2>
                  <div class="md-subhead">{{ post.description }}</div>
              </md-card-header>
              <md-card-actions>
                  <app-button 
                  type="link" 
                  linkTo="#"
                  :addClass="['small_link']"
                  >See Review</app-button>
              </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
import posts from '../../assets/posts.js'
export default {
   data(){
       return{
           posts
       }
   }
}
</script>

<style>

</style>

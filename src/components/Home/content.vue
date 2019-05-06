<template>
    <div class="container">
        <div class="home_container">
            <md-card
            v-for="(post,index) in postData"
            :key="index">
              <md-card-media md-ratio="4:3">
                  <img :src="post.img" alt="image">
              </md-card-media>
              <md-card-header>
                  <h2 class="md-title">{{ post.title }}</h2>
                  <div class="md-subhead">{{ post.desc }}</div>
              </md-card-header>
              <md-card-actions>
                  <app-button 
                  type="link" 
                  :linkTo="`/posts/${post.id}`"
                  :addClass="['small_link']"
                  >See Review</app-button>
              </md-card-actions>
            </md-card>
        </div>

        <div class="load_more">
            <app-button type="btn" :addClass="['small_link']"
            :action="loadMore">
                Load More
            </app-button>
        </div>
    </div>
</template>

<script>
// import posts from '../../assets/posts.js'
export default {
   data(){
       return{
           posts:null
       }
   },
   computed:{
         postData(){
           return this.$store.getters['posts/getAllPosts']
         }
   },
   methods:{
       loadMore(){
           this.$store.dispatch('posts/getAllPosts',{
               limit: this.postData.length +3
           })
       }

   },
   created(){
       this.$store.dispatch('posts/getAllPosts',{
           limit : 3
       });
   }
}
</script>

<style>

</style>

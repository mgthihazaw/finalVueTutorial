<template>
    <div class="dashboard_form">
        <h1>Add Posts</h1>
        <form @submit.prevent="submitHandle">

            <div class="input_field ">
               <input
               type="file"
               @change="processFile($event)"
               >
            </div>
            <div v-if="imageUpload!=null">
                <img :src="imageUpload" >
            </div>

            <div 
            class="input_field"
            :class="{invalid: $v.formdata.title.$error}"
            >
                <label for="title">Title</label>
                <input
                 type="text"
                 @blur="$v.formdata.title.$touch()"

                 v-model="formdata.title"
                >
                <p class="error_label" v-if="$v.formdata.title.$error">
                    This input is required
                </p>
            </div>
            <div
             class="input_field"
             :class="{invalid: $v.formdata.desc.$error}"
            >
                <label for="description">Description</label>
                <input 
                 type="text"
                 @blur="$v.formdata.desc.$touch()"
                 v-model="formdata.desc"
                >
                <p class="error_label" v-if="$v.formdata.desc.$error">
                    This input field is required
                </p>
                <p class="error_label" v-if="!$v.formdata.desc.maxLength">
                    Must not be greater than {{
                        $v.formdata.desc.$params.maxLength.max
                    }} characters
                </p>
            </div>
            <div class="input_field" >
                <label for="content">Content</label>
                <wysiwyg v-model="formdata.content" />
                
                
            </div>
            <div class="input_field"
            :class="{invalid: $v.formdata.rating.$error}">
                <label for="rating">Rating</label>
                <select 
                @blur="$v.formdata.rating.$touch()"
                v-model="formdata.rating">
                <option >1</option>
                <option >2</option>
                <option >3</option>
                <option >4</option>
                <option >5</option>
                </select>
                <p class="error_label" v-if="$v.formdata.rating.$error">
                    You need to select at least One
                </p>
            </div>
            <button type="submit">Add Post</button>
        </form>

        <md-dialog :md-active="dialog">
            <p>
                Your post has no content,are you sure you want to post this
            </p>
            <md-dialog-actions>
                <md-button class="md-primary" @click="dialogOnCancel">Opp,I want to add It</md-button>
                <md-button class="md-success" @click="dialogOnConfirm">Yes,I am sure</md-button>
            </md-dialog-actions>
        </md-dialog>
        <div v-if="addpost" class="post_succesfull">
            Your post was posted
        </div>
        
    </div>
</template>

<script>
import { required, maxLength} from 'vuelidate/lib/validators';

export default {
    components:{
        
    },
    data(){
        return {
            dialog:false,
            formdata:{
                img:'',
                title:'',
                desc:'',
                content:'',
                rating:''
            }
        }
    },
    validations:{
         formdata:{
                title:{
                    required,

                },
                desc:{
                    required,
                    maxLength: maxLength(100)
                },
                
                rating:{
                    required
                }
            }
    },
    computed:{
        addpost(){
           let status= this.$store.getters['admin/addPostStatus'];
           if(status){
               this.clearPost()
           }
           return status;
        },
        imageUpload(){
            let imageUrl=this.$store.getters['admin/imageUpload'];
            return imageUrl;
        }

    },
    methods:{
        clearPost(){
            this.$v.$reset()
            this.formdata={
                title:'',
                desc:'',
                content:'',
                rating:''
            }
              
                // this.formdata.title=''
                // this.formdata.desc=''
                // this.formdata.content=''
                // this.formdata.rating=''
            
            },
        submitHandle(){
            
            if(!this.$v.$invalid){
                if(this.formdata.content==""){
                  
                  this.dialog=true;
                }
                else{
                   this.addPost();
                }
            }
            else{
                alert('Something is Wrong')
            }
        },
        dialogOnCancel(){
            this.dialog=false;
        },
        dialogOnConfirm(){
            this.dialog=false;
            this.addPost()
        },
        addPost(){
           this.$store.dispatch('admin/addPost',this.formdata)
        },
        processFile(event){
            let file=event.target.files[0];
            this.$store.dispatch('admin/imageUpload',file);
        }
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.input_field.invalid input,
.input_field.invalid select {
  border: 1px solid red;
}
</style>


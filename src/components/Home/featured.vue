<template>
  <div>
    <carousel 
        :per-page="1" 
         :paginationEnabled="true"
        :mouse-drag="true"
    >
      <slide
      v-for="(slide,index) in slides"
      :key="index">
      <div 
         class="slider_bck"
         :style="{'background' : `url(${slide.bck})`}"
      >
          <div class="gradient">
              <div class="container">
                  <div class="content">
                      <app-button 
                         type="btn"
                         linkTo="#"
                         :addClass="['hello','there']"
                         :ovStyle="{color:'yellow'}"
                         :action="trigger">
                          See Review
                      </app-button>
                      <div class="item">
                          {{slide.title}}
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import SlideOne from "../../assets/images/featured/1.jpg";
import SlideTwo from "../../assets/images/featured/2.jpg";
import SlideThree from "../../assets/images/featured/3.jpg";
import SlideFour from "../../assets/images/featured/4.jpg";

export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      slides: [
        {
          title: "Red dead redemption 2",
          bck: SlideOne
        },
        {
          title: "Watchdogs 2",
          bck: SlideTwo
        },
        {
          title: "Rise of the tomb rider",
          bck: SlideThree
        },
        {
          title: "Spider-man",
          bck: SlideFour
        }
      ]
    };
  },
  methods: {
      trigger(){
          alert('button')
      }
  }
};
</script>

<style>
</style>

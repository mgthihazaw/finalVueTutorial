<template>
    <div>
        <com-featured></com-featured>
        <com-content></com-content>
    </div>
</template>

<script>
import comFeatured from './featured.vue'
import comContent from  './content.vue'
export default {
   components: {
       comFeatured,
       comContent
   }
}
</script>

<style>

</style>

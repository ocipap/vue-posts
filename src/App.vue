<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 #app{
   height: 100%;
   width: 100%;
 }

 .wrapper{
   width: 1080px;
   margin: 0 auto;
 }
</style>

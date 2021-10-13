<template>
  <!-- <div id="nav-container"> -->
    <div id="nav" class="container is-centered nes-container">
      <!-- <router-link to="/">> Home</router-link> -->
      <router-link class="nes-text" to="/">Список дел</router-link> | 
      <router-link to="/about">О приложении</router-link>
    </div>
  <!-- </div> -->
  
  <router-view/>

</template>


<script>


export default {
  mouted() {
  }
}
</script>


<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

html {

}

body {
  padding: 0;
  margin: 0;
  padding-bottom: 30px;
  /* background-color: #ddd; */
}

.container {
  margin-top: 30px;
  max-width: 600px;
  margin: 30px auto !important;
  background-color: white;
}

#nav {
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  margin-top: 0;
  margin: 0px auto !important;
  max-width: 100%;
  text-align: left;
  border: none;
  border-bottom: 4px solid black;
}


hr {
  border: 2px dotted #ddd;
}

</style>

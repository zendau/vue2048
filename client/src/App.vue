<template>
  <Navbar/>
  <!-- <div id="nav">
   
  </div> -->
  <router-view/>
</template>

<script>
import Navbar from './components/navbar.vue'
  export default {
    data() {
        return {
            userName: null
        };
    },
    provide() {
        return {
            update: this.update
        };
    },
    methods: {
        update(value) {
            console.log("value", value);
            this.userName = value;
        },
        onClick() {
            console.log("test");
            this.$router.push("/");
        }
    },
    components: { Navbar }
}
</script>

<style lang="scss">
  body {
    background-color: #F6F6F6!important;
  }

</style>

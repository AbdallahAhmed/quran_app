<template>

    <f7-page :class="'navbar-fixed'">

        <navbar></navbar>

        <main-toolbar></main-toolbar>


        <div class="page-content">

            test

        </div>

    </f7-page>

</template>

<style>


</style>

<script>

    import Vue from 'vue';

    export default {

        data() {
            return {
                active: 0
            }
        },


        methods: {

            activate(i){
                if(this.active == i){
                    this.active = 0;
                }else{
                    this.active = i;
                }

            },

            isActivated(i){
                return i == this.active;
            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }

</script>

<template>
    <div :class="'navbar-fixed'">

        <navbar></navbar>

        <div class="loader-wrapper" v-if="false">
            <div class="preloader color-green"></div>
        </div>


        <p class="page-title">تقدمك</p>


    </div>

</template>

<script>

    export default {
        data() {
            return {};
        },
        created() {

        }, components: {
            "navbar": require("./partials/Navbar.vue"),
        },
        mounted() {


        }
    }
</script>

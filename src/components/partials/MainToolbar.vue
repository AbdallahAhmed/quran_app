<template>

    <f7-toolbar bottom-md no-shadow>

        <f7-link>
            <img src="../../assets/img/trend.png" alt="">
        </f7-link>
        <f7-link>
            <img src="../../assets/img/cup.png" alt="">
        </f7-link>

        <f7-link tab-link="#quran-tab" tab-link-active>
            <img class="main-image" src="../../assets/img/quran.png" alt="">
        </f7-link>

        <f7-link tab-link="#search-tab">
            <img src="../../assets/img/search.png" alt="">
        </f7-link>

        <f7-link tab-link="#login-tab">
            <img src="../../assets/img/user.png" class="user-avater" alt=""/>
        </f7-link>

        <!--<f7-link v-if="!$app.auth.check()" href="/login" class="user-avater">-->
            <!--<img src="/user-avater.png" alt=""/>-->
        <!--</f7-link>-->

        <!--<f7-link href="/register" class="user-avater">-->
            <!--<img src="/user-avater.png" alt=""/>-->
        <!--</f7-link>-->

        <!--<f7-link v-if="$app.auth.check()" href="/profile/me" class="user-avater">-->
            <!--<img :src="$app.auth.user().photo?$app.auth.user().photo.thumbnail:'/user-avater.png'"-->
                 <!--alt=""/>-->

    </f7-toolbar>
</template>


<style scoped>

    a.link {

        height: 100% !important;
        width: 100%;
    }

    a.link.tab-link-active {
        background: #f5f5f5;
    }

</style>

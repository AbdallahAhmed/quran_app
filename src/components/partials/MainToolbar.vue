<template>
    <f7-toolbar bottom-md no-shadow>
        <f7-link>
            <img src="../../assets/img/trend.png" alt="">
        </f7-link>
        <f7-link>
            <img src="../../assets/img/cup.png" alt="">
        </f7-link>
        <f7-link href="/quran/1">
            <img class="main-image" src="../../assets/img/quran.png" alt="">
        </f7-link>
        <f7-link href="/search">
            <img src="../../assets/img/search.png" alt="">
        </f7-link>
        <f7-link v-if="!$app.auth.check()" href="/login" class="user-avater">
            <img src="/user-avater.png" alt="" />
        </f7-link>

        <f7-link href="/register" class="user-avater">
            <img src="/user-avater.png" alt="" />
        </f7-link>

        <f7-link v-if="$app.auth.check()" href="/profile/me" class="user-avater">
            <img :src="$app.auth.user().photo?$app.auth.user().photo.thumbnail:'/user-avater.png'"
                 alt="" />
        </f7-link>
    </f7-toolbar>
</template>

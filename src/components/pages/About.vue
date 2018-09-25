<template>

    <div class="page" data-page="about">

        <div class="navbar">
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link icon-only" @click="$app.router.back()">
                        <i class="icon f7-icons">arrow-right</i>
                    </a>
                </div>
                <div class="center">
                    <a href="#" class="link">
                       {{ $app.trans('about') }}
                    </a>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <div class="page-content">
            <div class="content-block">
                <div class="avater about-us">
                    <img src="../../assets/img/logo.png" alt="">
                </div>
                <div class="about-us-content">
                    {{ $app.trans('about_message') }}
                </div>
            </div>
        </div>

    </div>

</template>

<style>

    .about-us-content{
        text-align: justify;
        direction: rtl;
    }

</style>

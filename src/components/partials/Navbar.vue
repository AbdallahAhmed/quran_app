<template>

    <div class="quran-navbar row">

        <div class="col-30">
            <slot name="left"></slot>
        </div>

        <div class="col-40 center">
            <a href="/home/quran/1" class="navbar-logo">
                <img src="../../assets/img/app-logo.png" alt="">
            </a>
        </div>

        <div class="col-30">
            <slot name="right"></slot>
        </div>

    </div>

</template>

<template>

    <div :class="'navbar-fixed page-profile'">

        <navbar></navbar>

        <!--<div class="login-page">-->

            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img :src="user.photo?user.photo.thumbnail:'user-avater.png'" class="avater"
                         alt="user avater">
                    <p v-if="check"> {{user.first_name }} {{ user.last_name }}</p>
                    <p v-if="!check">
                        <a href="/login" class="link color-green">
                            {{$app.trans('login')}}
                        </a>
                    </p>
                </div>
            </div>

            <div class="scroll-area">
                <div class="form-container">

                    <!-- UI updates -->

                    <div class="row">
                        <div class="col-50 spaceInDown">
                            <a href="/notifications" class="link btn-setting ">
                                <p>{{$app.trans('notifications')}}</p>
                                <img src="./../assets/img/alarm.png" alt="notifications">
                            </a>
                        </div>

                        <div class="col-50 spaceInDown">
                            <a href="/fav" class="link btn-setting ">

                                <p>{{$app.trans('fav')}}</p>

                                <img src="./../assets/img/fav.png" alt="Fav">

                            </a>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-50 spaceInDown">
                            <a href="/alerts" class="link btn-setting ">
                                <p>{{$app.trans('alarms')}}</p>
                                <img src="./../assets/img/stopwatch-1.png" alt="alarms">
                            </a>
                        </div>

                        <div class="col-50 spaceInDown">
                            <a href="/settings" class="link btn-setting">
                                <p>{{$app.trans('setting')}}</p>

                                <img src="./../assets/img/settings.png" alt="Fav">
                            </a>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-100 spaceInDown">
                            <a href="#" @click="share_app" class="link btn-setting">
                                <p> {{$app.trans('quran_share')}}</p>
                                <img src="./../assets/img/_share.png" alt="Fav">
                            </a>
                        </div>
                    </div>

                    <button type="submit" @click="$f7router.navigate('/editProfile')" class="link" v-if="check">
                        {{$app.trans('edit_profile')}}
                    </button>
                    <button type="submit" @click="logout" class="link" v-if="check">
                        {{$app.trans('logout')}}
                    </button>

                    <button type="submit" @click="$f7router.navigate('/login')" class="link" v-if="!check">
                        {{$app.trans('login')}}
                    </button>

                    <div class="empty-gap"></div>
                </div>
                <div class="empty-gap"></div>
            </div>
        </div>

    <!--</div>-->

</template>

<style>
    .profile-page {
        overflow: hidden;
    }
</style>

<style scoped>
    .empty-gap {
        width: 100%;
        height: 120px;
    }
</style>

<script>

    import {mapState} from 'vuex';

    export default {

        beforeCreate() {

        },

        computed: {
            check() {
                if (this.$store.getters.auth) {
                    return true;
                }
                return false;
            },
            user() {
                return this.$store.getters.user;
            }
        },

        methods: {

            logout() {
                this.$f7.dialog
                    .create({
                        title: this.$app.t("sure_logout"),
                        // text: this.$app.t(''),
                        buttons: [
                            {
                                text: this.$app.t("logout"),
                                onClick: () => {
                                    this.$store.dispatch('logout');

                                }
                            },
                            {
                                text: this.$app.t("cancel"),
                                onClick: () => {
                                    this.$f7.dialog.close();
                                }
                            }
                        ]
                    })
                    .open();
            },

            share_app() {

                new Promise((resolve, reject) => {

                    window.plugins.socialsharing.shareWithOptions({
                        message: "https://goo.gl/JqCHK6 " + this.$app.trans('share_message'),
                        subject: "https://goo.gl/JqCHK6 " + this.$app.trans('share_message'),
                        chooserTitle: this.$app.trans("choose_app")
                    }, () => {
                        resolve();
                    });

                }).then(() => {

                    this.$f7.dialog.confirm(this.$app.trans('eval_app'), () => {
                        window.open('https://play.google.com/store/apps/details?id=games.onebutton.golfbattle', '_system');
                    });

                }).catch(() => {
                    this.$f7.notification.create({
                        subtitle: this.$app.trans('error')
                    }).open();
                });

            }
        },

        components: {
            "navbar": require("./partials/Navbar.vue")
        },


    }

</script>


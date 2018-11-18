<template>

    <div class="page page-fav " data-page="fav">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="page-content" style="direction: rtl">
            <div class="row page-setting-nav">
                <div class="col-100">
                    <p>{{$app.trans('notifications')}}</p>
                </div>
            </div>

            <div class="scroll-area">
                <div class="page-container">

                    <!-- when there is no notifications -->


                    <!--

                    <div class="empty">
                        <p>{{$app.trans('no_notifications')}}</p>
                    </div>

                -->
                <div class="white-container" v-for="notification in notifications">
                    <div class="user-data">
                        <img src="../assets/img/user-photo.png" alt="">
                        <div>
                            <p>{{notification.message}}</p>
                        </div>
                    </div>
                    <div class="time">
                        <img src="../assets/img/not-clock.png" alt="">
                        <span>{{$app.trans('from')}} ساعة</span>
                    <div class="white-container">
                        <div class="user-data">
                            <img src="../assets/img/user-photo.png" alt="">
                            <div>
                                <p>دااااليا سلاااااامه</p>
                                <p>أنضم الى مسابقتك</p>
                            </div>
                        </div>
                        <div class="time">
                            <img src="../assets/img/not-clock.png" alt="">
                            <span>{{$app.trans('from')}} ساعة</span>
                        </div>
                    </div>

                    <div class="white-container">
                        <div class="user-data">
                            <img src="../assets/img/user-photo.png" alt="">
                            <div>
                                <p>دااااليا سلاااااامه</p>
                                <p>أنضم الى مسابقتك</p>
                            </div>
                        </div>
                        <div class="time">
                            <img src="../assets/img/not-clock.png" alt="">
                            <span>{{$app.trans('from')}} ساعة</span>
                        </div>
                    </div>

                    <div class="white-container">
                        <div class="user-data">
                            <img src="../assets/img/user-photo.png" alt="">
                            <div>
                                <p>دااااليا سلاااااامه</p>
                                <p>أنضم الى مسابقتك</p>
                            </div>
                        </div>
                        <div class="time">
                            <img src="../assets/img/not-clock.png" alt="">
                            <span>{{$app.trans('from')}} ساعة</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    var $vm = null;
    export default {
        data() {
            return {
                notifications: []
            }
        },
        created() {
            $vm = this;
        },
        mounted() {
            $vm.$http.get('notifications', {
                params: {
                    lang: 'ar'
                }
            }).then((res) => {
                $vm.notifications = res.body.data;
            });
        },
        components:
            {
                navbar: require("./partials/Navbar.vue")
            }
    }

</script>

<style scoped>
    .page-container {
        margin: 0 auto;
        padding: 10px 0;
        height: auto;
    }

    .white-container {
        margin-top: 15px;
        background-color: #ffffff;
        padding: 15px;
        display: flex;
        align-items: center;
    }

    .white-container .user-data img {
        width: 60px;
        border-radius: 100%;
    }

    .white-container p {
        font-size: 12px;
        font-weight: bold;
        padding: 0 5px;
        margin: 0;
    }

    .white-container .user-data {
        display: flex;
        flex: 1;
        align-items: center;
        border-left: 1px solid rgba(112, 112, 112, 0.1);
    }

    .white-container .time span {
        padding: 5px;
        font-size: 10px;
    }

    .white-container .time {
        display: flex;
        padding-right: 20px;
        align-items: center;
    }

    .ltr .white-container .user-data {
        border-left: none;
        border-right: 1px solid rgba(112, 112, 112, 0.1);
    }

    .ltr .white-container .time {
        padding-left: 20px;
        padding-right: 0;
    }

    .empty {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>

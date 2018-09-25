<template>

    <div class="page" data-page="notifications">

        <div class="navbar">
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link icon-only" @click="$app.router.back()">
                        <i class="icon f7-icons">arrow-right</i>
                    </a>
                </div>
                <div class="center">
                    <a href="#" class="link">
                        التنبيهات
                    </a>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <div class="page-content">

            <a class="notification row" @click="read(notification)" :class="{seen: notification.seen }"
               v-for="notification in notifications">

                <div class="col-10"></div>

                <div class="col-20">

                    <img v-if="notification.video.image" :src="notification.video.image.medium_thumbnail"
                         class="notification_image"/>

                    <img v-if="!notification.video.image" src="../../assets/img/videos.png" class="notification_image"/>
                </div>

                <div class="col-10"></div>

                <div class="col-60">
                    <b>
                        فيديو جديد
                    </b>

                    <div class="notification_title">
                        {{ notification.video.title }}
                    </div>
                </div>

                <div class="col-10"></div>
            </a>

            <div class="well" v-if="!loading && notifications.length == 0">
                لا توجد تنبيهات جديدة
            </div>

            <div class="infinite-scroll-preloader" :class="{active: loading}">
                <span class="preloader"></span>
            </div>
        </div>

    </div>

</template>

<script>

    export default {

        data() {
            return {
                loading: true
            }
        },

        computed: {
            notifications() {
                return this.$store.getters.notifications
            }
        },

        mounted() {

            const self = this;

            self.$store.dispatch('notifications').then(function () {
                self.loading = false;
            });
        },

        methods: {

            read(notification) {

                if (!notification.seen) {
                    this.$store.dispatch('read', notification.id);
                }

                this.$app.router.load('/video/' + notification.video.id);
            }
        }
    }

</script>


<style>

    .notification {
        border-bottom: 1px solid #dadada;
        padding: 20px 0;
    }

    .notification.seen, .notification:hover {
        background: #e8eaef;
    }

    .notification_image {
        width: 80px;
    }

    .notification_title {
        margin-top: 10px;
    }

</style>

<template>

    <div class="page no-navbar" data-page="myaccount">

        <div class="page-content infinite-scroll">
            <div class="profile">
                <div class="profile-header">
                    <div class="row">
                        <div class="col-10"></div>
                        <div class="col-30">
                            <p>
                                <a @click="$app.auth.logout()" class="link button">{{ $app.trans("logout") }}</a>
                            </p>
                        </div>
                        <div class="col-50"></div>
                        <div class="col-10">

                            <a href="/settings" class="icon-only setting-logo">
                                <i class="f7-icons">gear_fill</i>
                            </a>

                        </div>
                        <div class="col-10"></div>
                    </div>
                    <div class="avatar-container">
                        <img v-show="!$app.auth.user('photo_url')" src="../assets/img/avater.png" alt=""/>
                        <img v-show="$app.auth.user('photo_url')" :src="$app.auth.user('photo_url')" alt=""/>
                        <a href="#" @click="selectPhoto" class="link"><i class="f7-icons camera">camera_fill</i></a>
                    </div>
                    <div class="row last-row">
                        <div class="col-15"></div>
                        <div class="col-31">
                            <p>
                                <a href="/subscription" class="link button">
                                    {{ $app.trans("edit_followings") }}
                                </a>
                            </p>
                        </div>
                        <div class="col-41" v-if="$app.auth.user('provider') == null">
                            <p>
                                <a href="/edit_profile" class="link button">
                                    {{ $app.trans("edit_personal_profile") }}
                                </a>
                            </p>
                        </div>
                        <div class="col-15"></div>
                    </div>
                </div>
                <div class="profile-page">

                    <div class="tab-links tabbar">
                        <a href="#" class="tab-link active" @click="tab = 'saved-videos'"
                           data-tab="#saved">{{$app.trans('saved')}}</a>
                        <a href="#" class="tab-link" @click="tab = 'history-videos'"
                           data-tab="#history">{{$app.trans('history')}}</a>
                        <a href="#" class="tab-link" @click="tab = 'liked-videos'"
                           data-tab="#liked">{{$app.trans('liked')}}</a>
                    </div>

                    <div class="tabs">
                        <div class="tab active" id="saved">
                            <saved-videos v-if="tab=='saved-videos'"></saved-videos>
                        </div>
                        <div class="tab" id="history">
                            <history-videos v-if="tab=='history-videos'"></history-videos>
                        </div>
                        <div class="tab" id="liked">
                            <liked-videos v-if="tab=='liked-videos'"></liked-videos>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {

        data: function () {
            return {
                tab: 'saved-videos'
            };
        },



        methods: {
            selectPhoto() {

                const self = this;

                navigator.camera.getPicture(function (imageData) {

                    self.$f7.showPreloader(self.$app.trans("please_wait"));

                    self.$store.dispatch("edit_profile", {image: imageData}).then(function () {
                        self.$f7.hidePreloader();
                    });

                }, function (message) {
                    // no selected
                }, {
                    quality: 50,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    destinationType: Camera.DestinationType.DATA_URL
                });


            }
        },

        components: {
            'saved-videos': require('./tabs/SavedVideo.vue'),
            'history-videos': require('./tabs/HistoryVideos.vue'),
            'liked-videos': require('./tabs/LikedVideos.vue'),
        }
    }
</script>

<style>

    .infinite-scroll-preloader {
        margin-top: 10px;
    }

    .infinite-scroll-preloader.active {
        visibility: visible;
    }

    .page-content {
        overflow-x: hidden;
    }


</style>

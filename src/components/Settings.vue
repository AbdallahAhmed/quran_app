<template>

    <div class="page" data-page="settings">

        <div class="navbar">
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link icon-only" @click="$app.router.back()">
                        <i class="icon f7-icons">arrow-right</i>
                    </a>
                </div>
                <div class="center">
                    <a href="#" class="link">
                        {{ $app.trans('settings') }}
                    </a>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <div class="page-content">
            <div class="content-block">
                <div class="content-block-title">{{ $app.trans("general_settings") }}</div>
                <div class="list-block">
                    <ul>
                        <li>
                            <a href="#" class="item-link smart-select" data-open-in="picker"
                               :data-back-text="$app.trans('back')" data-back-on-select="true">

                                <select v-model="allow_notifications" @change="allow_notifications = $event.target.value">
                                    <option value="1" :selected="allow_notifications == 1">{{ $app.trans('enabled') }}</option>
                                    <option value="0" :selected="allow_notifications == 0">{{ $app.trans('disabled') }}</option>
                                </select>

                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">{{ $app.trans("notifications") }}</div>
                                    </div>
                                </div>

                            </a>
                        </li>

                        <li>
                            <a href="#" class="item-link smart-select" data-open-in="picker"
                               :data-back-text="$app.trans('back')" data-back-on-select="true">

                                <select v-model="video_autoplay" @change="video_autoplay = $event.target.value">
                                    <option value="1" :selected="video_autoplay == 1">{{ $app.trans('enabled') }}</option>
                                    <option value="0" :selected="video_autoplay == 0">{{ $app.trans('disabled') }}</option>
                                </select>

                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">{{ $app.trans("video_autoplay") }}</div>
                                    </div>
                                </div>

                            </a>
                        </li>

                        <li v-if="$app.auth.check()">
                            <a href="#" class="item-link"  @click="$app.auth.logout()">
                                <div class="item-content">
                                    <div class="item-inner">
                                        {{ $app.trans("logout") }}
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>

                </div>

                <div class="content-block-title">{{ $app.trans("support") }}</div>

                <div class="list-block">
                    <ul>
                        <li>
                            <a href="/about" class="item-link">
                                <div class="item-content">
                                    <div class="item-inner">
                                        {{ $app.trans("about") }}
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/contact" class="item-link">
                                <div class="item-content">
                                    <div class="item-inner">
                                        {{ $app.trans("contact") }}
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/help" class="item-link">
                                <div class="item-content">
                                    <div class="item-inner">
                                        {{ $app.trans("help") }}
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

    export default {

        computed: {

            locale: {

                get: function () {
                    return this.$store.getters.locale;
                },

                set: function (locale) {
                    this.$store.commit("locale", locale);
                }
            },

            allow_notifications: {

                get: function () {
                    return this.$store.getters.allow_notifications;
                },

                set: function (status) {
                    this.$store.commit("allow_notifications", status);

                    if(status == "1"){
                        window.FirebasePlugin.grantPermission();
                    }
                }
            },

            video_autoplay: {

                get: function () {
                    return this.$store.getters.video_autoplay;
                },

                set: function (status) {
                    this.$store.commit("video_autoplay", parseInt(status));
                }
            },

        },

        components: {
            navbar: require("./partials/Navbar.vue")
        }

    }

</script>

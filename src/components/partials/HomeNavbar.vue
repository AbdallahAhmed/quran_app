<template>
    <div class="navbar no-border navbar-home">

        <div class="navbar-inner">

            <div class="left">

                <a href="#" @click="open_notifications" class="link icon-only">
                    <i class="f7-icons">bell</i>
                    <span class="badge badge-custom bg-red" v-if="$app.auth.check() && unread > 0">
                        {{ unread }}
                    </span>
                </a>

                <a href="/search" class="link icon-only">
                    <i class="f7-icons">search_strong</i>
                </a>
            </div>

            <div class="center">
                <a href="/" class="thirty-logo"></a>
            </div>

            <div class="right">

                <a href="#"
                   data-popover=".popover-user"
                   class="link icon-only open-popover">

                    <i v-if="!$app.auth.check() || !$app.auth.user('photo_url')" class="f7-icons">person</i>

                    <img v-if="$app.auth.check() && $app.auth.user('photo_url')" class="profile-image"
                         :src="$app.auth.user('photo_url')" />

                </a>

            </div>
        </div>
    </div>
</template>

<script>

    export default {

        computed: {
            unread(){
                return this.$store.getters.unread
            }
        },

        mounted(){
            if (this.$app.auth.check()) {
                this.$store.dispatch('unread');
            }
        },

        methods: {
            open_notifications(){
                if (!this.$app.auth.check()) {
                    return this.$store.dispatch('guest_alert', true);
                }
                this.$app.router.load("/notifications");
            }
        }

    }

</script>

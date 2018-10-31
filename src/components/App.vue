<template>

    <f7-app :params="f7params" :class="{ltr : $store.getters.locale == 'en'}">

        <f7-statusbar></f7-statusbar>

        <div class="views">

            <f7-view url="/home/quran" main></f7-view>

        </div>

    </f7-app>

</template>

<script>
    import routes from "../routes.js";

    export default {
        data() {
            return {
                f7params: {
                    id: "com.dotdev.quran",
                    name: "Quran",
                    // theme: 'auto',
                    notification: {
                        icon: '<i class="f7-icons">book_fill</i>',
                        title: this.$app.trans("quran"),
                        subtitle: "",
                        closeButton: true,
                        closeTimeout: 3000
                    },
                    dialog: {
                        title: this.$app.trans("quran"),
                        buttonOk: this.$app.trans("ok"),
                        buttonCancel: this.$app.trans("cancel"),
                    },
                    material: true,
                    routes: routes
                }
            };
        }
    };
</script>

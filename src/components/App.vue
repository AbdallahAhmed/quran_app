<template>

    <f7-app :params="f7params">

        <f7-statusbar></f7-statusbar>

        <div class="views">

            <f7-view url="/quran/1" main></f7-view>

        </div>

    </f7-app>

</template>

<script>

    import routes from '../routes.js'

    export default {

        data() {
            return {
                f7params: {
                    id: 'com.dotdev.quran',
                    name: 'Quran',
                    theme: 'auto',
                    routes: routes
                },
            }
        }

    }

</script>

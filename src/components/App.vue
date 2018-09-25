<template>

    <f7-app :params="f7params">

        <f7-statusbar></f7-statusbar>

        <div class="views">

            <f7-view url="/" main></f7-view>

        </div>

    </f7-app>

</template>

<script>

    import routes from '../routes.js'

    export default {

        data() {
            return {
                f7params: {
                    id: 'io.framework7.testapp',
                    name: 'Framework7',
                    theme: 'auto',
                    routes: routes,
                },
            }
        }

    }

</script>

<template>

    <div :class="'navbar-fixed page-login page-profile'">

        <div class="login-page">
            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img src="../assets/img/user-avater.png" class="avater" alt="user avater">
                    <p> {{user.first_name}} </p>
                </div>
            </div>

            <div class="form-container">

                <span class="help" v-if="serverErrors.length!=0" v-for="error in serverErrors" :key="error">
                    {{error}}
                </span>


                <div class="row">
                    <div class="col-50">
                        <a href="/fav">
                            <img src="./../assets/img/fav.png" alt="Fav">
                            <p>المفضلة</p>
                        </a>
                    </div>
                    <div class="col-50">
                        <img src="./../assets/img/alarm.png" alt="Fav">
                        <p>التبيهات</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-50">

                        <a href="/settings">
                            <img src="./../assets/img/settings.png" alt="Fav">
                            <p>الاعدادات</p>
                        </a>
                    </div>
                    <div class="col-50">
                        <img src="./../assets/img/_share.png" alt="Fav">
                        <p> انشر القرأن</p>
                    </div>
                </div>

                <button type="submit">
                    تعديل الملف الشخصى
                </button>

            </div>
        </div>

    </div>

</template>

<style>


</style>

<script>

    import {mapState} from 'vuex';

    export default {
        beforeCreate() {
            if (this.$app.auth.check()) {
                this.$f7router.back();
            }
        },
        data: function () {
            return {
                user: this.$app.auth.user(),
                serverErrors: []
            }
        },
        methods: {},
        computed: {}
    }

</script>


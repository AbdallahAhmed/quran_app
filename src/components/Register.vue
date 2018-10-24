<template>

    <f7-page :class="'navbar-fixed page-login page-register'">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="login-page">
            <div class="header-islamic row">
                <div class="header-islamic-content">
                    <img src="../assets/img/user-avater.png" @click="addPhotoImage" class="avater" alt="user avater" ref="image">
                    <p>إنشاء حساب </p>
                </div>
            </div>

            <div class="form-container">

                <span class="help" v-if="serverErrors.length!=0" v-for="error in serverErrors" :key="error">
                    {{error}}
                </span>
                <form @submit.prevent="register">

                    <input type="text" :class="{'errors':errors.has('password')&&submitted}" name="name"
                           placeholder=" الأسم كامل " v-model="user.name"
                           v-validate="'required|alpha_spaces'" autocomplete="false"/>

                    <span v-show="errors.has('email')&&submitted"
                          class="help is-danger">{{ errors.first('name') }}</span>


                    <input type="text" :class="{'errors':errors.has('password')&&submitted}" name="email"
                           placeholder=" البريد الكترونى " v-model="user.email"
                           v-validate="'required|email'" autocomplete="false"/>

                    <span v-show="errors.has('email')&&submitted"
                          class="help is-danger">{{ errors.first('email') }}</span>


                    <input type="password" :class="{'errors':errors.has('password')&&submitted}" name="password"
                           placeholder="كلمة المرور" v-model="user.password"
                           v-validate="'required'" autocomplete="false"/>

                    <span v-show="errors.has('password')&&submitted" class="help is-danger">{{ errors.first('password') }}</span>


                    <input type="password" :class="{'errors':errors.has('confirm_password')&&submitted}"
                           name="confirm_password" placeholder="تاكيد كلمة المرور" v-model="user.confirm_password"
                           v-validate="'confirmed:password'" autocomplete="false"/>

                    <span v-show="errors.has('confirm_password')&&submitted" class="help is-danger">{{ errors.first('confirm_password') }}</span>

                    <button type="submit">
                        سجل
                    </button>

                </form>


            </div>
        </div>

    </f7-page>

</template>

<style scoped>



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

                user: {
                    email: "",
                    password: "",
                    confirm_password: "",
                    name: "",
                    image_data: ""
                },
                serverErrors: [],
                submitted: false
            }
        },
        methods: {
            register() {
                this.submitted = true;
                var self = this;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        self.$f7.preloader.show();

                        var userData = self.user;
                        userData.lang = "ar";
                        self.$store.dispatch('register', userData).then((response) => {
                            self.$f7router.navigate('/home/quran/1');
                            self.$f7.preloader.hide();
                        }, (res) => {
                            self.serverErrors = res.body.errors;
                            self.$f7.preloader.hide();
                        });
                        return;
                    }

                });
                return false;
            },
            addPhotoImage() {

                navigator.camera.getPicture((imageData) => {
                    this.user.image_data = imageData;
                    this.$refs.image.src=imageData;
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
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }

</script>


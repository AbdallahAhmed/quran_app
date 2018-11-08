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
                    <img src="../assets/img/Repeat Grid 17@2x.png" @click="addPhotoImage" class="avater"
                         alt="user avater"
                         ref="image">
                    <p>{{$app.trans('add_user')}}</p>
                </div>
            </div>

            <div class="form-container">

                <form @submit.prevent="register">

                    <div class="input-border">
                        <input type="text" name="name"
                               :placeholder="$app.trans('attributes.name') " v-model="user.name"
                               v-validate="'required|alpha_spaces'" autocomplete="false"/>
                    </div>

                    <div class="input-border">
                        <input type="text" name="email"
                               :placeholder="$app.trans('attributes.email') " v-model="user.email"
                               v-validate="'required|email'" autocomplete="false"/>
                    </div>

                    <div class="input-border">
                        <input type="password" name="password"
                               :placeholder="$app.trans('attributes.password')" v-model="user.password"
                               v-validate="'required'" autocomplete="false"/>
                    </div>

                    <div class="input-border">
                        <input type="password" name="confirm_password"
                               :placeholder="$app.trans('attributes.confirm_password')"
                               v-model="user.confirm_password"
                               v-validate="'required'" autocomplete="false"/>
                    </div>

                    <button type="submit" class="link" @click.prevent="register">
                        {{$app.trans('signup')}}
                    </button>

                </form>


            </div>
        </div>

    </f7-page>

</template>

<style >
.green-title .dialog-title{
    color: #36734a;
}

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
                submitted: false
            }
        },
        methods: {
            register() {

                this.submitted = true;

                var self = this;


                if (this.user.password != this.user.confirm_password) {
                    return self.$f7.notification.create({
                        subtitle: this.$app.trans('password_mismatched')
                    }).open();
                }

                this.$validator.validateAll(this.user).then((valid) => {

                    if (valid) {

                        self.$f7.dialog.preloader(self.$app.trans('login_loading'));

                        var userData = self.user;

                        userData.lang = "ar";

                        self.$store.dispatch('register', userData).then((response) => {
                           let dialog = this.$f7.dialog
                                .create({
                                    title: this.$app.t("welcome_message"),
                                    buttons: [],
                                    cssClass:"green-title"
                                })
                                .open();

                           setTimeout(()=>{
                               dialog.close(true)
                               self.$f7router.navigate('/home/quran/1');
                           },2000);
                        }, (res) => {
                            self.$f7.notification.create({
                                subtitle: res.data.errors[0]
                            }).open();
                        }).then(() => {
                            self.$f7.dialog.close();
                        });

                    } else {

                        self.$f7.notification.create({
                            subtitle: self.$validator.errors.items[0].msg
                        }).open();

                        self.$f7.dialog.close();
                    }

                });

                return false;
            },

            addPhotoImage() {


                navigator.camera.getPicture((imageData) => {
                    this.user.image_data = "data:image/jpeg;base64," + imageData;
                    this.$refs.image.src = "data:image/jpeg;base64," + imageData;
                }, function (message) {
                    // no selected
                }, {
                    quality: 100,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    targetHeight: 150,
                    targetWidth: 150,
                    encodingType: Camera.EncodingType.JPEG,
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


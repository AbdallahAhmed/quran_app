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
                    <img src="user-avater.png" @click="addPhotoImage" class="avater"
                         alt="user avater"
                         ref="image">

                    <p>{{$app.trans('edit_profile')}}</p>
                </div>
            </div>

            <div class="form-container">

                <form @submit.prevent="updateProfile">

                    <div class="input-border">
                        <input type="text" :class="{'errors':errors.has('password')&&submitted}" name="name"
                               :placeholder="$app.trans('attributes.name')" v-model="user.name"
                               v-validate="'required|alpha_spaces'" autocomplete="false"/>
                    </div>

                    <div class="input-border">
                        <input type="password" :class="{'errors':errors.has('password')&&submitted}" name="password"
                               :placeholder="$app.trans('attributes.password')" v-model="user.password" autocomplete="false"
                               v-validate="passwordRules"
                        />
                    </div>

                    <div class="input-border">
                        <input type="password" :class="{'errors':errors.has('confirm_password')&&submitted}"
                               name="confirm_password" :placeholder="$app.trans('attributes.confirm_password')" v-model="user.confirm_password"
                               v-validate="re_passwordRules" autocomplete="false"

                        />
                    </div>

                    <button type="submit" class="link" @click.prevent="updateProfile">
                        {{$app.trans('save')}}
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
                    password: "",
                    confirm_password: "",
                    name: this.$store.getters.user.first_name + ' ' + this.$store.getters.user.last_name,
                    image_data: "",
                },
                submitted: false,
            }
        },
        methods: {
            updateProfile() {

                this.submitted = true;

                var self = this;

                if (this.user.password != this.user.confirm_password) {
                    return self.$f7.notification.create({
                        subtitle: this.$app.trans('password_mismatched')
                    }).open();
                }

                this.$validator.validateAll(this.user).then((valid) => {

                    if (valid) {

                        self.$f7.dialog.preloader(self.$app.trans('saving'));

                        var userData = self.user;

                        userData.lang = "ar";

                        self.$store.dispatch('profileUpdate', userData).then((response) => {
                            self.$f7router.back();
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
                    targetWidth:150,
                    encodingType:Camera.EncodingType.JPEG,
                    allowEdit: true,
                    destinationType: Camera.DestinationType.DATA_URL
                });
            }
        },

        computed: {
            passwordRules() {
                return this.user.password.length > 0 || this.user.confirm_password.length > 0 ? 'required' : '';
            },
            re_passwordRules() {
                return this.user.password.length > 0 || this.user.confirm_password.length > 0 ? 'required' : '';
            }
        },
        mounted() {
            this.$refs.image.src = this.$store.getters.user.photo ? this.$store.getters.user.photo.thumbnail : 'user-avater.png'
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        }
    }

</script>


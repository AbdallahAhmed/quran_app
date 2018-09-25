<template>

    <div>

        <div class="page" data-page="edit_profile">

            <div class="navbar">
                <div class="navbar-inner">
                    <div class="left">
                        <a href="#" class="link icon-only" @click="$app.router.back()">
                            <i class="icon f7-icons">arrow-right</i>
                        </a>
                    </div>
                    <div class="center">
                        <a href="#" class="link">
                            {{ $app.trans('edit_profile') }}
                        </a>
                    </div>
                    <div class="right"></div>
                </div>
            </div>


            <div class="page-content">

                <!-- Login form -->

                <form @submit.prevent="update">

                    <div class="list-block">

                        <ul>
                            <!-- Name -->

                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon f7-icons">person</i></div>
                                    <div class="item-inner">
                                        <div class="item-title label">{{ $app.trans('first_name') }}</div>
                                        <input name="name" autocomplete="off"
                                               v-validate="'required|min:2|max:20'"
                                               v-model="user.name"
                                               type="text" :placeholder="$app.trans('first_name')">

                                    </div>
                                </div>
                            </li>

                            <!-- Email -->

                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon f7-icons">email</i></div>
                                    <div class="item-inner">
                                        <div class="item-title label">{{ $app.trans('email') }}</div>
                                        <div class="item-input">
                                            <input name="email" autocomplete="off" v-validate="'required|email'"
                                                   v-model="user.email"
                                                   type="email"
                                                   :placeholder="$app.trans('email')">
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <!-- Password -->

                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon f7-icons">lock</i></div>
                                    <div class="item-inner">
                                        <div class="item-title label">{{ $app.trans('password') }}</div>
                                        <div class="item-input">
                                            <input name="password" autocomplete="off" v-validate="'required|min:8'"
                                                   v-model="user.password"
                                                   type="password" :placeholder="$app.trans('password')">
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <!-- Confirm Password -->

                            <li>
                                <div class="item-content">
                                    <div class="item-media"><i class="icon f7-icons">lock</i></div>
                                    <div class="item-inner">
                                        <div class="item-title label">{{ $app.trans('confirm_password') }}</div>
                                        <div class="item-input">
                                            <input name="repassword" autocomplete="off"
                                                   v-validate="'required|confirmed:password|min:8'"
                                                   v-model="user.repassword"
                                                   type="password" :placeholder="$app.trans('confirm_password')">
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>

                        <f7-block>

                            <button style="width: 100%" type="submit"
                                    class="button button-big button-fill bg-dark-gray"
                                    :disabled="submitted">{{ $app.trans('register') }}
                            </button>

                        </f7-block>

                    </div>

                </form>


            </div>

        </div>

    </div>

</template>


<script>

    export default {

        computed: {
            user(){
                return this.$store.getters.user;
            }
        },

        data: function () {
            return {
                submitted: false
            }
        },

        methods: {

            update: function () {

                const self = this;

                self.$f7.showPreloader(self.$app.trans('please_wait'));

                self.submitted = true;

                self.$validator.validateAll(this.user).then(function (valid) {

                    if (valid) {

                        self.user.image = "";

                        self.$store.dispatch("edit_profile", self.user).then(function () {
                            // 200 ok response
                            self.$f7.addNotification({
                                title: self.$app.trans('edit_profile'),
                                message: self.$app.trans('edit_profile_success'),
                                hold: 2500
                            });
                        }, function (response) {
                            // other responses
                            self.$f7.addNotification({
                                title: self.$app.trans('edit_profile'),
                                message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
                                hold: 8000
                            });
                        }).then(function (response) {
                            self.submitted = false;
                            self.$f7.hidePreloader();
                        });

                    } else {

                        self.$validator.errors.items.reverse().forEach(function (error) {
                            self.$f7.addNotification({
                                title: self.$app.trans('edit_profile'),
                                message: error.msg,
                                hold: 8000
                            });
                        });

                        self.submitted = false;
                        self.$f7.hidePreloader();
                    }
                });
            }


        }
    }

</script>

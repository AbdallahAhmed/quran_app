<template>

    <div class="page" data-page="contact">

        <div class="navbar">
            <div class="navbar-inner">
                <div class="left">
                    <a href="#" class="link icon-only" @click="$app.router.back()">
                        <i class="icon f7-icons">arrow-right</i>
                    </a>
                </div>
                <div class="center">
                    <a href="#" class="link">
                        {{ $app.trans('contact') }}
                    </a>
                </div>
                <div class="right"></div>
            </div>
        </div>

        <div class="page-content">
            <form onsubmit="return false">
                <div class="row">
                    <div class="col-10"></div>
                    <div class="col-80">
                        <div class="list-block">
                            <ul>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-input">
                                                <input autocomplete="off" v-validate="'required'"
                                                       v-model="fullname"
                                                       type="text"
                                                       name="name"
                                                       :placeholder="$app.trans('form_name')">

                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-input">
                                                <input name="email" autocomplete="off" v-validate="'required|email'"
                                                       v-model="email"
                                                       type="email" :placeholder="$app.trans('email')">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-input">
                                                <input autocomplete="off" v-validate="'required'"
                                                       v-model="subject"
                                                       name="form_subject"
                                                       type="text"
                                                       :placeholder="$app.trans('form_subject')">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-input">
                                    <textarea autocomplete="off" name="form_messages" v-validate="'required'"
                                              v-model="message" :placeholder="$app.trans('form_messages')"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <f7-block>
                                <button style="width: 100%" type="submit" @click="submit"
                                        class="button" :style="{background:'rgb(47, 47, 47) !important',color:'white'}"
                                        :disabled="submitted">{{ $app.trans('form_send') }}
                                </button>
                            </f7-block>

                        </div>
                    </div>
                    <div class="col-10"></div>
                </div>
            </form>
        </div>

    </div>

</template>
<script>
    export default {
        data() {
            return {
                fullname: '',
                email: '',
                subject: '',
                message: '',
            }
        },
        methods: {
            submit() {
                var self = this;
                self.$validator.validateAll().then(function (valid) {

                    if (valid) {
                        var data = {
                            name: self.fullname,
                            email: self.email,
                            subject: self.subject,
                            content: self.message
                        }
                        self.$store.dispatch("contactus", data)

                            .then(function (response) {

                                // 200 ok response

                                self.$f7.addNotification({
                                    title: self.$app.trans('contact'),
                                    message: self.$app.trans('contact_success'),
                                    hold: 2500
                                });

                                self.fullname = '';
                                self.email = '';
                                self.subject = '';
                                self.message = '';

                            }, function (response) {

                                // other responses

                            }).then(function (response) {
                            self.$f7.hidePreloader();
                        });

                    } else {

                            self.$f7.closeNotification();

                            self.$f7.addNotification({
                                title: self.$app.trans('contact'),
                                message: self.$validator.errors.items[0].msg,
                                hold: 3000
                            });

                        self.$f7.hidePreloader();
                    }

                });
                return false;
            }
        }
    }
</script>
<style scoped>
    ul::before {
        content: normal;
    }

</style>

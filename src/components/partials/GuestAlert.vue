<template>
    <div class="custom-alert" :style="styleCss">

        <a class="link close-icon" @click="close">
            <i class=" f7-icons">close</i>
        </a>

        <div class="row no-gutter custom-alert-inner">
            <div class="col-66 message" id="customer-alert-message">
                {{$app.trans('follow_message')}}
            </div>

            <div class="col-25">
                <a class="button button-fill" @click="goLogin"> {{$app.trans('follow_us')}}</a>
            </div>
        </div>

    </div>
</template>

<style scoped>


    .close-icon{
        float: left;
        font-size: 23px;
        position: absolute;
        top: -8px;
        width: 35px;
        text-align: left;
        height: 26px;
    }

</style>

<script>
    export default {
        computed: {
            styleCss: function () {
                this.classUpdate();
                return {
                    display: this.$store.getters.guest_alert ? 'block' : 'none',
                    // 'animation-name': this.$store.getters.guest_alert ? 'fadeInUp' : ''
                }
            },
        },
        methods: {
            goLogin: function () {
                this.$app.router.load('/login');
                this.$store.dispatch('guest_alert', false);
            },
            classUpdate: function () {
                const self = this;
                self.$$(self.$el).find('.custom-alert').addClass('fadeInUp');
                self.$$(self.$el).find('.custom-alert').removeClass('spaceInDown');
            },
            close: function () {
                const self = this;
                this.$store.dispatch('guest_alert', false).then(function () {
                    self.$$(self.$el).find('.custom-alert').removeClass('fadeInUp');
                    self.$$(self.$el).find('.custom-alert').addClass('spaceInDown');
                })
            }
        },
    }

</script>

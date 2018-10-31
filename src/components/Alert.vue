<template>

    <div class="page page-setting " data-page="settings">

        <navbar>
            <template slot="left">
                <a @click="back" class="link navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="page-content">

            <div class="row page-setting-nav">
                <div class="col-80">
                    <p>{{$app.trans('alarms')}}</p>
                </div>
                <div class="col-20 center"></div>
            </div>

            <div class="" style="direction: rtl">

                <div class="block block-strong no-padding no-margin margin-bottom" style="direction: ltr">
                    <div id="demo-picker-date-container"></div>
                </div>


                <div class="page-container">

                    <a class="item-link smart-select smart-select-init closeOnSelect" data-open-in="sheet">

                        <select :value="occur" v-model="occur">
                            <option value="0">{{$app.trans('never')}}</option>
                            <option value="1">{{$app.trans('daily')}}</option>
                        </select>

                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title">{{$app.trans('repetition')}}</div>
                            </div>
                        </div>

                    </a>

                </div>
            </div>
        </div>
    </div>
</template>

<style>

    .picker-item span, .item-title {
        color: black;
    }

    .picker-item-selected span {
        color: green;
        font-family: initial !important;
    }

    .picker-column {
        padding-left: 20px;
    }

    .picker-center-highlight {
        display: none;
    }

    .item-after {
        background: white;
        border: 1px solid #e6e6e6;
        padding: 0;
        margin: 0;
        max-width: 100% !important;
        color: #000;
        margin-top: 15px !important;
        height: 37px;
        padding: 6px 14px;
        line-height: 32px;
    }

    .item-after::after {
        content: '\25BC';
        float: left;
        font-size: 12px;
        margin-top: 5px;
        margin-left: 9px;
    }

    .picker-columns {
        background: #ffffff;
    }

    .block-strong .picker-item span {
        color: #757575;
        font-family: tahoma !important;
    }

    .block-strong .picker-item.picker-item-selected span {
        color: #207249;
    }

    .smart-select-sheet .toolbar {
        display: none;
    }

    .sheet-modal {
        height: unset;
    }

</style>
<script>

    export default {
        data() {
            return {
                picker: null,
                occur: this.$store.getters.alert_at.occur
            }
        },

        computed: {

            alert_at: {

                get: function () {
                    return this.$store.getters.alert_at;
                },
            },


        },

        components: {
            navbar: require("./partials/Navbar.vue")
        },
        mounted() {

            var today = new Date();

            var alert_at = this.alert_at;

            var currentHour = alert_at.hour ? alert_at.hour : (today.getHours() >= 12 ? today.getHours() - 12 : today.getHours());
            var cuurentMin = alert_at.min ? alert_at.min : (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
            var currentTime = alert_at.time ? alert_at.time : (today.getHours() < 12 ? "AM" : "PM");

            this.picker = this.$f7.picker.create({
                containerEl: '#demo-picker-date-container',
                toolbar: false,
                rotateEffect: true,
                momentumRatio: 7,

                value: [
                    currentHour, cuurentMin, currentTime
                ],
                cols: [
                    // Hours
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = 0; i <= 12; i++) {
                                arr.push(i);
                            }
                            return arr;
                        })(),
                    },
                    // Minutes
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = 0; i <= 59; i++) {
                                arr.push(i < 10 ? '0' + i : i);
                            }
                            return arr;
                        })(),
                    }, {
                        values: (function () {
                            return ["AM", "PM"]
                        })()
                    }
                ],
            });

        },

        methods: {

            back() {

                new Promise((resolve, reject) => {

                    this.$f7router.back()

                    var now = new Date();

                    this.$store.commit("alert_at", {
                        occur: this.occur,
                        hour: this.picker.value[0],
                        min: this.picker.value[1],
                        time: this.picker.value[2],
                    });

                    // Once

                    var nextDate = (new Date());

                    nextDate.setHours(this.alert_at.time == "AM" ? this.alert_at.hour : (parseInt(this.alert_at.hour) + 12));

                    nextDate.setMinutes(this.alert_at.min);

                    if (nextDate <= now) {
                        nextDate.setDate(now.getDate() + 1);
                    }


                    if (this.occur == 0) {

                        if (cordova) {
                            cordova.plugins.notification.local.clearAll();
                            cordova.plugins.notification.local.schedule({
                                title: this.$app.trans('reminder_never'),
                                trigger: {at: nextDate},
                                foreground: true
                            }, undefined, undefined, {skipPermission: true});
                        }

                    }

                    if (this.occur == 1) {

                        if (cordova) {
                            cordova.plugins.notification.local.clearAll();
                            cordova.plugins.notification.local.schedule({
                                title: this.$app.trans('reminder_daily'),
                                foreground: true,
                                repeat: 'daily',
                                date: nextDate
                            }, undefined, undefined, {skipPermission: true});
                        }


                    }

                }).then(() => {

                }).catch(() => {

                    this.$f7.notification.create({
                        subtitle: this.$app.trans('error')
                    }).open();
                });


            }
        }

    }

</script>

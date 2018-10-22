<template>

    <div class="page page-setting " data-page="settings">

        <navbar></navbar>

        <div class="page-content">
            <div class="row page-setting-nav">
                <div class="col-80">
                    <p>التبيهات</p>
                </div>
                <div class="col-20 center">
                    <a class="link" @click="back"> <i class="f7-icons size-22 back-icon color-white">chevron_left</i>
                    </a>
                </div>
            </div>


            <div class="page-container" style="direction: rtl">

                <div class="block block-strong no-padding no-margin margin-bottom" style="direction: ltr">
                    <div id="demo-picker-date-container"></div>
                </div>


                <a class="item-link smart-select smart-select-init" data-open-in="sheet">

                    <select :value="occur" v-model="occur">
                        <option value="0">أبدا</option>
                        <option value="1">يوميأ</option>
                    </select>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title">تكرار</div>
                        </div>
                    </div>

                </a>

            </div>
        </div>
    </div>
</template>

<style>
    .picker-item span, .item-title {
        color: black;
        font-family: initial !important;
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
        padding: 5px;
        padding-right: 20px;
        width: calc(100% - 33px) !important;
        margin: auto;
        max-width: 100% !important;
        color: #000;
        margin-top: 15px !important;
    }

    .item-after::after {
        content: '\25BC';
        float: left;
        font-size: 12px;
        margin-top: 5px;
        margin-left: 9px;
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
            var currentTime = alert_at.time ? alert_at.time : (today.getHours() < 12 ? "Am" : "Pm");
            this.picker = this.$f7.picker.create({
                containerEl: '#demo-picker-date-container',
                // inputEl: '#demo-picker-date',
                toolbar: false,
                rotateEffect: true,
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
                            return ["Am", "Pm"]
                        })()
                    }
                ],
            });
        },

        methods: {
            back() {
                var now = new Date();
                this.$store.commit("alert_at", {
                    occur: this.occur,
                    hour: this.picker.value[0],
                    min: this.picker.value[1],
                    time: this.picker.value[2],
                });


                if (this.alert_at.occur == 0) {
                    var nextDate = (new Date());

                    nextDate.setHours(this.alert_at.time == "Am" ? this.alert_at.hour : (parseInt(this.alert_at.hour) + 12));
                    nextDate.setMinutes(this.alert_at.min);

                    if (nextDate <= now) {
                        nextDate.setDate(now.getDate() + 1);
                    }

                    console.log(nextDate);
                    if (cordova) {
                        cordova.plugins.notification.local.clearAll();
                        cordova.plugins.notification.local.schedule({
                            title: ' تنبيه قرأن',
                            trigger: {at: nextDate},
                            foreground: true
                        }, undefined, undefined, {skipPermission: true});
                    }

                }

                // if daily
                if (this.alert_at.occur == 1) {
                    if (cordova) {
                        cordova.plugins.notification.local.clearAll();
                        cordova.plugins.notification.local.schedule({
                            title: ' تنبيه قرأن',
                            trigger: {
                                every: {
                                    minute: parseInt(this.alert_at.min),
                                    hour: this.alert_at.time == "Am" ? this.alert_at.hour : (parseInt(this.alert_at.hour) + 12)
                                }
                            },
                            foreground: true
                        }, undefined, undefined, {skipPermission: true});
                    }

                }

                this.$f7.dialog.alert('done');

                this.$store.commit("home_tab", "login");
                this.$f7router.back();
            }
        }

    }

</script>

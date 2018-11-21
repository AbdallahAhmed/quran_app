<template>
    <div :class="'navbar-fixed  page-khatima'">

        <navbar></navbar>


        <p class="page-title">{{$app.t('progress')}}</p>

        <a class="link popup-open" href="#" data-popup=".popup-about">Open About Popup</a>

        <popup v-on:updateItem="update" :items="[{text: 'sunday' , checked: true}, {text: 'monday' , checked:false}]"></popup>

        <div class="scroll-area">
            <div class="loader-wrapper">
                <div class="preloader color-green" v-if="loading"></div>
            </div>

            <div class="khatima-list">
                <div class="khatima-wrapper">
                    <h1 class="khatima-title" v-if="completed" @click="openPopup(completed.id)">
                        {{$app.t("last_khatma")}}</h1>

                    <div class="row info" v-if="completed">
                        <div class="col-50">
                            <div class="row">
                                <!--UI update , col-100 instead og the other -->
                                <div class="col-100">
                                    <img src="./../assets/img/noun_calender_652711.png"/>
                                </div>
                                <div class="col-100">
                                    <span>{{$app.t('started_at')}}</span>
                                    <span>{{moment(completed.created_at).format('YYYY/MM/DD')}} </span>
                                </div>
                            </div>

                        </div>
                        <div class="col-50">
                            <div class="row">
                                <div class="col-100">
                                    <img src="./../assets/img/clock.png"/>
                                </div>
                                <div class="col-100">
                                    <span>{{$app.t('completed_at')}}</span>
                                    <span>{{moment(completed.completed_at).format('YYYY/MM/DD')}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 class="khatima-title" v-if="pending" @click="openPopup(pending)">
                        {{$app.t("curr_khatma")}}</h1>

                    <div class="row info" v-if="pending">
                        <div class="col-50">
                            <div class="row">
                                <!--UI update , col-100 instead og the other -->
                                <div class="col-100">
                                    <img src="./../assets/img/doc.png"/>
                                </div>
                                <div class="col-100">
                                    <span>{{$app.t('page')}} {{len(pending.pages)}}</span>
                                    <span>{{$app.t('read')}}</span>
                                </div>
                            </div>

                        </div>
                        <div class="col-50">
                            <div class="row">
                                <div class="col-100">
                                    <img src="./../assets/img/doc.png"/>
                                </div>
                                <div class="col-100">
                                    <span>{{$app.t('page')}} {{pending.remaining_pages}}</span>
                                    <span>{{$app.t('remaining')}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="gauge  gauge-khatima gauge-khatima-current" v-if="pending" data-type="circle"
                         :data-value="percentage(pending.pages)" data-value-text="" data-size="120"
                         data-border-width="4" data-border-color="#f5be3a">

                        <p class="gauge-content">
                            <span> {{$app.t('spent')}}</span>
                            <span>{{remianing_time}}</span>
                        </p>

                    </div>

                    <div class="row footer" v-if="pending">
                        <div class="col-100">
                            <p>{{hours}} {{$app.t('hours_left')}} {{$app.t('and')}} {{minutes}} {{ $app.t('minutes')}}</p>
                        </div>
                        <span class="khatma-av"> {{$app.t('av_khatma')}} </span>
                    </div>
                </div>
                <button class="btn-quran btn-send" v-if="completed" @click="share">
                    {{$app.t('send_thawaab')}}
                </button>
            </div>

            <div class="empty-gap"></div>
        </div>

    </div>
</template>


<style scoped>

    .mg-clear {
        margin-bottom: 15px !important;
    }

    .mg-top {
        margin-top: 21px;
    }

    .empty-gap {
        width: 100%;
        height: 70px;
    }

    .no-khatma {
        padding: 15px;
        font-weight: bold;
        justify-content: center;
    }

    .khatma-av {
        font-size: 0.9em;
        opacity: 0.4;
        padding: 20px;
        display: block;
        margin: 0 auto;
    }

    .gauge-content {
        width: 50%;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
</style>

<script>
    import moment from "moment";
    import eventBus from "./../events";

    export default {
        data() {
            return {
                /*khatemas: {
                              completed: [],
                              pending: null,
                          },
                          last_khatema: {},*/
                popup: null,
                loading: false,
                khatema_popup: {}
            };
        },
        computed: {
            completed() {
                return this.$store.state.completed_khatema;
            },
            pending() {
                return this.$store.getters.current_khatema;
            },
            hours() {
                return Math.floor(10-(this.len(this.pending.pages)/60))
            },
            minutes() {
                return  ((10-(this.len(this.pending.pages)/60) - this.hours) * 60).toFixed(0)
            },
            remaining_hours() {
                return Math.floor(this.len(this.pending.pages)/60)
            },
            remaining_minutes() {
                return  (((this.len(this.pending.pages)/60) - this.remaining_hours) * 60).toFixed(0)
            },
            remianing_time() {
                return this.remaining_hours + " : " + this.remaining_minutes
            }
        },
        watch: {
            pending() {
                this.$$(".gauge-khatima").each((index, item) => {
                    this.$f7.gauge.create(Object.assign({}, item.dataset, {el: item}));
                });
            }
        },
        methods: {
            update(index) {console.log(index)},
            percentage(pages) {
                return this.parse(pages).length / 604;
            },
            parse(pages) {
                return typeof pages == "string" ? JSON.parse(pages) : pages;
            },

            len(pages) {
                return this.parse(pages).length;
            },

            moment(...arg) {
                return moment(...arg);
            },
            share() {
                new Promise((resolve, reject) => {
                    window.plugins.socialsharing.shareWithOptions({
                        message: this.$app.trans("share_thawab"),
                        subject: this.$app.trans("share_thawab"),
                        chooserTitle: this.$app.trans("choose_app")
                    });
                })
                    .then(() => {
                        // Nothing
                    })
                    .catch(() => {
                        this.$f7.notification
                            .create({
                                subtitle: this.$app.t("err")
                            })
                            .open();
                    });
            }
        },
        components: {
            navbar: require("./partials/Navbar.vue"),
            popup: require("./partials/remind-popup.vue")
        },
        mounted() {
            this.$$(".gauge-khatima").each((index, item) => {
                this.$f7.gauge.create(Object.assign({}, item.dataset, {el: item}));
            });
        }
    };
</script>
<template>
    <div :class="'navbar-fixed  page-khatima'">

        <navbar></navbar>

        <p class="page-title">{{$app.t('progress')}}</p>

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

                <div class="gauge  gauge-khatima gauge-khatima-current"
                     v-if="pending"
                     data-type="circle"
                     :data-value="percentage(pending.pages)"
                     data-value-text=""
                     data-size="120"
                     data-border-width="4"
                     data-border-color="#f5be3a">

                    <p class="gauge-content">
                        <span> {{$app.t('spent')}}</span>
                        <span>{{((len(pending.pages)/60).toFixed(1))}}</span>
                        <span>{{$app.t('hours')}}</span>
                    </p>

                </div>

                <div class="row footer" v-if="pending">
                    <div class="col-100">
                        <p>{{$app.t('hours_left')}} {{(10-(len(pending.pages)/60)).toFixed(1)}}</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="empty-gap">

        </div>
        <div v-if="khatema_popup" class="popup popup-khatima">
            <div class="page" :class="'page-khatima'">
                <navbar>
                    <template slot="left">
                        <a href="" class="link  navbar-back" @click="popup.close()">
                            <i class="f7-icons">arrow_left</i>
                        </a>
                    </template>
                </navbar>
                <p class="page-title">{{$app.t('progress')}}</p>

                <div class="page-content">
                    <div class="khatima-list mg-top">

                        <div class="khatima-wrapper">
                            <h1 class="khatima-title">
                                {{$app.t("last_khatma")}}</h1>
                            <div class="row info">
                                <div class="col-50">
                                    <div class="row">
                                        <div class="col-30">
                                            <img src="./../assets/img/noun_calender_652711.png"/>
                                        </div>
                                        <div class="col-70">
                                            <span>{{$app.t('started_at')}}</span>
                                            <span>{{moment(khatema_popup.created_at).format('YYYY/MM/DD')}} </span>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-50">
                                    <div class="row">
                                        <div class="col-30">
                                            <img src="./../assets/img/clock.png"/>
                                        </div>
                                        <div class="col-70">
                                            <span>{{$app.t('completed_at')}}</span>
                                            <span>{{moment(khatema_popup.completed_at).format('YYYY/MM/DD')}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="gauge gauge-khatima"
                                 data-type="circle"
                                 data-value="1"
                                 data-value-text=""
                                 data-size="120"
                                 data-border-width="4"
                                 data-border-color="#f5be3a">

                                <p class="gauge-content">
                                    <span>{{$app.t('spent')}}</span>
                                    <span>10</span>
                                    <span>{{$app.t('hours')}}</span>
                                </p>
                            </div>
                            <div class="row footer mg-clear">
                                <div class="col-100">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <button class="btn-quran btn-send link">
                            {{$app.t('send_thawaab')}}
                        </button>
                    </div>

                </div>


            </div>
        </div>
    </div>
</template>


<style scoped>
    .page-title {
        margin-bottom: 18px;
    }

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
</style>

<script>

    import moment from 'moment';
    import eventBus from './../events';

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
                "khatema_popup": {},
            };
        },

        created() {
            this.$$('.gauge-khatima').each((index, item) => {
                this.$f7.gauge.create(Object.assign({}, item.dataset, {el: item}))
            });
        },
        computed: {
            completed() {
                return this.$store.state.completed_khatema
            },
            pending() {
                return this.$store.getters.current_khatema
            }
        },
        watch: {
            pending() {
                this.$$('.gauge-khatima').each((index, item) => {
                    this.$f7.gauge.create(Object.assign({}, item.dataset, {el: item}))
                });
            }
        },
        methods: {

            percentage(pages) {
                console.log(this.parse(pages).length / 604);
                return this.parse(pages).length / 604

            },
            parse(pages) {
                return (typeof pages) == "string" ? JSON.parse(pages) : pages;

            },

            len(pages) {
                return this.parse(pages).length
            },

            moment(...arg) {
                return moment(...arg);
            },
            openPopup(id) {
                this.khatema_popup = this.khatemas.completed.find((item) => {
                    return item.id == id;
                });


                this.popup.open()

            },
            fetchData() {
                this.$http.get("khatemas").then((response) => {

                    this.khatemas = response.data.data;
                    this.loading = false;
                    this.last_khatema = this.khatemas.completed.pop();

                }, () => {
                    this.khatemas.pending = this.$store.getters.current_khatema;
                    this.khatemas.completed = JSON.parse(localStorage.getItem("completed_khatema")) || [];
                    this.loading = false;


                }).then(() => {
                    this.$$('.gauge-khatima').each((index, item) => {
                        this.$f7.gauge.create(Object.assign({}, item.dataset, {el: item}))
                    });

                }, () => {

                    this.$$('.gauge-khatima').each((index, item) => {
                        this.$f7.gauge.create(Object.assign({}, item.dataset, {el: item}))
                    });

                });

            }
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
        },
        mounted() {
            this.popup = this.$f7.popup.create({
                el: '.popup-khatima'
            });
        }
    }
</script>
<template>
    <div :class="'navbar-fixed  page-khatima'">

        <navbar></navbar>

        <p class="page-title">{{$app.t('progress')}}</p>

        <div class="loader-wrapper">
            <div class="preloader color-green" v-if="loading"></div>
        </div>

        <div class="khatima-list" v-if="!loading">

            <div class="khatima-wrapper">
                <h1 class="khatima-title">{{$app.t('curr_khatma')}}</h1>

                <div class="gauge  gauge-khatima gauge-khatima-current"
                     data-type="circle"
                     :data-value="percentage(khatemas.pending.pages)"
                     data-value-text=""
                     data-size="120"
                     data-border-width="4"
                     data-border-color="#f5be3a">

                    <p class="gauge-content">
                        <span> {{$app.t('spent')}}</span>
                        <span>{{((len(khatemas.pending.pages)/60).toFixed(1))}}</span>
                        <span>{{$app.t('hours')}}</span>
                    </p>

                </div>

                <div class="row footer">
                    <div class="col-100">
                        <p>{{(10-(len(khatemas.pending.pages)/60)).toFixed(1)}} {{$app.t('hours_left')}}</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="khatima-list" v-for="khtma in this.khatemas.completed" :key="khtma.id">

            <div class="khatima-wrapper">
                <h1 class="khatima-title">{{$app.t("last_khatma")}}</h1>
                <div class="row info">
                    <div class="col-50">
                        <div class="row">
                            <div class="col-30">
                                <img src="./../assets/img/noun_calender_652711.png"/>
                            </div>
                            <div class="col-70">
                                <span>{{$app.t('started_at')}}</span>
                                <span>{{moment(khtma.created_at).format('YYYY/MM/DD')}} </span>
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
                                <span>{{moment(khtma.completed_at).format('YYYY/MM/DD')}}</span>
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
                <div class="row footer">
                    <div class="col-100">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<style>
    .page-title {
        margin-bottom: 18px;
    }
</style>

<script>

    import moment from 'moment';

    export default {

        data() {
            return {
                khatemas: {
                    completed: [],
                    pending: {}
                },
                loading: false
            };
        },

        created() {

            this.loading = true;

            this.$http.get("khatemas").then((response) => {

                this.khatemas = response.data.data;
                this.loading = false;

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
        },

        methods: {

            percentage(pages) {

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
            }
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
        }
    }
</script>
1

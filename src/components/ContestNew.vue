<template>
    <f7-page :class="'page-khatima'">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>
        <p class="page-title">{{$app.t('create_contest')}}</p>

        <form class="from-container" @submit.prevent="submit" :style="$app.t('dir')">
            <label class="mar-10-h">{{$app.t('contest_name')}}</label>
            <input class="new-contest-input" name="name" v-model="contest.name" :class="{'err':errors.name}"/>
            <label class="mar-10-h">{{$app.t('contest_goal')}}</label>
            <textarea class="new-contest-input new-contest-textarea" name="gaol" v-model="contest.goal"
                      :class="{'err':errors.goal}"/>
            <div class="row d2" :style="$app.t('dir')">
                <div class="col-50">
                    <label>{{$app.t('start_date')}}</label>


                    <div class="calendar-style">
                        <input type="text" readonly="readonly" class="new-contest-input col-100"
                               @change="updateStartDate"
                               id="start-date" name="start_date" :class="{'err':errors.start_date}"/>
                        <img src="../assets/img/calender-gray.png" alt="">
                    </div>


                </div>
                <div class="col-50">
                    <label>{{$app.t('end_date')}}</label>


                    <div class="calendar-style">
                        <input type="text" readonly="readonly" class="new-contest-input col-100" @change="updateEndDate"
                               id="end-date" name="end_date" :class="{'err':errors.end_date}"/>
                        <img src="../assets/img/calender-gray.png" alt="">

                    </div>

                </div>
            </div>

            <div class="row d2" :style="$app.t('dir')">


                <form class="row width-100 select-guz-sura">
                    <div class="col-50 juz">
                        <label class="check-container">
                            {{$app.t('juz')}}
                            <input type="radio" name="select" value="juz" @change="changeSelected">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="col-50 surah">
                        <label class="check-container popup-open link" data-popup=".popup-about">
                            {{$app.t('surah')}}
                            <input type="radio" name="select" value="surah" @change="changeSelected">
                            <span class="checkmark"></span>
                        </label>
                        <popup v-on:updateItem="update" :items="suras"></popup>
                    </div>
                </form>

                <div class="row width-100" v-bind:class="{fromToJuz: !juz}">
                    <div class="col-50">
                        <label>{{$app.t('from_juz')}}</label>
                        <input type="number" min="0" max="30" v-model="contest.juz_from"
                               class="new-contest-input col-100"
                               :class="{'err':errors.juz_from}"/>
                    </div>
                    <div class="col-50">
                        <label>{{$app.t('to_juz')}}</label>
                        <input type="number" min="0" max="30" v-model="contest.juz_to" class="new-contest-input col-100"
                               :class="{'err':errors.juz_to}"/>
                    </div>

                </div>


                <button class="contest-button green" href="/newcontest">
                    {{$app.t("create_contest")}}
                </button>
                <button @click.prevent="submit('share')" class="contest-button yellow " href="/newcontest">
                    {{$app.t('create_contest_and_share')}}
                </button>
            </div>

        </form>
    </f7-page>
</template>

<script>
    import moment from "moment";
    import mixin from "../mixin.js";

    export default {
        mixins: [mixin],
        data() {
            return {
                loading: false,
                contest: {},
                errors: {},
                juz: false,
                suras: [],
                selected_suras: [],
                fetched_suras: [],
            };
        },

        mounted() {
            if (window.getFileAsJson) {
                window.getFileAsJson('surat.json').then((data) => {
                    data.data.map(sura => {
                        this.suras.push({
                            text: this.$store.getters.locale == "ar" ? sura.name : sura.englishname,
                            checked: false,
                            id: sura.id
                        })
                    })
                }, () => {
                })
            } else {
                this.$http.get('surat', {}).then((res) => {
                    res.body.map(sura => {
                        this.suras.push({
                            text: this.$store.getters.locale == "ar" ? sura.name : sura.englishname,
                            checked: false,
                            id: sura.id
                        })
                    })
                });
            }


            /*this.$store.dispatch("get_surat").then((response) => {
                this.surat = [response.data.data];
            });*/
            /*this.fetched_suras.map(sura => {
                this.suras.push({text: sura, checked: false})
            });*/

            this.$f7.calendar.create({
                inputEl: "#start-date",
                dateFormat: "yyyy-mm-dd",
                // value: [new Date()],
                closeOnSelect: true
            });
            this.$f7.calendar.create({
                inputEl: "#end-date",
                dateFormat: "yyyy-mm-dd",
                closeOnSelect: true
            });
        },
        methods: {
            updateEndDate({target: {value}}) {
                this.contest.expired_at = value;

            },
            updateStartDate({target: {value}}) {
                this.contest.start_at = value;
            },
            submit(withSahre) {
                if (this.contest.type == "surah") {
                    this.selected_suras = this.suras.filter(item => item.checked);
                    this.contest.surat = [];
                    this.selected_suras.map(y => {
                        this.contest.surat.push(y.id);
                    });

                }
                this.loading = true;
                this.validate().then(valid => {
                    if (valid) {
                        this.contest.start_at += " 00:00:00";
                        this.contest.expired_at += " 23:59:59";
                        this.$f7.dialog.preloader(this.$app.t("creating_contest"));

                        this.$store
                            .dispatch("createContest", this.contest)
                            .then(response => {
                                setTimeout(() => this.$f7router.back(), 500);
                                if (withSahre === "share") {
                                    this._share(this.contest.name);
                                }
                            })
                            .catch(err => {
                                this.$f7.notification
                                    .create({
                                        subtitle: this.$app.t("error")
                                    })
                                    .open();
                            })
                            .finally(() => {
                                setTimeout(() => this.$f7.dialog.close(), 500);
                            });
                    } else {
                        this.$f7.notification
                            .create({
                                subtitle: this.$app.t("error_check_red")
                            })
                            .open();

                        this.$f7.dialog.close();
                    }
                });

                return false;
            },
            validate() {
                this.errors = {};
                return new Promise((resolve, reject) => {
                    if (!(this.contest.name && this.contest.name.length > 0)) {
                        this.errors.name = true;
                    }
                    if (!(this.contest.start_at && this.contest.start_at.length > 0)) {
                        this.errors.start_date = true;
                    }
                    if (!(this.contest.expired_at && this.contest.expired_at.length > 0)) {
                        this.errors.end_date = true;
                    }
                    if (
                        !(
                            this.contest.expired_at &&
                            this.contest.start_at &&
                            (moment(this.contest.expired_at).isAfter(this.contest.start_at) ||
                                this.contest.expired_at === this.contest.start_at)
                        )
                    ) {
                        this.errors.start_date = true;
                        this.errors.end_date = true;
                    }

                    if (this.juz) {
                        if (!(this.contest.juz_from && this.contest.juz_from > 0)) {
                            this.errors.juz_from = true;
                        }
                        if (!(this.contest.juz_to && this.contest.juz_to > 0)) {
                            this.errors.juz_to = true;
                        }
                        if (
                            !(
                                this.contest.juz_from &&
                                this.contest.juz_to &&
                                parseInt(this.contest.juz_from) < parseInt(this.contest.juz_to)
                            )
                        ) {
                            this.errors.juz_from = true;
                            this.errors.juz_to = true;
                        }
                    }

                    if (Object.keys(this.errors).length > 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
            },


            changeSelected(event) {
                let value = event.target.value;
                this.contest.type = value;
                if (value === 'juz') {
                    this.juz = true
                }
                else {
                    this.juz = false
                }
            },

            update(index) {
                console.log(index)
                /*this.suras[index].checked = !this.suras[index].checked;*/
            },

        },
        components: {
            navbar: require("./partials/Navbar.vue"),
            popup: require("./partials/remind-popup.vue")
        }
    };
</script>

<style scoped>
    .from-container {
        padding-bottom: 70px !important;
    }

    .new-contest-input {
        width: 80%;
        display: block;
        padding: 10px;
        margin: 20px auto;
        background: #faf8f8;
        border: #d3d2d2 solid 1px;
        margin-top: 10px;
    }

    .new-contest-textarea {
        width: calc(80% + 20px);
    }

    .d2 {
        width: calc(80% + 26px);
        margin: 0 auto;
    }

    .mar-10-h {
        width: calc(80% + 20px);
        display: block;
        margin: 0 auto;
        margin-top: 20px;
    }

    label {
        font-weight: bold;
        margin-top: 20px;
        font-size: 1.3em;
    }

    .contest-button {
        height: 55px;
        border: none;
        color: white;
        font-size: 100%;
        margin-bottom: 20px;
    }

    .yellow {
        background: #f6c624;
    }

    .green {
        background-color: #37734a;
    }

    .err {
        border: red 1px solid;
    }

    .calendar-style {
        position: relative;
    }

    .calendar-style img {
        width: 16px;
        position: absolute;
        top: 16px;
        left: 10px;
        padding-right: 10px;
        border-right: 1px solid rgba(112, 112, 112, 0.2);

    }

    .ltr .calendar-style img {
        left: auto;
        right: 10px;
        border-left: 1px solid rgba(112, 112, 112, 0.2);
        border-right: none;
        padding-left: 10px;
        padding-right: 0;
    }

    .select-guz-sura {
        padding: 15px 0;
        text-align: center;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(112, 112, 112, 0.2) transparent rgba(112, 112, 112, 0.2) transparent;
        margin-bottom: 20px;
    }

    .select-guz-sura .check-container {
        position: relative;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: inline-block;
        margin: 0;
        width: 100%;
    }

    .select-guz-sura div:first-of-type {
        border-left: 1px solid rgba(112, 112, 112, 0.2);
    }

    .ltr .select-guz-sura div:first-of-type {
        border-right: 1px solid rgba(112, 112, 112, 0.2);
        border-left: none;
    }

    .fromToJuz {
        display: none;
    }

    .select-guz-sura input:checked ~ .checkmark:after {
        display: block;
    }

    .select-guz-sura input:checked ~ .checkmark {
        background-color: #207249;
    }

    .checkmark {
        position: absolute;
        top: 10px;
        height: 8px;
        width: 8px;
        border: 3px solid #207249;
    }

    .select-guz-sura input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .juz .check-container {
        padding-right: 10px;
    }

    .juz .checkmark {
        right: 48px;
    }

    .surah .checkmark {
        right: 28px;
    }

</style>

<style>
    .preloader-inner-gap {
        display: none !important;
        width: 0px !important;
    }
</style>

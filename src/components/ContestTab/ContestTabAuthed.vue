<template>
    <div style="direction: rtl" class="contest-wrapper">
        <p class="page-title">
            <span class="row"><a class="left"> المسابقات</a>
            <a href="/allcontests" class="link right">الكل المسابقات</a>

            </span>
        </p>
        <div class="page-container">
            <div class="contest-cards-comming" v-if="showed">
                <div class="contest-cards-list swiper-comming">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide contest-cards-item" v-for="contest  in contests.all">
                            <a class="title">{{contest.name}}</a>
                            <div class="contest-goal">
                                {{contest.goal}}
                            </div>
                            <span class="time">{{toTime(contest.expired_at)}}</span>
                            <a class="share link">
                                <img src="./../../assets/img/share-black.png" alt="share">
                            </a>
                            <a class="contest-button link" v-if="!contest.is_joined">
                                دخول المسابقة
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <p class="page-title">
            <span class="row">
                 <a class="col-70"> المسابقة المنضم ليها</a>
            </span>
            </p>

            <div class="contest-current">
                <div class="contest-cards-item" v-if="current&&current.id">
                    <div class="row">
                        <a class="title col-50">{{current.name}}</a>
                        <span class="time col-30">{{toTime(current.expired_at)}}</span>
                        <a class="share link col-20">
                            <img src="./../../assets/img/share-black.png" alt="share">
                        </a>
                    </div>
                    <div class="row">
                        <div class="contest-goal col-50">
                            {{current.goal}}
                        </div>
                        <a class="contest-button link col-50">
                            خروج
                        </a>
                    </div>
                </div>
                <div v-if="!(current&&current.id)" class="row contest-cards-item contest-current">
                    <p>أبدأ فى ثواب جديد وقم بإنشاء مسابقة مع أصدقائك و عائلتك</p>
                    <a class="contest-button link col-1col-50">
                        أنشاء مسابقة جديد
                    </a>
                </div>
            </div>


            <p class="page-title">
            <span class="row"><a class="left"> المسابقات</a>
            <a href="#" class="link right">الكل المسابقات</a>

            </span>
            </p>


            <div class="contest-cards-old" v-if="showed">
                <div class="contest-cards-list swiper-comming" v-for="contest in contests.expired">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide contest-cards-item">
                            <div class="kas">
                                <img class="kas-img" src="../../assets/img/Group 1034@2x.png"/>

                            </div>
                            <a class="title">{{contest.name}}</a>
                            <div class="contest-goal">{{contest.goal}}</div>

                            <div class="member-number">
                                {{contest.member_counter}} عضو انضموا
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        data() {
            return {
                first_time: true,
                loading: false
            }
        },
        computed: {
            showed() {
                return this.first_time ? this.$store.getters.home_tab == 'competition' : true;
            },
            contests() {
                return this.$store.getters.contests_authed_tab;
            },
            current() {
                return this.$store.getters.current_contest;

            }
        },
        created() {
            this.loading = true;
            this.$store.dispatch('getAuthedContests').then(() => {
                this.loading = false;
            })
        },
        mounted() {

        },
        updated() {
            if (this.first_time && this.showed) {
                var swiper = this.$f7.swiper.create('.swiper-comming', {
                    spaceBetween: 0,
                    slidesPerView: 'auto'
                })

                this.first_time = false;
            }
        },
        methods: {
            toTime(time) {
                let s = moment.duration(moment(time).diff(moment(), 'seconds'));
                return `${parseInt(s / 3600)}:${parseInt(s / 60) % 60}:${s % 60}`
            }
        }
    }
</script>

<style scoped>

</style>

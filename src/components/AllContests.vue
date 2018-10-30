<template>
    <f7-page :class="'page-khatima'">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="loader-wrapper" v-if="false">
            <div class="preloader color-green"></div>
        </div>

        <p class="page-title">كل المسابقات</p>
        <div class="infinite-scroll-content infinite-scroll-bottom" style="padding-bottom: 50px">
            <div class="row contest-wrapper " v-for="(contest, index) in contests">
                <div class="col-100 contest-card">
                    <div class="col-100 margin-bottom contest">
                        <div class="col-40 display-inline-block">
                            <div class="col-100" >
                                <a :href="'/contest/'+contest.id"><h1>{{contest.name}}</h1></a>
                            </div>
                            <div class="col-100">{{contest.creator.first_name}} {{contest.creator.last_name}}</div>
                        </div>
                        <div class="col-20 text-align-center display-inline-block">
                            <div>
                        <span>
                            <img src="./../assets/img/share-black.png" alt="share">
                        </span>
                            </div>
                            <div style="opacity: 0;">
                                <label>1</label>
                            </div>

                        </div>
                        <div class="col-40 text-align-left	display-inline-block">
                            <div>
                                <i class="f7-icons" style="font-size: 18px">
                                    time
                                </i>
                                <label>{{contest.remaining_time}}</label>
                            </div>
                            <div>
                            <span>
                                <img src="./../assets/img/share-black.png" alt="share">
                            </span>
                                <label>{{contest.member_counter}} عضو</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="currentContest && contest.id == currentContest.id">
                        <div class="col-100 margin-bottom">
                            <button @click="leave" class="btn btn-quran">خروج</button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="col-100 margin-bottom">
                            <button class="btn btn-quran" @click="join(index)">أنضم</button>
                        </div>
                        <div class="col-100 margin-bottom">
                            <button class="btn btn-quran" style="background-color: #F5D42F">
                                تجاهل
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </f7-page>
</template>

<script>
    export default {
        data() {
            return {
                contests: [],
                currentContest: null,
                offset: 0,
                limit: 6,
            }
        },
        created() {
            this.loadContests();
        },
        methods: {
            handleScroll(event) {
                alert()
            },
            loadContests() {
                this.$http.get('contests', {
                    params: {
                        'offset': this.offset,
                        'limit': this.limit
                    }
                }).then((res) => {
                    var contests = res.body.data;

                    for (let key in contests) {
                        if (key != 'current') {
                            if ('current' in contests && contests[key].id == contests['current'][0].id) {
                                this.contests.unshift(contests[key]);
                            } else {
                                this.contests.push(contests[key]);
                                this.offset += 1;
                            }
                        } else
                            this.currentContest = contests[key][0];
                    }
                });
            },
            leave() {
                this.$f7.dialog.confirm('هل تريد الخروج من المسابقة ؟', () => {
                    this.$http.post('contests/leave', {
                        'contest_id': this.currentContest.id
                    }).then(() => {
                        this.currentContest = null;
                    });
                });

            },
            join(id) {
                this.$f7.dialog.confirm(
                    this.currentContest ? 'هل تريد الأنضمام في هذه المسابقة و الخروج من المسابقة الأخرى ؟' : 'هل تريد الأنضمام في هذه المسابقة ؟'
                    , () => {
                        this.$http.post('contests/join', {
                            'contest_id': this.contests[id].id
                        }).then(() => {
                            this.currentContest = this.contests[id];
                        });
                    });
            },
        },
        components: {
            "navbar":
                require("./partials/Navbar.vue"),
            "main-toolbar":
                require("./partials/MainToolbar.vue")
        }
        ,
    }
</script>

<style scoped>

    .contest-card {
        background-color: white;
        padding: 10px
    }

    .contest-wrapper {
        direction: rtl;
        padding: 10px;

    }

    .contest-wrapper .contest-card .contest {
        margin: 0 auto;
    }
    .contest a{
        color: inherit;
    }

</style>
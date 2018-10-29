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
        <div class="row contest-wrapper" v-for="contest in contests">
            <div class="col-100 contest-card">
                <div class="col-100 margin-bottom contest">
                    <div class="col-40 display-inline-block">
                        <div class="col-100">
                            <label>{{contest.name}}</label>
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
                            <i class="f7-icons">
                                time
                            </i>
                            <label>06:26:08</label>
                        </div>
                        <div>
                            <span>
                                <img src="./../assets/img/share-black.png" alt="share">
                            </span>
                            <label>11 عضو</label>
                        </div>
                    </div>
                </div>
                <div class="col-100 margin-bottom">
                    <button class="btn btn-quran">أنضم</button>
                </div>
                <div class="col-100 margin-bottom">
                    <button class="btn btn-quran" style="background-color: #F5D42F">تجاهل</button>
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
                currentContest: {}
            }
        },
        created() {

        },
        mounted() {
            this.$http.get('contests')
                .then((res) => {
                    this.contests = res.body.data;
                });
        },
        components: {
            "navbar": require("./partials/Navbar.vue"),
            "main-toolbar": require("./partials/MainToolbar.vue")
        },
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

</style>
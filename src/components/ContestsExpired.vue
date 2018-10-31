<template>
    <f7-page :class="'page-khatima'">

        <navbar>
            <template slot="left">
                <a href="" class="link back navbar-back">
                    <i class="f7-icons">arrow_left</i>
                </a>
            </template>
        </navbar>

        <div class="loader-wrapper" v-if="!contests.length">
            <div class="preloader color-green"></div>
        </div>
        <div v-else>
            <p class="page-title">كل المسابقات</p>
            <div class="scroll-area">
                <vue-scroll @load-start="loadmore">
                    <div class="infinite-scroll-content infinite-scroll-bottom" style="padding-bottom: 50px">
                        <div class="row contest-wrapper " v-for="contest in contests" :key="contest.id">
                            <div class="col-55">
                                <h1 class="contest-title">{{contest.name}}</h1>
                                <div class="ex-date">
                                    <img width="50" height="50" src="./../assets/img/noun_calender_652711.png" >
                                    <div>
                                        <h4 class="ex-date-title">تاريخ الانتهاء</h4>
                                        <h5 class="ex-date-date">{{moment(contest.expired_at)}}</h5>
                                    </div>                                
                                </div>
                            </div>
                            <div class="col-45 kas-col" :style="'border-right: gray 1px solid; padding-right:20px;'">
                                <img class="kas-img" src="../assets/img/Group 1034@2x.png" />
                                <h4 class="winer-name">تاريخ الانتهاء</h4>                            
                            </div>
                        </div>
                    </div>
                </vue-scroll>
            </div>

        </div>

    </f7-page>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    contests() {
      return this.$store.getters.expiredContests;
    }
  },
  created() {
    this.$store.getters.expiredContests.length ? null : this.loadContests();
  },
  methods: {
    loadmore(_, __, done) {
      this.loadContests().then(data => {
        if (!data.length) done();
      });
    },
    loadContests() {
      return this.$store.dispatch("loadExpiredContests");
    },
    moment(...args) {
      return moment(...args).format("YYYY/MM/DD");
    },
  },
  components: {
    navbar: require("./partials/Navbar.vue"),
    "main-toolbar": require("./partials/MainToolbar.vue")
  }
};
</script>

<style scoped>

.kas-col{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
}
.contest-wrapper {
  direction: rtl;
  padding: 10px;
  background-color: #fff;
  margin: 20px;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
}
.contest-title{
  font-size: 1.5em;
  color: black;
}
.winer-name{
  font-size: 1.1em;
  color: black;
  margin: 0px;
  margin-top: 10px;
}
.ex-date{
  display: flex;
  justify-content: flex-start;
  padding: 5px;
}
.ex-date-title{
  color: #37734a;
  font-size: 1.1em;
  margin: 5px;
  margin-top: -4px;
}
.ex-date-date{
  color: gray;
  font-size: 1em;
  margin: 5px;
}
.scroll-area {
  height: 36rem;
  overflow: auto;
}
</style>
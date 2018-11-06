<template>
  <div>
    <p class="page-title"> <span>{{$app.t('contests')}}</span>  </p>

    <div style="padding-bottom:50px">
      <div class="contest-card-unauthed row" v-for="contest in contests" :key="contest.id" @click="openDetails(contest.id)">
        <div class="jastfy-img col-30">
          <div style="direction:rtl">
            <img class="kas-img" src="../../assets/img/noun_users_140450@2x.png" />
            <span style="font-size:14px; margin-top:3px; margin-left: 3px;">{{contest.member_counter}}</span>
            <span> {{$app.t('member')}} </span>
          </div>
        </div>
        <div class="col-50">
          <strong>
            <h1 class="contest-title">{{contest.name}}</h1>
          </strong>
          <h2 class="contest-text"> {{contest.goal}}</h2>
        </div>
        <div class="col-20 jastfy-img">
          <img class="kas-img" src="../../assets/img/Group 1034@2x.png" />
        </div>
      </div>

    </div>
    <div class="loader-wrapper" v-if="loading">
      <div class="preloader color-green"></div>
    </div>
    <div v-if="!loading&&contests.length===0" class="searchbar-hide-on-search">
      <p><label>{{$app.t('no_contests')}}</label></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      last:false
    };
  },
  computed: {
    contests() {
      return this.$store.getters.contests;
    }
  },
  methods: {
    openDetails(id) {
      this.$f7router.navigate(`/contest/${id}`);
    },
    loadmore() {
      this.loading = true;
      this.$store.dispatch("getContests").then( data => {
        this.loading = false;
        if(data.length == 0){
          this.last = true;
        }
      });
    }
  },
  created() {
    if (this.$store.getters.contests.length === 0) {
      this.$store.dispatch("getContests").then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
  mounted() {
    this.Dom7(".page-content").on("scroll", e => {
      var elem = this.Dom7(e.currentTarget);

      if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight() && !this.loading && !this.last) {
        // loadmore
        this.loadmore();
      }
    });
  }
};
</script>

<style scoped>
.contest-card-unauthed {
  height: 100px;
  background-color: white;
  width: 90%;
  margin: 20px auto;
  text-align: justify;
}
.jastfy-img {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.kas-img {
  max-height: 25px;
  margin: 0 auto;
  display: block;
}
.contest-text,
.contest-title {
  text-align: right;
}
.contest-title {
  font-size: 20px;
  margin-bottom: 0px;
}
.contest-text {
  font-weight: 100;
  margin-top: 0px;
  word-break: break-all;
}
.page-content {
  height: auto;
  padding-bottom: 50px;
}
.page-title a {
  float: left;
  color: #fff;
  margin-left: 20px;
  margin-top: 7px;
}
</style>

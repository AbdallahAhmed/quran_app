<template>
  <f7-page :class="'page-khatima'">

    <navbar />

    <div  :style="$app.t('dir')">
      <p class="page-title">{{$app.t('all_contests')}}</p>
      <div class="scroll-area">
        <div v-if="contests.length" style="padding-bottom: 50px">
          <div class="row contest-wrapper " v-for="contest in contests" :key="contest.id">
            <div class="col-100 contest-card">
              <div class="col-100 margin-bottom contest">
                <div class="col-40 display-inline-block">
                  <div class="col-100">
                    <a :href="'/contest/'+contest.id">
                      <h1>{{contest.name}}</h1>
                    </a>
                  </div>
                  <div class="col-100">{{contest.creator.first_name}}
                    {{contest.creator.last_name}}
                  </div>
                </div>
                <div class="col-20 text-align-center display-inline-block">
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
                      <img src="../../assets/img/person.png" alt="share">
                    </span>
                    <label>{{contest.member_counter}} {{$app.t('member')}}</label>
                  </div>
                </div>
              </div>

              <div class=" margin-bottom">
                <button class="col-33 btn btn-quran btn-margin flex-align" @click="join(contest.id)">
                  <div>{{$app.t('share')}}</div>
                  <div class="paddingtop10">
                    <img src="../../assets/img/share_y.png" alt="share">
                  </div>
                </button>
                <!-- <button @click="leave(contest.id)" class="col-50 btn btn-quran btn-margin" v-if="contest.is_joined">{{$app.t('quit')}}</button> -->
                <button class="col-50 btn btn-quran btn-margin" @click="join(contest.id)" v-if="!contest.is_joined">{{$app.t('enroll')}}</button>
              </div>

            </div>
          </div>
          <div class="gap" v-if="done" ></div>
          <div class="loader-wrapper" :hidden="!loading">
            <div class="preloader color-green" :hidden="!loading"></div>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
import mixin from "../../mixin";

export default {
  mixins: [mixin],

  data() {
    return {
      loading: true,
      last: false,
      done: false
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
    loadmore(_, __, done) {
      this.loading = true;
      this.$store.dispatch("getContests").then(data => {
        this.loading = false;

        if (data.length == 0) {
          this.done = true;
        }
      });
    },
    join() {
      this.$f7.dialog
        .create({
          title: this.$app.t("login_or_register"),
          // text: this.$app.t(''),
          buttons: [
            {
              text: this.$app.t("login"),
              onClick: () => {
                this.$f7router.navigate("/login");
              }
            },
            {
              text: this.$app.t("signup"),
              onClick: () => {
                this.$f7router.navigate("/register");
              }
            },
            {
              text: this.$app.t("cancel"),
              onClick: () => {
                this.$f7.dialog.close();
              }
            }
          ]
        })
        .open();
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
    this.Dom7(".scroll-area").on("scroll", e => {
          var elem = this.Dom7(e.currentTarget);
          // console.log(
          //   elem.scrollTop() + elem.outerHeight() >= elem[0].scrollHeight
          // );
          if (
            elem.scrollTop() + elem.outerHeight() >= elem[0].scrollHeight &&
            !this.loading &&
            !this.done
          ) {
            // loadmore
            this.loadmore();
          }
        });
  },
  components: {
    navbar: require("../partials/Navbar.vue")
  }
};
</script>

<style scoped>
.loader-wrapper{
  margin-bottom: 100px;
}
.md .preloader {
  background: #207249;
}
.contest-card {
  background-color: white;
  padding: 10px;
}

.contest-wrapper {
  direction: rtl;
  padding: 10px;
}

.contest-wrapper .contest-card .contest {
  margin: 0 auto;
}

.contest a {
  color: inherit;
}

.btn-margin {
  margin-left: 8px;
}

.scroll-area {
  height: calc(100vh - 100px;);
  padding-bottom: 0px;
  overflow: auto;
}
.flex-align {
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}
.paddingtop10 {
  padding-top: 10px;
}
.btn-quran.flex-align {
  padding-bottom: 4px;
  padding-top: 4px;
}
</style>

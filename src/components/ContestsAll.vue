<template>
  <f7-page :class="'page-khatima all-cont'">

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
    <div v-else :style="$app.t('dir')">
      <p class="page-title">{{$app.t('all_contests')}}</p>
      <div class="scroll-area">
        <vue-scroll @load-start="loadmore">
          <div class="infinite-scroll-content infinite-scroll-bottom">
            <div class="row contest-wrapper " v-for="contest in contests" :key="contest.id || 'gap'">
              <div v-if="contest.id" class="col-100 contest-card">
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
                        <img src="./../assets/img/person.png" alt="share">
                      </span>
                      <label>{{contest.member_counter}} {{$app.t('member')}}</label>
                    </div>
                  </div>
                </div>

                <div class=" margin-bottom">
                  <button class="col-33 btn btn-quran btn-margin flex-align" @click="join(contest.id)">
                    <div>{{$app.t('share')}}</div>
                    <div class="paddingtop10">
                      <img src="./../assets/img/share_y.png" alt="share">
                    </div>
                  </button>
                  <button @click="leave(contest.id)" class="col-50 btn btn-quran btn-margin" v-if="contest.is_joined">{{$app.t('quit')}}</button>
                  <button class="col-50 btn btn-quran btn-margin" @click="join(contest.id)" v-if="!contest.is_joined">{{$app.t('enroll')}}</button>
                </div>

              </div>
              <div v-else style="display:block; margin:0 auto;">
                <div  >
                  <div class="loader-wrapper" :hidden="!loading">
                      <div class="preloader color-green" :hidden="!loading"></div>
                  </div>
                </div>
                
                <div class="gap"></div>
                <div class="gap"></div>
              </div>
            </div>
          </div>

        </vue-scroll>

      </div>

    </div>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  computed: {
    contests() {
      return this.$store.getters.allContests.concat({});
    }
  },
  created() {
    this.$store.getters.allContests.length
      ? null
      : this.loadContests().then(() => (this.loading = false));
  },
  methods: {
    loadmore(_, __, done) {
      this.loading = true;
      return this.loadContests().then(data => {
        this.loading = false;
        if (!data.length) done();
      });
    },
    loadContests() {
      return this.$store.dispatch("loadAllContests");
    },
    leave(id) {
      this.$f7.dialog.confirm(this.$app.t("comfirm_quit"), () => {
        this.$f7.dialog.preloader(this.$app.t("leaving_contest"));
        this.$store
          .dispatch("leaveContest", id)
          .then(() => {
            this.$f7.dialog.close();
            let done = this.$f7.dialog
              .create({
                title: this.$app.t("you_quit_the_contest_succsesfuly"),
                buttons: []
              })
              .open();
            setTimeout(() => {
              done.close();
            }, 1700);
          })
          .catch(err => {
            this.$f7.dialog.alert(this.$app.t("error"));
            setTimeout(() => {
              this.$f7.dialog.close();
            }, 2000);
          });
      });
    },
    join(id) {
      this.$f7.dialog.confirm(
        this.$store.getters.currentContest.id
          ? this.$app.t("comfirm_join_quit")
          : this.$app.t("comfirm_join"),
        () => {
          this.$f7.dialog.preloader(this.$app.t("joining_contest"));
          this.$store
            .dispatch("joinContest", id)
            .then(() => {
              this.$f7.dialog.close();
              let done = this.$f7.dialog
                .create({
                  title: this.$app.t("you_joined_the_contest_succsesfuly"),
                  buttons: []
                })
                .open();
              setTimeout(() => {
                done.close();
              }, 1700);
            })
            .catch(err => {
              if (err.status == 401) {
                this.$f7router.navigate("/login");
                this.$f7.dialog.close();
              } else {
                this.$f7.dialog.alert(this.$app.t("error"));
                setTimeout(() => {
                  this.$f7.dialog.close();
                }, 2000);
              }
            });
        }
      );
    }
  },
  components: {
    navbar: require("./partials/Navbar.vue"),
    "main-toolbar": require("./partials/MainToolbar.vue")
  }
};
</script>

<style scoped>
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
  min-height: 100vh;
  padding-bottom: 0px;
  overflow: scroll;
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

<style>
.all-cont .page-content {
  overflow: hidden;
}
</style>

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
                            <div class="col-100 contest-card">
                                <div class="col-100 margin-bottom contest">
                                    <div class="col-40 display-inline-block">
                                        <div class="col-100">
                                            <a :href="'/contest/'+contest.id">
                                                <h1>{{contest.name}}</h1>
                                            </a>
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
                                <div v-if="contest.is_joined">
                                    <div class="col-100 margin-bottom">
                                        <button @click="leave(contest.id)" class="btn btn-quran">خروج</button>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="col-100 margin-bottom">
                                        <button class="btn btn-quran" @click="join(contest.id)">أنضم</button>
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
                </vue-scroll>
            </div>

        </div>

    </f7-page>
</template>

<script>
export default {
  computed: {
    contests() {
      return this.$store.getters.allContests;
    }
  },
  created() {
    this.$store.getters.allContests.length ? null : this.loadContests();
  },
  methods: {
    loadmore(_, __, done) {
      this.loadContests().then(data => {
        if (!data.length) done();
      });
    },
    loadContests() {
      return this.$store.dispatch("loadAllContests");
    },
    leave(id) {
      this.$f7.dialog.confirm("هل تريد الخروج من المسابقة ؟", () => {
        this.$f7.dialog.preloader("جاري الخروج من المسابقة");
        this.$store
          .dispatch("leaveContest", id)
          .then(() => {
            this.$f7.dialog.close();
          })
          .catch(err => {
            this.$f7.dialog.alert("حاول مرة أخرى في وقت لاحق!", "خطأ !");
            setTimeout(() => {
              this.$f7.dialog.close();
            }, 2000);
          });
      });
    },
    join(id) {
      this.$f7.dialog.confirm(
        this.$store.getters.currentContest.id
          ? "هل تريد الأنضمام في هذه المسابقة و الخروج من المسابقة الأخرى ؟"
          : "هل تريد الأنضمام في هذه المسابقة ؟",
        () => {
          this.$f7.dialog.preloader("جاري الإنضمام إلى المسابقة");
          this.$store
            .dispatch("joinContest", id)
            .then(() => {
              this.$f7.dialog.close();
            })
            .catch(err => {
              if (err.status == 401) {
                this.$f7router.navigate("/login");
                this.$f7.dialog.close();
              } else {
                this.$f7.dialog.alert("حاول مرة أخرى في وقت لاحق!", "خطأ !");
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
.scroll-area {
  height: 36rem;
  overflow: auto;
}
</style>
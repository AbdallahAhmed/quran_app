<template>

    <div :id="'sura-' + sura.id">

        <div class="quran-head" v-if="sura">

            <!-- <div class="sura-header">

                <a href="/sections" class="sura-name link bounceIn">
                    <img src="../../assets/img/arrow-down.png" class="sura-name-arrow">
                    {{ $store.getters.locale=="ar"? sura.juz_name:sura.juz_name_en }}
                </a>

            </div> -->

            <div class="sura-stats row rollIn">

                <a class="col-50 sura-ayat-count link">
                    <span> {{ sura.numberOfAyats }} </span>
                    {{$app.trans('his_aya')}}
                </a>

                <a href="/sections" class="col-50 sura-part-num link">
                    {{ $store.getters.locale=="ar"? sura.name : sura.englishname}}
                </a>
                <a href="/sections" class="sura-part-num">
                   {{ $store.getters.locale=="ar"? sura.juz_name:sura.juz_name_en }}
               </a>
            </div>

        </div>

        <div class="page-content">

            <div class="quran-basmla" v-if="sura && sura.id !== 9">
                <a>
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </a>
            </div>

            <div class="block quran-sura">

                <page v-for="(page, i) in sura.pages" :page="page" :key="page[0].page_id" :id="page[0].page_id" v-if="sura">
                    <aya v-for="aya in page" :aya_row="aya" :key="aya.id" :surah="sura"></aya>
                </page>

            </div>

        </div>

        <div class="empty-gab" v-if="sura.id==114">

        </div>

    </div>

</template>

<style>
.empty-gab {
  height: 72px;
  width: 100%;
}
</style>

<script>
import inView from "in-view";
import EventBus from "../../events";

export default {
  name: "Sura",

  props: ["sura"],

  computed: {
    last_sura() {
      return this.$store.getters.last_sura;
    },

    page() {
      return this.$store.getters.page;
    }
  },

  mounted() {},

  components: {
    page: require("../partials/Page.vue"),
    aya: require("../partials/aya.vue")
  }
};
</script>

<style scoped>
.sura-stats a {
  flex: 1;
}
@media screen and (max-width: 500px) {
  .sura-stats a:not(:last-of-type) {
    flex: initial;
    padding: 0 15px;
  }
}
</style>

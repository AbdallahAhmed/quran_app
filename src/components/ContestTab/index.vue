<template>
  <div class="page-contest">

    <navbar></navbar>
    <p class="page-title"> <span>المسابقات</span> <a href="#">الكل</a> </p>

    <component :is="ContestTab" />
  </div>

</template>

<script>
import ContestTabAuthed from "./ContestTabAuthed.vue";
import ContestTabUnauthed from "./ContestTabUnauthed.vue";

export default {
  components: {
    navbar: require("../partials/Navbar.vue")
  },
  data() {
    return {};
  },
  computed: {
    ContestTab() {
      let component = this.$app.auth.check()
        ? ContestTabAuthed
        : ContestTabUnauthed;
      return component;
    }
  },
  created() {
  },
  mounted() {}
};
</script>

<style scoped>
.page-title a {
  float: left;
  color: #fff;
  margin-left: 20px;
  margin-top: 7px;
}
.page-contest{
  height: 100%;
  background-color:#f5f5f5;
}
</style>

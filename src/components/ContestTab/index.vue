<template>
  <div class="page-contest">

    <navbar></navbar>

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
    },
  },
  created() {
  },
  mounted() {}
};
</script>


<style scoped>
.page-contest{
  height: auto;
  min-height: 100%;
  padding-bottom: 68px;
  background-color:#f5f5f5;
}

</style>

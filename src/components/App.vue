<template>

    <f7-app :style="`height:${screenHeight}`" ref="f7v" :params="f7params">

        <f7-statusbar></f7-statusbar>

        <div class="views">

            <f7-view url="/home/quran" main></f7-view>

        </div>

    </f7-app>

</template>

<script>
import routes from "../routes.js";

export default {
  data() {
    return {
      screenHeight: '100vh',
      f7params: {
        id: "com.dotdev.quran",
        name: "Quran",
        // theme: 'auto',
        material: true,
        routes: routes
      }
    };
  },
  methods: {
    keyboardShowHandler(e) {
      that.scroll.disable();
      that.$el.css("bottom", e.keyboardHeight - 30 + "px");
      that.scroll.refresh();
      that.scroll.scrollToElement(document.activeElement, 0, true, true);
    },
    keyboardHideHandler(e) {
      setTimeout(() => {
        if (!cordova.plugins.Keyboard.isVisible) {
          this.$el.css("bottom", "0px");
          this.scroll.scrollTo(0, -100, 0);
          this.scroll.enable();
          this.scroll.refresh();
        }
      }, 300);
    }
  },
  mounted() {
    window.addEventListener("native.keyboardshow", this.keyboardShowHandler);
    window.addEventListener("native.keyboardhide", this.keyboardHideHandler);

}
};
</script>

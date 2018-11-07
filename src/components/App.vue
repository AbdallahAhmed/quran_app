<template>

    <f7-app :params="f7params" :class="{ltr : $store.getters.locale == 'en'}">

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
                f7params: {
                    id: "com.dotdev.quran",
                    name: "Quran",
                    // theme: 'auto',
                    notification: {
                        icon: '<i class="f7-icons">book_fill</i>',
                        title: this.$app.trans("quran"),
                        subtitle: "",
                        closeButton: true,
                        closeTimeout: 3000
                    },
                    dialog: {
                        title: this.$app.trans("quran"),
                        buttonOk: this.$app.trans("ok"),
                        buttonCancel: this.$app.trans("cancel"),
                    },
                    material: true,
                    routes: routes
                }
            };
        }
    };
</script>


<style>
.preloader-inner-gap {
  display: none !important;
  width: 0px !important;
}
.md .dialog-button ,.ios .dialog-button {
  text-align: center;
  color: white;
  background-color: #207249;
  font-size: 16px;
  border: 0;
  margin-top: 5px;
  display: inline-block;
}
.md .dialog-buttons span:nth-child(-n + 2) , .ios .dialog-buttons span:nth-child(-n + 2) {
  width: 49%;
}
.md .dialog-buttons span:nth-child(3) , .ios .dialog-buttons span:nth-child(3) {
  width: 100%;
}
.md .dialog-buttons ,.ios .dialog-buttons {
  display: block;
  height: auto;
}

.md .dialog-button,
.md .dialog-button + .dialog-button ,.ios .dialog-button,
.ios .dialog-button + .dialog-button {
  margin: 5px auto;
}

.dialog-backdrop {
  background-color: rgba(255, 248, 248, 0.82);
}
</style>


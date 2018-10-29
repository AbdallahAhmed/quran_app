<template>

    <div class="toolbar no-shadow toolbar-bottom-md toolbar-options">

        <div class="toolber-inner">

            <div class="row aya-options">

                <a class="col-30 link bounceIn" @click="share">
                    <img src="../../assets/img/share_inverse.png">
                </a>
                <a class="col-30 link bounceIn" @click="copy">
                    <input type="hidden" id="clipboard" :value="aya.text"/>
                    <img src="../../assets/img/copy.png">
                </a>
                <a class="col-30 link bounceIn" @click="save">
                    <img src="../../assets/img/save.png">
                </a>

            </div>

        </div>

        <a class="link aya-options-remove jackInTheBox" @click="close">{{ $app.trans("close") }}</a>

    </div>

</template>


<script>

    export default {

        computed: {
            aya() {
                return this.$store.getters.aya;
            }
        },

        data() {
            return {
                share_loading: false
            }
        },

        methods: {

            share() {

                this.share_loading = true;

                new Promise((resolve, reject) => {

                    window.plugins.socialsharing.shareWithOptions({
                        message: this.aya.text,
                        subject: this.aya.text,
                        chooserTitle: this.$app.trans("choose_app")
                    }, () => {
                        resolve();
                    });

                }).then(() => {
                    this.$f7.notification.create({
                        subtitle: "تمت المشاركة"
                    }).open();
                }).catch(() => {
                    this.$f7.notification.create({
                        subtitle: "خطأ"
                    }).open();
                });


            },

            save() {

                this.$store.dispatch("save_aya", this.aya).then((response) => {
                    this.sura = response.data.data;
                });

                this.$f7.notification.create({
                    subtitle: "تم الحفظ"
                }).open();
            },

            copy() {

                let clipboard = document.querySelector('#clipboard');

                clipboard.setAttribute('type', 'text');
                clipboard.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                } catch (err) {
                    // Do nothing
                }

                clipboard.setAttribute('type', 'hidden')
                window.getSelection().removeAllRanges();

                this.$f7.notification.create({
                    subtitle: "تم النسخ"
                }).open();

            },

            close() {
                this.$emit("close");
                this.$store.commit("AYA", false);
            }
        }

    }

</script>

module.exports = {

    methods: {

        _share: function (message) {

            new Promise((resolve, reject) => {

                window.plugins.socialsharing.shareWithOptions({
                    message: message,
                    subject: message,
                    chooserTitle: this.$app.trans("choose_app")
                }, () => {
                    resolve();
                });

            }).then(() => {

                // Nothing

            }).catch(() => {
                this.$f7.notification.create({
                    subtitle: this.$app.trans('error')
                }).open();
            });


        }
    }

}

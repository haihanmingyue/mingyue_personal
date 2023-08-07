

export default {

    methods: {
        goPage({routeName, params}) {
            this.$router.push({name: routeName, query: {...params}}).then(r => {});
        },
        goBack() {
            this.$router.back();
        }
    }

}

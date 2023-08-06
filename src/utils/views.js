
export default {

    methods: {
        goPage({routeName, params}) {
            this.$router.push({name: routeName, query: {...params}});
        },
        goBack() {
            this.$router.back();
        }
    }

}

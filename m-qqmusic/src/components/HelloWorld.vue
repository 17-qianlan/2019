<template>
    <div class="hello">
        <span @click="handleCount">{{msg}}</span>
        <p>{{count}}</p>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                num : 0
            };
        },
        methods: {
            ...mapMutations([
                'changeCount'
            ]),
            handleCount() {
                this.changeCount(++this.num);
            }
        },
        computed: {
            ...mapState({
                count: state => state.count
            })
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .hello{
        span{
            color: green;
            cursor: pointer;
        }
    }
</style>

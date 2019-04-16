<template>
    <div class="d-flex justify-content-center loading align-items-center $zindex-sticky" :style="style">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'loading',
        props: {
            loading: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        data() {
            return {
                style: {
                    height: 0
                }
            };
        },
        watch: {
            loading(val) {
                this.loading = val;
            }
        },
        mounted() {
            this.style.height = window.innerHeight + 'px';
        }
    };
</script>

<style scoped lang="scss">
    .loading{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 100;
    }
</style>

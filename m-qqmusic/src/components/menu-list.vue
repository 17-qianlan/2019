<template>
    <section>
        <ul class="row">
            <li class="col-12-5 list" v-for="(item, index) of menuData" :key="index">
                <router-link :to={path:item.href}>
                    <i :class="['iconfont', 'd-block', item.iconClass, 'text-center']"></i>
                    <span class="d-block text-center" v-text="item.content"></span>
                </router-link>
            </li>
        </ul>
    </section>
</template>
<script>
    export default {
        name: 'song-list',
        data() {
            return {
                menuData:  [{
                    iconClass: 'icon-geshou',
                    content: '歌手',
                    href: '/item/search'
                }, {
                    iconClass: 'icon-paihang',
                    content: '排行',
                    href: '/item/ranking'
                }, {
                    iconClass: 'icon-leimupinleifenleileibie',
                    content: '分类',
                    href: '/item/area'
                }, {
                    iconClass: 'icon-diantai',
                    content: '电台',
                    href: '/not'
                }, {
                    iconClass: 'icon-shiping',
                    content: '视频',
                    href: '/not'
                }]
            };
        }
    };
</script>

<style scoped lang="scss">
    ul {
        width: 100%;
        padding: 15px 0;
        .list{
            font-size: 30px;
            a{
                color: inherit;
                i {
                    color: #31C27C;
                    font-size: 40px;
                }
            }
        }
    }
</style>

<template>
    <section id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li v-for="(item, index) of bannerData" data-target="#carouselExampleIndicators" data-slide-to={i} :class="{active: index === 0}" :key="index"></li>
        </ol>
        <div class="carousel-inner">
             <div v-for="(item, index) of bannerData" :class="{'carousel-item': true, active: index === 0}" :key="index">
            <router-link :to="{path: item.path}">
                <img :src="item.src" class="d-block w-100" alt="..."/>
            </router-link>
        </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'banner',
        data() {
            return{
                bannerData: [
                    {
                        src: require('../assets/images/banner/00.jpg'),
                        title: '00',
                        path: '/00.jpg'
                    },
                    {
                        src: require('../assets/images/banner/01.jpg'),
                        title: '01',
                        path: '/01.jpg'
                    },
                    {
                        src: require('../assets/images/banner/02.jpg'),
                        title: '02',
                        path: '/02.jpg'
                    },
                    {
                        src: require('../assets/images/banner/03.jpg'),
                        title: '03',
                        path: '/03.jpg'
                    },
                    {
                        src: require('../assets/images/banner/04.jpg'),
                        title: '04',
                        path: '/04.jpg'
                    }
                ]
            };
        }
    };
</script>

<style scoped lang="scss">
    section {
        margin-top: 132px;
    }
</style>

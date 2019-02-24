<template>
    <header class="nav-header">
        <section class="left">
            <div class="logo iconfont icon-yinle2"></div>
            <div class="home"><a href="">首页</a></div>
            <div class="my-music"><router-link to="/not">我的音乐</router-link></div>
        </section>
        <section class="right">
            <div class="input">
                <input type="text" />
                <router-link to="/not">
                    <span class="iconfont icon-sousuo1"></span>
                </router-link>
            </div>
            <div class="user">
                <router-link to="/not">登录</router-link>
                <router-link to="/not">注册</router-link>
            </div>
        </section>
    </header>
</template>

<script>
    export default {
        name: "music-header",
        data() {
            return {
                msg: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav-header {
        display: flex;
        width: 70%;
        height: 100px;
        margin: auto;
        font-size: 30px;
        line-height: 100px;
        .left{
            display: flex;
            width: 50%;
            color: red;
            text-align: left;
            div{
                height: 100%;
                padding: 0 10px;
            }
            .logo{
                width: 10%;
                height: 100%;
                color: green;
                font-size: 60px;
            }
        }
        .right{
            display: flex;
            justify-content: flex-end;
            width: 50%;
            height: 100%;
            div{
                padding: 0 10px;
            }
            .input{
                position: relative;
                width: 320px;
                height: 40px;
                border: 1px solid red;
                border-radius: 10px;
                margin-top: 30px;
                line-height: 0;
                input{
                    width: 90%;
                    height: 96%;
                    padding: 0;
                    border: 0;
                    font-size:30px;
                }
                span{
                    position: absolute;
                    top: 20px;
                    right: 10px;
                    font-size: 30px;
                }
            }
        }
    }
</style>

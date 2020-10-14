<template>
  <div id="userLayout"
    class="user-layout-wrapper">
    <div class="container">
      <div class="containerTop">
        <a-row>
          <a-col :xl="12"
            :lg="12"
            :md="12"
            :sm="0"
            :xs="0"
            class="loginLeft">
            <div>
              <img :src="logoUrl"
                class='logo'>
              <p class="title">吉事多·分销系统</p>
            </div>
          </a-col>
          <a-col :xl="12"
            :lg="12"
            :md="12"
            :sm="24"
            :xs="24"
            class="loginRight">
            <route-view></route-view>
          </a-col>
        </a-row>
      </div>
      <div class="containerBottom">
        <h1>吉事多 · 分销系统</h1>
        <div class="copyright">
          Copyright &copy; 2020 V1.0.0
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {
      logoUrl: require('./img/logo.png')
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url('./img/bg.jpeg') no-repeat 50%;
    background-size: cover;
    position: relative;
    .containerTop {
      padding: 290px 400px 144px;
      .loginLeft {
        margin-top: 80px;
        .logo {
          width: 90px;
          height: 95px;
          margin: 0 auto;
          display: block;
        }
        .title {
          font-size: 20px;
          color: #fff;
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          text-align: center;
          margin: 0;
        }
      }
      .loginRight {
        border-left: 1px solid rgba(210, 210, 210, 1);
      }
    }
  }
}

.loginWrapper {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;
}

.containerBottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  margin: 48px 0 24px;
  text-align: center;
  h1 {
    font-size: 20px;
    font-weight: bold;
    color: rgba(210, 210, 210, 1);
  }
  .copyright {
    color: rgba(210, 210, 210, 1);
    font-size: 14px;
  }
}
</style>

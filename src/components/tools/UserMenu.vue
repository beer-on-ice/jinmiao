<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started"
				target="_blank">
				<span class="action">
					<a-icon type="question-circle-o"></a-icon>
				</span>
			</a> -->
      <!-- <notice-icon class="action" /> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!-- <a-avatar class="avatar"
						size="small"
						:src="userInfo.avatar" /> -->
          <span>{{ userInfo.username }}</span>
        </span>
        <a-menu slot="overlay"
          class="user-dropdown-menu-wrapper">
          <!-- <a-menu-item key="0">
						<router-link :to="{ name: 'center' }">
							<a-icon type="user" />
							<span>个人中心</span>
						</router-link>
					</a-menu-item>
					<a-menu-item key="1">
						<router-link :to="{ name: 'settings' }">
							<a-icon type="setting" />
							<span>账户设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-divider /> -->
          <a-menu-item key="3">
            <a href="javascript:;"
              @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <a-modal title="提示"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel">
      <p>真的要注销登录吗 ?</p>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    // NoticeIcon
  },
  data () {
    return {
      visible: false,
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(Vue.ls.get('USERINFO'))
  },
  methods: {
    ...mapActions(['LogOff']),
    ...mapGetters(['username']),
    handleOk () {
      this.LogOff({})
        .then(() => {
          window.location.reload()
        })
        .catch(err => {
          this.$message.error({
            title: '错误',
            description: err.message
          })
        })
    },
    handleCancel () {
      this.visible = false
    },
    handleLogout () {
      this.visible = true
    }
  }
}
</script>

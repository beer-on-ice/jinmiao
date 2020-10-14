<template>
	<div class="loginWrapper">
		<a-form id="formLogin"
			class="user-layout-login"
			ref="formLogin"
			:form="form"
			@submit="handleLoginSubmit">
			<h2>登录/Login</h2>
			<a-form-item>
				<a-input class="inputSpec"
					size="large"
					type="text"
					placeholder="输入账号"
					v-decorator="[
                      'username',
                      {rules: [{ required: true, message: '请输入账号' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
                    ]">
					<a-icon slot="prefix"
						type="user"
						:style="{ color: 'rgba(255,255,255,1)' }" />
				</a-input>
			</a-form-item>

			<a-form-item>
				<a-input class="inputSpec"
					size="large"
					type="password"
					autocomplete="false"
					placeholder="输入密码"
					v-decorator="[
                      'password',
                      {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                    ]">
					<a-icon slot="prefix"
						type="lock"
						:style="{ color: 'rgba(255,255,255,1)' }" />
				</a-input>
			</a-form-item>

			<a-form-item style="margin-top:24px">
				<a-button size="large"
					type="primary"
					htmlType="submit"
					class="login-button"
					:loading="state.loginBtn"
					:disabled="state.loginBtn">登录</a-button>
			</a-form-item>

		</a-form>
	</div>
</template>

<script>
import qs from 'qs'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  data () {
    return {
      loginBtn: false,
      loginType: 0, // login type: 0 email, 1 username, 2 telephone
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false, // login type: 0 email, 1 username, 2 telephone
        loginType: 0
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // 校验用户名
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      // 区分邮箱还是手机
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    // 确定登录
    handleLoginSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          Login(qs.stringify(loginParams))
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      this.$router.push({ name: 'welcome' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description:
					((err.response || {}).data || {}).message ||
					err.msg ||
					'请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" >
.loginWrapper {
	.user-layout-login {
		h2 {
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			padding-bottom: 20px;
		}
		.inputSpec {
			input {
				background: none;
				border: none;
				outline: none;
				border-radius: 0;
				border-bottom: 1px solid rgba(210, 210, 210, 1);
				color: #fff;
				font-size: 12px;
				margin-left: 3px;
			}
		}

		button.login-button {
			padding: 0 15px;
			font-size: 16px;
			height: 40px;
			width: 100%;
			background: rgba(42, 239, 122, 1);
			border: none;
		}
	}
}
</style>

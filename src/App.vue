<template>
	<a-locale-provider :locale="locale">
		<div id="app">
			<router-view />
		</div>
	</a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="less">
#app {
	height: 100%;
	.ant-col-1 {
		min-width: 50px !important;
	}
	.ant-col-2 {
		min-width: 100px !important;
	}
}
.ant-table-tbody > tr > td {
	word-break: break-all;
}
</style>

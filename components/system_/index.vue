<template>
  <view class="components_all">
    <!-- 确认对话框 -->
    <modal></modal>
    <!-- 加载中 -->
    <loading></loading>
    <!-- 消息提示 -->
    <tips></tips>
		<!-- 底部弹出菜单 -->
		<action-sheet></action-sheet>
  </view>
</template>

<script>
import modal from "./modal/modal";
import loading from "./loading/loading";
import tips from "./msg_tips/msg_tips";
import actionSheet from "./action_sheet/action_sheet";
export default {
  components: {
    modal,
    loading,
    tips,
    actionSheet
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>

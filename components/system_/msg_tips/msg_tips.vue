<template>
  <view>
    <view class="tips plane" :class="show && 'active'">
      <view class="plane-close"></view>
      <view class="plane-content flex-row">
        <view class="tips-box">{{msg}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("msg_tips", ["show", "msg"])
  },
  methods: {}
};
</script>

<style>
.tips .plane-close {
  background: none;
}

.tips .plane-content {
  justify-content: center;
  align-items: center;
  background: none;
  min-height: 72%;
  opacity: 0;
  transition: all 0.3s;
}
.tips.active .plane-content {
  opacity: 1;
}

.tips .plane-content .tips-box {
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 20upx;
  min-width: 36%;
  max-width: 64%;
  font-size: 28upx;
  border-radius: 5upx;
}
</style>

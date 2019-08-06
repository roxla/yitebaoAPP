<template>
  <view>
    <view class="modal plane flex-row" :class="show && 'active'">
      <view class="plane-close"></view>
      <view class="plane-content">
        <view class="modal-box">
          <view class="modal-title hide-text-1" :style='{"text-align":titleAlign}' v-if="title">{{title}}</view>
          <view class="partation"></view>
          <view class="modal-content" :class="contentAlign=='center'?'textCenter':''" v-if="content">{{content}}</view>
          <view class="flex-row">
            <button type="default" v-if="cancelText" size="mini" @click="cancel">{{cancelText}}</button>
            <button type="primary" style="background-color: #01AAA3;" v-if="confirmText" size="mini" @click="confirm">{{confirmText}}</button>
          </view>
        </view>
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
    ...mapState("modal", [
		"show",
		"title",
		"content",
		"confirmText",
		"cancelText",
		"contentAlign",
		"titleAlign"
    ])
  },
  methods: {
    confirm() {
      this.$store.commit("modal/hidemodal", "confirm");
    },
    cancel() {
      this.$store.commit("modal/hidemodal", "cancel");
    }
  }
};
</script>

<style>
.modal {
  justify-content: center;
  align-items: center;
}
.modal .plane-content {
  /* padding: 20upx; */
  border-radius: 10upx;
  width: 72%;
  overflow: hidden;
  transition: all 0.3s;
  transform: scale(0);
	margin-bottom: 100upx;
}
.modal.active .plane-content {
  transform: scale(1);
}
.modal button {
  margin: 0;
  height: 88upx;
  line-height: 88upx;
  width: 100%;
  border-radius: 0;
  padding: 0;
  text-align: center;
  overflow: inherit;
}
.modal button:after {
  display: none;
}
.modal .modal-title {
  height: 80upx;
  line-height: 80upx;
  text-align: center;
  font-size: 32upx;
  padding: 0 30upx;
}
.modal .modal-content {
  min-height: 100upx;
  font-size: 28upx;
  color: #666;
  padding: 20upx 30upx;
  box-sizing: border-box;
}
.textCenter{
	text-align: center;
}
</style>

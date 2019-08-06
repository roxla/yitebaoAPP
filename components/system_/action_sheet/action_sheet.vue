<template>
  <view>
    <view class="action-sheet plane flex-col" :class="show && 'active'">
      <view class="plane-close"></view>
      <view class="plane-content">
        <view class="list">
          <view class="item title">{{title}}</view>
          <view class="partation"></view>
          <block v-for="(item,index) in list" :key="index">
            <button class="item action hide-text-1" @click="click(index)">{{item}}</button>
            <view class="partation mlr-30"></view>
          </block>
          <button class="item cancel red hide-text-1" @click="cancel">{{cancelText}}</button>
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
    ...mapState("action_sheet", ["show", "title", "list", "cancelText"])
  },
  methods: {
    click(index) {
      this.$store.commit("action_sheet/hide", index);
    },
    cancel() {
      this.$store.commit("action_sheet/hide");
    }
  }
};
</script>

<style>
.action-sheet {
  justify-content: flex-end;
}
.action-sheet .plane-content {
  margin: 30upx;
  width: calc(100vw - 60upx);
  border-radius: 10upx;
  overflow: hidden;
  transition: all 0.3s;
  transform: translateY(100%);
  font-size: 28upx;
}
.action-sheet.active .plane-content {
  transform: translateY(0);
}

.action-sheet .list .item {
  line-height: 88upx;
}
.action-sheet .list .item.cancel {
  color: #d33;
  background: #f4f4f4;
}
.action-sheet .list .item.title{
	font-size: 32upx;
}
.action-sheet button.item {
  margin: 0;
  border-radius: 0;
  background: none;
  font-size: 28upx;
}
</style>

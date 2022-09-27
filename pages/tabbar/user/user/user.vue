<template>
  <view>
    <view class="header" v-bind:class="{ status: isH5Plus }">
      <view class="userinfo">
        <view class="face">
          <image :src="userinfo.header"></image>
        </view>
        <view class="info">
          <view class="username">{{ userinfo.username }}</view>
          <view class="integral">咸鱼值:{{ userinfo.integral || 99 }}</view>
        </view>
      </view>
      <view class="setting">
        <uni-icons
          @click="editInfoPop"
          type="gear"
          size="22"
          color="#3a3a3a"
        ></uni-icons>
      </view>
    </view>
    <view class="orders">
      <view class="box">
        <navigator url="/pages/tabbar/user/friendReq/friendReq" class="icon">
          <view class="label" hover-class="hover">
            <view url="/pages/tabbar/user/friendReq/friendReq" class="icon">
              <view class="badge">{{ userinfo.friendNum || 0 }}</view>
              <uni-icons type="staff" size="30"></uni-icons>
            </view>
            好友申请
          </view>
        </navigator>
      </view>
      <view class="box">
        <navigator url="/pages/tabbar/user/friendReq/friendReq" class="icon">
          <view class="label" hover-class="hover">
            <view url="/pages/tabbar/user/friendReq/friendReq" class="icon">
              <view class="badge">{{ userinfo.friendNum }}</view>
              <uni-icons type="personadd" size="30"></uni-icons>
            </view>
            添加好友
          </view>
        </navigator>
      </view>
    </view>
    <view class="list" v-for="(list, list_i) in severList" :key="list_i">
      <view
        class="li"
        v-for="(li, li_i) in list"
        @tap="toPage(list_i, li_i)"
        v-bind:class="{ noborder: li_i == list.length - 1 }"
        hover-class="hover"
        :key="li.name"
      >
        <view class="icon">
          <!-- <image :src="'../../static/HM-PersonalCenter/sever/'+li.icon"></image> -->
        </view>
        <view class="text">{{ li.name }}</view>
        <image class="to" src="../../static/HM-PersonalCenter/to.png"></image>
      </view>
    </view>
    <use-friendItem></use-friendItem>
    <uni-popup ref="popup" type="dialog" :mask-click="false">
      <uni-popup-dialog
        title="修改用户名"
        placeholder="输入用户名"
        mode="input"
        @close="close"
        @confirm="editUserInfo($event, 'username')"
        :duration="2000"
        :before-close="true"
      >
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>
<script setup>
import { ref } from "vue";
import { $msg } from "@/utils/tips.js";
import { uploadImg } from "@/utils/upload.js";
import { onLoad, onShow, onPullDownRefresh } from "@dcloudio/uni-app";
import {
  editUserInfoReq,
  getUserInfoReq,
  getUserFriendReq,
} from "@/utils/api.js";
onLoad(() => {
  init();
});
onShow(() => {
  getUserFriend();
});
// 好友申请
const friendsList = ref([
  {
    name: "好友申请",
    icon: "l1.png",
    badge: 1,
  },
]);
// 用户信息
let userinfo = ref({});
// 弹窗
const popup = ref(null);
// 初始化
const init = async () => {
  getUserInfo();
};
// 获取用户信息
const getUserInfo = async () => {
  try {
    const result = await getUserInfoReq();
    userinfo.value = result.data;
  } catch {
    $msg("获取用户信息失败");
  }
};
// 获取好友申请
const getUserFriend = async () => {
  try {
    const result = await getUserFriendReq();
    userinfo.value.friendNum = result.data.total;
  } catch (err) {
    $msg(err);
  }
};
// 点击订单类型
const toOrderType = (index) => {
  uni.showToast({
    title: friendsList.value[index].name,
  });
};
// 用户点击列表项
const toPage = (list_i, li_i) => {
  uni.showToast({
    title: severList.value[list_i][li_i].name,
  });
};
// 弹出修改框
const editInfoPop = () => {
  console.log(1);
  uni.showActionSheet({
    itemList: ["修改用户名", "更换头像"],
    success: async (res) => {
      if (res.tapIndex == 0) {
        popup.value.open();
      } else {
        editHeader();
      }
    },
    fail: function (res) {
      console.log(res.errMsg);
    },
  });
};
// 更换头像
const editHeader = async () => {
  try {
    const result = await uploadImg();
    editUserInfo(result, "cloudHeader");
  } catch {
    $msg("取消上传");
  }
};
// 修改用户信息
const editUserInfo = async (e, key) => {
  let obj = JSON.parse(JSON.stringify(userInfo.value));
  for (let k in obj) {
    if (!obj[k]) delete obj[k];
  }
  const result = await editUserInfoReq({
    ...obj,
    [key]: e,
  });
  if (result.status != 0) {
    $msg(result.message);
    return;
  }
  userInfo.value = await userInfoReq();
  $msg(result.message);
  close();
};
// 关闭弹窗
const close = () => {
  popup.value.close();
};
</script>

<style lang="scss">
page {
  background-color: #f4f4f4;
  --Header-bgc: rgb(216, 108, 137);
}

.header {
  &.status {
    padding-top: var(--status-bar-height);
  }

  background-color: var(--Header-bgc);
  width: 92%;
  height: 30vw;
  padding: 0 4%;
  display: flex;
  align-items: center;

  .userinfo {
    width: 90%;
    display: flex;

    .face {
      flex-shrink: 0;
      width: 15vw;
      height: 15vw;

      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }

    .info {
      display: flex;
      flex-flow: wrap;
      padding-left: 30upx;

      .username {
        width: 100%;
        color: #fff;
        font-size: 40upx;
      }

      .integral {
        display: flex;
        align-items: center;
        padding: 0 20upx;
        height: 40upx;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 20upx;
        font-size: 24upx;
      }
    }
  }

  .setting {
    flex-shrink: 0;
    width: 6vw;
    height: 6vw;

    image {
      width: 100%;
      height: 100%;
    }
  }
}

.hover {
  background-color: #eee;
}

.orders {
  display: flex;
  justify-content: space-around;
  background-color: var(--Header-bgc);
  width: 92%;
  height: 11vw;
  padding: 0 4%;
  margin-bottom: calc(11vw + 40upx);
  display: flex;
  align-items: flex-start;
  border-radius: 0 0 100% 100%;
  margin-top: -1upx;

  .box {
    width: 33.33%;
    padding: 0 1%;
    height: 22vw;
    background-color: #fefefe;
    border-radius: 24upx;
    box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
    margin-bottom: 40upx;
    display: flex;
    align-items: center;
    justify-content: center;

    .label {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: wrap;
      width: 100%;
      height: 16vw;
      color: #666666;
      font-size: 26upx;

      .icon {
        position: relative;
        width: 7vw;
        height: 7vw;
        margin: 0 1vw;

        .badge {
          position: absolute;
          width: 4vw;
          height: 4vw;
          background-color: #ec6d2c;
          top: -1vw;
          right: -1vw;
          border-radius: 100%;
          font-size: 20upx;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        image {
          width: 7vw;
          height: 7vw;
          z-index: 9;
        }
      }
    }
  }
}

.list {
  width: 100%;
  border-bottom: solid 26upx #f1f1f1;

  .li {
    width: 92%;
    height: 100upx;
    padding: 0 4%;
    border-bottom: solid 1upx #e7e7e7;
    display: flex;
    align-items: center;

    &.noborder {
      border-bottom: 0;
    }

    .icon {
      flex-shrink: 0;
      width: 50upx;
      height: 50upx;

      image {
        width: 50upx;
        height: 50upx;
      }
    }

    .text {
      padding-left: 20upx;
      width: 100%;
      color: #666;
    }

    .to {
      flex-shrink: 0;
      width: 40upx;
      height: 40upx;
    }
  }
}
</style>

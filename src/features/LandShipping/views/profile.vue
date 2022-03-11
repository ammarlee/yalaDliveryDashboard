<template>
  <div>
    <v-card width="600" class="pa-6 mx-auto mt-7">
      <div
        v-if="currentUser.img"
        class="d-flex justify-content-center profileImg position-relative mb-5"
      >
        <v-menu bottom left offset-x>
          <template v-slot:activator="{ on, attrs }">
            <img
              v-if="currentUser.img"
              class="rounded-circle"
              width="100"
              height="100"
              :src="currentUser.img"
              v-bind="attrs"
              v-on="on"
            />

            <v-icon class="position-absolute" small v-bind="attrs" v-on="on">mdi-camera</v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <div>
                  <v-icon class="ml-1">mdi-image-multiple</v-icon>
                  <v-btn text class="font-weight-bold mx-auto" @click="openProfileImg = true"
                    >عرض صورة الملف الشخصي</v-btn
                  >
                </div>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <div>
                  <v-icon class="accountIcon">mdi-account-circle</v-icon>
                  <v-btn text @click="ref" class=" font-weight-bold "
                    >تغيير صورة الملف الشخصي</v-btn
                  >
                  <input
                    class="d-none"
                    ref="uploadImg"
                    type="file"
                    :rules="[allRules.required]"
                    @change="uploadFile"
                    single
                  />
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else class="position-relative d-flex justify-content-center flex-column">
        <v-icon class="accountIcon">mdi-account-circle</v-icon>
        <v-icon button color="black" style="margin:0 auto ;width:30px" @click="ref"
          >mdi-camera</v-icon
        >
      </div>
      <input
        class="d-none"
        ref="uploadImg"
        type="file"
        :rules="[allRules.required]"
        @change="uploadFile"
        single
      />
      <v-dialog v-model="openProfileImg" width="500">
        <div v-if="currentUser.img" class="d-flex justify-content-center">
          <img :src="currentUser.img" width="100%" height="100%" />
        </div>
      </v-dialog>
      <v-dialog v-model="openAddImg" width="400" persistent>
        <AddImg
          @closeAddImg="openAddImg = false"
          @AddImgs="addImg(currentUser)"
          :loading="loading"
          :content="currentUser.img ? 'تأكيد تغير الصورة الشخصية' : 'تأكيد وضع صورة شخصية جديدة '"
        ></AddImg>
      </v-dialog>
      <profileInfo v-if="userInfo" :mycurrentUser="userInfo"></profileInfo>
      <div class="d-flex justify-content-center mb-3">
        <v-btn class="success font-weight-bold" @click="openChangeInfo"
          >تعديل المعلومات الشخصية</v-btn
        >
      </div>
      <div class="d-flex align-items-center justify-content-center changePassword">
        <p class="m-0 font-bold">هل تريد تغيير كلمة السر</p>
        <v-btn class="info--text font-weight-bold" text @click="changePass = true, changePassword={}">أضغط هنا</v-btn>
      </div>
    </v-card>
    <v-dialog width="500" v-model="changePass" persistent>
      <changePassword
        @closeDialogChangePass="changePass = false"
        :currentUser="currentUser"
        :changePassword="changePassword"
      ></changePassword>
    </v-dialog>
    <v-dialog width="600" v-model="dilogInfo" v-if="mycurrentUser" persistent>
      <EditInfoprofile
        :mycurrentUser="mycurrentUser"
        @closeDilogInfo="dilogInfo = false"
        @ProfileInfo="userInfo = $event"
      ></EditInfoprofile>
    </v-dialog>
  </div>
</template>

<script>
import profileApi from "../services/profileApi";
import profileInfo from "./components/profileInfo.vue";
import EditInfoprofile from "./components/EditInfoProfile.vue";
import changePassword from "./components/changePassword.vue";
export default {
  components: {
    profileInfo,
    EditInfoprofile,
    changePassword
  },
  data() {
    return {
      valid: false,
      loading: false,
      dilogInfo: false,
      user: {},
      changePass: false,
      changePassword: {},
      images: null,
      openAddImg: false,
      openSelecteImg: false,
      openProfileImg: false,
      mycurrentUser: null,
      userInfo: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  mounted() {
    this.mycurrentUser = { ...this.currentUser };
    this.userInfo = { ...this.currentUser };
    console.log(this.userInfo);
  },
  methods: {
    async addImg(currentUser) {
      try {
        console.log(this.images[0]);
        this.loading = true;
        const formData = new FormData();
        formData.append("files", this.images[0]);
        formData.append("_id", currentUser._id);
        const res = await profileApi.AddImgProfile(formData);
        console.log(res);
        this.$store.dispatch("changeUserInfo", res.data);
        currentUser.img = res.data.user.img;
        this.openAddImg = false;
        this.openSelecteImg = false;
        this.ToasteSuccessMsg("تم تغيير الصورة الشخصية بنجاح");
      } catch (err) {
        console.log(err);
        this.toastErrorMsg("حدث خطأ اثناء تغيير الصورة الشخصية");
      }
      this.loading = false;
    },
    ref() {
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
      if (this.images.length > 0) {
        this.openAddImg = true;
      }
    },
    openChangeInfo() {
      this.dilogInfo = true;
      this.mycurrentUser = { ...this.userInfo };
    },
  }
};
</script>
<style lang="scss" scoped>
.changePassword {
  font-weight: 700;
  button {
    font-weight: 700;
  }
}
.profileImg {
  cursor: pointer;
  img {
  }
  .v-icon {
    bottom: -10px;
    margin-right: 50px;
    color: white;
    background-color: black;
    padding: 5px;
    border-radius: 50%;
  }
}
.accountIcon {
  font-size: 4rem !important;
}
</style>

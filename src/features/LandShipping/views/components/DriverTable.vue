<template>
  <div>
    <template>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="بحث"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headerDrvier"
          :items="driverData"
          :loading="loadingMain"
          :search="search"
        >
          <template v-slot:[`item.img`]="{ item }">
            <img
              width="100px"
              height="100px"
              v-if="item.img"
              :src="item.img"
              class="pa-2 rounded-circle"
            />
            <v-icon v-else class="accountIcon">mdi-account-circle</v-icon>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="success" medium @click="editDriver(item)">mdi-pen</v-icon>
            <v-icon color="error" medium class="mr-2" @click="opendelDriver(item)"
              >mdi-delete</v-icon
            >
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon color="success" @click="refImgDriver(item)">mdi-camera</v-icon>
            <input
              class="d-none"
              ref="uploadImageProfile"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFileProfileDriver"
              single
            />
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteDriver" width="500">
          <deleteItemsConfirmMsg
            :loading="loading"
            @submit="sureDelDriver"
            @closeDeleteDilog="openDeleteDriver = false"
            content="الكابتن"
          ></deleteItemsConfirmMsg>
        </v-dialog>
      </v-card>
    </template>
    <v-dialog v-model="openAddImg" width="400" persistent>
      <AddImg
        @closeAddImg="openAddImg = false"
        @AddImgs="addImg"
        :loading="loading"
        :content="driver.img ? 'تأكيد تغير صورة الكابتن' : 'تأكيد وضع صورة جديدة للكابتن'"
      ></AddImg>
    </v-dialog>
  </div>
</template>

<script>
import driverApi from "../../services/driverApi";

export default {
  props: ["driverData", "loadingMain", "driver"],
  data() {
    return {
      search: "",
      loading: false,
      userId: null,
      openDeleteDriver: false,
      images: null,
      openAddImg: false,
      headerDrvier: [
        {
          text: "الاسم",
          align: "center",
          value: "username"
        },
        {
          text: "البريد الالكتروني",
          align: "center",
          filterable: false,
          value: "email"
        },
        {
          text: "العنوان",
          align: "center",
          value: "address"
        },

        {
          text: "رقم الهاتف",
          align: "center",
          value: "phone"
        },
        {
          text: "الصورة",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او إضافة صورة",
          align: "center",
          value: "action"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ]
    };
  },
  methods: {
    editDriver(item) {
      this.$emit("openDialogAddDriver");
      this.$emit("DriverInfo", { ...item });
      console.log(this.driver);
    },
    opendelDriver(item) {
      console.log(item);
      this.userId = item._id;
      this.openDeleteDriver = true;
      console.log(this.openDeleteDriver);
    },
    async sureDelDriver() {
      try {
        console.log(this.userId);
        this.loading = true;
        const res = await driverApi.deleteDriver(this.userId);
        console.log(res);
        this.loading = false;
        this.openDeleteDriver = false;
        this.$emit("deleteDriver", this.userId)
        this.ToasteSuccessMsg("تم مسح الكابتن بنجاح");
        console.log(this.driverData);
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("حدث خطأ اثناء مسح الكابتن");
      }
    },
    refImgDriver(item) {
      this.$emit("DriverInfo", { ...item });
      this.$refs.uploadImageProfile.click();
    },
    uploadFileProfileDriver(e) {
      this.images = e.target.files;
      console.log(this.images);
      if (this.images.length > 0) {
        this.openAddImg = true;
        console.log(this.images.length);
      }
    },
    async addImg() {
      try {
        const formData = new FormData();
        console.log(this.images);
        formData.append("files", this.images[0]);
        formData.append("_id", this.driver._id);
        this.loading = true;
        const res = await driverApi.addDriverImg(formData);
        console.log(res);
        this.loading = false;
        this.openAddImg = false;

        let itemImg = res.data.user;

        let indexx = this.driverData.findIndex(i => {
          return i._id === itemImg._id;
        });
        console.log(indexx);
        this.driverData.splice(indexx, 1, itemImg);
        this.ToasteSuccessMsg("تم اضافة صورة للكابتن بنجاح");
      } catch (err) {
        console.log(err);
        this.loadingImg = false;
        this.toastErrorMsg("يوجد خطأ اثناء اضافة صورة للكابتن");
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>

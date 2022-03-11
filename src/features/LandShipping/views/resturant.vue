<template>
  <div>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <AddBtn :content="'اضافة مطعم'" @submit="(openDilog = true), (user = {})"></AddBtn>
    </div>
    <v-dialog v-model="openDilog" width="600" persistent>
      <AddEditResturant
        :data="data"
        :user="user"
        @closeDilogResturant="openDilog = false"
        @EditResturant="EditArr($event, data)"
        @pushInResturant="AddToArr($event, data)"
      ></AddEditResturant>
    </v-dialog>

    <v-dialog v-model="openAddImg" width="400" persistent>
      <AddImg
        @closeAddImg="openAddImg = false"
        @AddImgs="addImgresturant"
        :loading="loading"
        :content="user.img ? 'تأكيد تغير صورة المعطعم' : 'تأكيد وضع صورة جديدة للمطعم'"
      ></AddImg>
    </v-dialog>
    <template v-if="data">
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
        <v-data-table :loading="loadingMainData" :headers="headers" :items="data" :search="search">
          <template v-slot:[`item.img`]="{ item }">
            <img width="100px" height="100px" v-if="item.img" :src="item.img" class="pa-2" />
            <v-icon v-else color="black" class="accountIcon">mdi-fireplace</v-icon>
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon color="success" medium @click="refImgResturant(item)">mdi-camera</v-icon>
            <input
              class="d-none"
              ref="uploadImg"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFileResturant"
              single
            />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="ml-1" color="success" medium @click="edit(item)">mdi-pen</v-icon>
            <v-icon color="error" medium @click="del(item)">mdi-delete</v-icon>
          </template>

          <template v-slot:[`item.category`]="{ item }">
            <v-icon color="error" medium @click="openMainDialog('appCategories', item._id)"
              >mdi-eye</v-icon
            >
          </template>

          <template v-slot:[`item.products`]="{ item }">
            <v-icon color="info" medium @click="openMainDialog('appProducts', item._id)"
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card>
    </template>

    <v-dialog v-model="openDelete" width="500">
      <deleteItemsConfirmMsg
        :loading="loading"
        @submit="removeItem"
        @closeDeleteDilog="openDelete = false"
        content="المطعم"
      ></deleteItemsConfirmMsg>
    </v-dialog>

    <v-dialog v-model="showprodandCategModel" width="900" persistent>
      <component
        v-if="showprodandCategModel"
        @close="showprodandCategModel = false"
        :is="componentName"
        :Resturantid="resturantId"
      ></component>
    </v-dialog>
  </div>
</template>

<script>
import AddEditResturant from "./components/AddEditResturant.vue";
import category from "../views/category.vue";
import products from "../views/products.vue";
import resturantApi from "../services/resturantApi";
export default {
  components: {
    appCategories: category,
    appProducts: products,
    AddEditResturant
  },
  data() {
    return {
      openDilog: false,
      componentName: "",
      showprodandCategModel: false,
      openDelete: false,
      search: "",
      data: null,
      user: {},
      // newuser: {},
      loading: false,
      deletedId: null,
      openAddImg: false,
      resturantId: null,
      headers: [
        {
          text: "اسم المطعم",
          align: "center",
          value: "username"
        },
        {
          text: "اسم صاحب المطعم",
          align: "center",
          value: "name"
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
          text: "صورة المطعم",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او إضافة صورة للمطعم",
          align: "center",
          value: "action"
        },
        {
          text: "اصناف",
          align: "center",
          value: "category"
        },
        {
          text: "اكلات",
          align: "center",
          value: "products"
        },

        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ],
      images: null
    };
  },

  methods: {
    openMainDialog(componentName, resturantId) {
      this.resturantId = resturantId;
      this.componentName = componentName;
      this.showprodandCategModel = true;
    },
    refImgResturant(item) {
      this.user = { ...item };
      this.$refs.uploadImg.click();
    },

    uploadFileResturant(e) {
      this.images = e.target.files;
      if (this.images.length > 0) {
        this.openAddImg = true;
      }
    },
    edit(item) {
      this.openDilog = true;
      this.user = { ...item };
    },
    del(item) {
      this.openDelete = true;
      this.deletedId = item._id;
    },
    async removeItem() {
      try {
        this.loading = true;
        const res = await resturantApi.deleteResturant(this.deletedId);
        console.log(res);
        this.loading = false;
        this.openDelete = false;
        this.DeleteObjFromArr(this.data, this.deletedId);
        this.ToasteSuccessMsg("تم مسح المطعم بنجاح");
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("حدث خطأ اثناء مسح المطعم");
      }
    },
    async addImgresturant() {
      try {
        console.log(this.user._id);
        console.log(this.images);
        const formData = new FormData();
        formData.append("files", this.images[0]);
        formData.append("_id", this.user._id);
        this.loading = true;
        const res = await resturantApi.imgResturant(formData);
        console.log(res);
        this.loading = false;
        this.openAddImg = false;
        let itemImg = res.data.user;
        this.EditArr(itemImg, this.data);
        this.ToasteSuccessMsg("تم اضافة صورة صورة المطعم بنجاح");
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("يوجد خطأ اثناء اضافة صورة للمطعم");
      }
    }
  },
  async mounted() {
    try {
      this.loadingMainData = true;
      console.log(this.loadingMainData);
      const { data } = await resturantApi.getresturants();
      this.loadingMainData = false;
      console.log(this.loadingMainData);
      this.data = data.resturants;
    } catch (err) {
      console.log(err);
      this.loadingMainData = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

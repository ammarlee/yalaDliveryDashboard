<template>
  <div>
    <v-dialog v-model="openDilog" width="600">
      <v-card class="pa-10">
        <v-card-title class="d-flex justify-content-center">
          <h2 class="text-center mb-5">{{ user._id ? "تعديل بيانات المطعم" : "إضافة مطعم" }}</h2>
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="creatNewResturant">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.username"
                :rules="[allRules.required, allRules.minNameLen(6)]"
                dense
                outlined
                label="اسم المطعم"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.name"
                :rules="[allRules.required, allRules.minNameLen(6)]"
                dense
                outlined
                label="اسم صاحب المطعم"
                type="text"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.phone"
                :rules="[allRules.required, allRules.length(11)]"
                dense
                outlined
                label="رقم الهاتف"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.email"
                :rules="[allRules.required, allRules.validEmail]"
                dense
                outlined
                label="البريد الإلكتروني"
                type="email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.address"
                :rules="[allRules.required, allRules.minNameLen(8)]"
                dense
                outlined
                label="عنوان المطعم"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" v-if="!user._id">
              <v-text-field
                v-model="user.password"
                :rules="[allRules.required]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                dense
                outlined
                label="كلمة السر"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" aling="center">
            <v-col cols="12" md="8" class="d-flex justify-center">
              <v-btn
                type="submit"
                color="success"
                class="font-weight-bold"
                :disabled="!valid"
                :loading="loading"
                >{{ user._id ? "حفظ تعديلات المطعم" : "تسجيل المطعم" }}</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>

    <div class="d-flex justify-content-right mt-10 mb-5">
      <v-btn class="success font-weight-bold" @click="add">اضافة مطعم</v-btn>
    </div>
    <v-dialog v-model="openAddImg" width="600">
      <v-card class="pa-5">
        <v-card-actions class="d-flex justify-content-center">
          <v-btn
            color="success"
            class="changeImg font-weight-bold"
            @click="addImgresturant"
            :loading="loading"
            >{{ user.img ? "تأكيد تغيير صورة المطعم" : "تأكيد وضع صورة جديدة للمطعم" }}</v-btn
          >
          <v-btn class="error" @click="openAddImg = false">ألغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-if="data">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :loading="loadingMainData"
            label="بحث"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="data" :search="search">
          <template v-slot:[`item.img`]="{ item }">
            <img width="100px" height="100px" v-if="item.img" :src="item.img" class="pa-2" />
            <v-icon v-else color="black">mdi-fireplace</v-icon>
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
            <v-icon color="error" medium @click="openMainDialog(item, 'appCategories')"
              >mdi-eye</v-icon
            >
          </template>

          <template v-slot:[`item.products`]="{ item }">
            <v-icon color="info" medium @click="openMainDialog(item, 'appProducts')"
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card>
    </template>

    <v-dialog v-model="openDelete" width="500">
      <v-card class="pa-5">
        <h2 class="text-center">هل انت متأكد من مسح المطعم</h2>
        <v-card-actions class="d-flex justify-content-center">
          <v-btn class="success font-weight-bold" :loading="loading" @click="removeItem"
            >تأكيد</v-btn
          >
          <v-btn class="error font-weight-bold" @click="openDelete = false">ألغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showprodandCategModel" width="900" persistent>
      <component
        @close="showprodandCategModel = false"
        :is="componentName"
        :selecteditem="selecteditem"
      ></component>
    </v-dialog>
  </div>
</template>

<script>
import category from "../views/category.vue";
import products from "../views/products.vue";
import resturantApi from "../services/resturantApi";
export default {
  data() {
    return {
      openDilog: false,
      selecteditem: {},
      componentName: "",
      showprodandCategModel: false,
      openDelete: false,
      loadingMainData: true,
      search: "",
      show1: "",
      data: null,
      user: {},
      newuser: {},
      loading: false,
      valid: false,
      deletedId: null,
      openAddImg: false,
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
        // {
        //   text: "البريد الإلكتروني",
        //   align: "center",
        //   value: "email"
        // },
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
      // resturantId: null,
    };
  },
  components: {
    appCategories: category,
    appProducts: products
  },
  methods: {
    openMainDialog(item, componentName) {
      this.selecteditem = { ...item };
      this.componentName = componentName;
      this.showprodandCategModel = true;
    },
    // this.$refs.allProducts.
    async creatNewResturant() {
      if (this.user._id) {
        try {
          this.loading = true;
          const res = await resturantApi.editResturant(this.user);
          console.log(res);
          this.loading = false;
          this.openDilog = false;
          let itemEdit = res.data.user;

          let index = this.data.findIndex(i => {
            return i._id === itemEdit._id;
          });
          console.log(index);
          this.data.splice(index, 1, itemEdit);
          this.$dialog.notify.success("تم تعديل بيانات المطعم بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.$dialog.notify.error("حدث خطأ اثناء تعديل بيانات المطعم", {
            position: "bottom-right",
            timeout: 3000
          });
        }
      } else {
        try {
          this.loading = true;
          const res = await resturantApi.createResturant(this.user);
          this.$dialog.notify.success("تم إضافة المطعم بنجاح", {
            position: "bottom-right",
            timeout: 3000
          });
          console.log(this.user);
          this.loading = false;
          this.openDilog = false;
          this.data.push(res.data.user);
          console.log(res.data.user);
        } catch (err) {
          this.loading = false;
          let Errormsg = err.response.data.errors.msgs.ar || "حدث خطأ اثناء إضافة المطعم";

          this.$dialog.notify.error(Errormsg, {
            position: "bottom-right",
            timeout: 3000
          });
        }
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

        let indexx = this.data.findIndex(i => {
          return i._id === itemImg._id;
        });
        console.log(indexx);
        this.data.splice(indexx, 1, itemImg);
        this.$dialog.notify.success("تم اضافة صورة صورة بنجاح", {
          position: "bottom-right",
          timeout: 3000
        });
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$dialog.notify.error("يوجد خطأ اثناء اضافة صورة للموظف", {
          position: "bottom-right",
          timeout: 3000
        });
      }
    },
    // uploadFile(e) {
    //   this.images = e.target.files;
    // },
    refImgResturant(item) {
      this.user = { ...item };
      this.$refs.uploadImg.click();
    },
    // openuploadImg() {
    //   this.$refs.uploadImg.click();
    // },
    uploadFileResturant(e) {
      this.images = e.target.files;
      if (this.images.length > 0) {
        this.openAddImg = true;
      }
    },
    add() {
      this.openDilog = true;
      this.user = {};
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
        this.loading = false;
        this.openDelete = false;
        this.data = this.data.filter(e => {
          console.log(e);
          return e._id !== this.deletedId;
        });
        this.$dialog.notify.success("تم مسح المطعم بنجاح", {
          position: "bottom-right",
          timeout: 3000
        });
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$dialog.notify.error("حدث خطأ اثناء مسح المطعم", {
          position: "bottom-right",
          timeout: 3000
        });
      }
    }
  },
  async mounted() {
    try {
      this.loadingMainData = true;
      const { data } = await resturantApi.getresturants();
      this.data = data.resturants;
      this.loadingMainData = false;
    } catch (err) {
      console.log(err);
      this.loadingMainData = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>

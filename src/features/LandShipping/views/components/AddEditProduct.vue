<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('closeDilog')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center mb-5">{{ myProducts._id ? "تعديل الاكلة" : "إضافة اكلة" }}</h2>
      <v-form v-model="isFromValid" @submit.prevent="addNewproduct">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="myProducts.name"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="اسم الاكلة"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="myProducts.description"
              :rules="[allRules.required, allRules.minNameLen(8)]"
              dense
              outlined
              label="وصف الاكلة"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="myProducts.price"
              :rules="[allRules.required]"
              dense
              outlined
              label="السعر"
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="myProducts.quantity"
              :rules="[allRules.required]"
              dense
              outlined
              label="العدد"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-autocomplete
              rounded
              solo
              dense
              :rules="[allRules.required]"
              :items="categoryData"
              item-text="name"
              item-value="_id"
              v-model="myProducts.category"
              placeholder="اختار نوع الصنف"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              rounded
              solo
              dense
              :rules="[allRules.required]"
              :items="selectSize"
              item-text="sizeName"
              item-value="value"
              v-model="myProducts.size"
              placeholder="الحجم"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div v-if="myProducts.img" class="d-flex justify-content-around">
              <div v-for="(itemImg, index) in myProducts.img" :key="index">
                <div @mouseenter="addclass(index)" class="img-container position-relative">
                  <v-icon
                    class="imgProductAction position-absolute"
                    :id="'delete' + index"
                    @click="openDelProductImg(itemImg, myProducts)"
                    >mdi-close</v-icon
                  >
                  <img class="productImg" width="100px" height="100px" :src="itemImg" />
                </div>
              </div>
            </div>
            <v-text-field
              v-else
              @click="openuploadImg"
              outlined
              dense
              placeholder="صورة المنتج"
            ></v-text-field>
            <input
              class="d-none"
              ref="uploadImg"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              multiple
            />
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center pt-0">
            <v-btn
              class="font-weight-bold success"
              type="submit"
              :disabled="!isFromValid"
              :loading="loading"
              >{{ myProducts._id ? "حفظ تعديلات الاكلة" : "تسجيل الاكلة" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-dialog v-model="showDeleteImgProductDialog" width="500">
      <deleteItemsConfirmMsg
        :loading="loadingDelImg"
        @submit="delProductImg"
        @closeDeleteDilog="showDeleteImgProductDialog = false"
        content="صورة الاكلة"
      ></deleteItemsConfirmMsg>
    </v-dialog>
  </div>
</template>

<script>
import productsApi from "../../services/productsApi";

export default {

  props: ["myProducts", "categoryData", "resturantId", "productData"],
  data() {
    return {
      isFromValid: false,
      showDeleteImgProductDialog: false,
      loading: false,
      loadingDelImg: false,
      ProductImg: {},
      selectSize: [
        { sizeName: "larg", value: 1 },
        { sizeName: "medium", value: 2 },
        { sizeName: "small", value: 3 }
      ]
    };
  },
  methods: {
    addclass(index) {
      console.log(index);
      let elemnt = document.querySelectorAll(".imgProductAction");
      elemnt.forEach(i => {
        i.classList.remove("addHover");
      });
      let element = document.getElementById(`delete${index}`);
      element.classList.add("addHover");
    },
    openDelProductImg(src, product) {
      this.ProductImg.src = src;
      this.ProductImg.id = product._id;
      this.showDeleteImgProductDialog = true;
    },
    async addNewproduct() {
      console.log(this.myProducts);
      this.myProducts.resturantId = this.resturantId;
      const formData = new FormData();
      formData.append("name", this.myProducts.name);
      formData.append("price", this.myProducts.price);
      formData.append("category", this.myProducts.category);
      formData.append("quantity", this.myProducts.quantity);
      formData.append("size", this.myProducts.size);
      formData.append("resturantId", this.myProducts.resturantId);
      formData.append("description", this.myProducts.description);
      //   edit

      if (this.myProducts._id) {
        formData.append("_id", this.myProducts._id);
        try {
          this.loading = true;
          const res = await productsApi.editProducts(this.myProducts._id, this.myProducts);
          console.log(this.myProducts);
          console.log(res);
          this.loading = false;
          this.$emit("closeDilog");
          let itemEdit = res.data.post;
          this.$emit("EditProduct", itemEdit)
          this.images = null;
          this.ToasteSuccessMsg("تم تعديل الاكلة بنجاح")

        } catch (err) {
          this.loading = false;
          console.log(err);
          this.toastErrorMsg("حدث خطأ اثناء تعديل الاكلة");
        }
      } else {
        //   add
        this.loading = true;

        try {
          for (const i of Object.keys(this.images)) {
            formData.append("files", this.images[i]);
          }
          this.loading = true;
          const res = await productsApi.CreateProducts(formData);
          console.log(res);
          this.loading = false;
          this.$emit("closeDilog");
          this.$emit("AddCategory", res.data.products)
          this.ToasteSuccessMsg("تم إضافة الاكلة بنجاح")

        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("حدث خطأ اثناء إضافة الاكلة");
        }
      }
    },
    openuploadImg() {
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
    },
    async delProductImg() {
      try {
        this.loadingDelImg = true;
        let imgSrc = this.ProductImg.src;
        await productsApi.deleteProductImg(this.ProductImg.id, { imgSrc });
        let index = this.myProducts.img.findIndex(e => {
          return e === this.ProductImg;
        });
        this.loadingDelImg = false;
        this.myProducts.img.splice(index, 1);
        this.showDeleteImgProductDialog = false;
      } catch (err) {
        this.loadingDelImg = false;
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.imgProductAction {
  visibility: hidden;
  background-color: black;
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  color: white;
  font-size: 0.8rem;
}

.addHover {
  visibility: visible;
}
</style>

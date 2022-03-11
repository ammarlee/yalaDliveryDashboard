<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('closeDilogCategory')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center mb-5">{{ mycategories._id ? "تعديل الصنف" : "إضافة صنف" }}</h2>
      <v-form v-model="valid" @submit.prevent="addcategory">
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="mycategories.name"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="اسم الصنف"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="mycategories.description"
              :rules="[allRules.required, allRules.minNameLen(10)]"
              dense
              outlined
              label="وصف الصنف"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <div
              v-if="mycategories.img"
              class="d-flex justify-content-center align-items-center flex-column"
            >
              <div class="mb-2">
                <v-icon button @click="openuploadImg">mdi-camera</v-icon>
              </div>
              <div>
                <img width="100px" height="100px" :src="mycategories.img" />
              </div>
            </div>
            <v-text-field
              v-else
              @click="openuploadImg"
              outlined
              dense
              placeholder="صورة الصنف"
            ></v-text-field>
            <input
              class="d-none"
              ref="uploadImg"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              single
            />
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center">
            <v-btn
              class="font-weight-bold"
              type="submit"
              color="primary"
              :disabled="!valid"
              :loading="loading"
              >{{ mycategories._id ? "حفظ تعديلات الصنف" : "تسجيل الصنف" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import categoriesApi from "../../services/categoriesApi";

export default {
  props: ["categoryData", "mycategories", "resturantId"],
  data() {
    return {
      valid: false,
      loading: false,
      images: null
    };
  },
  methods: {
    async addcategory() {
      console.log({ imgs: this.images });
      this.mycategories.resturantId = this.resturantId;
      const formData = new FormData();
      formData.append("name", this.mycategories.name);
      formData.append("description", this.mycategories.description);
      if (this.mycategories._id) {
        console.log(this.mycategories._id);
        formData.append("_id", this.mycategories._id);
        try {
          if (this.images) {
            formData.append("files", this.images[0]);
          }

          this.loading = true;
          const res = await categoriesApi.editCategory(formData);
          console.log(res);
          this.loading = false;
          this.$emit("closeDilogCategory");
          let itemEdit = res.data.category;
          this.$emit("EditCategory", itemEdit);
          this.ToasteSuccessMsg("تم تعديل بيانات الصنف بنجاح");
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("حدث خطأ اثناء تعديل الصنف");
        }
      } else {
        try {
          formData.append("files", this.images[0]);
          formData.append("resturantId", this.mycategories.resturantId);
          console.log(this.mycategories);
          console.log(this.images);
          this.loading = true;
          const res = await categoriesApi.createCategory(formData);
          console.log(res);
          this.loading = false;
          this.$emit("closeDilogCategory");

          console.log(this.mycategories);
          this.$emit("pushInCategory", res.data.category);
          this.ToasteSuccessMsg("تم إضافة الصنف بنجاح");
          console.log(this.categoryData);
          console.log(res.data.category);
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("حدث خطأ اثناء إضافة الصنف");
        }
      }
    },
    openuploadImg() {
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
      this.images = e.target.files;
    }
  }
};
</script>

<style lang="scss" scoped></style>

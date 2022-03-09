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
            :loading="loadingMain"
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headersCategory" :items="categoryData" :search="search">
          <template v-slot:[`item.img`]="{ item }">
            <img width="100px" height="100px" :src="item.img" class="pa-2" />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="ml-2" color="success" medium @click="editCategory(item)">mdi-pen</v-icon>
            <v-icon color="error" medium @click="showDeleteCategory(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteCategory" width="500">
          <deleteItemsConfirmMsg
            :loading="loading"
            @submit="sureDelCategory"
            @closeDeleteDilog="openDeleteCategory = false"
            content="الصنف"
          ></deleteItemsConfirmMsg>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>

<script>
import categoriesApi from "../../services/categoriesApi";
export default {
  props: ["categoryData", "loadingMain"],
  data() {
    return {
      headersCategory: [
        {
          text: "الاسم",
          align: "center",
          value: "name"
        },
        {
          text: "الوصف",
          align: "center",
          value: "description"
        },
        {
          text: "الصورة",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ],
      search: "",
      openDeleteCategory: false,
      loading: false,
      deletedCategoryId: null
    };
  },
  methods: {
    editCategory(item) {
      this.$emit("openDialogEditCategory")
      this.$emit("mySingleEditCategory", {...item})
    },
    showDeleteCategory(item) {
      this.openDeleteCategory = true;
      this.deletedCategoryId = item._id;
    },

    async sureDelCategory() {
      try {
        this.loading = true;
        const res = await categoriesApi.deleteCategory(this.deletedCategoryId);
        console.log(res);
        this.loading = false;
        this.openDeleteCategory = false;
        this.$emit("deleteCategory", this.deletedCategoryId)
        this.ToasteSuccessMsg("تم مسح الصنف بنجاح")
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("حدث خطأ اثناء مسح الصنف")
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>

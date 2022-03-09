<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-dialog v-model="addCategory" width="600" persistent>
        <addEditCategory
          @closeDilogCategory="addCategory = false"
          :mycategories="mycategories"
          :resturantId="resturantId"
          :categoryData="categoryData"
          @pushInCategory="AddNewCategory($event)"
          @EditCategory="editCategory($event)"
        ></addEditCategory>
      </v-dialog>
      <div class="d-flex justify-content-right mt-10 mb-5">
        <AddBtn :content="'إضافة صنف'" @submit="openAddCategory"></AddBtn>
      </div>
      <categoryTable
        v-if="categoryData"
        :categoryData="categoryData"
        @openDialogEditCategory="addCategory = true"
        @mySingleEditCategory="mycategories = $event"
        @deleteCategory="deleteItemCategory($event)"
        :loadingMain="loadingMainData"
      ></categoryTable>
    </v-card>
  </div>
</template>
<script>
import categoriesApi from "../services/categoriesApi";
import categoryTable from "./components/categoryTable.vue";
import addEditCategory from "./components/AddEditCategory.vue";
export default {
  props: ["selecteditem", "Resturantid"],
  components: {
    categoryTable,
    addEditCategory
  },

  data() {
    return {
      addCategory: false,
      categoryData: [],
      mycategories: {},
      deletedCategoryId: null,
      resturantId: null
    };
  },
  async mounted() {
    try {
      this.resturantId = this.Resturantid;
      this.loadingMainData = true;
      const res = await categoriesApi.getCategory(this.Resturantid);
      this.categoryData = res.data.categoryies;
      this.loadingMainData = false;
    } catch (error) {
      this.loadingMainData = false;

      console.log(error);
    }
  },
  methods: {
    openAddCategory() {
      this.addCategory = true;
      this.mycategories = {};
    },
    deleteItemCategory(itemId) {
      this.categoryData = this.categoryData.filter(e => {
        console.log(e);
        return e._id !== itemId;
      });
    },
    AddNewCategory(newCategory) {
      this.categoryData.push(newCategory);
    },
    editCategory(itemEdit) {
      let index = this.categoryData.findIndex(i => {
        return i._id === itemEdit._id;
      });
      console.log(index);
      this.categoryData.splice(index, 1, itemEdit);
    }
  }
};
</script>
<style lang="scss" scoped></style>

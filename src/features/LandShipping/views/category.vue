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
          @pushInCategory="AddToArr($event, categoryData)"
          @EditCategory="EditArr($event, categoryData)"
        ></addEditCategory>
      </v-dialog>
      <div class="d-flex justify-content-right mt-10 mb-5">
        <AddBtn :content="'إضافة صنف'" @submit=" addCategory = true, mycategories= {}"></AddBtn>
      </div>
      <categoryTable
        v-if="categoryData"
        :categoryData="categoryData"
        @openDialogEditCategory="addCategory = true"
        @mySingleEditCategory="mycategories = $event"
        @deleteCategory="DeleteObjFromArr(categoryData, $event)"
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
  }
};
</script>
<style lang="scss" scoped></style>

<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-dialog v-model="addProduct" width="800" persistent>
        <AddEditProduct
          @closeDilog="addProduct = false"
          :myProducts="myProducts"
          :productData="productData"
          :categoryData="categoryData"
          :resturantId="resturantId"
          @EditProduct="EditArr($event, productData)"
          @AddCategory="AddToArr($event, productData)"
        ></AddEditProduct>
      </v-dialog>
      <div class="d-flex justify-content-right mt-10 mb-5">
        <AddBtn :content="'إضافة اكلة'" @submit="addProduct = true, myProducts = {}"></AddBtn>
      </div>
      <productTable
        v-if="productData"
        :productData="productData"
        @openDilog="addProduct = true"
        @myProductsEdit="myProducts = $event"
        @productId="DeleteObjFromArr(productData, $event)"
        :loadingMain="loadingMainData"
      ></productTable>
    </v-card>
  </div>
</template>
<script>
import productTable from "./components/productTable.vue";
import productsApi from "../services/productsApi";
import AddEditProduct from "./components/AddEditProduct.vue";
export default {
  props: ["Resturantid", "selecteditem"],
  components: {
    productTable,
    AddEditProduct
  },
  data() {
    return {
      addProduct: false,
      productData: [],
      myProducts: {},
      categoryData: [],
      resturantId: null,
      loading: false,
      products: [],
      images: null,
      imagesProduct: [],
      openDeleteProductImg: false
    };
  },
  async mounted() {
    try {
      this.resturantId = this.Resturantid;
      this.loadingMainData = true;
      const res = await productsApi.getProducts(this.Resturantid);
      this.productData = res.data.products;
      const ress = await productsApi.getCategories(this.Resturantid);
      this.categoryData = ress.data.categoryies;
      this.loadingMainData = false;
    } catch (error) {
      console.log(error);
      this.loadingMainData = false;
    }
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped></style>

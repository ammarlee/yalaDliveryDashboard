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
          @EditProduct="editProduct($event)"
          @AddCategory="addCategory($event)"
        ></AddEditProduct>
      </v-dialog>
      <div class="d-flex justify-content-right mt-10 mb-5">
        <AddBtn :content="'إضافة اكلة'" @submit="openAddProduct"></AddBtn>
      </div>
      <productTable
        v-if="productData"
        :productData="productData"
        @openDilog="addProduct = true"
        @myProductsEdit="myProducts = $event"
        @productId="deleteProduct($event)"
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
    openAddProduct() {
      this.addProduct = true;
      this.myProducts = {};
    },
    editProduct(editItem) {
      let index = this.productData.findIndex(i => {
        return i._id === editItem._id;
      });
      this.productData.splice(index, 1, editItem);
    },
    addCategory(addItem) {
      this.productData.push(addItem);
    },
    deleteProduct(id) {
      console.log(id);
      this.productData = this.productData.filter(e => {
        return e._id !== id;
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>

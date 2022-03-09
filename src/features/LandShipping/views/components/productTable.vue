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
          :loading="loadingMain"
          :headers="headersProduct"
          :items="productData"
          :search="search"
        >
          <template v-slot:[`item.img`]="{ item }">
            <img width="100px" height="100px" :src="item.img[0]" class="pa-2" />
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="ml-2" color="success" medium @click="editProduct(item)">mdi-pen</v-icon>
            <v-icon color="error" medium @click="opendelProduct(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteProduct" width="500">
          <deleteItemsConfirmMsg
            :loading="loading"
            @submit="delProduct"
            @closeDeleteDilog="openDeleteProduct = false"
            content="الاكلة"
          ></deleteItemsConfirmMsg>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>

<script>
import productsApi from "../../services/productsApi";
export default {
  props: ["productData", "loadingMain"],
  data() {
    return {
      headersProduct: [
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
          text: "السعر",
          align: "center",
          value: "price"
        },
        {
          text: "العدد",
          align: "center",
          value: "quantity"
        },
        {
          text: "الحجم",
          align: "center",
          value: "size"
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
      openDeleteProduct: false,
      deletedProductId: null,
      loading: false
    };
  },
  methods: {
    editProduct(item) {
      this.$emit("openDilog");
      this.$emit("myProductsEdit", { ...item });
    },
    opendelProduct(item) {
      console.log("sss");
      this.openDeleteProduct = true;
      this.deletedProductId = item._id;
    },
    async delProduct() {
      try {
        this.loading = true;
        const res = await productsApi.deleteProduct(this.deletedProductId);
        console.log(res);
        this.loading = false;
        this.openDeleteProduct = false;
        this.$emit("productId", this.deletedProductId);
        this.ToasteSuccessMsg("تم مسح الاكلة بنجاح")
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("حدث خطأ اثناء مسح الاكلة")
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

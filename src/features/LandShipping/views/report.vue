<template>
  <div>
    <div class="d-flex justify-content-around mt-16">
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>عدد المطاعم</h2>
        <p>{{ resturants }}</p>
      </v-card>
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>عدد الكابتن</h2>
        <p>{{ drivers }}</p>
      </v-card>
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>عدد الطلبات</h2>
        <p>{{ orders }}</p>
      </v-card>
      <v-card width="200" class="pt-4 pb-3 pl-3 pr-3 text-right">
        <h2>إجمالي الارباح</h2>
        <p>10000</p>
      </v-card>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import reportsApi from "../services/reportsApi";

export default {
  data() {
    return {
      resturants: null,
      drivers: null,
      orders: null
    };
  },
  async mounted() {
    try {
      const { data: allResurant } = await reportsApi.getResturants();
      const { data: allDrivers } = await reportsApi.getDriver();
      const { data: allOrders } = await reportsApi.getOrders();
      console.log(allOrders.orders);
      this.resturants = allResurant.resturants.length;
      this.drivers = allDrivers.drivers.length;
      this.orders = allOrders.orders.length;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped></style>

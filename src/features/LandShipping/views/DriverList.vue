<template>
  <div>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <AddBtn :content="'إضافة كابتن'" @submit="addDriver = true, driver= {}"></AddBtn>
    </div>
    <v-dialog v-model="addDriver" width="1000" persistent>
      <AddEditDriver
        @pushInDriverList="AddToArr($event, driverData)"
        @closeDialogAddDriver="addDriver = false"
        @itemEditing="EditArr($event, driverData)"
        :driver="driver"
      ></AddEditDriver>
    </v-dialog>
    <DriverTable
      @openDialogAddDriver="addDriver = true"
      :driver="driver"
      @DriverInfo="driver = $event"
      :driverData="driverData"
      @deleteDriver="DeleteObjFromArr(driverData, $event)"
      :loadingMain="loadingMainData"
    ></DriverTable>
  </div>
</template>

<script>
import AddEditDriver from "./components/AddEditDriver.vue";
import driverApi from "../services/driverApi";
import DriverTable from "./components/DriverTable.vue";
export default {
  components: {
    DriverTable,
    AddEditDriver
  },
  data() {
    return {
      driver: {},
      addDriver: false,
      driverData: []
    };
  },
  methods: {
  },
  async mounted() {
    try {
      this.loadingMainData = true;
      const res = await driverApi.getDriver();
      this.driverData = res.data.drivers;
      this.loadingMainData = false;
    } catch (err) {
      console.log(err);
      this.loadingMainData = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>

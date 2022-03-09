<template>
  <div>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <AddBtn :content="'إضافة كابتن'" @submit="openAddDriver"></AddBtn>
    </div>
    <v-dialog v-model="addDriver" width="1000" persistent>
      <AddEditDriver
        @pushInDriverList="AddNewDiver($event)"
        @closeDialogAddDriver="addDriver = false"
        @itemEditing="editDriver($event)"
        :driver="driver"
      ></AddEditDriver>
    </v-dialog>
    <DriverTable
      @openDialogAddDriver="addDriver = true"
      :driver="driver"
      @DriverInfo="driver = $event"
      :driverData="driverData"
      @deleteDriver="delDriver($event)"
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
    openAddDriver() {
      this.addDriver = true;
      this.driver = {};
    },
    AddNewDiver(item) {
      this.driverData.push(item);
    },
    editDriver(item) {
      let index = this.driverData.findIndex(i => {
        return i._id === item._id;
      });
      this.driverData.splice(index, 1, item);
    },
    delDriver(id) {
      this.driverData = this.driverData.filter(e => {
        return e._id !== id;
      });
    }
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

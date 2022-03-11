<template>
  <div>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <AddBtn :content="'اضافة موظف'" @submit="(addEmployee = true), (user = {})"></AddBtn>
    </div>
    <v-dialog v-model="addEmployee" width="600" persistent>
      <EmployeesInfo
        :user="user"
        @closeAddEmployeesDialog="addEmployee = false"
        @editEmpoyeesInfo="EditArr($event, employeesList)"
        @pushInEmpoyees="AddToArr($event, employeesList)"
      ></EmployeesInfo>
    </v-dialog>
    <v-dialog v-model="openAddImg" width="400" persistent>
      <AddEmployeesImg
        @imgInfo="EditArr($event, employeesList)"
        :images="images"
        :user="user"
        @colseDialogAddImg="openAddImg = false"
      ></AddEmployeesImg>
    </v-dialog>
    <employeesTable
      @dilogAddImg="openAddImg = true"
      :employee="employeesList"
      @employeesId="DeleteObjFromArr(employeesList, $event)"
      @selecteImg="images = $event"
      @employeesInfo="user = $event"
      :user="user"
      @openDilogAddEmployees="addEmployee = true"
      :loadingMain="loadingMainData"
    ></employeesTable>
  </div>
</template>

<script>
import employeesApi from "../services/employeesApi";
import employeesTable from "./components/employeesTable.vue";
import AddEmployeesImg from "./components/AddEmployeesImg.vue";
import EmployeesInfo from "./components/EmployeesInfo.vue";
export default {
  components: {
    employeesTable,
    AddEmployeesImg,
    EmployeesInfo
  },
  data() {
    return {
      search: "",
      user: {},
      addEmployee: false,
      employeesList: [],
      userId: null,
      openAddImg: false,
      images: null
    };
  },
  methods: {
  },
  async mounted() {
    try {
      this.loadingMainData = true;
      const res = await employeesApi.getEmployees();
      this.employeesList = res.data.Employees;
      this.loadingMainData = false;
    } catch (err) {
      this.loadingMainData = false;
      console.log(err);
    }
  }
};
</script>
<style lang="scss" scoped></style>

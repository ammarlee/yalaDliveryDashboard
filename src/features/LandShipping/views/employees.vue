<template>
  <div>
    <div class="d-flex justify-content-right mt-10 mb-5">
      <AddBtn :content="'اضافة موظف'" @submit="openAddEmployee"></AddBtn>
    </div>
    <v-dialog v-model="addEmployee" width="600" persistent>
      <EmployeesInfo
        :user="user"
        @closeAddEmployeesDialog="addEmployee = false"
        @editEmpoyeesInfo="editEmployees($event)"
        @pushInEmpoyees="addNewEmployee($event)"
      ></EmployeesInfo>
    </v-dialog>
    <v-dialog v-model="openAddImg" width="400" persistent>
      <AddEmployeesImg
        @imgInfo="editEmployeesImg($event)"
        :images="images"
        :user="user"
        @colseDialogAddImg="openAddImg = false"
      ></AddEmployeesImg>
    </v-dialog>
    <employeesTable
      @dilogAddImg="openAddImg = true"
      :employee="employee"
      @employeesId="deleteEmplyees($event)"
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
      employee: [],
      userId: null,
      openAddImg: false,
      images: null
    };
  },
  methods: {
    deleteEmplyees(userId) {
      console.log(userId);
      this.employee = this.employee.filter(e => {
        return e._id !== userId;
      });
    },
    editEmployeesImg(imgInfo) {
      let indexx = this.employee.findIndex(i => {
        return i._id === imgInfo._id;
      });
      this.employee.splice(indexx, 1, imgInfo);
    },
    addNewEmployee(item) {
      console.log(item);
      this.employee.push(item);
      console.log(item);
    },
    openAddEmployee() {
      this.addEmployee = true;
      this.user = {};
    },
    editEmployees(itemEdit) {
      let index = this.employee.findIndex(i => {
        return i._id === itemEdit._id;
      });
      console.log(index);
      this.employee.splice(index, 1, itemEdit);
    }
  },
  async mounted() {
    try {
      this.loadingMainData = true;
      const res = await employeesApi.getEmployees();
      this.employee = res.data.Employees;
      this.loadingMainData = false;
    } catch (err) {
      this.loadingMainData = false;

      console.log(err);
    }
  }
};
</script>
<style lang="scss" scoped>

// @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700&display=swap');

// *, html {
//   font-family: 'Montserrat', sans-serif;
// }
</style>

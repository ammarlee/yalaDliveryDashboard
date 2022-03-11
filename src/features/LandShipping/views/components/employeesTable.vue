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
          :headers="headersEmployee"
          :items="employee"
          :search="search"
        >
          <template v-slot:[`item.img`]="{ item }">
            <img
              width="100px"
              height="100px"
              v-if="item.img"
              :src="item.img"
              class="pa-2 rounded-circle"
            />
            <v-icon class="accountIcon" v-else>mdi-account-circle</v-icon>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="success" medium @click="editEmployee(item)">mdi-pen</v-icon>
            <v-icon color="error" medium class="mr-2" @click="opendelEmployee(item)"
              >mdi-delete</v-icon
            >
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-icon medium color="success" @click="ref(item)">mdi-camera</v-icon>
            <input
              class="d-none"
              ref="uploadImg"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              single
            />
          </template>
        </v-data-table>
        <v-dialog v-model="openDeleteEmployee" width="500">
          <deleteItemsConfirmMsg
            :loading="loading"
            @submit="sureDelEmployee"
            @closeDeleteDilog="openDeleteEmployee = false"
            content="هذا الموظف"
          ></deleteItemsConfirmMsg>
        </v-dialog>
      </v-card>
    </template>
  </div>
</template>
<script>
import employeesApi from "../../services/employeesApi";
export default {
  props: ["employee", "user", "loadingMain"],
  data() {
    return {
      openDeleteEmployee: false,
      search: "",
      loading: false,
      userId: null,
      images: null,
      headersEmployee: [
        {
          text: "الاسم",
          align: "center",
          value: "username"
        },
        {
          text: "البريد الالكتروني",
          align: "center",
          filterable: false,
          value: "email"
        },
        {
          text: "العنوان",
          align: "center",
          value: "address"
        },

        {
          text: "رقم الهاتف",
          align: "center",
          value: "phone"
        },
        {
          text: "الصورة",
          align: "center",
          value: "img"
        },
        {
          text: "تعديل او إضافة صورة",
          align: "center",
          value: "action"
        },
        {
          text: "تعديل او حذف",
          align: "center",
          value: "actions"
        }
      ]
    };
  },
  methods: {
    ref(item) {
      var employeesInfo = { ...item };
      this.$emit("employeesInfo", employeesInfo)
      this.$refs.uploadImg.click();
    },
    uploadFile(e) {
     let slectedImg = this.images = e.target.files;
     this.$emit("selecteImg", slectedImg)
      if (this.images.length > 0) {
        // this.openAddImg = true;
        this.$emit("dilogAddImg")
      }
    },
    editEmployee(item) {
      // this.addEmployee = true;
      // this.user = { ...item };
       var employeesInfo = { ...item };
      this.$emit("employeesInfo", employeesInfo)
        this.$emit("openDilogAddEmployees")

    },
    opendelEmployee(item) {
      this.userId = item._id;
      this.openDeleteEmployee = true;
    },
    async sureDelEmployee() {
      try {
        this.loading = true;
        console.log(this.userId);
        const res = await employeesApi.deleteEmployees(this.userId);
        console.log(res);
        this.loading = false;
        this.openDeleteEmployee = false;
        this.$emit("employeesId", this.userId)
        this.ToasteSuccessMsg("تم مسح الموظف بنجاح");
        console.log(this.employee);
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.toastErrorMsg("حدث خطأ اثناء مسح الموظف");
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>

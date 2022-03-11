<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('closeAddEmployeesDialog')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center mb-5">{{ user._id ? "تعديل بيانات الموظف" : "إضافة موظف" }}</h2>
      <v-form v-model="valid" @submit.prevent="addEditEmployee">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.username"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="اسم الموظف"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.phone"
              :rules="[allRules.required, allRules.length(9)]"
              dense
              outlined
              label="رقم الهاتف"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row> </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.email"
              :rules="[allRules.required, allRules.validEmail]"
              dense
              outlined
              label="البريد الإلكتروني"
              type="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              rounded
              solo
              :rules="[allRules.required]"
              dense
              :items="selectRole"
              item-text="nameRole"
              item-value="nameRole"
              v-model="user.role"
              placeholder="الرتبة"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.address"
              :rules="[allRules.required, allRules.minNameLen(4)]"
              dense
              outlined
              label="العنوان"
              type="text"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" v-if="!user._id">
            <v-text-field
              v-model="user.password"
              :rules="[allRules.required]"
              dense
               :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              outlined
              label="كلمة السر"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center">
            <v-btn
              type="submit"
              class="font-weight-bold"
              color="success"
              :disabled="!valid"
              :loading="loading"
              >{{ user._id ? "حفظ تعديلات بيانات الموظف" : "تسجيل الموظف" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import employeesApi from "../../services/employeesApi";
export default {
  props: ["user"],
  data() {
    return {
      selectRole: [{ nameRole: "user" }, { nameRole: "master" }, { nameRole: "guide" }],
      valid: false,
      loading: false,
      show: false
    };
  },
  methods: {
    async addEditEmployee() {
      if (this.user._id) {
        try {
          this.loading = true;
          const res = await employeesApi.editEmployees(this.user);
          console.log(res);
          this.loading = false;
          this.$emit("closeAddEmployeesDialog");
          let itemEdit = res.data.user;
          this.$emit("editEmpoyeesInfo", itemEdit);
          this.ToasteSuccessMsg("تم تعديل معلومات الموظف بنجاح");
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("يوجد خطأ اثناء تعديل معلومات الموظف");
        }
      } else {
        try {
          this.loading = true;
          const res = await employeesApi.CreateEmployees(this.user);
          console.log(res);
          this.loading = false;
          this.$emit("closeAddEmployeesDialog");
          this.$emit("pushInEmpoyees", res.data.newemployee);
          this.ToasteSuccessMsg("تم اضافة الموظف بنجاح");
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("يوجد خطأ اثناء اضافة الموظف");
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

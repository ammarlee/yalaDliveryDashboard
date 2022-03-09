<template>
  <div>
    <v-card class="pa-10">
      <v-btn icon @click="$emit('closeDilogResturant')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="d-flex justify-content-center">
        <h2 class="text-center mb-5">{{ user._id ? "تعديل بيانات المطعم" : "إضافة مطعم" }}</h2>
      </v-card-title>
      <v-form v-model="valid" @submit.prevent="creatEditResturant">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.username"
              :rules="[allRules.required, allRules.minNameLen(6)]"
              dense
              outlined
              label="اسم المطعم"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.name"
              :rules="[allRules.required, allRules.minNameLen(6)]"
              dense
              outlined
              label="اسم صاحب المطعم"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.phone"
              :rules="[allRules.required, allRules.length(11)]"
              dense
              outlined
              label="رقم الهاتف"
              type="number"
            ></v-text-field>
          </v-col>
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
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.address"
              :rules="[allRules.required, allRules.minNameLen(8)]"
              dense
              outlined
              label="عنوان المطعم"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" v-if="!user._id">
            <v-text-field
              v-model="user.password"
              :rules="[allRules.required]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              dense
              outlined
              label="كلمة السر"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center">
            <v-btn
              type="submit"
              color="success"
              class="font-weight-bold"
              :disabled="!valid"
              :loading="loading"
              >{{ user._id ? "حفظ تعديلات المطعم" : "تسجيل المطعم" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import resturantApi from "../../services/resturantApi";

export default {
  props: ["data", "user"],
  data() {
    return {
      valid: false,
      loading: false,
      show: ""
    };
  },
  methods: {
    async creatEditResturant() {
      if (this.user._id) {
        try {
          this.loading = true;
          const res = await resturantApi.editResturant(this.user);
          console.log(res);
          this.loading = false;
          this.$emit("closeDilogResturant");
          let itemEdit = res.data.user;
          this.$emit("EditResturant", itemEdit)
          this.ToasteSuccessMsg("تم تعديل بيانات المطعم بنجاح");
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("حدث خطأ اثناء تعديل بيانات المطعم");
        }
      } else {
        try {
          this.loading = true;
          const res = await resturantApi.createResturant(this.user);
          this.ToasteSuccessMsg("تم إضافة المطعم بنجاح");
          console.log(this.user);
          this.loading = false;
          this.$emit("closeDilogResturant");
          this.$emit("pushInResturant", res.data.user)
        } catch (err) {
          this.loading = false;
          let Errormsg = err.response.data.errors.msgs.ar || "حدث خطأ اثناء إضافة المطعم";
          this.$dialog.notify.error(Errormsg, {
            position: "bottom-right",
            timeout: 3000
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

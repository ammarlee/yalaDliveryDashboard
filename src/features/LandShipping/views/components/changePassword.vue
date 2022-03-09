<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('closeDialogChangePass')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center mb-5">تغيير كلمة السر</h2>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" sm="8" class="pb-0">
            <v-text-field
              v-model="changePassword.password"
              :rules="[allRules.required]"
              hint="مطلوب 6 أحرف على الاقل"
              :append-icon="showOldPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showOldPass ? 'text' : 'password'"
              @click:append="showOldPass = !showOldPass"
              dense
              outlined
              label="كلمة السر القديمة"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8" class="pt-0">
            <v-text-field
              v-model="changePassword.newPassword"
              :rules="[allRules.required]"
              hint="مطلوب 6 أحرف على الاقل"
              dense
              outlined
              label="كلمة السر الجديدة"
              :append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showNewPass ? 'text' : 'password'"
              @click:append="showNewPass = !showNewPass"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center pb-4">
            <v-btn
              class="success font-weight-bold"
              @click="saveChangePass(changePassword)"
              :loading="loading"
              :disabled="!valid"
              >تأكيد تعيير كلمة السر</v-btn
            >
            <v-btn class="error mr-3 font-weight-bold" @click="$emit('closeDialogChangePass')"
              >ألغاء</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import profileApi from "../../services/profileApi";
export default {
  props: ["changePassword", "currentUser"],
  data() {
    return {
      loading: false,
      valid: false,
      showOldPass: "",
      showNewPass: ""
    };
  },
  methods: {
    async saveChangePass(newpass) {
      console.log(newpass);
      newpass._id = this.currentUser._id;
      try {
        this.loading = true;
        let res = await profileApi.changePassword(newpass);
        console.log(res);
        this.loading = false;
        this.ToasteSuccessMsg("تم تغيير كلمة السر بنجاح");
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.toastErrorMsg("حدث خطأ اثناء تغيير كلمة السر");
      }
      this.$emit("closeDialogChangePass");
    }
  }
};
</script>

<style lang="scss" scoped></style>

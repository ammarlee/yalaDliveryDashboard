<template>
  <div>
    <v-card class="pa-5">
           <v-btn icon @click="$emit('closeDilogInfo')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center mb-5">تعديل المعلومات الشخصية</h2>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="mycurrentUser.username"
            :rules="[allRules.required, allRules.minNameLen(4)]"
            dense
            outlined
            label="الاسم"
            type="text"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="mycurrentUser.email"
            :rules="[allRules.required, allRules.validEmail]"
            dense
            outlined
            label="البريد الا‘لكتروني"
            type="email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="mycurrentUser.phone"
            :rules="[allRules.required, allRules.length(9)]"
            dense
            outlined
            label="الهاتف"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="mycurrentUser.address"
            :rules="[allRules.required, allRules.minNameLen(8)]"
            dense
            outlined
            label="العنوان"
            type="text"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" aling="center">
        <v-col cols="12" md="8" class="d-flex justify-center pb-4">
          <v-btn class="info font-weight-bold" @click="saveChange(mycurrentUser)" :loading="loading"
            >تأكيد تعديل المعلومات</v-btn
          >
          <v-btn class="error mr-3 font-weight-bold" @click="$emit('closeDilogInfo')">ألغاء</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import profileApi from "../../services/profileApi";

export default {
  props: ["mycurrentUser"],
  data() {
    return {
      loading: false,
      userInfo: null
    };
  },
  methods: {
    async saveChange(user) {
      this.loading = true;
      try {
        const res = await profileApi.editInfo(user);
        console.log(res);
        this.$store.dispatch("changeUserInfo", res.data);
        this.$emit("ProfileInfo", { ...res.data.user })
        this.loading = false;
        this.$emit("closeDilogInfo");
          this.ToasteSuccessMsg("تم تعديل المعلومات الشخصية بنجاح")
      } catch (err) {
        console.log(err);
        this.loading = false;
          this.toastErrorMsg("حدث خطأ اثناء تعديل المعلومات الشخصية");
      }
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>

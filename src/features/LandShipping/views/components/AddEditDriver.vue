<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('closeDialogAddDriver')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center mb-5">{{ driver._id ? "تعديل بيانات الكابتن" : "إضافة كابتن" }}</h2>
      <v-form v-model="valid" @submit.prevent="addNewDriver">
        <v-row>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.username"
              :rules="[allRules.required]"
              dense
              outlined
              label="اسم الكابتن"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.email"
              :rules="[allRules.required]"
              dense
              outlined
              label="البريد الإلكتروني"
              type="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.address"
              :rules="[allRules.required]"
              dense
              outlined
              label="العنوان"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.idNum"
              :rules="[allRules.required]"
              dense
              outlined
              label="رقم الهوية"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.homeNum"
              :rules="[allRules.required]"
              dense
              outlined
              label="رقم البيت"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.locationNum"
              :rules="[allRules.required]"
              dense
              outlined
              label="رقم الموقع"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.motoType"
              :rules="[allRules.required]"
              dense
              outlined
              label="رقم الموتوسيكل"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.phone"
              :rules="[allRules.required]"
              dense
              outlined
              label="الهاتف"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="pb-0">
            <v-text-field
              v-model="driver.strNum"
              :rules="[allRules.required]"
              dense
              outlined
              label="رقم الشارع"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" id="idFace" class="pb-0">
            <v-text-field
              v-if="!driver._id"
              @click="ref"
              v-model="driver.locationFace"
              outlined
              dense
              placeholder="صورة الهوية من الامام"
            ></v-text-field>
            <div v-else>
              <div class="d-flex align-items-center justify-content-center flex-column">
                <div>
                  <v-icon button @click="ref">mdi-camera</v-icon>
                </div>
                <img class="mt-2 mb-2" :src="driver.locationFace" width="100" height="100" />
                <label class="font-weight-bold">صورة البطاقة من الامام</label>
              </div>
            </div>
            <input
              class="d-none"
              ref="imgIdFace"
              type="file"
              id="1"
              :rules="[allRules.required]"
              @change="uploadFile"
              multiple
            />
          </v-col>
          <v-col cols="12" sm="3" id="idBack" class="pb-0">
            <v-text-field
              v-show="!driver._id"
              @click="ref"
              v-model="driver.locationBack"
              outlined
              dense
              placeholder="صورة الهوية من الخلف"
            ></v-text-field>
            <div v-show="driver._id">
              <div class="d-flex align-items-center justify-content-center flex-column">
                <div>
                  <v-icon button @click="ref">mdi-camera</v-icon>
                </div>
                <img class="mt-2 mb-2" :src="driver.locationBack" width="100" height="100" />
                <label class="font-weight-bold">صورة البطاقة من الخلف</label>
              </div>
            </div>
            <input
              class="d-none"
              ref="imgIdBack"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              single
              id="2"
            />
          </v-col>
          <v-col cols="12" sm="3" id="nationalityFace" class="pb-0">
            <v-text-field
              v-if="!driver._id"
              @click="ref"
              v-model="driver.nationalityFace"
              outlined
              dense
              placeholder="صورة الجنسية من الامام"
            ></v-text-field>
            <div v-else>
              <div class="d-flex align-items-center justify-content-center flex-column">
                <div>
                  <v-icon button @click="ref">mdi-camera</v-icon>
                </div>
                <img class="mt-2 mb-2" :src="driver.nationalityFace" width="100" height="100" />
                <label class="font-weight-bold">صورة الباسبور من الامام</label>
              </div>
            </div>
            <input
              class="d-none"
              ref="imgNationalityFace"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              single
              id="3"
            />
          </v-col>
          <v-col cols="12" sm="3" id="nationalityBack" class="pb-0">
            <v-text-field
              v-if="!driver._id"
              @click="ref"
              v-model="driver.nationalityBack"
              outlined
              dense
              placeholder="صورة الجنسية من الخلف"
            ></v-text-field>
            <div v-else>
              <div class="d-flex align-items-center justify-content-center flex-column">
                <div>
                  <v-icon button @click="ref">mdi-camera</v-icon>
                </div>
                <img class="mt-2 mb-2" :src="driver.nationalityBack" width="100" height="100" />
                <label class="font-weight-bold">صورة الباسبور من الخلف</label>
              </div>
            </div>
            <input
              class="d-none"
              ref="imgNationalityBack"
              type="file"
              :rules="[allRules.required]"
              @change="uploadFile"
              single
              id="4"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" v-if="!driver._id" class="pt-0">
            <v-text-field
              v-model="driver.password"
              :rules="[allRules.required]"
              dense
              outlined
              label="الرقم السري"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center" aling="center">
          <v-col cols="12" md="8" class="d-flex justify-center pt-0">
            <v-btn
              class="font-weight-bold success"
              type="submit"
              :disabled="!valid"
              :loading="loading"
              >{{ driver._id ? "حفظ تعديلا الكابتن" : "تسجيل الكابتن" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import driverApi from "../../services/driverApi";

export default {
  props: ["driver"],
  data() {
    return {
      valid: false,
      loading: false,
      showPass: ""
    };
  },
  methods: {
    async addNewDriver() {
      console.log(this.driver);
      const formData = new FormData();
      formData.append("address", this.driver.address);
      formData.append("email", this.driver.email);
      formData.append("homeNum", this.driver.homeNum);
      formData.append("idNum", this.driver.idNum);
      formData.append("locationNum", this.driver.locationNum);
      formData.append("motoType", this.driver.motoType);
      formData.append("username", this.driver.username);
      formData.append("strNum", this.driver.strNum);
      formData.append("phone", this.driver.phone);
      formData.append("password", this.driver.password);
      formData.append("locationFace", this.driver.locationFace);
      formData.append("locationBack", this.driver.locationBack);
      formData.append("nationalityFace", this.driver.nationalityFace);
      formData.append("nationalityBack", this.driver.nationalityBack);
      if (this.driver._id) {
        console.log(this.driver._id);
        try {
          this.loading = true;
          formData.append("_id", this.driver._id);
          const res = await driverApi.editDriver(formData);
          console.log(res);
          this.loading = false;
          this.$emit("closeDialogAddDriver");
          this.$emit("itemEditing", res.data.user);

          this.ToasteSuccessMsg("تم تعديل معلومات الكابتن بنجاح");
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("حدث خطأ اثناء تعديل معلومات الكابتن");
        }
      } else {
        try {
          this.loading = true;
          const res = await driverApi.createDriver(formData);
          console.log(res);
          this.loading = false;
          this.$emit("closeDialogAddDriver");
          this.$emit("pushInDriverList", res.data.newdriver);
          this.ToasteSuccessMsg("تم إضافة الكابتن بنجاح");
          console.log(res.data);
        } catch (err) {
          console.log(err);
          this.loading = false;
          this.toastErrorMsg("حدث خطأ اثناء إضافة الكابتن");
        }
      }
    },
    ref(e) {
      console.log(e);
      let target = e.path[5].id || e.path[4].id;
      console.log(target);
      if (target === "idFace") {
        this.$refs.imgIdFace.click();
      } else if (target === "idBack") {
        this.$refs.imgIdBack.click();
      } else if (target === "nationalityFace") {
        this.$refs.imgNationalityFace.click();
      } else if (target === "nationalityBack") {
        this.$refs.imgNationalityBack.click();
      } else {
        console.log("eeeeeee");
      }
    },

    uploadFile(e) {
      let character = e.target.id.charAt(e.target.id.length - 1);
      console.log(character);
      if (character == 1) {
        this.driver.locationFace = e.target.files[0];
      } else if (character == 2) {
        this.driver.locationBack = e.target.files[0];
      } else if (character == 3) {
        this.driver.nationalityFace = e.target.files[0];
      } else if (character == 4) {
        this.driver.nationalityBack = e.target.files[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

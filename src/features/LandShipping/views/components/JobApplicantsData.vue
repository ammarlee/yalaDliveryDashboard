<template>
  <div>
    <v-card class="pa-5">
      <v-btn icon @click="$emit('closeDilogJobApllicants')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <h2 class="text-center mb-3">الإطلاع علي المتقدم للوظيفة</h2>
      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span>الاسم:</span>
          <p class="mr-3">{{ singleRequest.username }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span>العمر:</span>
          <p class="mr-3">{{ singleRequest.age }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span>نوع الموتوسيكل:</span>
          <p class="mr-3">{{ singleRequest.motoType }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span>رقم الهاتف:</span>
          <p class="mr-3">{{ singleRequest.phone }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span>العنوان:</span>
          <p class="mr-3">{{ singleRequest.address }}</p>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["singleRequest"]
};
</script>

<style lang="scss" scoped></style>

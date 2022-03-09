<template>
  <div>
    <div >
      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span class="font-weight-bold">الاسم:</span>
          <p class="mr-3">{{ mycurrentUser.username }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span class="font-weight-bold">البريد الإلكتروني:</span>
          <p class="mr-3">{{ mycurrentUser.email }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span class="font-weight-bold"> الرتبة:</span>
          <p class="mr-3">{{ mycurrentUser.role }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span class="font-weight-bold">رقم الهاتف:</span>
          <p class="mr-3">{{ mycurrentUser.phone }}</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12" class="d-flex">
          <span class="font-weight-bold">العنوان:</span>
          <p class="mr-3">{{ mycurrentUser.address }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mycurrentUser"],

  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped></style>

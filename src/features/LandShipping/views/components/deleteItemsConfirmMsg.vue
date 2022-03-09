<template>
  <div>
    <v-card class="pa-5">
      <h2 class="text-center">هل أنت متأكد من مسح {{ content }}</h2>
      <v-card-actions class="d-flex justify-content-center">
        <v-btn class="success font-weight-bold" :loading="loading" @click="$emit('submit')"
          >متأكد</v-btn
        >
        <v-btn class="error font-weight-bold" @click="$emit('closeDeleteDilog')">ألغاء</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["content", "loading"],
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped></style>

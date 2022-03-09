<template>
  <div>
    <v-card class="pa-2">
      <v-btn icon @click="$emit('closeAddImg')" class="d-flex">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-actions class="d-flex justify-content-center">
        <v-btn
          color="success"
          class="changeImg font-weight-bold"
          @click="$emit('AddImgs')"
          :loading="loading"
          >{{content}}</v-btn
        >
        <v-btn class="error" @click="$emit('closeAddImg')">ألغاء</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

export default {
  props: ["content", "loading"],
};
</script>

<style lang="scss" scoped></style>

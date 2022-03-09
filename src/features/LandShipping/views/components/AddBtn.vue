<template>
  <div>
    <v-btn class="success font-weight-bold" @click="$emit('submit')">{{ content }}</v-btn>
  </div>
</template>

<script>
export default {
  props: ["content"]
};
</script>

<style lang="scss" scoped></style>

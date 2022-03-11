<template>
  <div id="nav">
    <v-app-bar i class=" white--text " color="warning" dark app dense>
      <v-app-bar-nav-icon
        v-if="isDashboard"
        class="white--text "
        @click="$emit('menuBtn')"
      ></v-app-bar-nav-icon>

      <v-toolbar-title style="cursor:pointer">
        <!-- <img class="rounded-circle" width="40px" height="40px" src="../../../../assets/logo.jpeg"> -->
        يلا دليفيري</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <div class="ml-4">
        <v-btn icon to="/shipping/profile" v-if="currentUser">
          <img
            v-if="currentUser.img"
            :src="currentUser.img"
            width="30"
            height="30"
            class="rounded-circle "
          />
          <v-icon v-else medium to="/shipping/profile" class="accountIcon">mdi-account-circle</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["isDashboard"],
  mounted() {},
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    notificationsLength() {
      return this.$store.getters.notifications.filter(notification => {
        return notification.seen === false;
      });
    },
    notifications() {
      return this.$store.getters.notifications;
    },
    checkNotifications() {
      return this.notifications && this.notifications.length > 0;
    }
  },
  data: () => {
    return {};
  },
  methods: {
    logOut() {
      console.log("user log out");
      this.$store.dispatch("logOut").then(() => {
        this.$router.push("/login");
        window.location.href = "/login";
      });
    },
    navegateTo(item) {
      console.log("nagvate to ");
    }
    // getInials() {
    //   if (!this.user) return "";
    //   var user = this.user;
    //   return user.firstName.charAt(0) + user.lastName.charAt(0);
    // }
  }
};
</script>

<style lang="scss"></style>

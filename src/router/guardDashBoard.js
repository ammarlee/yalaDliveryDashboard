import store from "../store";

export default (to, from, next) => {
    if (!store.getters.currentUser) {
      next("/login");
    }
     else {
      next()
    }
};

import router from ".";
import store from "../store";



  export default (to, from, next) => {
      if (!store.getters.currentUser) {
        next()
      } else {
        console.log(from);
        // from.fullPath
        // next("/")
        router.push(-1)
        console.log(to);
      }
  };

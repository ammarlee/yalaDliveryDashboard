import guardLogin from "../../router/guardLogin";

export default [
  {
    path: "/login",
    name: "Login",
    beforeEnter: guardLogin,
    component: () => import("./views/accounts/Login.vue")
  }
];

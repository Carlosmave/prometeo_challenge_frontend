import Login from "views/Login.js";

var routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth"
  }
];
export default routes;

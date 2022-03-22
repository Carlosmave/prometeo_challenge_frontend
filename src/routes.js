import Account from "views/Account.js";
import AccountDetails from "views/AccountDetails.js";
import Client from "views/Client.js";
import CreditCard from "views/CreditCard.js";
import CreditCardDetails from "views/CreditCardDetails.js";
import Home from "views/Home.js";
import Login from "views/Login.js";
import Profile from "views/Profile.js";
import Provider from "views/Provider.js";
import TransferDestination from "views/TransferDestination.js";
import Transference from "views/Transference.js";

var routes = [
  {
    path: "/cuentas/:id",
    name: "Detalle de la cuenta",
    component: AccountDetails,
    layout: "/main"
  },
  {
    path: "/cuentas",
    name: "Cuentas",
    component: Account,
    layout: "/main"
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: Client,
    layout: "/main"
  },
  {
    path: "/tarjetas-de-credito/:id",
    name: "Detalles de la tarjeta de crédito",
    component: CreditCardDetails,
    layout: "/main"
  },
  {
    path: "/tarjetas-de-credito",
    name: "Tarjetas de crédito",
    component: CreditCard,
    layout: "/main"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    layout: "/main"
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Profile,
    layout: "/main"
  },
  {
    path: "/proveedor",
    name: "Proveedor",
    component: Provider,
    layout: "/main"
  },
  {
    path: "/instituciones-para-transferencias",
    name: "Instituciones para transferencias",
    component: TransferDestination,
    layout: "/main"
  },
  {
    path: "/transferencias",
    name: "Transferencias",
    component: Transference,
    layout: "/main"
  }
];

export default routes;

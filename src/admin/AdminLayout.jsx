// import React from "react";
// import { Admin, Resource } from "react-admin";
// import { dataProvider } from "./dataProvider";
// import { authProvider } from "./authProvider";
// import Dashboard from "./Dashboard";
// import { UserList, UserEdit, UserCreate } from "./resources/users";
// import {
//   OptionsChainList,
//   OptionsChainEdit,
//   OptionsChainCreate,
// } from "./resources/optionsChain";
// import { PricingList, PricingEdit, PricingCreate } from "./resources/pricing";
// import { ContactList } from "./resources/contacts";
// import { People, TrendingUp, AttachMoney, Email } from "@mui/icons-material";

// const AdminLayout = () => {
//   return (
//     <Admin
//       dashboard={Dashboard}
//       dataProvider={dataProvider}
//       authProvider={authProvider}
//     >
//       <Resource
//         name="users"
//         list={UserList}
//         edit={UserEdit}
//         create={UserCreate}
//         icon={People}
//       />
//       <Resource
//         name="options-chain"
//         list={OptionsChainList}
//         edit={OptionsChainEdit}
//         create={OptionsChainCreate}
//         icon={TrendingUp}
//       />
//       <Resource
//         name="pricing"
//         list={PricingList}
//         edit={PricingEdit}
//         create={PricingCreate}
//         icon={AttachMoney}
//       />
//       <Resource name="contacts" list={ContactList} icon={Email} />
//     </Admin>
//   );
// };

// export default AdminLayout;

import React from 'react';
// const User = React.lazy(() => import('./views/User'));
const Home = React.lazy(() => import('./views/Home'));
const ReceiveTool = React.lazy(() => import('./views/ReceiveTool'));
const TakeoutTool = React.lazy(() => import('./views/TakeoutTool'));
const SettingMachine = React.lazy(() => import('./views/SettingMachine'));
const SettingAnother = React.lazy(() => import('./views/SettingAnother'));
const Machine = React.lazy(() => import('./views/SettingAnother/Machine/Machine'));
const MachineModel = React.lazy(() => import('./views/SettingAnother/Machine/MachineModel'));
const MachineBrand = React.lazy(() => import('./views/SettingAnother/Machine/MachineBrand'));
const MachieneType = React.lazy(() => import('./views/SettingAnother/Machine/MachineType'));
const Product = React.lazy(() => import('./views/SettingAnother/Product/Product'));
const ProductType = React.lazy(() => import('./views/SettingAnother/Product/ProductType'));
const ProductGroup = React.lazy(() => import('./views/SettingAnother/Product/ProductGroup'));
const ProductBrand = React.lazy(() => import('./views/SettingAnother/Product/ProductBrand'));
const Stock = React.lazy(() => import('./views/SettingAnother/Stock/Stock'));
const StockLayout = React.lazy(() => import('./views/SettingAnother/Stock/StockLayout'));
const User = React.lazy(() => import('./views/SettingAnother/User/User'));
const Premission = React.lazy(() => import('./views/SettingAnother/User/Premission'));
const Department = React.lazy(() => import('./views/SettingAnother/User/Department'));
const UserType = React.lazy(() => import('./views/SettingAnother/User/UserType'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  // { path: '/user', name: 'User', component: User },
  // { path: '/customer', name: 'Customer', component: User },
  { path: '/receivetool', name: 'ReceiveTool', component: ReceiveTool },
  { path: '/takeouttool', name: 'TakeoutTool', component: TakeoutTool },
  { path: '/settingmachine', name: 'SettingMachine', component: SettingMachine },

  { path: '/settinganother/machine/machinetype', name: 'MachieneType', component: MachieneType },
  { path: '/settinganother/machine/machine', name: 'Machine', component: Machine },
  { path: '/settinganother/machine/machinemodel', name: 'MachineModel', component: MachineModel },
  { path: '/settinganother/machine/machinebrand', name: 'MachineBrand', component: MachineBrand },

  { path: '/settinganother/product/product', name: 'Product', component: Product },
  { path: '/settinganother/product/product-type', name: 'ProductType', component: ProductType },
  { path: '/settinganother/product/product-group', name: 'ProductGroup', component: ProductGroup },
  { path: '/settinganother/product/product-brand', name: 'ProductBrand', component: ProductBrand },

  { path: '/settinganother/stock/stock', name: 'Stock', component: Stock },
  { path: '/settinganother/stock/stock-layout', name: 'StockLayout', component: StockLayout },

  { path: '/settinganother/user/user', name: 'User', component: User },
  { path: '/settinganother/user/premission', name: 'Premission', component: Premission },
  { path: '/settinganother/user/department', name: 'Department', component: Department },
  { path: '/settinganother/user/user-type', name: 'UserType', component: UserType },

  { path: '/settinganother', name: 'SettingAnother', component: SettingAnother },

];
export default routes;

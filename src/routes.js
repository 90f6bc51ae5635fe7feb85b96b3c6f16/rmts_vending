import React from 'react';
const User = React.lazy(() => import('./views/User'));
const Home = React.lazy(() => import('./views/Home'));
const ReceiveTool = React.lazy(() => import('./views/ReceiveTool'));
const TakeoutTool = React.lazy(() => import('./views/TakeoutTool'));
const SettingMachine = React.lazy(() => import('./views/SettingMachine'));
const SettingAnother = React.lazy(() => import('./views/SettingAnother'));
const MachieneType = React.lazy(() => import('./views/SettingAnother/Machine/MachineType'));
const MachineManagement = React.lazy(() => import('./views/SettingAnother/Machine/MachineManagement'));
const MachineModel = React.lazy(() => import('./views/SettingAnother/Machine/MachineModel'));
const MachineBrand = React.lazy(() => import('./views/SettingAnother/Machine/MachineBrand'));




const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/user', name: 'User', component: User },
  { path: '/customer', name: 'Customer', component: User },
  { path: '/receivetool', name: 'ReceiveTool', component: ReceiveTool },
  { path: '/takeouttool', name: 'TakeoutTool', component: TakeoutTool },
  { path: '/settingmachine', name: 'SettingMachine', component: SettingMachine },
  { path: '/settinganother/machine/machinetype', name: 'MachieneType', component: MachieneType },
  { path: '/settinganother/machine/machinemanagement', name: 'MachineManagement', component: MachineManagement },
  { path: '/settinganother/machine/machinemodel', name: 'MachineModel', component: MachineModel },
  { path: '/settinganother/machine/machinebrand', name: 'MachineBrand', component: MachineBrand },
  { path: '/settinganother', name: 'SettingAnother', component: SettingAnother },

];
export default routes;

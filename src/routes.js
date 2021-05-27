import React from 'react';
const User = React.lazy(() => import('./views/User'));
const Home = React.lazy(() => import('./views/Home'));
const ReceiveTool = React.lazy(() => import('./views/ReceiveTool'));
const TakeoutTool  = React.lazy(() => import('./views/TakeoutTool'));
const SettingMachine = React.lazy(() => import('./views/SettingMachine'));




const routes = [
  { path: '/', exact: true, name: 'Home' ,component: Home},
  { path: '/user', name: 'User', component: User },
  { path: '/customer', name: 'Customer', component: User },
  { path: '/receivetool', name: 'ReceiveTool', component: ReceiveTool },
  { path: '/takeouttool', name: 'TakeoutTool', component: TakeoutTool },
  { path: '/settingmachine', name: 'SettingMachine', component: SettingMachine },

  
];
export default routes;

import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component'
import {LoginComponent} from './core/login/login.component'
// import { PropertyComponent } from './components/property/property-image/property.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LoginComponent,
    children: [
      // {
      //   path: '',
      //   component: PropertyComponent,
      // },
    ]
  }
];
export const routing = RouterModule.forRoot(routes);

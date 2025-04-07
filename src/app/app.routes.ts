import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlertComponent } from './components/alert/alert.component';

export const routes: Routes = [

  {
    path: '',
    component:HomeComponent
  },
  {
    path: '**',
    component: AlertComponent,
    
  }
];

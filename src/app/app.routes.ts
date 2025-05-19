
import { Routes } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@pages/home/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('@pages/character-info/character-info.component').then((c) => c.CharacterInfoComponent),
      },
    ]
  },
  // {
  //   path: 'character/:id',
  //   loadComponent: () =>
  //     import('@pages/character-info/character-info.component').then((m) => m.CharacterInfoComponent),
  // },
  {
    path: '**',
    component: AlertComponent,

  }
];

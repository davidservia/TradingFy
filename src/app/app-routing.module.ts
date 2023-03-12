import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./pages/folder/folder.module').then( m => m.FolderPageModule),
    canActivate:[AuthGuard],
  },
  {
    path: 'markets',
    loadChildren: () => import('./pages/markets/markets.module').then( m => m.MarketsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'assign',
    loadChildren: () => import('./pages/assignments/assignments.module').then( m => m.AssignmentsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'positions',
    loadChildren: () => import('./pages/positions/position.module').then( m => m.PositionsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

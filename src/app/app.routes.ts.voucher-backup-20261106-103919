import { Routes } from '@angular/router';
import { adminAuthGuard } from './core/guards/admin-auth.guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadComponent: () =>
      import('./features/authentication/auth-layout')
        .then(m => m.AuthLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },

      {
        path: 'login',
        loadComponent: () =>
          import('./features/authentication/login/login')
            .then(m => m.Login)
      },
      {
        path: 'verify-code',
        loadComponent: () =>
          import('./features/authentication/verify-code/verify-code')
            .then(m => m.VerifyCode)
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/authentication/forgot-password/forgot-password')
            .then(m => m.ForgotPassword)
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./features/authentication/reset-password/reset-password')
            .then(m => m.ResetPassword)
      }
    ]
  },

  {
    path: '',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout')
        .then(m => m.AdminLayout),

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'notifications',
        data: { adminModule: 'notifications' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'audit-logs',
        data: { adminModule: 'audit-logs' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'manage/:module',
        loadComponent: () =>
          import('./shared/admin-management/admin-management')
            .then(m => m.AdminManagementComponent)
      },

      {
        path: 'dashboard',
        data: { adminModule: 'dashboard' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'users',
        data: { adminModule: 'users' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'location-verification',
        data: { adminModule: 'location-verification' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'advertisements',
        data: { adminModule: 'advertisements' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'places',
        data: { adminModule: 'places' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'trips-historical-routes',
        data: { adminModule: 'trips' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'hazards',
        data: { adminModule: 'hazards' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'group-trips',
        data: { adminModule: 'group-trips' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'games',
        data: { adminModule: 'games' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'wallet-rewards',
        data: { adminModule: 'wallet-rewards' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'merchants',
        data: { adminModule: 'merchants' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },
      {
        path: 'reports-analytics',
        data: { adminModule: 'reports' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      },

      {
        path: 'notifications',
        loadComponent: () =>
          import('./shared/admin-management/admin-management')
            .then(m => m.AdminManagementComponent)
      },

      {
        path: 'audit-logs',
        loadComponent: () =>
          import('./shared/admin-management/admin-management')
            .then(m => m.AdminManagementComponent)
      },
      {
        path: 'settings',
        data: { adminModule: 'settings' },
        loadComponent: () =>
          import('./shared/wayhunter-admin-full/admin-full')
            .then(m => m.WayhunterAdminFull)
      }
    ]
  },

  { path: '**', redirectTo: 'auth/login' }

];




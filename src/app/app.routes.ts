import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Inventory } from './inventory/inventory';
import { Sales } from './sales/sales';
import { Employees } from './employees/employees';
import { Analytics } from './analytics/analytics';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventory', component: Inventory },
  { path: 'sales', component: Sales },
  { path: 'employees', component: Employees },
  { path: 'analytics', component: Analytics },
];

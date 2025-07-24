import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Inventory } from './inventory/inventory';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventory', component: Inventory },
];

import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { InvoiceComponent } from '../content/invoice/invoice.component';
import { DashboardComponent } from '../content/dashboard/dashboard.component';

export const HOME_ROUTE: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: InvoiceComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ],
    data: {
      authorities: [],
      pageTitle: 'home.title'
    }
  }
];

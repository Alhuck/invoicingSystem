import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InvoiceSystemSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { InvoiceComponent } from 'app/content/invoice/invoice.component';
import { DashboardComponent } from '../content/dashboard/dashboard.component';

@NgModule({
  imports: [InvoiceSystemSharedModule, RouterModule.forChild(HOME_ROUTE)],

  declarations: [HomeComponent, InvoiceComponent, DashboardComponent],
  exports: [RouterModule]
})
export class InvoiceSystemHomeModule {}

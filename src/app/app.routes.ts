import { Routes } from '@angular/router';
import {LogInComponent} from './diluma/pages/log-in/log-in.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {ResumenComponent} from './public/pages/resumen/resumen.component';
import {ClientsComponent} from './diluma/components/clients/clients.component';
import {LettersComponent} from './diluma/components/letters/letters.component';
import {ProductsComponent} from './diluma/components/products/products.component';
import {WalletComponent} from './diluma/components/wallet/wallet.component';
import {CustomerSupportComponent} from './diluma/components/customer-support/customer-support.component';

export const routes: Routes = [
  {path: 'resumen',          component: ResumenComponent},
  {path: 'clients',          component: ClientsComponent},
  {path: 'letters',          component: LettersComponent},
  {path: 'products',         component: ProductsComponent},
  {path: 'wallet',           component: WalletComponent},
  {path: 'customer-support', component: CustomerSupportComponent},
  {path: 'log-in',           component: LogInComponent},
  {path: '',                 redirectTo: 'log-in', pathMatch: 'full'},
  {path: '**',               component: PageNotFoundComponent},
];

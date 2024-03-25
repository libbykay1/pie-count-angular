import { Routes } from '@angular/router';
import { OrderFormComponent } from './order-form/order-form.component';
import { ItemFormComponent } from './item-form/item-form.component';

export const routes: Routes = [
    { path: 'neworder', component: OrderFormComponent },
  { path: 'additem', component: ItemFormComponent },
];

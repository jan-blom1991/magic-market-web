import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './layouts/default/default.component';
import {MaintainProductComponent} from './layouts/default/maintain-product/maintain-product.component';
import {Path} from './domain/path';
import {ManageProductComponent} from './layouts/default/manage-product/manage-product.component';
import {LoginComponent} from './layouts/default/login/login.component';
import {HomeComponent} from "./layouts/default/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {path: Path.HOME, component: HomeComponent, data: {title: 'Home'}},
      {path: Path.MANAGE_PRODUCTS, component: ManageProductComponent, data: {title: 'Product'}},
      {path: Path.MAINTAIN_PRODUCT, component: MaintainProductComponent, data: {title: 'Product'}},
      {path: Path.LOGIN, component: LoginComponent, data: {title: 'Login'}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

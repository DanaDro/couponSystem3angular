import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { EmptyViewComponent } from './components/empty-view/empty-view.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponsPurchaseComponent } from './components/coupons-purchase/coupons-purchase.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AboutWebsiteComponent } from './components/about-website/about-website.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'purchaseCoupon', component: CouponsPurchaseComponent},
  {path: 'aboutMe', component: AboutMeComponent},
  {path: 'aboutWebsite', component: AboutWebsiteComponent},
  {path: '**', component: Page404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CreateOrUpdateDialogCustomerComponent } from './components/create-or-update-dialog-customer/create-or-update-dialog-customer.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CompanyComponent } from './components/company/company.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { EmptyViewComponent } from './components/empty-view/empty-view.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Page404Component } from './components/page404/page404.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateOrUpdateDialogCompanyComponent } from './components/create-or-update-dialog-company/create-or-update-dialog-company.component';
import { CreateOrUpdateCouponComponent } from './components/create-or-update-coupon/create-or-update-coupon.component';
import { CouponsDialogComponent } from './components/coupons-dialog/coupons-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { CouponsPurchaseComponent } from './components/coupons-purchase/coupons-purchase.component';
import { CheckingDialogComponent} from './components/checking-dialog/checking-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { FooterComponent } from './components/footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AboutWebsiteComponent } from './components/about-website/about-website.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CompanyComponent,
    AdminComponent,
    EmptyViewComponent,
    CreateOrUpdateDialogCustomerComponent,
    Page404Component,
    HomeComponent,
    CreateOrUpdateDialogCompanyComponent,

    CreateOrUpdateCouponComponent,
    CouponsDialogComponent,
    CouponsPurchaseComponent,
    CheckingDialogComponent,
    HeaderComponent,
    FooterComponent,
    AboutMeComponent,
    AboutWebsiteComponent,
    LoginDialogComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

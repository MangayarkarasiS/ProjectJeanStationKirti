import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import {ApiService} from './service/api.service';
import { AboutComponent } from './component/about/about.component';
import { ContactUsComponent } from './component/contact/contact.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserRegistrationComponent } from './CreateUsers/app.UserRegistration.component';
import { AllUserRegistrationComponent } from './CreateUsers/app.AllUserRegistration.component';
import { EditUserRegistrationComponent } from './CreateUsers/app.EditUserRegistration.component';

import { LoginComponent } from './Login/app.LoginComponent';
import { AppAdminLayoutComponent } from './_layout/app-adminlayout.component';
import { UserDashboardComponent } from './UserDashboard/app.UserDashboardComponent';
import { AdminDashboardComponent } from './AdminDashboard/app.AdminDashboardComponent';

import { AppUserLayoutComponent } from './_layout/app-userlayout.component';
import { AdminLogoutComponent } from './Login/app.AdminLogout.Component';
import { UserLogoutComponent } from './Login/app.UserLogout.Component';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';
import { UserAuthGuardService } from './AuthGuard/UserAuthGuardService';
import { ResetPasswordComponent } from './ResetPassword/reset-password.component';
import { GetUserProfileComponent } from './CreateUsers/get-user-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './payment/payment.component';
import { AuthService } from './service/auth.service';
import { AdminComponent } from './component/admin/admin.component';
import { ViewComponent } from './component/view/view.component';
import { AdminhomeComponent } from './component/adminhome/adminhome.component';
import { OrderComponent } from './component/order/order.component';

import { FilterPipe } from './shared/filter.pipe';
import { UserOrderStatusComponent } from './component/UserOrderStatus/user-order-status.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    AboutComponent,
    ContactUsComponent,
    AdminComponent,
    ViewComponent,
    AdminhomeComponent,
    FilterPipe,

    AppAdminLayoutComponent,
    AppUserLayoutComponent,
    UserRegistrationComponent,
    AllUserRegistrationComponent,
    EditUserRegistrationComponent,
    LoginComponent,
    AdminLogoutComponent,
    UserLogoutComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ResetPasswordComponent,
    GetUserProfileComponent,
    PaymentComponent,
    OrderComponent,
    UserOrderStatusComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MDBBootstrapModule.forRoot(),
    
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'     
    }),   

    RouterModule.forRoot([      
      
      {
        path: 'User',
        component: AppUserLayoutComponent,
        children: [
          { path: 'Dashboard', component: UserDashboardComponent,canActivate: [UserAuthGuardService] },
        ]
      },
      { path: 'User/Profile', component: GetUserProfileComponent  ,canActivate: [UserAuthGuardService]},
      { path: 'User/Edit', component: EditUserRegistrationComponent  ,canActivate: [UserAuthGuardService]},
      { path: 'User/All', component: AllUserRegistrationComponent ,canActivate: [UserAuthGuardService]},
      { path:'payment', component:PaymentComponent,canActivate: [UserAuthGuardService]},      
      { path:'cart',component:CartComponent,canActivate: [UserAuthGuardService]},
      { path:'user/orders',component:OrderComponent,canActivate: [UserAuthGuardService]},

      {
        path: 'Admin',
        component: AppAdminLayoutComponent,
        children: [
          { path: 'Dashboard', component: AdminDashboardComponent , canActivate: [AdminAuthGuardService]  }

        ]
      },      
      {path:'Add/Product',component:AdminComponent, canActivate: [AdminAuthGuardService]},
      {path:'User/Orders',component:UserOrderStatusComponent, canActivate: [AdminAuthGuardService]},
      {path:'view',component:ViewComponent, canActivate: [AdminAuthGuardService]},

      
      { path: 'Login', component: LoginComponent },      
      { path: 'UserRegistration', component: UserRegistrationComponent },
      { path: 'ResetPassword', component: ResetPasswordComponent },
      { path: 'AdminLogout', component: AdminLogoutComponent },
      { path: 'UserLogout', component: UserLogoutComponent },

      // {path:'',redirectTo:'products',pathMatch:'full'},
      {path:'products' ,component:ProductsComponent},      
      {path:'about', component:AboutComponent},
      {path:'contact',component:ContactUsComponent},

      
      {path:'Admin/Home',component:AdminhomeComponent},
      
      
      { path: '', redirectTo: "products", pathMatch: 'full' },
      { path: '**', redirectTo: "products", pathMatch: 'full' },


    ], { useHash: true })
  ],
  providers: [AdminAuthGuardService,UserAuthGuardService,ApiService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

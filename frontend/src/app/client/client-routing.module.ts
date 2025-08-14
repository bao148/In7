import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client-layout/client-layout.component';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogComponent } from './blog/blog.component';
// import { BlogSingleComponent } from './blog/blog-single/blog-single.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { PaymentAlertComponent } from './payment-alert/payment-alert.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-list/order-detail/order-detail.component';

// import { WishlistComponent } from './wishlist/wishlist.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from '../guards/auth.guard';


const clientRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
    { path: '', component: ClientLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'about/service-detail', component: ServiceDetailComponent },
      { path: 'product', component: ProductComponent },
      { path: 'product-detail/:id', component: ProductDetailsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
      { path: 'cart', component: CartComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/blog-detail/:id', component: BlogDetailComponent },
      { path: 'login', component: LoginComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'search', component: SearchResultComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'payment-alert', component: PaymentAlertComponent },
      { path: 'success-page', component: SuccessPageComponent },
      { path: 'order-list', component: OrderListComponent },
      { path: 'order-list/detail/:id', component: OrderDetailComponent },
      { path: '**', component: PagenotfoundComponent },

    ]},
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(clientRoutes)],
    exports: [RouterModule],
  })
  export class ClientRoutingModule {}

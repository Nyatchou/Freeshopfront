import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './components/carousel/carousel.component';
import {CardsArticleComponent } from './components/cards-article/cards-article.component';
import {TabshomeComponent} from './components/tabshome/tabshome.component';
import {SingleArticlePresentComponent} from './components/single-article-present/single-article-present.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CategoryHomeComponent} from './components/category-home/category-home.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { CartPresentItemsComponent } from './components/cart-present-items/cart-present-items.component';
import { DontConnectedMessageComponent } from './components/dont-connected-message/dont-connected-message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import { DatasFromBackendService } from './services/datas-from-backend.service';
import {CategoriesItemsGroupComponent} from './components/categories-items-group/categories-items-group.component';
import { SelectCaractComponent } from './components/select-caract/select-caract.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './services/auth-service.service';
import { LayoutComponent } from './components/layout/layout.component';
import { ContactComponent } from './components/contact/contact.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { CategorieBoxListComponent } from './components/categorie-box-list/categorie-box-list.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { EmptyStockComponent } from './components/empty-stock/empty-stock.component';
import { HomeComponent } from './components/home/home.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartService } from './services/cart.service';
import { AuthGuardService } from './helpers/auth-guard.service';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ShopService } from './services/shop.service';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { PasswordReset1Component } from './components/password-reset1/password-reset1.component';
import { PasswordReset2Component } from './components/password-reset2/password-reset2.component';
import { AuthRequestOptions } from './helpers/auth-request';
import { AuthErrorHandler } from './helpers/auth-error-handler';
import { ErrorHandler } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { SignupVerifComponent } from './components/signup-verif/signup-verif.component';

const appRoutes: Routes = [
  { path : '', component: LayoutComponent, children: [
    { path : '', redirectTo : 'home', pathMatch: 'full'},
    { path: 'home', component : HomeComponent, canActivate : [AuthGuardService]},
    { path: 'shop', component : ShopPageComponent,  canActivate : [AuthGuardService]},
    { path: 'shop/:categorie/:souscategorie', component : ShopPageComponent},
    { path : 'apropos', component : AproposComponent},
    { path : 'cart', component : CartPageComponent, canActivate : [AuthGuardService]},
    { path : 'article/:id', component : SingleArticlePresentComponent, canActivate : [AuthGuardService]},
  ]},

  { path: 'signin', component : SigninComponent},
  { path: 'signup', component : SignupComponent},
  { path: 'signup/verification', component : SignupVerifComponent},
  { path: 'passwordreset1', component: PasswordReset1Component},
  { path: 'passwordreset2', component: PasswordReset2Component},

];


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    CardsArticleComponent,
    TabshomeComponent,
    SingleArticlePresentComponent,
    CategoryHomeComponent,
    CartPresentItemsComponent,
    DontConnectedMessageComponent,
    CategoriesItemsGroupComponent,
    SelectCaractComponent,
    LayoutComponent,
    ContactComponent,
    AproposComponent,
    CategorieBoxListComponent,
    ShopPageComponent,
    EmptyStockComponent,
    HomeComponent,
    CartPageComponent,
    ArticlesListComponent,
    SignupComponent,
    SigninComponent,
    SignupVerifComponent,
    PasswordReset1Component,
    PasswordReset2Component
  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DatasFromBackendService,
    AuthService,
    AuthGuardService,
    CartService,
    ShopService,
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler
    },
    // {
    //   provide: RequestOptions,
    //   useClass: AuthRequestOptions
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

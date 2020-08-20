import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {LoginPageComponent} from './shared/Auth/login-page/login-page.component';
import {SignUpPageComponent} from './shared/Auth/sign-up-page/sign-up-page.component';
import {AuthGuard} from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'post', component: PostPageComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginPageComponent},
      {path: 'sign-up', component: SignUpPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

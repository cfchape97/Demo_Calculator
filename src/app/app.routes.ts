import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivateCalculator, canActivateLogin } from './services/routeguard/routeguard.service';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AboutComponent } from './components/about/about.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [canActivateCalculator] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [canActivateCalculator] },
  { path: 'calculator', component: CalculatorComponent, canActivate: [canActivateLogin] },
  { path: 'user', component: UserprofileComponent, canActivate: [canActivateLogin] },
  { path: 'about', component: AboutComponent, canActivate: [canActivateLogin] },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/calculator', pathMatch: 'full' }, // Default route to redirect to login
  { path: '**', redirectTo: '/calculator' } // Redirect to login for any other invalid routes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivateLogin } from './services/routeguard/routeguard.service';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'calculator', component: CalculatorComponent, canActivate: [canActivateLogin] },
  { path: 'contact', component: ContactComponent, canActivate: [canActivateLogin] },
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

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ContactComponent } from './components/contact/contact.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'contact', component: ContactComponent},
  // Add more routes here if needed
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to redirect to login
  { path: '**', redirectTo: '/login' } // Redirect to login for any other invalid routes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

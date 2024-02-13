import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AddBookFormComponent } from './components/add-book-form/add-book-form.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AuthGuard } from './guards/auth.guard';
import { QuoteComponent } from './components/quotes/quote.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditBookComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddBookFormComponent, canActivate: [AuthGuard] },
    { path: 'quotes', component: QuoteComponent, canActivate: [AuthGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

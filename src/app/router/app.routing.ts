import {Routes, RouterModule, CanActivate} from '@angular/router';

import {HomeComponent} from '../home';
import {LoginComponent} from '../login';
import {RegisterComponent} from '../register';
import {ProfileComponent} from '../profile';
import {MatcherComponent} from '../matcher/matcher.component';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'matcher', component: MatcherComponent, canActivate: [AuthGuard]},


  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);

import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from '../home';
import {LoginComponent} from '../login';
import {RegisterComponent} from '../register';
import {ProfileComponent} from '../profile';
import {MatcherComponent} from '../matcher/matcher.component';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'matcher', component: MatcherComponent},


  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);

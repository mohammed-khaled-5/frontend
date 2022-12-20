import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStationComponent } from './components/create-station/create-station.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StationsComponent } from './components/stations/stations.component';
import { TripsComponent } from './components/trips/trips.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: 'createstation', component: CreateStationComponent },
      { path: 'stations', component: StationsComponent },
      { path: 'createtrip', component: CreateTripComponent },
      { path: 'trips', component: TripsComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

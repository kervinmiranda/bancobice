import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndicatorsComponent } from './components/indicators/indicators.component'
import { HistoricalComponent } from './components/historical/historical.component'
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: IndicatorsComponent
  },
  {
    path: 'indicators',
    component: IndicatorsComponent
  },
  {
    path: 'historical/:key',
    component: HistoricalComponent
  },
  {
    path:"**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

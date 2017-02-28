import { Routes } from '@angular/router';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
  { path: '**', component: NoContentComponent },
];

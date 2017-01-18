import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule} from '@angular/router';

import { HomeComponent} from './home/home.component'
import { FormularioComponent} from './formulario/formulario.component'
import { ListComponent} from './list/list.component'


const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'students', component: ListComponent},
  { path: 'students/add', component: FormularioComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);

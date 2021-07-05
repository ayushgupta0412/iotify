import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{ path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
	{ path: 'detail/:id', loadChildren: () => import('./views/details/details.module').then(m => m.DetailModule) },
	{ path: 'library', loadChildren: () => import('./views/library/library.module').then(m => m.LibraryModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

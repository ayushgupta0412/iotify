import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageResolver } from '../services/resolvers/homepage-resolver';
import { LibraryComponent } from './library.component';

const routes: Routes = [
	{
		path: '',
		component: LibraryComponent,
		resolve: {
			data: HomepageResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LibraryRoutingModule { }

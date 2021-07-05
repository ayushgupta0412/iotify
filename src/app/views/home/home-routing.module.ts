import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageResolver } from '../services/resolvers/homepage-resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		resolve: {
			data: HomepageResolver
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }

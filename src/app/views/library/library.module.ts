import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { LibraryRoutingModule } from './library-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomepageResolver } from '../services/resolvers/homepage-resolver';

@NgModule({
	declarations: [
		LibraryComponent
	],
	imports: [
		CommonModule,
		LibraryRoutingModule
	],
	providers: [
		HomepageResolver
	]
})

export class LibraryModule { }

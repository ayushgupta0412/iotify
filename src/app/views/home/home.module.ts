import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NySellersService } from '../services/ny-sellers.service';
import { HttpClientModule } from '@angular/common/http';
import { HomepageResolver } from '../services/resolvers/homepage-resolver';

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
		HttpClientModule
	],
	providers: [
		NySellersService,
		HomepageResolver
	]
})

export class HomeModule { }

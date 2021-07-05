import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailRoutingModule } from './details-routing.module';
import { DetailPageResolver } from '../services/resolvers/detailpage-resolver';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailRoutingModule],
  providers: [DetailPageResolver],
})
export class DetailModule {}

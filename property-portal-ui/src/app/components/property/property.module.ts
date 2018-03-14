import { NgModule } from '@angular/core';
import { SharedComponentModule } from '../shared/shared-component.module';

import { propertyRouting } from './property.routing';
import { PropertyService } from './shared/property.service';
import { VirtualTourService } from './shared/virtualTour.service';
import {TeamResolver} from './shared/property-image-resolve.service';
import {
  PropertyImageComponent,
  PropertyComponent,
  VirtualTourComponent,
  PropertyProjectComponent,
  PropertyLeftNavbarComponent,
  PropertyNameComponent

} from './index';


@NgModule({
  imports: [
    propertyRouting,
    SharedComponentModule,
  ],
  declarations: [   
    PropertyComponent,
    VirtualTourComponent,
    PropertyComponent,
    VirtualTourComponent,
    PropertyImageComponent,
    PropertyComponent,
    PropertyProjectComponent,
    PropertyLeftNavbarComponent,
    PropertyNameComponent
  ],
  providers: [
    VirtualTourService,
    PropertyService,
    TeamResolver
    
  ]
})

export class PropertyModule { }

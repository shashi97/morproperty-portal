import { NgModule } from '@angular/core';
import { SharedComponentModule } from '../shared/shared-component.module';
import {MapViewService} from '../map-view/shared/mapview.service'

import { mapviewRouting } from './mapview.routing';
import { MapViewComponent } from './mapview.component';
@NgModule({
    imports: [
        mapviewRouting,
        SharedComponentModule,
    ],
    declarations: [
        MapViewComponent
    ],
    providers: [
        MapViewService,
        
    ]
})

export class MapvieModule { }

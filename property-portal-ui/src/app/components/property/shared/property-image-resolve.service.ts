import { ModuleWithProviders, Injectable } from '@angular/core';
import {
  Routes, RouterModule, Resolve, ActivatedRoute,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'Rxjs';
import { PropertyService } from './property.service';
import { LocalStorageService } from '../../../core/shared/services/index';
@Injectable()
export class TeamResolver implements Resolve<any> {
  constructor(private backend: PropertyService,
    public route: ActivatedRoute,
    private localStorageService: LocalStorageService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let currentUser = this.localStorageService.getCurrentUser();
    let propertyId = route.params.propertyId || 0;
    return this.backend.getPropertyImages(currentUser.userDetails.CustomerID, propertyId);
  }
}
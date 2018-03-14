import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProjectSharedService {
    // Observable navItem source
    public _navItemSource = new BehaviorSubject<any>(0);
    // Observable navItem stream
    navItem$ = this._navItemSource.asObservable();
    // service command
    changeNav(data) {
        const detail = ''
        this._navItemSource.next(detail);
    }
}

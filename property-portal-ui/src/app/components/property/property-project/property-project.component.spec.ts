import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyProjectComponent } from './property-project.component';

describe('PropertyComponent', () => {
  let component: PropertyProjectComponent;
  let fixture: ComponentFixture<PropertyProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

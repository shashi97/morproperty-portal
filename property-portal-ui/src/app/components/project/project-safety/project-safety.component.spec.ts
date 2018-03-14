import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSafetyComponent } from './project-safety.component';

describe('PropertyComponent', () => {
  let component: ProjectSafetyComponent;
  let fixture: ComponentFixture<ProjectSafetyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSafetyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

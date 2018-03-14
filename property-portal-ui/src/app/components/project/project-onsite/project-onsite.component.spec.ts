import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOnsiteComponent } from './project-onsite.component';

describe('PropertyComponent', () => {
  let component: ProjectOnsiteComponent;
  let fixture: ComponentFixture<ProjectOnsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOnsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOnsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

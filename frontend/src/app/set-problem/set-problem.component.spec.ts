import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProblemComponent } from './set-problem.component';

describe('SetProblemComponent', () => {
  let component: SetProblemComponent;
  let fixture: ComponentFixture<SetProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

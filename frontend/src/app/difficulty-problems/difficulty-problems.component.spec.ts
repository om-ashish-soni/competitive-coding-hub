import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyProblemsComponent } from './difficulty-problems.component';

describe('DifficultyProblemsComponent', () => {
  let component: DifficultyProblemsComponent;
  let fixture: ComponentFixture<DifficultyProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

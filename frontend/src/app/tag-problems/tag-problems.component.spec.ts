import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagProblemsComponent } from './tag-problems.component';

describe('TagProblemsComponent', () => {
  let component: TagProblemsComponent;
  let fixture: ComponentFixture<TagProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagProblemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

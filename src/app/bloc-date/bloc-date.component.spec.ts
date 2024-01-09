import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocDateComponent } from './bloc-date.component';

describe('BlocDateComponent', () => {
  let component: BlocDateComponent;
  let fixture: ComponentFixture<BlocDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

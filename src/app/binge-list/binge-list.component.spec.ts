import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingeListComponent } from './binge-list.component';

describe('BingeListComponent', () => {
  let component: BingeListComponent;
  let fixture: ComponentFixture<BingeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

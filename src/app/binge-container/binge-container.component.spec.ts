import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingeContainerComponent } from './binge-container.component';

describe('BingeContainerComponent', () => {
  let component: BingeContainerComponent;
  let fixture: ComponentFixture<BingeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySelectedComponent } from './inventory-selected.component';

describe('InventorySelectedComponent', () => {
  let component: InventorySelectedComponent;
  let fixture: ComponentFixture<InventorySelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorySelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

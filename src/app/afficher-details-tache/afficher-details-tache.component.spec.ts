import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDetailsTacheComponent } from './afficher-details-tache.component';

describe('AfficherDetailsTacheComponent', () => {
  let component: AfficherDetailsTacheComponent;
  let fixture: ComponentFixture<AfficherDetailsTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherDetailsTacheComponent]
    });
    fixture = TestBed.createComponent(AfficherDetailsTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerTacheComponent } from './supprimer-tache.component';

describe('SupprimerTacheComponent', () => {
  let component: SupprimerTacheComponent;
  let fixture: ComponentFixture<SupprimerTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerTacheComponent]
    });
    fixture = TestBed.createComponent(SupprimerTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

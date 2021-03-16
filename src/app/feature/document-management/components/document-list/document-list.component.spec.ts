import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListComponent } from './document-list.component';
import { DocumentService } from "../../services/document-service";

describe('DocumentListComponent', () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;

  const documentServiceMock = {
    getDocuments$: () => {},
    getMockData: () => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListComponent ],
      providers: [
        { provide: DocumentService, useValue: documentServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filterByCategory', () => {
    component.groupedResults = [
      {
        "key":"value"
      }
    ];
    const result = component.filterByCategory("key");
    expect(result).toEqual("value");
  });

});

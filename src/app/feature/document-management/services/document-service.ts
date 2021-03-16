import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IDocumentResult } from "../entities/types";
import {default as mockData} from "../mock/mock-data.json";

@Injectable({
  providedIn: "root",
})
export class DocumentService {
  getDocuments$(): Observable<Array<IDocumentResult>> {
    //Mocking Data Instead real api response
    return this.getMockData();
  }

  getMockData(): Observable<any> {
    return of(mockData);
  }

}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import _ from 'lodash';
import { IDocumentResult, IMappedFields } from "../../entities/types";
import { DocumentService } from "../../services/document-service";
import { ICategoryItem } from "../../../../shared";

@Component({
  selector: "app-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.scss"],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private readonly unsubscribe: Subject<void> = new Subject();
  isLoading = true;
  title = "Documents";
  subTitle = "Search documents or select category";

  groupedResults: any = [] ;
  overallResults : Array<ICategoryItem> = [];
  selectedCategory = 'All';
  selectedCategoryList: BehaviorSubject<ICategoryItem[]>; 
  dataMapping: Array<IMappedFields> = [
    {
      categoryField: "financial",
      displayName: "Financial",
      color: "#dfdbdf",
    },
    {
      categoryField: "technical",
      displayName: "Technical",
      color: "#dbdfdd",
    },
    {
      categoryField: "marketing",
      displayName: "Marketing",
      color: "#dfdcdb",
    },
    {
      categoryField: "humanresources",
      displayName: "Human Resources",
      color: "#dbdddf",
    },
  ];

  
  constructor(private readonly documentService: DocumentService) {
    this.selectedCategoryList = new BehaviorSubject<ICategoryItem[]>([]);
  }

  ngOnInit() {
    this.getDocumentList();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getDocumentList(): void {
    this.documentService
      .getDocuments$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: Array<IDocumentResult>) => {
          this.isLoading = false;
          if (response && response.length) {
             this.populateDataSouce(response);
             this.groupedResults = _.groupBy(this.overallResults, "category");
             this.filterByCategory('All');
          }
        },
        (error) => {
          this.isLoading = false;
        },
        () => {}
      );
  }

  /**
   * 
   * @param response - result set from backend
   */
  private populateDataSouce(response: Array<IDocumentResult>): void {
    response.forEach((item) => {
      const mappedData = this.dataMapping.find(
        (data) => data.categoryField === item.category
      );
      if (mappedData) {
        this.overallResults.push(this.getFomattedResults(mappedData, item));
      }
    });
   
  }

  /**
   * 
   * @param mappedData - Object to map color and display name for each category
   * @param item - result set from backend
   * @returns - Object based on the view-category input
   */

  private getFomattedResults(mappedData: IMappedFields, item: IDocumentResult): ICategoryItem {
    return {
      category: mappedData.displayName,
      subCategory: item.document,
      color: mappedData.color,
    };
  }

  /**
   * 
   * @param key - string to search
   */
  filterByCategory(key: string): void {
    this.selectedCategory = key;
    const selectedDataList = this.groupedResults[key] ? this.groupedResults[key]  : this.overallResults;
    this.selectedCategoryList.next(selectedDataList);
  }
}

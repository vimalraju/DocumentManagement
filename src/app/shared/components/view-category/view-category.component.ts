import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription} from 'rxjs';
import _ from 'lodash';

export interface ICategoryItem {
  category: string,
  subCategory: string,
  color: string
}

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit, OnDestroy {
  @Input() dataList: BehaviorSubject<any>;

  dataSource: any;
  dataSouceCopy: any;
  dataSourceSubscription: Subscription;
  searchBox = "";
  constructor() { }

  ngOnInit() {
    this.dataSourceSubscription = this.dataList.subscribe((data) => {
      this.dataSource = data;
      this.dataSouceCopy = _.cloneDeep(this.dataSource);
      this.searchBox = "";
    });

  }

  ngOnDestroy(): void {
    if(this.dataSourceSubscription) {
      this.dataSourceSubscription.unsubscribe();
    }
  }

  /**
   * 
   * @param searchText - string to search
   */
  onSearchText(searchText) {
    this.dataSource =  searchText ? this.dataSouceCopy.filter(data => data.subCategory.toLowerCase().includes(searchText)) : this.dataSouceCopy;
  }

}

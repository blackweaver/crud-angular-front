import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service: SharedService) { }

  public DepartmentList: any = [];
  public ModalTitle: string;
  public ActivateAddEditDepComp: boolean;
  public dep: any;

  public DepartmentIdFilter = '';
  public DepartmentNameFilter = '';
  public DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  public addClick(): void {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ''
    };
    this.ModalTitle = 'Agregar constructor';
    this.ActivateAddEditDepComp = true;
  }
  public closeClick(): void {
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  public editClick(item): void {
    this.dep = item;
    this.ModalTitle = 'Editar constructor';
    this.ActivateAddEditDepComp = true;
  }

  public deleteClick(item): void {
    if (confirm('Are you sure?')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDepList();
      });
    }
  }

  public refreshDepList(): void {
    this.service.getDepList().subscribe(data => {
      this.DepartmentList = this.DepartmentListWithoutFilter = data;
    });
  }

  public FilterFn(): void {
    const DepartmentIdFilter = this.DepartmentIdFilter;
    const DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter( (el) => {
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      ) &&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      );
    });
  }

  public sortResult(prop, asc): any {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort((a, b) => {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

}

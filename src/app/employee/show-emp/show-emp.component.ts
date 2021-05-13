import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  public EmployeeList: any = [];
  public ModalTitle: string;
  public ActivateAddEditEmpComp: boolean;
  public emp: any;
  public PhotoFilePath: string;

  public EmployeeIdFilter = '';
  public EmployeeNameFilter = '';
  public DepartmentNameFilter = '';
  public EmployeeListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  public addClick(): void {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png'
    };
    this.ModalTitle = 'Agregar piloto';
    this.ActivateAddEditEmpComp = true;
  }
  public closeClick(): void {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  public editClick(item): void {
    this.emp = item;
    this.ModalTitle = 'Editar piloto';
    this.ActivateAddEditEmpComp = true;
  }

  public deleteClick(id): void {
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(id.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  public refreshEmpList(): void {
    this.PhotoFilePath = this.service.PhotoUrl;
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = this.EmployeeListWithoutFilter = data;
    });
  }

  public FilterFn(): void {
    const EmployeeIdFilter = this.EmployeeIdFilter;
    const DepartmentNameFilter = this.DepartmentNameFilter;
    const EmployeeNameFilter = this.EmployeeNameFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter( (el) => {
      return el.EmployeeId.toString().toLowerCase().includes(
        EmployeeIdFilter.toString().trim().toLowerCase()
      ) &&
      el.Department.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      ) &&
      el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      );
    });
  }

  public sortResult(prop, asc): any {
    this.EmployeeList = this.EmployeeListWithoutFilter.sort((a, b) => {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

}

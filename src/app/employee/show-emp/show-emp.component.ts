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

  ngOnInit(): void {
    this.refreshEmpList();
  }

  public addClick(): void {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Employee: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.png'
    };
    this.ModalTitle = 'Agregar piloto';
    this.ActivateAddEditEmpComp = true;
    console.log(this.emp);
  }
  public closeClick(): void {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  public editClick(item): void {
    this.emp = item;
    this.ModalTitle = 'Editar piloto';
    this.ActivateAddEditEmpComp = true;
    // console.log(this.emp);
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
      this.EmployeeList = data;
    });
  }

}

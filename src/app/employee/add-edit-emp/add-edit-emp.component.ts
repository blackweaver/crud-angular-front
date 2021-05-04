import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp: any;
  public EmployeeId: number;
  public EmployeeName: string;
  public Department: string;
  public DateOfJoining: Date;
  public PhotoFileName: string;
  public PhotoFilePath: string;

  DepartmentsList: any = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  public loadDepartmentList(): void {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentsList = data;

      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
      console.log('LIST', this.DepartmentsList);
    });
  }

  public addDEmployee(): void {
    const val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  public updateEmployee(): void {
    const val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.service.updateEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  public uploadPhoto(event): void {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
        this.PhotoFileName = data.toString();
        this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

}
/* function data(data: any, any: any) {
  throw new Error('Function not implemented.');
}
 */

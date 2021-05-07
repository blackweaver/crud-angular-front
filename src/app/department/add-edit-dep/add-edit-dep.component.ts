import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit, OnChanges {

  @Input() dep: any;
  public DepartmentId: number;
  public DepartmentName: string;

  constructor(private service: SharedService) {}


  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
    console.log(this.dep.DepartmentId);
  }

  ngOnChanges(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
    console.log(this.dep.DepartmentId);
  }

  public addDepartment(): void {
    const val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

  public updateDepartment(): void {
    const val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.updateDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

}

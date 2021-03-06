import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = environment.API_URL;
  readonly PhotoUrl = this.APIUrl + '/media/';

  constructor(private http: HttpClient) {}

    getDepList(): Observable<any[]>{
      return this.http.get<any[]>(this.APIUrl + '/department/');
    }

    addDepartment(val: any): any {
      return this.http.post(this.APIUrl + '/department/', val);
    }

    updateDepartment(val: any): any {
      return this.http.put(this.APIUrl + '/department/', val);
    }

    deleteDepartment(val: any): any {
      return this.http.delete(this.APIUrl + '/department/' + val);
    }

    getEmpList(): Observable<any[]>{
      return this.http.get<any[]>(this.APIUrl + '/employee/');
    }

    addEmployee(val: any): any {
      return this.http.post(this.APIUrl + '/employee/', val);
    }

    updateEmployee(val: any): any {
      return this.http.put(this.APIUrl + '/employee/', val);
    }

    deleteEmployee(val: any): any {
      return this.http.delete(this.APIUrl + '/employee/' + val);
    }

    UploadPhoto(val: any): any {
      return this.http.post(this.APIUrl + '/SaveFile', val);
    }

    getAllDepartmentNames(): Observable<any[]>{
      return this.http.get<any[]>(this.APIUrl + '/department/');
    }

}

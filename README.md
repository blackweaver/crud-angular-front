## Run project

```
npm install
ng serve -o
```

## Shared services

```typescript
export class SharedService {
  readonly APIUrl = 'http://127.0.0.1:8000/';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';

  constructor(private http: HttpClient) {}

    getDepList(): Observable<any[]>{
      return this.http.get<any[]>(this.APIUrl + '/department');
    }

    addDepartment(val: any): void {
      this.http.post(this.APIUrl + '/department', val);
    }

    updateDepartment(val: any): void {
      this.http.put(this.APIUrl + '/department', val);
    }

    deleteDepartment(val: any): void {
      this.http.delete(this.APIUrl + '/department' + val);
    }

    getEmpList(): Observable<any[]>{
      return this.http.get<any[]>(this.APIUrl + '/department');
    }

    addEmployee(val: any): void {
      this.http.post(this.APIUrl + '/employee', val);
    }

    updateEmployee(val: any): void {
      this.http.put(this.APIUrl + '/employee', val);
    }

    deleteEmployee(val: any): void {
      this.http.delete(this.APIUrl + '/employee' + val);
    }

    UploadPhoto(val: any): void {
      this.http.post(this.APIUrl + '/SaveFile', val);
    }

    getAllDepartmentNames(): Observable<any[]>{
      return this.http.get<any[]>(this.APIUrl + 'department');
    }

}
```

## Create routing

```typescript
const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'department', component: DepartmentComponent },
  { path: '**', component: DepartmentComponent },
];
```


### Source

https://www.youtube.com/watch?v=1Hc7KlLiU9w
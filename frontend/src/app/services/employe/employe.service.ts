import { Injectable } from "@angular/core";
import { Employe } from "../../models/employe.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
providedIn: "root"
})
export class EmployeService {

constructor(private http: HttpClient) {}

getUserConnecte(): string | null {
if (typeof window !== "undefined") {
return localStorage.getItem("user");
}
return null;
}

getToken() {
let userConnecte = this.getUserConnecte();
if (userConnecte) {
let token = JSON.parse(userConnecte).tokenValue;
return token;
}
return "";
}

createEmploye(employe: Employe): Observable<HttpResponseApi> {
let url = BASE_URL + "/employe/create";
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json'
})
};
let body = JSON.stringify(employe);
return this.http.post<HttpResponseApi>(url, body, httpOptions);
}

readEmploye(employeSearch: Employe): Observable<HttpResponseApi> {
let url = BASE_URL + "/employe/read";
let token = this.getToken();
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
})
};
let body = JSON.stringify(employeSearch);
return this.http.post<HttpResponseApi>(url, body, httpOptions);
}

updateEmploye(employe: Employe): Observable<HttpResponseApi> {
let url = BASE_URL + "/employe/update";
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json'
})
};
let body = JSON.stringify(employe);
return this.http.post<HttpResponseApi>(url, body, httpOptions);
}

deleteEmploye(employe: Employe): Observable<HttpResponseApi> {
let url = BASE_URL + "/employe/delete";
let token = this.getToken();
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
}),
body: {_id: employe._id}
};
return this.http.delete<HttpResponseApi>(url,httpOptions);
}

}
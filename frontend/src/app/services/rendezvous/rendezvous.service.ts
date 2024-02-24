import { Injectable } from "@angular/core";
import { Rendezvous } from "../../models/rendezvous.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
providedIn: "root"
})
export class RendezvousService {

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

createRendezvous(rendezvous: Rendezvous): Observable<HttpResponseApi> {
let url = BASE_URL + "/rendezvous/create";
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json'
})
};
let body = JSON.stringify(rendezvous);
return this.http.post<HttpResponseApi>(url, body, httpOptions);
}

readRendezvous(rendezvousSearch: Rendezvous): Observable<HttpResponseApi> {
let url = BASE_URL + "/rendezvous/read";
let token = this.getToken();
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
})
};
let body = JSON.stringify(rendezvousSearch);
return this.http.post<HttpResponseApi>(url, body, httpOptions);
}

updateRendezvous(rendezvous: Rendezvous): Observable<HttpResponseApi> {
let url = BASE_URL + "/rendezvous/update";
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json'
})
};
let body = JSON.stringify(rendezvous);
return this.http.post<HttpResponseApi>(url, body, httpOptions);
}

deleteRendezvous(rendezvous: Rendezvous): Observable<HttpResponseApi> {
let url = BASE_URL + "/rendezvous/delete";
let token = this.getToken();
const httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
}),
body: {_id: rendezvous._id}
};
return this.http.delete<HttpResponseApi>(url,httpOptions);
}

}
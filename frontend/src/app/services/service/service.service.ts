import { Injectable } from "@angular/core";
import { Service } from "../../models/service.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
    providedIn: "root"
})
export class ServiceService {

    constructor(private http: HttpClient) { }

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

    createService(service: Service): Observable<HttpResponseApi> {
        let url = BASE_URL + "/service/create";
        const token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(service);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readService(serviceSearch: Service): Observable<HttpResponseApi> {
        let url = BASE_URL + "/service/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(serviceSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updateService(service: Service): Observable<HttpResponseApi> {
        let url = BASE_URL + "/service/update";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        let body = JSON.stringify(service);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    deleteService(service: Service): Observable<HttpResponseApi> {
        let url = BASE_URL + "/service/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: service._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

}
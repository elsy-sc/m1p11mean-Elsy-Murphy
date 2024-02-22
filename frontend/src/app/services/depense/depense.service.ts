import { Injectable } from "@angular/core";
import { Depense } from "../../models/depense.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
    providedIn: "root"
})
export class DepenseService {

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

    createDepense(depense: Depense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/depense/create";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(depense);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readDepense(depenseSearch: Depense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/depense/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(depenseSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updateDepense(depense: Depense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/depense/update";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(depense);
        return this.http.put<HttpResponseApi>(url, body, httpOptions);
    }

    deleteDepense(depense: Depense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/depense/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: depense._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

}
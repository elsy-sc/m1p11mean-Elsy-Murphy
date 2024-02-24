import { Injectable } from "@angular/core";
import { TypeDepense } from "../../models/typedepense.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
    providedIn: "root"
})
export class TypeDepenseService {

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

    createTypeDepense(typedepense: TypeDepense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/typedepense/create";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(typedepense);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readTypeDepense(typedepenseSearch: TypeDepense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/typedepense/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(typedepenseSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updateTypeDepense(typedepense: TypeDepense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/typedepense/update";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(typedepense);
        return this.http.put<HttpResponseApi>(url, body, httpOptions);
    }

    deleteTypeDepense(typedepense: TypeDepense): Observable<HttpResponseApi> {
        let url = BASE_URL + "/typedepense/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: typedepense._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

}
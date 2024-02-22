import { Injectable } from "@angular/core";
import { CategorieService } from "../../models/categorieservice.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
    providedIn: "root"
})
export class CategorieServiceService {

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

    createCategorieService(categorieservice: CategorieService): Observable<HttpResponseApi> {
        let url = BASE_URL + "/categorieservice/create";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(categorieservice);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readCategorieService(categorieserviceSearch: CategorieService): Observable<HttpResponseApi> {
        let url = BASE_URL + "/categorieservice/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(categorieserviceSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updateCategorieService(categorieservice: CategorieService): Observable<HttpResponseApi> {
        let url = BASE_URL + "/categorieservice/update";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        let body = JSON.stringify(categorieservice);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    deleteCategorieService(categorieservice: CategorieService): Observable<HttpResponseApi> {
        let url = BASE_URL + "/categorieservice/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: categorieservice._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

}
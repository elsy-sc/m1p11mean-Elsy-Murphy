import { Injectable } from "@angular/core";
import { Paiement } from "../../models/paiement.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
    providedIn: "root"
})
export class PaiementService {

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

    createPaiement(paiement: Paiement): Observable<HttpResponseApi> {
        let url = BASE_URL + "/paiement/create";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(paiement);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readPaiement(paiementSearch: Paiement): Observable<HttpResponseApi> {
        let url = BASE_URL + "/paiement/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(paiementSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updatePaiement(paiement: Paiement): Observable<HttpResponseApi> {
        let url = BASE_URL + "/paiement/update";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(paiement);
        return this.http.put<HttpResponseApi>(url, body, httpOptions);
    }

    deletePaiement(paiement: Paiement): Observable<HttpResponseApi> {
        let url = BASE_URL + "/paiement/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: paiement._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

}
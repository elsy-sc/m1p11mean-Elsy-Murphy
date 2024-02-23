import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
import { Offrespeciale } from "../../models/offrespeciale.model";
@Injectable({
    providedIn: "root"
})
export class OffrespecialeService {

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

    createOffrespeciale(offrespeciale: Offrespeciale): Observable<HttpResponseApi> {
        let url = BASE_URL + "/offrespeciale/create";
        const token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(offrespeciale);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readOffrespeciale(offrespecialeSearch: Offrespeciale): Observable<HttpResponseApi> {
        let url = BASE_URL + "/offrespeciale/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(offrespecialeSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updateOffrespeciale(offrespeciale: Offrespeciale): Observable<HttpResponseApi> {
        let url = BASE_URL + "/offrespeciale/update";
        let token = this.getToken();
        console.log(token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(offrespeciale);
        return this.http.put<HttpResponseApi>(url, body, httpOptions);
    }

    deleteOffrespeciale(offrespeciale: Offrespeciale): Observable<HttpResponseApi> {
        let url = BASE_URL + "/offrespeciale/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: offrespeciale._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

}
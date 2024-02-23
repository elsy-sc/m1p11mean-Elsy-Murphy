import { Injectable } from "@angular/core";
import { HorraireTravail } from "../../models/horrairetravail.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
    providedIn: "root"
})
export class HorraireTravailService {

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

    createHorraireTravail(horrairetravail: HorraireTravail): Observable<HttpResponseApi> {
        let url = BASE_URL + "/horairetravail/create";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(horrairetravail);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readHorraireTravail(horrairetravailSearch: HorraireTravail): Observable<HttpResponseApi> {
        let url = BASE_URL + "/horairetravail/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(horrairetravailSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updateHorraireTravail(horrairetravail: HorraireTravail): Observable<HttpResponseApi> {
        let url = BASE_URL + "/horairetravail/update";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            })
        };
        let body = JSON.stringify(horrairetravail);
        return this.http.put<HttpResponseApi>(url, body, httpOptions);
    }

    deleteHorraireTravail(horrairetravail: HorraireTravail): Observable<HttpResponseApi> {
        let url = BASE_URL + "/horairetravail/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: horrairetravail._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

}
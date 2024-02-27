import { Injectable } from "@angular/core";
import { SuiviEmployeRendezVous } from "../../models/suiviemployerendezvous.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
@Injectable({
    providedIn: "root"
})
export class SuiviEmployeRendezVousService {

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

    createSuiviEmployeRendezVous(suiviemployerendezvous: SuiviEmployeRendezVous): Observable<HttpResponseApi> {
        let url = BASE_URL + "/suiviemployerendezvous/create";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        let body = JSON.stringify(suiviemployerendezvous);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readSuiviEmployeRendezVous(suiviemployerendezvousSearch: SuiviEmployeRendezVous): Observable<HttpResponseApi> {
        let url = BASE_URL + "/suiviemployerendezvous/read";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(suiviemployerendezvousSearch);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    updateSuiviEmployeRendezVous(suiviemployerendezvous: SuiviEmployeRendezVous): Observable<HttpResponseApi> {
        let url = BASE_URL + "/suiviemployerendezvous/update";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = JSON.stringify(suiviemployerendezvous);
        return this.http.put<HttpResponseApi>(url, body, httpOptions);
    }

    deleteSuiviEmployeRendezVous(suiviemployerendezvous: SuiviEmployeRendezVous): Observable<HttpResponseApi> {
        let url = BASE_URL + "/suiviemployerendezvous/delete";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }),
            body: { _id: suiviemployerendezvous._id }
        };
        return this.http.delete<HttpResponseApi>(url, httpOptions);
    }

    prendreRendezvous(rendezvous: SuiviEmployeRendezVous): Observable<HttpResponseApi> {
        let url = BASE_URL + "/suiviemployerendezvous/prendreRendezvous";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        let body = JSON.stringify(rendezvous);
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

}
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";

@Injectable({
    providedIn: "root"
})
export class StatistiqueService {

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

    readNombreReservationParMois (annee: string): Observable<HttpResponseApi> {
        let url = BASE_URL + "/rendezvous/nombrerendezvousparmois";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = {annee: annee};
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readBeneficeNetParMois (annee: string): Observable<HttpResponseApi> {
        let url = BASE_URL + "/rendezvous/beneficenetparmois";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = {annee: annee};
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readBeneficeNetParJour (debut: string|undefined, fin: string|undefined): Observable<HttpResponseApi> {
        let url = BASE_URL + "/rendezvous/beneficenetparjour";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = {debut: debut,fin: fin};
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readNombreReservationParJour (debut: string|undefined, fin: string|undefined): Observable<HttpResponseApi> {
        let url = BASE_URL + "/rendezvous/nombrenombrerendezvousparjour";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = {debut: debut,fin: fin};
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    readDepenseParMois (annee: string) : Observable<HttpResponseApi> {
        let url = BASE_URL + "/depense/depenseparmois";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = {annee: annee};
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

    getMoyenneTempsTravailEmploye (datedebut: string, datefin: string) : Observable<HttpResponseApi> {
        let url = BASE_URL + "/suiviemployerendezvous/moyenneHeureTravailParEmployeParDate";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = {datedebut: datedebut, datefin: datefin};
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

}
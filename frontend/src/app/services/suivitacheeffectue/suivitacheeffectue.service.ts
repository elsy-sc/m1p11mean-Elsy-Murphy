import { Injectable } from "@angular/core";
import { SuiviEmployeRendezVous } from "../../models/suiviemployerendezvous.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponseApi } from "../../interfaces/http/HttpResponseApi";
import { BASE_URL } from "../../utils/constante.util";
import { Date } from "../../beans/date.bean.util";

@Injectable({
    providedIn: "root"
})
export class SuiviTacheEffectueService {

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

    readSuiviTacheEffectue (date: string) : Observable<HttpResponseApi> {
        let url = BASE_URL + "/rendezvous/suivitacheeffectues";
        let token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            })
        };
        let body = {date: date};
        return this.http.post<HttpResponseApi>(url, body, httpOptions);
    }

}
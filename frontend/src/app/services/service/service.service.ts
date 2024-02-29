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

    createService(service: Service, image: any): Observable<HttpResponseApi> {
        let url = BASE_URL + "/service/create";
        const token = this.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };

        const formData: FormData = new FormData();
        formData.append('service', JSON.stringify(service));
        if (image) {
            formData.append('image', image, image.name);
        }

        httpOptions.headers.set('Content-Type', 'multipart/form-data');
        return this.http.post<HttpResponseApi>(url, formData, httpOptions);
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

    updateService(service: Service, image: any): Observable<HttpResponseApi> {
        let url = BASE_URL + "/service/update";
        let token = this.getToken();
        console.log(token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };

        const formData: FormData = new FormData();
        formData.append('service', JSON.stringify(service));
        if (image) {
            formData.append('image', image, image.name);
        }

        httpOptions.headers.set('Content-Type', 'multipart/form-data');
        return this.http.put<HttpResponseApi>(url, formData, httpOptions);
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
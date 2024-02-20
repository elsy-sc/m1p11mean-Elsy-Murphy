import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponseApi } from '../../interfaces/http/HttpResponseApi';
import { Utilisateur } from '../../models/utilisateur.model';
import { Router } from '@angular/router';
import { BASE_URL } from '../../utils/constante.util';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateurConnecteSubject = new BehaviorSubject<Utilisateur | null>(null);
  public utilisateurConnecte = this.utilisateurConnecteSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  authentications(utilisateur: Utilisateur): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/login";

    let email = utilisateur.email;
    let motdepasse = utilisateur.motdepasse;

    let body = { email, motdepasse };

    return this.http.post<HttpResponseApi>(url, body);
  }

  getUserConnecte(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("user");
    }
    return null;
  }

  setUserConnecte(user: Utilisateur): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  removeUserConnecte(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
    }
  }

  getToken(): string {
    let userConnecte = this.getUserConnecte();
    if (userConnecte) {
      let token = JSON.parse(userConnecte).tokenValue;
      return token;
    }
    return '';
  }

  logout() {
    this.removeUserConnecte();
    this.router.navigate(['/']);
  }

  inscription(utilisateur: Utilisateur): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/inscription";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(utilisateur);
    return this.http.post<HttpResponseApi>(url, body, httpOptions);
  }

  readAll(): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/read";
    let token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<HttpResponseApi>(url, httpOptions);
  }

}

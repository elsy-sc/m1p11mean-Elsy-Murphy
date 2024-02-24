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

  private utilisateurConnecteSubject = new BehaviorSubject<Utilisateur | undefined>(undefined);
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
      const user = localStorage.getItem("user");
      if (user) {
        if (this.utilisateurConnecteSubject.value == null) {
          this.utilisateurConnecteSubject.next(JSON.parse(user));
        }
      }
      return user;
    }
    return null;
  }

  setUserConnecte(user: Utilisateur): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.solde == undefined) {
        user.solde = 0;
      }
      user.motdepasse = undefined;
      this.utilisateurConnecteSubject.next(user);
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

  read(utilisateurSearch: Utilisateur): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/read";
    let token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };

    let body = JSON.stringify(utilisateurSearch);

    return this.http.post<HttpResponseApi>(url, body, httpOptions);
  }

  delete(utilisateur: Utilisateur): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/delete";
    let token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: { _id: utilisateur._id }
    };
    return this.http.delete<HttpResponseApi>(url, httpOptions);
  }

  remove(utilisateur: Utilisateur): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/remove";
    let token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: { _id: utilisateur._id }
    };
    return this.http.delete<HttpResponseApi>(url, httpOptions);
  }

  create(utilisateur: Utilisateur): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/create";
    let token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };
    let body = JSON.stringify(utilisateur);

    return this.http.post<HttpResponseApi>(url, body, httpOptions);
  }

  update(utilisateur: Utilisateur): Observable<HttpResponseApi> {
    let url = BASE_URL + "/utilisateur/update";
    let token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    };
    let body = JSON.stringify(utilisateur);

    return this.http.put<HttpResponseApi>(url, body, httpOptions);
  }

  sendEmail (receiver: string) : Observable<HttpResponseApi> {
    let url = BASE_URL + "/mail/send";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let body = {receiver: receiver};
    
    return this.http.post<HttpResponseApi>(url, body, httpOptions);
  }

}

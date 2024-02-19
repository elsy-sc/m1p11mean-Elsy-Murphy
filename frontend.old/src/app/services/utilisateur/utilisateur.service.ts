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

  constructor(private http: HttpClient, private router: Router) {  }

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
      localStorage.setItem("user",JSON.stringify(user));
    }
  }

  removeUserConnecte(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
    }
  }

  logout() {
    this.removeUserConnecte();
    this.router.navigate(['/']);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponseApi } from '../../interfaces/http/HttpResponseApi';
import { Utilisateur } from '../../models/utilisateur.model';
import { BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateurConnecteSubject = new BehaviorSubject<Utilisateur|null>(null);
  public utilisateurConnecte = this.utilisateurConnecteSubject.asObservable();

  constructor(private http: HttpClient) {}

  authentifications (utilisateur: Utilisateur): Observable<HttpResponseApi>{
    let url = BASE_URL+"/utilisateur/login";

    let email = utilisateur.email;
    let motdepasse = utilisateur.motdepasse;

    let body = {email, motdepasse};

    return this.http.post<HttpResponseApi>(url,body);
  }

  updateUtilisateurConnecte (utilisateur: Utilisateur) {
    this.utilisateurConnecteSubject.next(utilisateur);
  } 

  deleteUtilisateurConnecte () {
    this.utilisateurConnecteSubject.next(null);
  }

  getToken () {
    return localStorage.getItem("token");
  }

  setToken (token: string) {
    localStorage.setItem("token",token);
  }

  remeveToken () {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  }

}

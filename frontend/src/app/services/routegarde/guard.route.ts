import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private utilisateurSerice: UtilisateurService , private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.utilisateurSerice.getUserConnecte()) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirigez vers la page de connexion
      return false;
    }
  }
}

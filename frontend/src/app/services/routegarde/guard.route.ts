import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private utilisateurSerice: UtilisateurService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.utilisateurSerice.utilisateurConnecte.pipe(
      take(1), // Assure que l'observation est terminée après la première émission
      map(user => {
        if (!user) {
          this.router.navigate(['/']); 
          return false;
        } else {
          const requiredRole = next.data['role'] as number;
          if (requiredRole) {
            if (user.role == requiredRole) {
              console.log("kaka");
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          }
          return true;
        }
      })
    );
  }


}

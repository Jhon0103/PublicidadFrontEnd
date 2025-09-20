import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { UsuarioContext } from '../Models/seg-login.model';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  public user$ = new BehaviorSubject<UsuarioContext | null>(null);

  constructor(private storageService: StorageService, private router: Router) {
    const data = this.getUsuarioDesdeStorage();
    if (data) {
      this.user$.next(data);
    }
  }

  private getUsuarioDesdeStorage(): UsuarioContext | null {
    try {
      return this.storageService.getItemDecrypt('currentUser') as UsuarioContext;
    } catch (e) {
      return null;
    }
  }

  public getIdUsuario(): number {
    return Number(this.storageService.getItemDecrypt('idUsuario'));
  }

  public getPersona(): number {
    return Number(this.storageService.getItemDecrypt('idPersona'));
  }

  public getNombreCompletoUsuario(): string {
    return this.storageService.getItemDecrypt('nombre');
  }

  public getEmail(): string {
    return this.storageService.getItemDecrypt('email');
  }

  public getUsuario() {
    return this.storageService.getItemDecrypt('usuario');
  }

  public getIdPerfil() {
    return this.storageService.getItemDecrypt('idPerfil');
  }

  public setUser(user: UsuarioContext) {
    this.storageService.setItemEncrypt('currentUser', user);
    this.user$.next(user);
  }

  public logout() {
    this.storageService.logout();
    this.user$.next(null);
    this.redirecciona();
  }

  private redirecciona() {
    this.router.navigate(['/login']);
  }
}


export function userContextInitializer(userContextService: UserContextService) {
  return () => {
    const data = userContextService['storageService'].getItemDecrypt('currentUser');

      userContextService.setUser(data);

  };
}



import { Injectable } from '@angular/core';
import { CifrarDataService } from './cifrar-data.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private cifrarDataService: CifrarDataService) { }


  //Guarda un valor en localStorage con cifrado
  setItemEncrypt(key: string, value: any) {
    const valueEncrypt = this.cifrarDataService.encrypt(value);
    this.setItem(key, valueEncrypt);
  }


//Obtiene un valor desde localStorage con descifrado

  getItemDecrypt(key: string): any {
    const value = this.getItem(key);
    if (!value) return null;
    return this.cifrarDataService.decrypt(value);
  }

  //Guarda un valor en localStorage sin cifrado

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }


  //Obtiene un valor sin cifrado desde localStorage

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  //Elimina un item específico de localStorage
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  // Limpia todo el localStorage
  clear() {
    localStorage.clear();
  }

  // Logout: elimina todos los datos del storage
  logout() {
    this.clear();
  }
}

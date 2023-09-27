import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    setLocalStorage(Name: string, item: string) {
        localStorage.setItem(Name, item)
    }
    getLocalStorage(Name: string) {
        return localStorage.getItem(Name);
    }
    setSessionStorage(Name: string, item: string) {
        sessionStorage.setItem(Name, item)
    }
    removeSessionStorage(Name: string) {
        sessionStorage.removeItem(Name);
    }
    getSessionStorage(Name: string) {
        return sessionStorage.getItem(Name);
    }
    removeLocalStorage(Name: string) {
        localStorage.removeItem(Name);
    }
    hasLocalStorage(Name: string) {
        return localStorage.getItem(Name) === null ? false : true;
    }
    hasSessionStorage(Name: string) {
        return sessionStorage.getItem(Name) === null ? false : true;
    }
}
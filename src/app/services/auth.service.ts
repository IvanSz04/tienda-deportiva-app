import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StorageService } from './storage.service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulación de login
    const mockUser: User = {
      id: 1,
      name: 'Usuario Demo',
      email: email
    };

    return of(true).pipe(
      delay(1500)
    ).pipe(
      delay(0, undefined)
    );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    // Simulación de registro
    return of(true).pipe(delay(1500));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.storageService.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.storageService.setItem('currentUser', user);
  }

  private loadUserFromStorage(): void {
    const savedUser = this.storageService.getItem<User>('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(savedUser);
    }
  }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Generic storage methods
  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // App-specific storage methods
  saveUserPreferences(preferences: any): void {
    this.setItem('userPreferences', preferences);
  }

  getUserPreferences(): any {
    return this.getItem('userPreferences') || {
      theme: 'light',
      notifications: true,
      language: 'es'
    };
  }

  saveSearchHistory(searches: string[]): void {
    const maxHistory = 10;
    const limitedSearches = searches.slice(0, maxHistory);
    this.setItem('searchHistory', limitedSearches);
  }

  getSearchHistory(): string[] {
    return this.getItem('searchHistory') || [];
  }

  addToSearchHistory(searchTerm: string): void {
    if (!searchTerm.trim()) return;
    
    let history = this.getSearchHistory();
    
    // Remove if already exists
    history = history.filter(term => term !== searchTerm);
    
    // Add to beginning
    history.unshift(searchTerm);
    
    this.saveSearchHistory(history);
  }

  saveFavorites(productIds: number[]): void {
    this.setItem('favorites', productIds);
  }

  getFavorites(): number[] {
    return this.getItem('favorites') || [];
  }

  addToFavorites(productId: number): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      this.saveFavorites(favorites);
    }
  }

  removeFromFavorites(productId: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== productId);
    this.saveFavorites(updatedFavorites);
  }

  isFavorite(productId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(productId);
  }
}
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

// ✅ Firebase Initialization with Error Handling
function initializeFirebaseApp() {
  try {
    return initializeApp(environment.firebase);
  } catch (err) {
    console.error('🔥 Firebase initialization error:', err);
    throw err; // Prevent silent failures
  }
}

// ✅ Firestore Initialization with Error Handling
function initializeFirestore() {
  try {
    return getFirestore();
  } catch (err) {
    console.error('🔥 Firestore initialization error:', err);
    throw err;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // ✅ Initialize Firebase with error handling
    provideFirebaseApp(() => initializeFirebaseApp()),

    // ✅ Initialize Firestore with error handling
    provideFirestore(() => initializeFirestore()),
  ]
};

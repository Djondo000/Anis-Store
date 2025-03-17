import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { environment } from './environments/environment';


// bootstrapApplication(AppComponent, {
//   providers: [
//     provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialize Firebase
//     provideFirestore(() => getFirestore()), // Firestore Database
//   ],
// }).catch(err => console.error(err));


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {environment} from "../environments/environment";
import {LaddaModule} from "angular2-ladda";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthGuardModule} from "@angular/fire/compat/auth-guard";
import {AuthService} from "./services/auth.service";
import {NgChartsModule} from "ng2-charts";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling(
      {
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      }
    )),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthGuardModule,
      LaddaModule.forRoot({
        spinnerColor: "#dee4e8",
        spinnerSize: 30,
        style: "zoom-out",
      }),
      AuthService,
      NgChartsModule,
    ),
    //provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ]
};

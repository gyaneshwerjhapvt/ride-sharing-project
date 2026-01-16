import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // This matches the 'App' export in app.ts

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
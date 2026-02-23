import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * Application-wide configuration. We use provideRouter for standalone routing and
 * provideBrowserGlobalErrorListeners so unhandled errors can be reported (e.g. to a service).
 * HttpClient is not registered here because this app uses fetch() for API calls to stay
 * consistent with the other frontends and avoid extra bundle size.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};

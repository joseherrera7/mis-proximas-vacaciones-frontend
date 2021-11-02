import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  
  var counterVal = 0;

  function incrementClick() {
      updateDisplay(++counterVal);
  }
  
  function resetCounter() {
      counterVal = 0;
      updateDisplay(counterVal);
  }
  
  function updateDisplay(val) {
      document.getElementById("counter-label").innerHTML = val;
  }
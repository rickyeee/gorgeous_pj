import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

if (environment.production) {
    enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

do {
    if (!environment.hmr) {
        bootstrap().catch(err => {
            console.log(err);
        });
        break;
    }
    if ((module as any).hot) {
        hmrBootstrap(module, bootstrap);
        break;
    }
    console.error('HMR没有启用，确保 ng server 命令加上 --hmr 标记');
} while (0);

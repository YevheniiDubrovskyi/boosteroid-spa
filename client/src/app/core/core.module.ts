import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpUtilsService } from './http-utils.service';
import { SocketService } from './socket.service';
import { RemoteControlService } from '../pages/remote-control';
import { UtilsService, UtilsServiceConfig } from './utils.service';
import { AuthGuard, AuthService, DemoGuard } from '../auth';
import { StorageService } from './storage.service';
import { InfoResolveService } from '../pages/info';
import { LoginResolveService, LoginService } from '../pages/login'
import { QuizResolveService } from '../pages/quiz';
import { RemoteControlResolveService } from '../pages/remote-control';
import { SettingsResolveService } from '../pages/settings';

@NgModule({
  imports: [CommonModule],
  providers: [
    UtilsService,
    AuthGuard,
    AuthService,
    DemoGuard,
    SocketService,
    RemoteControlService,
    StorageService,
    InfoResolveService,
    LoginResolveService,
    HttpUtilsService,
    LoginService,
    QuizResolveService,
    RemoteControlResolveService,
    SettingsResolveService,
  ],
})
export class CoreModule {
  //Checking the existence of another such service
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: UtilsServiceConfig = {}): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{
        provide: UtilsServiceConfig,
        useValue: config,
      }],
    };
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth: {
          clientId:'37b61d8e-e727-4b0d-a09e-6740254ea544',
          authority: 'https://login.microsoftonline.com/432a4219-1a46-4b7f-92ce-aae7bc705c26',
          redirectUri: 'http://localhost:4200',
        },
        cache: {
          cacheLocation:'localStorage',
          storeAuthStateInCookie:false
        }
      }
    ),
  {
    interactionType: InteractionType.Redirect,
    authRequest:{
      scopes:['user.Read']
    }
  },
  {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map(
      [
        ['https://graph.microsoft.com/v1.0/me', ['user.Read']],
        ['localhost', ['api://apiUri/api.scope']]
      ]
    )
  }
 
)
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }

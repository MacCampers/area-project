import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';

//firebase
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//custom component
import { AppComponent } from './app.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AboutJsonComponent } from './about-json/about-json.component';
//user
import { RegisterUserComponent } from './authentification/register-user/register-user.component';
import { EmailVerificationComponent } from './authentification/email-verification/email-verification.component';
import { UserSettingComponent } from './authentification/user-setting/user-setting.component';
//master
import { HeaderComponent } from './master/header/header.component';
import { SidebarComponent } from './master/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicesComponent } from './services/services.component';

//services
import { AuthService } from './authentification/services/auth.service';
import { WeatherComponent } from './weather/weather1/weather.component';
import { Weather2Component } from './weather/weather2/weather2.component';
import { Weather3Component } from './weather/weather3/weather3.component';
import { Twitch1Component } from './twitch/twitch1/twitch1.component';
import { Twitch2Component } from './twitch/twitch2/twitch2.component';
import { Youtube1Component } from './youtube/youtube1/youtube1.component';
import { Youtube2Component } from './youtube/youtube2/youtube2.component';
import { TwitchSettingsComponent } from './twitch/settings/settings.component';
import { WeathersettingComponent } from './weather/weathersetting/weathersetting.component';
import { Twitter1Component } from './twitter/twitter1/twitter1.component';
import { TwitterSettingsComponent } from './twitter/twitter-settings/twitter-settings.component';
import { FacebookSettingComponent } from './facebook/facebook-setting/facebook-setting.component';
import { Facebook1Component } from './facebook/facebook1/facebook1.component';
import { Facebook2Component } from './facebook/facebook2/facebook2.component';
import { Facebook3Component } from './facebook/facebook3/facebook3.component';
import { Twitter2Component } from './twitter/twitter2/twitter2.component';
import { Github1Component } from './github/github1/github1.component';
import { Github2Component } from './github/github2/github2.component';
import { Github3Component } from './github/github3/github3.component';
import { Github4Component } from './github/github4/github4.component';
import { Github5Component } from './github/github5/github5.component';
import { GithubSettingComponent } from './github/github-setting/github-setting.component';
import { Facebook4Component } from './facebook/facebook4/facebook4.component';
import { Facebook5Component } from './facebook/facebook5/facebook5.component';
import { Github6Component } from './github/github6/github6.component';


const CONFIG: FirebaseAppConfig = {
  apiKey: "AIzaSyCMfUWvrSMgpSQm097Rtk_CNlZoqp8O_FQ",
  authDomain: "epitechdashboard.firebaseapp.com",
  databaseURL: "https://epitechdashboard.firebaseio.com",
  projectId: "epitechdashboard",
  storageBucket: "epitechdashboard.appspot.com",
  messagingSenderId: "983619226651"
};

const ROUTES: Routes = [
  { path: '', component: RegisterUserComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'twitch-setting', component: TwitchSettingsComponent},
  { path: 'weather-setting', component: WeathersettingComponent},
  { path: 'twitter-setting', component: TwitterSettingsComponent},
  { path: 'facebook-setting', component: FacebookSettingComponent},
  { path: 'github-setting', component: GithubSettingComponent},
  { path: 'emailSection', component: EmailVerificationComponent },
  { path: 'userSettings', component: UserSettingComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about.json', component: AboutJsonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    DashboardComponent,
    EmailVerificationComponent,
    ServicesComponent,
    UserSettingComponent,
    HeaderComponent,
    SidebarComponent,
    AboutJsonComponent,
    WeatherComponent,
    Weather2Component,
    Weather3Component,
    Twitch1Component,
    Twitch2Component,
    Youtube1Component,
    Youtube2Component,
    TwitchSettingsComponent,
    WeathersettingComponent,
    Twitter1Component,
    TwitterSettingsComponent,
    Facebook1Component,
    FacebookSettingComponent,
    Facebook2Component,
    Facebook3Component,
    Twitter2Component,
    Github1Component,
    Github2Component,
    Github3Component,
    Github4Component,
    Github5Component,
    GithubSettingComponent,
    Facebook4Component,
    Facebook5Component,
    Github6Component,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(CONFIG),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AngularFireAuthModule,
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXFtghGl5A9XtMe2jhfmIA1ALC2SptoWg'
    }),
    NgbModule.forRoot(),
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [
    AuthService,
    GoogleMapsAPIWrapper,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

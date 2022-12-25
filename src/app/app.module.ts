import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from "../enviroment/enviroment.prod"
import { FireBaseService } from './service/user.service';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
    AddComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    provideStorage(()=>getStorage()),
  provideFirebaseApp( () => initializeApp(environment.firebaseConfig)),
  ],
  providers: [FireBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

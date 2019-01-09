import { BrMaskerModule } from "brmasker-ionic-3";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { Camera } from "@ionic-native/camera";
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { FormBusinessCardPage } from "./../pages/form-business-card/form-business-card";

@NgModule({
	declarations: [MyApp, HomePage, FormBusinessCardPage],
	imports: [
		BrMaskerModule, //declaração do módulo de mascaras
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()], //declaração do módulo de storage
	bootstrap: [IonicApp],
	entryComponents: [MyApp, HomePage, FormBusinessCardPage],
	providers: [
		Camera,
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {}

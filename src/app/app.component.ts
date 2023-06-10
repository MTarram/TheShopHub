import { Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  title = 'The Shop Hub';
  lang:string='';
  constructor(public loaderService: LoaderService, public auth: AuthService, private translateService: TranslateService, @Inject(DOCUMENT) private document: Document) { }
  @HostListener('window:beforeunload')
  async ngOnDestroy()
  {
    await localStorage.clear();
  }
  changeLangage(lang: string) {
    this.lang=lang
    let htmlTag = this.document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/",".json");
}

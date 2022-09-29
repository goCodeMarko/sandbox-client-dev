
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { HttpRequestService } from './http-request/http-request.service';
import { PopUpModalComponent } from './modals/pop-up-modal/pop-up-modal.component';
import { EditBookComponent } from './modals/edit-book/edit-book.component';
import { MatInputModule } from '@angular/material/input';
import { AddBookComponent } from './modals/add-book/add-book.component';
import { EditSessionHandlingComponent } from './modals/edit-session-handling/edit-session-handling.component';
import { AuthService } from './authorization/auth.service';
import { TokenInterceptorServiceService } from './token-interceptor/token-interceptor-service.service';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    PopUpModalComponent,
    EditBookComponent,
    AddBookComponent,
    EditSessionHandlingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    HttpRequestService,
    AuthService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorServiceService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

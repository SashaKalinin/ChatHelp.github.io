import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostPageComponent } from './post-page/post-page.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';
import {AuthService} from './shared/services/auth.service';
import {SharedModule} from './shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import {PostService} from './shared/services/post.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {Constants} from '../environments/constants';
import {MatSelectModule} from '@angular/material/select';
import { PostCardComponent } from './post-page/post-card/post-card.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    PostPageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    ToolBarComponent,
    AskQuestionComponent,
    PostCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatDatepickerModule,
    MatMenuModule,
    MatMenuModule,
    NgbModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule
  ],
  providers: [AuthService, AuthGuard, PostService, Constants],
  bootstrap: [AppComponent]
})
export class AppModule { }

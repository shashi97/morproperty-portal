import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EmailValidateService } from './services/email-validate.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {DataService} from './data.service'
import {
  DropdownModule,
  DataTableModule,
  SharedModule,
  DialogModule,
  TreeTableModule,
  CalendarModule,
  CheckboxModule,
  PanelModule,
  GrowlModule,
  RadioButtonModule,
  ConfirmDialogModule,
  TreeModule,
  ButtonModule,
  MultiSelectModule,
  AccordionModule,
  DataGridModule,
  SelectButtonModule,
  MessagesModule,
  TooltipModule,
  FileUploadModule,
  OverlayPanelModule,
  ConfirmationService,
  AutoCompleteModule,
  TabViewModule,
  InputTextModule
} from 'primeng/primeng';
import {
  ErrorComponent
} from '../../core';



@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    DropdownModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    TreeTableModule,
    CalendarModule,
    CheckboxModule,
    PanelModule,
    GrowlModule,
    RadioButtonModule,
    ConfirmDialogModule,
    TreeModule,
    ButtonModule,
    MultiSelectModule,
    AccordionModule,
    DataGridModule,
    SelectButtonModule,
    MessagesModule,
    TooltipModule,
    FileUploadModule,
    AutoCompleteModule,
    OverlayPanelModule,
    TabViewModule,
    AngularSvgIconModule,
    InputTextModule
  ],
  declarations: [
    ErrorComponent,

  ],
  providers: [
    ConfirmationService,
    EmailValidateService,
    DataService
  ],
  exports: [
    FormsModule,
    BrowserModule,
    DropdownModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    TreeTableModule,
    CalendarModule,
    CheckboxModule,
    PanelModule,
    GrowlModule,
    RadioButtonModule,
    ConfirmDialogModule,
    TreeModule,
    ButtonModule,
    MultiSelectModule,
    AccordionModule,
    DataGridModule,
    SelectButtonModule,
    MessagesModule,
    TooltipModule,
    FileUploadModule,
    AutoCompleteModule,
    TabViewModule,
    ErrorComponent,
    AngularSvgIconModule,

  ]
})
export class SharedComponentModule { }

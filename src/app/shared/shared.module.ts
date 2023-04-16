import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FooterComponent} from './components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatLineModule, MatRippleModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {TableComponent} from './components/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterModule} from '@angular/router';
import {ContentHeaderComponent} from './components/content/content-header/content-header.component';
import {ContentSectionComponent} from './components/content/content-section/content-section.component';
import {ButtonComponent} from './components/button/button/button.component';
import {ActionComponent} from './components/button/action/action.component';
import {ContentGroupComponent} from './components/content/content-group/content-group.component';
import {UploadComponent} from './components/upload/upload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { TableSearchComponent } from './components/table-search/table-search.component';
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatSortModule} from "@angular/material/sort";
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    TableComponent,
    ContentHeaderComponent,
    ContentSectionComponent,
    ButtonComponent,
    ActionComponent,
    ContentGroupComponent,
    UploadComponent,
    TableSearchComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    MatSortModule,
    MatRippleModule
  ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        TableComponent,
        ContentHeaderComponent,
        ContentSectionComponent,
        ContentGroupComponent,
        UploadComponent,
        TableSearchComponent,
        ButtonComponent
    ]
})
export class SharedModule { }

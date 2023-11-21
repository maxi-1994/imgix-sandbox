// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SandboxContentComponent } from './components/sandbox-content/sandbox-content.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { SandboxEditorComponent } from './components/sandbox-editor/sandbox-editor.component';

// Shared Components
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { ImagesListComponent } from 'src/app/shared/images-list/images-list.component';


const sandboxRoutes: Routes = [
  { 
    path: '', 
    component: SandboxContentComponent, 
    children: [
      { path: '', component: ImageSelectorComponent },
      { path: 'editor/:id', component: SandboxEditorComponent },
    ]
  },
];

@NgModule({
  declarations: [
    SandboxContentComponent,
    ImageSelectorComponent,
    SandboxEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(sandboxRoutes),
    HeaderComponent,
    SidebarComponent,
    ImagesListComponent
  ]
})
export class SandboxModule { }

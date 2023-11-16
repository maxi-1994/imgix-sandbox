import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/sandbox', pathMatch: 'full' },
  { path: 'sandbox', loadChildren: () => import('./modules/sandbox/sandbox.module').then(m => m.SandboxModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

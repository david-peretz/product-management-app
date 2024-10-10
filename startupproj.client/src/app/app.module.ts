// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductService } from './services/product.service';
import { TimerService } from './services/timer.services';
import { RandomColorDirective } from './directives/random-color.directive';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';




const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'stopwatch', component: StopwatchComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailsComponent
    
  ],
  imports: [
  
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ProductService,TimerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

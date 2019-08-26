import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { StatsComponent } from './stats/stats.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { RecipeComponent } from './recipe/recipe.component';
import { EditRecipeComponent } from './edit-recipe-modal/edit-recipe.component';
import { EditIngredientComponent } from './edit-ingredient-modal/edit-ingredient.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShoppingListComponent,
    StatsComponent,
    MainComponent,
    SettingsComponent,
    HistoryComponent,
    RecipeComponent,
    EditRecipeComponent,
    EditIngredientComponent,
  ],
  entryComponents: [EditRecipeComponent, EditIngredientComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule,
  ]
})
export class DashboardModule {
}

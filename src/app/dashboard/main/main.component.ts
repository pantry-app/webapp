import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Recipe } from '../../models';
import { Observable, Subscription } from 'rxjs';
import { RecipeService } from '../../services/api/recipe.service';
import { CreateRecipeComponent } from '../create-recipe-modal/create-recipe.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;

  public recipes: Recipe[] = null;
  public loading = false;

  constructor(private dialog: MatDialog,
              private recipeService: RecipeService) {}

  ngOnInit() {
    this.loading = true;

    this.subscription = this.recipeService.getAll()
      .subscribe(
        (recipes) => {
          this.loading = false;
          this.recipes = recipes;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleAddRecipe() {
    this.dialog.open(CreateRecipeComponent);
  }

}

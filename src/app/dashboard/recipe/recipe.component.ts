import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditRecipeComponent } from '../edit-recipe-modal/edit-recipe.component';
import { EditIngredientComponent } from '../edit-ingredient-modal/edit-ingredient.component';
import { Ingredient, Recipe } from '../../models';
import { CreateIngredientComponent } from '../create-ingredient-modal/create-ingredient.component';
import { RecipeService } from '../../services/api/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  public recipe: Recipe = null;

  public deleted = false;

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private recipeService: RecipeService) { }

  ngOnInit() {
  }

  handleEdit() {
    this.dialog.open(EditRecipeComponent, {
      data: this.recipe
    });
  }

  handleAddIngredient() {
    this.dialog.open(CreateIngredientComponent, {
      data: this.recipe
    });
  }

  handleEditIngredient(ingredient: Ingredient) {
    this.dialog.open(EditIngredientComponent, {
      data: {
        ingredient,
        recipe: this.recipe
      }
    });
  }

  handleDelete() {
    const ref = this.snackBar.open('Recipe deleted', 'Undo', {
      duration: 1750
    });

    this.deleted = true;

    ref.afterDismissed().subscribe(
      () => {
        // Unfortunately, `afterDismissed` is called even after `onAction`,
        //  so we check that 'Undo' was not clicked by checking state of `this.deleted`
        //  before deleting object
        if (this.deleted) {
          this.recipeService.delete(this.recipe).subscribe();
        }
      }
    );

    ref.onAction().subscribe(
      () => this.deleted = false
    );
  }
}

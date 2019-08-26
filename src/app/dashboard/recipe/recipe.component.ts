import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditRecipeComponent } from '../edit-recipe-modal/edit-recipe.component';
import { EditIngredientComponent } from '../edit-ingredient-modal/edit-ingredient.component';
import { Recipe } from '../../models';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  public recipe: Recipe = null;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  handleEdit() {
    this.dialog.open(EditRecipeComponent, {
      data: this.recipe
    });
  }

  handleAddIngredient() {
    // TODO create ingredient, then edit it
    this.dialog.open(EditIngredientComponent);
  }

  handleEditIngredient() {
    this.dialog.open(EditIngredientComponent);
  }
}

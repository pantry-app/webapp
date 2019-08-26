import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditRecipeComponent } from '../edit-recipe-modal/edit-recipe.component';
import { EditIngredientComponent } from '../edit-ingredient-modal/edit-ingredient.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  handleEdit() {
    this.dialog.open(EditRecipeComponent);
  }

  handleAddIngredient() {
    // TODO create ingredient, then edit it
    this.dialog.open(EditIngredientComponent);
  }

  handleEditIngredient() {
    this.dialog.open(EditIngredientComponent);
  }
}

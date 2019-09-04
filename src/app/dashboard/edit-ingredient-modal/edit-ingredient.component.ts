import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ingredient, IngredientStatusArray, Recipe } from '../../models';
import { IngredientService } from '../../services/api/ingredient.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {

  private ingredient: Ingredient = null;
  private recipe: Recipe = null;

  public statusChoices = IngredientStatusArray;

  public form: FormGroup = null;

  constructor(@Inject(MAT_DIALOG_DATA) data: {ingredient: Ingredient, recipe: Recipe},
              private dialogRef: MatDialogRef<EditIngredientComponent>,
              private fb: FormBuilder,
              private ingredientService: IngredientService) {
    const { ingredient, recipe } = data;

    this.ingredient = ingredient;
    this.recipe = recipe;

    this.form = fb.group({
        name: [ingredient.name, Validators.required],
        status: [ingredient.status],
        notes: [ingredient.notes],
        active: [ingredient.active],
        id: [ingredient.id],
    });
  }

  ngOnInit() {
  }

  handleRemove() {
    this.ingredientService
      .removeFromRecipe(this.form.value, this.recipe)
      .subscribe(
        () => this.dialogRef.close()
      );
  }

  handleSubmit() {
    this.ingredientService.update(this.form.value)
      .subscribe(
        () => this.dialogRef.close()
      );
  }
}

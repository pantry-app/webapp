import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Recipe } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/api/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe,
              private dialogRef: MatDialogRef<EditRecipeComponent>,
              private fb: FormBuilder,
              private recipeService: RecipeService) {
    this.form = fb.group({
      name: [data.name, Validators.required],
      url: [data.url],
      notes: [data.notes],
      active: [data.active],
      id: [data.id],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.recipeService.update(this.form.value)
      .subscribe(
        () => this.dialogRef.close()
      );
  }
}

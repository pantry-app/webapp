import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../services/api/recipe.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

  public form: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateRecipeComponent>,
              private fb: FormBuilder,
              private recipeService: RecipeService) {
    this.form = fb.group({
      name: ['', Validators.required],
      url: [''],
      notes: [''],
      active: [true],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.recipeService
      .create(this.form.value)
      .subscribe(
        () => this.dialogRef.close()
      );
  }
}

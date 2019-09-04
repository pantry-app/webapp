import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../../services/api/ingredient.service';
import { IngredientStatusArray, IngredientStatusEnum, Recipe } from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit {

  // TODO
  public options: string[] = ['One', 'Two', 'Three'];

  public existingForm: FormGroup = null;
  public createForm: FormGroup = null;

  public statusChoices = IngredientStatusArray;

  private recipe: Recipe = null;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateIngredientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Recipe,
              private ingredientService: IngredientService) {
    this.existingForm = fb.group({
      ingredient: [null, Validators.required]
    });

    this.createForm = fb.group({
      name: ['', Validators.required],
      status: [IngredientStatusEnum.FULL],
      notes: [''],
      active: [true],
    });

    this.recipe = data;
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.ingredientService
      .create(this.createForm.value, this.recipe)
      .subscribe(
        () => this.dialogRef.close()
      );
  }
}

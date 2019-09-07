import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../../services/api/ingredient.service';
import { Ingredient, IngredientStatusArray, IngredientStatusEnum, Recipe } from '../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

enum TabEnum {
  EXISTING = 0,
  CREATE = 1
}

function existingIngredientValidator(control: AbstractControl): {[key: string]: any} | null {
  return control.value && control.value.id ? null : {existingIngredient: 'Invalid Selection'};
}

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit {

  public selectedTabIndex: TabEnum = 0;

  public options: Observable<Ingredient[]> = null;

  public existingForm: FormGroup = null;
  public createForm: FormGroup = null;

  public statusChoices = IngredientStatusArray;

  private recipe: Recipe = null;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CreateIngredientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Recipe,
              private ingredientService: IngredientService) {
    this.existingForm = fb.group({
      ingredient: [null, [Validators.required, existingIngredientValidator]],
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
    this.options = this.existingForm.controls.ingredient
      .valueChanges
      .pipe(
        debounceTime(500),
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(
          name => this.ingredientService.search(name)
        )
      );
  }

  handleSubmit() {
    if (this.selectedTabIndex === TabEnum.CREATE) {
      if (this.createForm.valid) {
        this.ingredientService
          .create(this.createForm.value, this.recipe)
          .subscribe(
            () => this.dialogRef.close()
          );
      }
    } else if (this.selectedTabIndex === TabEnum.EXISTING) {
      if (this.existingForm.valid) {
        this.ingredientService
          .addToRecipe(this.existingForm.value.ingredient, this.recipe)
          .subscribe(
            () => this.dialogRef.close()
          );
      }
    }
  }

  canSubmit() {
    if (this.selectedTabIndex === TabEnum.CREATE && this.createForm.valid) {
      return true;
    }

    if (this.selectedTabIndex === TabEnum.EXISTING && this.existingForm.valid) {
      return true;
    }

    return false;
  }

  displayFn(ingredient?: Ingredient): string | undefined {
    return ingredient ? ingredient.name : undefined;
  }
}

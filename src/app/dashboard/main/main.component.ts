import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Recipe } from '../../models';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../services/api/recipe.service';
import { CreateRecipeComponent } from '../create-recipe-modal/create-recipe.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription = null;

  public recipes: Recipe[] = null;
  public loading = false;

  public searchForm: FormGroup;

  constructor(private dialog: MatDialog,
              private recipeService: RecipeService,
              private fb: FormBuilder) {
    this.searchForm = fb.group({
      name: '',
      active: true,
    });
  }

  ngOnInit() {
    this.loading = true;

    this.subscription = this.recipeService
      .getAll()
      .pipe(
        combineLatest(
          this.searchForm.valueChanges
            .pipe(
              startWith(this.searchForm.value),
            ),
          (recipes: Recipe[], search: {[key: string]: any}): Recipe[] => {
            console.log('Search', search);

            return recipes.filter(
              recipe => {
                if (search.name !== '') {
                  if (!recipe.name.includes(search.name)) {
                    return false;
                  }
                }

                return recipe.active === search.active;
              }
            );
          }
        )
      )
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

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditRecipeComponent } from '../edit-recipe-modal/edit-recipe.component';
import { Recipe } from '../../models';
import { Observable } from 'rxjs';
import { RecipeService } from '../../services/api/recipe.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public recipes$: Observable<Recipe[]> = null;

  constructor(private dialog: MatDialog,
              private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes$ = this.recipeService.getAll();
  }

  handleAddRecipe() {
    this.dialog.open(EditRecipeComponent);
  }

}

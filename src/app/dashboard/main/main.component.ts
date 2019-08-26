import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditRecipeComponent } from '../edit-recipe-modal/edit-recipe.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  handleAddRecipe() {
    this.dialog.open(EditRecipeComponent);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Recipe } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe,
              private fb: FormBuilder) {
    this.form = fb.group({
      name: [data.name, Validators.required],
      url: [data.url],
      notes: [data.notes],
      active: [data.active],
    });
  }

  ngOnInit() {
  }

  submit() {

  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ShoppingList } from '../../models/shopping-list.model';
import { ShoppingListService } from '../../services/api/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private shoppingList$ = new Subject<ShoppingList>();
  private subscription: Subscription = null;

  public shoppingList: ShoppingList = null;
  public loading = true;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingList$.subscribe(
      shoppingList => {
        this.shoppingList = shoppingList;
        this.loading = false;
      }
    );

    this.shoppingListService.get()
      .subscribe(
        next => this.shoppingList$.next(next)
      );
  }

  ngOnDestroy() {
    this.shoppingList$.complete();
    this.subscription.unsubscribe();
  }

  handleCreate() {
    this.shoppingListService.create()
      .subscribe(
        next => this.shoppingList$.next(next)
      );
  }

  handleRefresh() {
    this.shoppingListService.refresh()
      .subscribe(
        next => this.shoppingList$.next(next)
      );
  }

  handleSubmit() {
    this.shoppingListService.submit([])
      .subscribe();
  }
}

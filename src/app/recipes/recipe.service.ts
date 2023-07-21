import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanges = new Subject<Recipe[]>()
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'test Recipe',
  //     'this is a test Recipe Description',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
  //     [new Ingredients('Meat', 1), new Ingredients('Meat', 1)]
  //   ),
  //   new Recipe(
  //     'Another test Recipe',
  //     'this is a test Recipe Description',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
  //     [new Ingredients('Meat', 1), new Ingredients('Meat', 1)]
  //   ),
  // ];

  private recipes:Recipe[] = [];
  constructor(private slService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients:Ingredients[]){
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanges.next(this.recipes.slice());
  }
}

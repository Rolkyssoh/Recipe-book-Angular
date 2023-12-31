import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) { }

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is a test',
            'https://media.istockphoto.com/id/1439228262/photo/delicious-fried-oyster-mushrooms-and-shiitake-mushrooms-with-vegetables-in-a-spicy-sauce.jpg?s=612x612&w=is&k=20&c=yv_iclHa2MByl5eaEI2xrqd6hE4oMJdvqdC1lPuSpug=',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20),
            ]
        ),
        new Recipe(
            'Some other test',
            'This is one other test',
            'https://media.istockphoto.com/id/1439228262/photo/delicious-fried-oyster-mushrooms-and-shiitake-mushrooms-with-vegetables-in-a-spicy-sauce.jpg?s=612x612&w=is&k=20&c=yv_iclHa2MByl5eaEI2xrqd6hE4oMJdvqdC1lPuSpug=',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        ),
        new Recipe(
            'This is another test',
            'The test',
            'https://media.istockphoto.com/id/1439228262/photo/delicious-fried-oyster-mushrooms-and-shiitake-mushrooms-with-vegetables-in-a-spicy-sauce.jpg?s=612x612&w=is&k=20&c=yv_iclHa2MByl5eaEI2xrqd6hE4oMJdvqdC1lPuSpug=',
            []
        )
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
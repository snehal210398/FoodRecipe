import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesComponent } from "./recipes.component";

const routes:Routes = [
    {path:"", component:RecipesComponent, children:[
        {path:"", component:RecipeStartComponent, canActivate:[AuthGuard]},
        {path:"new", component:RecipeEditComponent},
        {path:":id", component:RecipesDetailComponent, resolve:[RecipeResolverService]},
        {path:":id/edit", component:RecipeEditComponent}
      ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{}
"use strict";
(self.webpackChunkfood_recipe = self.webpackChunkfood_recipe || []).push([
  [14],
  {
    14: (J, m, p) => {
      p.r(m), p.d(m, { RecipesModule: () => k });
      var s = p(1196),
        o = p(433),
        h = p(5698),
        f = p(4004),
        Z = p(3935),
        e = p(8256),
        R = p(384);
      let _ = (() => {
        class t {
          constructor(i, n) {
            (this.authservice = i), (this.router = n);
          }
          canActivate(i, n) {
            return this.authservice.user.pipe(
              (0, h.q)(1),
              (0, f.U)(() => !!Z.n || this.router.createUrlTree(["/auth"]))
            );
          }
        }
        return (
          (t.ɵfac = function (i) {
            return new (i || t)(e.LFG(R.e), e.LFG(s.F0));
          }),
          (t.ɵprov = e.Yz7({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      var d = p(5496),
        l = p(6895);
      function C(t, r) {
        if (1 & t) {
          const i = e.EpF();
          e.TgZ(0, "div", 17)(1, "div", 18),
            e._UZ(2, "input", 19),
            e.qZA(),
            e.TgZ(3, "div", 20),
            e._UZ(4, "input", 21),
            e.qZA(),
            e.TgZ(5, "div", 20)(6, "button", 4),
            e.NdJ("click", function () {
              const u = e.CHM(i).index,
                a = e.oxw();
              return e.KtG(a.onDeleteIngredient(u));
            }),
            e._uU(7, " X "),
            e.qZA()()();
        }
        2 & t && e.Q6J("formGroupName", r.index);
      }
      let g = (() => {
        class t {
          constructor(i, n, c) {
            (this.route = i),
              (this.recipeService = n),
              (this.router = c),
              (this.editMode = !1);
          }
          ngOnInit() {
            this.route.params.subscribe((i) => {
              (this.id = +i.id),
                (this.editMode = null != i.id),
                this.initForm();
            });
          }
          initForm() {
            let i = "",
              n = "",
              c = "",
              u = new o.Oe([]);
            if (this.editMode) {
              const a = this.recipeService.getRecipe(this.id);
              if (
                ((i = a.name),
                (n = a.imagePath),
                (c = a.description),
                a.ingredients)
              )
                for (let v of a.ingredients)
                  u.push(
                    new o.cw({
                      name: new o.NI(v.name, o.kI.required),
                      amount: new o.NI(v.amount, [
                        o.kI.required,
                        o.kI.pattern(/^[1-9]+[0-9]*$/),
                      ]),
                    })
                  );
            }
            this.recipeForm = new o.cw({
              name: new o.NI(i, o.kI.required),
              imagePath: new o.NI(n, o.kI.required),
              description: new o.NI(c, o.kI.required),
              ingredients: u,
            });
          }
          onSubmit() {
            this.editMode
              ? this.recipeService.updateRecipe(this.id, this.recipeForm.value)
              : this.recipeService.addRecipe(this.recipeForm.value),
              this.onCancel();
          }
          get controls() {
            return this.recipeForm.get("ingredients").controls;
          }
          onAddIngredient() {
            this.recipeForm
              .get("ingredients")
              .push(
                new o.cw({
                  name: new o.NI(null, o.kI.required),
                  amount: new o.NI(null, [
                    o.kI.required,
                    o.kI.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
          }
          onCancel() {
            this.router.navigate(["../"], { relativeTo: this.route });
          }
          onDeleteIngredient(i) {
            this.recipeForm.get("ingredient").removeAt(i);
          }
        }
        return (
          (t.ɵfac = function (i) {
            return new (i || t)(e.Y36(s.gz), e.Y36(d.j), e.Y36(s.F0));
          }),
          (t.ɵcmp = e.Xpm({
            type: t,
            selectors: [["app-recipe-edit"]],
            decls: 39,
            vars: 4,
            consts: [
              [1, "row"],
              [1, "col-xs-12"],
              [3, "formGroup", "ngSubmit"],
              ["type", "submit", 1, "btn", "btn-success", 3, "disabled"],
              ["type", "button", 1, "btn", "btn-danger", 3, "click"],
              [1, "form-group"],
              ["for", "name"],
              [
                "type",
                "text",
                "id",
                "name",
                "formControlName",
                "name",
                1,
                "form-control",
              ],
              ["for", "imagePath"],
              [
                "type",
                "text",
                "id",
                "imagePath",
                "formControlName",
                "imagePath",
                1,
                "form-control",
              ],
              ["imagePath", ""],
              [1, "img-responsive", 3, "src"],
              ["for", "description"],
              [
                "type",
                "text",
                "id",
                "description",
                "rows",
                "6",
                "formControlName",
                "description",
                1,
                "form-control",
              ],
              ["formArrayName", "ingredients", 1, "col-xs-12"],
              [
                "class",
                "row",
                "style",
                "margin-top: 10px",
                3,
                "formGroupName",
                4,
                "ngFor",
                "ngForOf",
              ],
              ["type", "button", 1, "btn", "btn-success", 3, "click"],
              [1, "row", 2, "margin-top", "10px", 3, "formGroupName"],
              [1, "col-xs-8"],
              ["type", "text", "formControlName", "name", 1, "form-control"],
              [1, "col-xs-2"],
              [
                "type",
                "number",
                "formControlName",
                "amount",
                1,
                "form-control",
              ],
            ],
            template: function (i, n) {
              if (
                (1 & i &&
                  (e.TgZ(0, "div", 0)(1, "div", 1)(2, "form", 2),
                  e.NdJ("ngSubmit", function () {
                    return n.onSubmit();
                  }),
                  e.TgZ(3, "div", 0)(4, "div", 1)(5, "button", 3),
                  e._uU(6, " Save "),
                  e.qZA(),
                  e.TgZ(7, "button", 4),
                  e.NdJ("click", function () {
                    return n.onCancel();
                  }),
                  e._uU(8, " Cancle "),
                  e.qZA()()(),
                  e.TgZ(9, "div", 0)(10, "div", 1)(11, "div", 5)(
                    12,
                    "label",
                    6
                  ),
                  e._uU(13, "Name"),
                  e.qZA(),
                  e._UZ(14, "input", 7),
                  e.qZA()()(),
                  e.TgZ(15, "div", 0)(16, "div", 1)(17, "div", 5)(
                    18,
                    "label",
                    8
                  ),
                  e._uU(19, "Image URL"),
                  e.qZA(),
                  e._UZ(20, "input", 9, 10),
                  e.qZA()()(),
                  e.TgZ(22, "div", 0)(23, "div", 1),
                  e._UZ(24, "img", 11),
                  e.qZA()(),
                  e.TgZ(25, "div", 0)(26, "div", 1)(27, "div", 5)(
                    28,
                    "label",
                    12
                  ),
                  e._uU(29, "Description"),
                  e.qZA(),
                  e._UZ(30, "textarea", 13),
                  e.qZA()()(),
                  e.TgZ(31, "div", 0)(32, "div", 14),
                  e.YNc(33, C, 8, 1, "div", 15),
                  e._UZ(34, "hr"),
                  e.TgZ(35, "div", 0)(36, "div", 1)(37, "button", 16),
                  e.NdJ("click", function () {
                    return n.onAddIngredient();
                  }),
                  e._uU(38, " Add Ingredient "),
                  e.qZA()()()()()()()()),
                2 & i)
              ) {
                const c = e.MAs(21);
                e.xp6(2),
                  e.Q6J("formGroup", n.recipeForm),
                  e.xp6(3),
                  e.Q6J("disabled", n.recipeForm.invalid),
                  e.xp6(19),
                  e.Q6J("src", c.value, e.LSH),
                  e.xp6(9),
                  e.Q6J("ngForOf", n.controls);
              }
            },
            dependencies: [
              l.sg,
              o._Y,
              o.Fj,
              o.wV,
              o.JJ,
              o.JL,
              o.sg,
              o.u,
              o.x0,
              o.CE,
            ],
            styles: [
              "input.ng-invalid.ng-touched[_ngcontent-%COMP%], textarea.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}",
            ],
          })),
          t
        );
      })();
      var T = p(3649);
      let A = (() => {
          class t {
            constructor(i, n) {
              (this.dataStorage = i), (this.recipeService = n);
            }
            resolve(i, n) {
              const c = this.recipeService.getRecipes();
              return 0 === c.length ? this.dataStorage.fetchRecipes() : c;
            }
          }
          return (
            (t.ɵfac = function (i) {
              return new (i || t)(e.LFG(T.Z), e.LFG(d.j));
            }),
            (t.ɵprov = e.Yz7({
              token: t,
              factory: t.ɵfac,
              providedIn: "root",
            })),
            t
          );
        })(),
        b = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (i) {
              return new (i || t)();
            }),
            (t.ɵcmp = e.Xpm({
              type: t,
              selectors: [["app-recipe-start"]],
              decls: 2,
              vars: 0,
              template: function (i, n) {
                1 & i &&
                  (e.TgZ(0, "p"), e._uU(1, "Please Select a Recipe!"), e.qZA());
              },
            })),
            t
          );
        })();
      function F(t, r) {
        if ((1 & t && (e.TgZ(0, "li", 9), e._uU(1), e.qZA()), 2 & t)) {
          const i = r.$implicit;
          e.xp6(1), e.AsE("", i.name, "-", i.amount, "");
        }
      }
      let S = (() => {
        class t {
          constructor(i, n, c) {
            (this.recipeService = i), (this.route = n), (this.router = c);
          }
          ngOnInit() {
            this.route.params.subscribe((i) => {
              (this.id = +i.id),
                (this.recipe = this.recipeService.getRecipe(this.id));
            });
          }
          onAddToShoppingList() {
            this.recipeService.addIngredientsToShoppingList(
              this.recipe.ingredients
            );
          }
          onEditRecipe() {
            this.router.navigate(["edit"], { relativeTo: this.route });
          }
          onDeleteRecipe() {
            this.recipeService.deleteRecipe(this.id),
              this.router.navigate(["/recipes"]);
          }
        }
        return (
          (t.ɵfac = function (i) {
            return new (i || t)(e.Y36(d.j), e.Y36(s.gz), e.Y36(s.F0));
          }),
          (t.ɵcmp = e.Xpm({
            type: t,
            selectors: [["app-recipes-detail"]],
            decls: 29,
            vars: 5,
            consts: [
              [1, "row"],
              [1, "col-xs-12"],
              [1, "img-responsive", 2, "max-height", "300px", 3, "src", "alt"],
              [1, "dropdown"],
              [
                "type",
                "button",
                "id",
                "dropdownMenuButton1",
                "data-bs-toggle",
                "dropdown",
                "aria-expanded",
                "false",
                1,
                "btn",
                "btn-primary",
                "dropdown-toggle",
              ],
              ["aria-labelledby", "dropdownMenuButton1", 1, "dropdown-menu"],
              [1, "dropdown-item", 2, "cursor", "pointer", 3, "click"],
              [1, "list-group"],
              ["class", "list-group-item", 4, "ngFor", "ngForOf"],
              [1, "list-group-item"],
            ],
            template: function (i, n) {
              1 & i &&
                (e.TgZ(0, "div", 0)(1, "div", 1),
                e._UZ(2, "img", 2),
                e.qZA()(),
                e.TgZ(3, "div", 0)(4, "div", 1)(5, "h1"),
                e._uU(6),
                e.qZA()()(),
                e.TgZ(7, "div", 0)(8, "div", 1)(9, "div", 3)(10, "button", 4),
                e._uU(11, " Manage Recipe "),
                e.qZA(),
                e.TgZ(12, "ul", 5)(13, "li")(14, "a", 6),
                e.NdJ("click", function () {
                  return n.onAddToShoppingList();
                }),
                e._uU(15, "To Shopping List"),
                e.qZA()(),
                e.TgZ(16, "li")(17, "a", 6),
                e.NdJ("click", function () {
                  return n.onEditRecipe();
                }),
                e._uU(18, "Edit Recipe"),
                e.qZA()(),
                e.TgZ(19, "li")(20, "a", 6),
                e.NdJ("click", function () {
                  return n.onDeleteRecipe();
                }),
                e._uU(21, "Delete Recipe"),
                e.qZA()()()()(),
                e.TgZ(22, "div", 0)(23, "div", 1),
                e._uU(24),
                e.qZA()(),
                e.TgZ(25, "div", 0)(26, "div", 1)(27, "ul", 7),
                e.YNc(28, F, 2, 2, "li", 8),
                e.qZA()()()()),
                2 & i &&
                  (e.xp6(2),
                  e.s9C("alt", n.recipe.name),
                  e.Q6J("src", n.recipe.imagePath, e.LSH),
                  e.xp6(4),
                  e.Oqu(n.recipe.name),
                  e.xp6(18),
                  e.hij(" ", n.recipe.description, " "),
                  e.xp6(4),
                  e.Q6J("ngForOf", n.recipe.ingredients));
            },
            dependencies: [l.sg],
          })),
          t
        );
      })();
      const I = function (t) {
        return [t];
      };
      let y = (() => {
        class t {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (t.ɵfac = function (i) {
            return new (i || t)();
          }),
          (t.ɵcmp = e.Xpm({
            type: t,
            selectors: [["app-recipe-item"]],
            inputs: { recipe: "recipe", index: "index" },
            decls: 8,
            vars: 7,
            consts: [
              [
                "routerLinkActive",
                "active",
                1,
                "list-group-item",
                "clearfix",
                2,
                "cursor",
                "pointer",
                3,
                "routerLink",
              ],
              [1, "float-start"],
              [1, "list-group-item-heading"],
              [1, "list-group-item-text"],
              [1, "float-end"],
              [1, "img-responsive", 2, "max-height", "50px", 3, "src", "alt"],
            ],
            template: function (i, n) {
              1 & i &&
                (e.TgZ(0, "a", 0)(1, "div", 1)(2, "h4", 2),
                e._uU(3),
                e.qZA(),
                e.TgZ(4, "p", 3),
                e._uU(5),
                e.qZA()(),
                e.TgZ(6, "span", 4),
                e._UZ(7, "img", 5),
                e.qZA()()),
                2 & i &&
                  (e.Q6J("routerLink", e.VKq(5, I, n.index)),
                  e.xp6(3),
                  e.Oqu(n.recipe.name),
                  e.xp6(2),
                  e.Oqu(n.recipe.description),
                  e.xp6(2),
                  e.s9C("alt", n.recipe.name),
                  e.Q6J("src", n.recipe.imagePath, e.LSH));
            },
            dependencies: [s.yS, s.Od],
          })),
          t
        );
      })();
      function w(t, r) {
        if ((1 & t && e._UZ(0, "app-recipe-item", 5), 2 & t)) {
          const n = r.index;
          e.Q6J("recipe", r.$implicit)("index", n);
        }
      }
      let U = (() => {
        class t {
          constructor(i, n, c) {
            (this.recipeService = i), (this.router = n), (this.route = c);
          }
          ngOnInit() {
            (this.subscription = this.recipeService.recipeChanges.subscribe(
              (i) => {
                this.recipes = i;
              }
            )),
              (this.recipes = this.recipeService.getRecipes());
          }
          onNewRecipe() {
            this.router.navigate(["new"], { relativeTo: this.route });
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }
        return (
          (t.ɵfac = function (i) {
            return new (i || t)(e.Y36(d.j), e.Y36(s.F0), e.Y36(s.gz));
          }),
          (t.ɵcmp = e.Xpm({
            type: t,
            selectors: [["app-recipes-list"]],
            decls: 9,
            vars: 1,
            consts: [
              [1, "row"],
              [1, "col-xs-12"],
              [1, "btn", "btn-success", 3, "click"],
              [1, "list-group"],
              [3, "recipe", "index", 4, "ngFor", "ngForOf"],
              [3, "recipe", "index"],
            ],
            template: function (i, n) {
              1 & i &&
                (e.TgZ(0, "div", 0)(1, "div", 1)(2, "button", 2),
                e.NdJ("click", function () {
                  return n.onNewRecipe();
                }),
                e._uU(3, "New Recipe"),
                e.qZA()()(),
                e._UZ(4, "hr"),
                e.TgZ(5, "div", 0)(6, "div", 1)(7, "div", 3),
                e.YNc(8, w, 1, 2, "app-recipe-item", 4),
                e.qZA()()()),
                2 & i && (e.xp6(8), e.Q6J("ngForOf", n.recipes));
            },
            dependencies: [l.sg, y],
          })),
          t
        );
      })();
      const x = [
        {
          path: "",
          component: (() => {
            class t {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (t.ɵfac = function (i) {
                return new (i || t)();
              }),
              (t.ɵcmp = e.Xpm({
                type: t,
                selectors: [["app-recipes"]],
                decls: 5,
                vars: 0,
                consts: [
                  [1, "row"],
                  [1, "col-md-5"],
                  [1, "col-md-7"],
                ],
                template: function (i, n) {
                  1 & i &&
                    (e.TgZ(0, "div", 0)(1, "div", 1),
                    e._UZ(2, "app-recipes-list"),
                    e.qZA(),
                    e.TgZ(3, "div", 2),
                    e._UZ(4, "router-outlet"),
                    e.qZA()());
                },
                dependencies: [s.lC, U],
              })),
              t
            );
          })(),
          children: [
            { path: "", component: b, canActivate: [_] },
            { path: "new", component: g },
            { path: ":id", component: S, resolve: [A] },
            { path: ":id/edit", component: g },
          ],
        },
      ];
      let N = (() => {
        class t {}
        return (
          (t.ɵfac = function (i) {
            return new (i || t)();
          }),
          (t.ɵmod = e.oAB({ type: t })),
          (t.ɵinj = e.cJS({ imports: [s.Bz.forChild(x), s.Bz] })),
          t
        );
      })();
      var q = p(4466);
      let k = (() => {
        class t {}
        return (
          (t.ɵfac = function (i) {
            return new (i || t)();
          }),
          (t.ɵmod = e.oAB({ type: t })),
          (t.ɵinj = e.cJS({ imports: [q.m, s.Bz, o.UX, N] })),
          t
        );
      })();
    },
  },
]);

"use strict";
(self.webpackChunkfood_recipe = self.webpackChunkfood_recipe || []).push([
  [179],
  {
    384: (Ge, ue, I) => {
      I.d(ue, { e: () => se });
      var d = I(1135),
        C = I(262),
        k = I(8505),
        H = I(2843),
        G = I(3935),
        ye = I(2340),
        Q = I(8256),
        Ie = I(529),
        ve = I(1196);
      let se = (() => {
        class q {
          constructor(Te, X) {
            (this.http = Te), (this.router = X), (this.user = new d.X(null));
          }
          signUp(Te, X) {
            return this.http
              .post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
                  ye.N.fireBaseKey,
                { email: Te, password: X, returnSecureToken: !0 }
              )
              .pipe(
                (0, C.K)(this.handleError),
                (0, k.b)((Me) => {
                  this.handleAuthentication(
                    Me.email,
                    Me.localId,
                    Me.idToken,
                    +Me.expiresIn
                  );
                })
              );
          }
          login(Te, X) {
            return this.http
              .post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                  ye.N.fireBaseKey,
                { email: Te, password: X, returnSecureToken: !0 }
              )
              .pipe(
                (0, C.K)(this.handleError),
                (0, k.b)((Me) => {
                  this.handleAuthentication(
                    Me.email,
                    Me.localId,
                    Me.idToken,
                    +Me.expiresIn
                  );
                })
              );
          }
          handleAuthentication(Te, X, Me, Ne) {
            const Qe = new Date(new Date().getTime() + 1e3 * Ne),
              Ke = new G.n(Te, X, Me, Qe);
            this.user.next(Ke),
              this.autoLogout(1e3 * Ne),
              localStorage.setItem("userData", JSON.stringify(Ke));
          }
          handleError(Te) {
            console.log(Te);
            let X = "An Unknow Error occured";
            if (!Te.error || !Te.error.error) return (0, H._)(X);
            switch (Te.error.error.message) {
              case "EMAIL_EXISTS":
                X = "This Email Already Exist";
                break;
              case "EMAIL_NOT_FOUND":
                X = "This Email Does Not Exist";
                break;
              case "INVALID_PASSWORD":
                X = "Please Enter Valid Password";
                break;
              case "USER_DISABLED":
                X = "This User is Disabled";
            }
            return (0, H._)(X);
          }
          logout() {
            this.user.next(null),
              this.router.navigate(["/auth"]),
              localStorage.removeItem("userData"),
              this.tokenExpirationTimer &&
                clearTimeout(this.tokenExpirationTimer),
              (this.tokenExpirationTimer = null);
          }
          autoLogin() {
            const Te = JSON.parse(localStorage.getItem("userData"));
            if (!Te) return;
            const X = new G.n(
              Te.email,
              Te.id,
              Te._token,
              new Date(Te._tokenExpirationDate)
            );
            if (X.token) {
              this.user.next(X);
              const Me =
                new Date(Te._tokenExpirationDate).getTime() -
                new Date().getTime();
              this.autoLogout(+Me);
            }
          }
          autoLogout(Te) {
            this.tokenExpirationTimer = setTimeout(() => {
              this.logout();
            }, Te);
          }
        }
        return (
          (q.ɵfac = function (Te) {
            return new (Te || q)(Q.LFG(Ie.eN), Q.LFG(ve.F0));
          }),
          (q.ɵprov = Q.Yz7({ token: q, factory: q.ɵfac, providedIn: "root" })),
          q
        );
      })();
    },
    3935: (Ge, ue, I) => {
      I.d(ue, { n: () => d });
      class d {
        constructor(k, H, G, ye) {
          (this.email = k),
            (this.id = H),
            (this._token = G),
            (this._tokenExpirationDate = ye);
        }
        get token() {
          return !this._tokenExpirationDate ||
            new Date() > this._tokenExpirationDate
            ? null
            : this._token;
        }
      }
    },
    5496: (Ge, ue, I) => {
      I.d(ue, { j: () => H });
      var d = I(7579),
        C = I(8256),
        k = I(2457);
      let H = (() => {
        class G {
          constructor(Q) {
            (this.slService = Q),
              (this.recipeChanges = new d.x()),
              (this.recipes = []);
          }
          getRecipes() {
            return this.recipes.slice();
          }
          addIngredientsToShoppingList(Q) {
            this.slService.addIngredients(Q);
          }
          getRecipe(Q) {
            return this.recipes[Q];
          }
          addRecipe(Q) {
            this.recipes.push(Q), this.recipeChanges.next(this.recipes.slice());
          }
          updateRecipe(Q, Ie) {
            (this.recipes[Q] = Ie),
              this.recipeChanges.next(this.recipes.slice());
          }
          deleteRecipe(Q) {
            this.recipes.splice(Q, 1),
              this.recipeChanges.next(this.recipes.slice());
          }
          setRecipes(Q) {
            (this.recipes = Q), this.recipeChanges.next(this.recipes.slice());
          }
        }
        return (
          (G.ɵfac = function (Q) {
            return new (Q || G)(C.LFG(k._));
          }),
          (G.ɵprov = C.Yz7({ token: G, factory: G.ɵfac, providedIn: "root" })),
          G
        );
      })();
    },
    3649: (Ge, ue, I) => {
      I.d(ue, { Z: () => Q });
      var d = I(4004),
        C = I(8505),
        k = I(8256),
        H = I(529),
        G = I(5496),
        ye = I(384);
      let Q = (() => {
        class Ie {
          constructor(se, q, Ee) {
            (this.http = se), (this.recipeService = q), (this.authService = Ee);
          }
          storeRecipe() {
            const se = this.recipeService.getRecipes();
            this.http
              .put(
                "https://ng-course-recipe-book-d37b1-default-rtdb.firebaseio.com/recipes.json",
                se
              )
              .subscribe((q) => {
                console.log(q);
              });
          }
          fetchRecipes() {
            return this.http
              .get(
                "https://ng-course-recipe-book-d37b1-default-rtdb.firebaseio.com/recipes.json"
              )
              .pipe(
                (0, d.U)((se) =>
                  se.map((q) => ({
                    ...q,
                    ingredients: q.ingredients ? q.ingredients : [],
                  }))
                ),
                (0, C.b)((se) => {
                  this.recipeService.setRecipes(se);
                })
              );
          }
        }
        return (
          (Ie.ɵfac = function (se) {
            return new (se || Ie)(k.LFG(H.eN), k.LFG(G.j), k.LFG(ye.e));
          }),
          (Ie.ɵprov = k.Yz7({
            token: Ie,
            factory: Ie.ɵfac,
            providedIn: "root",
          })),
          Ie
        );
      })();
    },
    6238: (Ge, ue, I) => {
      I.d(ue, { p: () => d });
      class d {
        constructor(k, H) {
          (this.name = k), (this.amount = H);
        }
      }
    },
    4466: (Ge, ue, I) => {
      I.d(ue, { m: () => k });
      var d = I(6895),
        C = I(8256);
      let k = (() => {
        class H {}
        return (
          (H.ɵfac = function (ye) {
            return new (ye || H)();
          }),
          (H.ɵmod = C.oAB({ type: H })),
          (H.ɵinj = C.cJS({ imports: [d.ez, d.ez] })),
          H
        );
      })();
    },
    2457: (Ge, ue, I) => {
      I.d(ue, { _: () => H });
      var d = I(6238),
        C = I(7579),
        k = I(8256);
      let H = (() => {
        class G {
          constructor() {
            (this.startedEditing = new C.x()),
              (this.ingredientChanged = new C.x()),
              (this.ingredients = [
                new d.p("Apples", 5),
                new d.p("Tomatoes", 10),
              ]);
          }
          getIngredients() {
            return this.ingredients.slice();
          }
          getIngredient(Q) {
            return this.ingredients[Q];
          }
          addIngredient(Q) {
            this.ingredients.push(Q),
              this.ingredientChanged.next(this.ingredients.slice());
          }
          addIngredients(Q) {
            this.ingredients.push(...Q),
              this.ingredientChanged.next(this.ingredients.slice());
          }
          updateIngredient(Q, Ie) {
            (this.ingredients[Q] = Ie),
              this.ingredientChanged.next(this.ingredients.slice());
          }
          deleteIngredient(Q) {
            this.ingredients.splice(Q, 1),
              this.ingredientChanged.next(this.ingredients.slice());
          }
        }
        return (
          (G.ɵfac = function (Q) {
            return new (Q || G)();
          }),
          (G.ɵprov = k.Yz7({ token: G, factory: G.ɵfac, providedIn: "root" })),
          G
        );
      })();
    },
    2340: (Ge, ue, I) => {
      I.d(ue, { N: () => d });
      const d = {
        production: !0,
        fireBaseKey: "AIzaSyCPLo1CjcTrx2q4vIpeh916EU1FBfhWCZA",
      };
    },
    2230: (Ge, ue, I) => {
      var d = I(1481),
        C = I(8256),
        k = I(529),
        H = I(1196);
      const G = [
        { path: "", redirectTo: "/recipes", pathMatch: "full" },
        {
          path: "recipes",
          loadChildren: () =>
            I.e(14)
              .then(I.bind(I, 14))
              .then((B) => B.RecipesModule),
        },
      ];
      let ye = (() => {
        class B {}
        return (
          (B.ɵfac = function (W) {
            return new (W || B)();
          }),
          (B.ɵmod = C.oAB({ type: B })),
          (B.ɵinj = C.cJS({ imports: [H.Bz.forRoot(G), H.Bz] })),
          B
        );
      })();
      var Q = I(384),
        Ie = I(3649),
        ve = I(6895);
      function se(B, ge) {
        1 & B && (C.TgZ(0, "li", 7)(1, "a", 8), C._uU(2, "Recipes"), C.qZA()()),
          2 & B && (C.xp6(1), C.Q6J("routerLink", "/recipes"));
      }
      function q(B, ge) {
        1 & B &&
          (C.TgZ(0, "li", 7)(1, "a", 8), C._uU(2, "Authenticate"), C.qZA()()),
          2 & B && (C.xp6(1), C.Q6J("routerLink", "/auth"));
      }
      function Ee(B, ge) {
        if (1 & B) {
          const W = C.EpF();
          C.TgZ(0, "li")(1, "a", 12),
            C.NdJ("click", function () {
              C.CHM(W);
              const ze = C.oxw();
              return C.KtG(ze.onLogOut());
            }),
            C._uU(2, "Log Out"),
            C.qZA()();
        }
      }
      function Te(B, ge) {
        if (1 & B) {
          const W = C.EpF();
          C.TgZ(0, "li", 13)(1, "a", 14),
            C._uU(2, "Manage"),
            C.qZA(),
            C.TgZ(3, "ul", 15)(4, "li")(5, "a", 16),
            C.NdJ("click", function () {
              C.CHM(W);
              const ze = C.oxw();
              return C.KtG(ze.onSaveData());
            }),
            C._uU(6, "Save Data"),
            C.qZA()(),
            C.TgZ(7, "li")(8, "a", 16),
            C.NdJ("click", function () {
              C.CHM(W);
              const ze = C.oxw();
              return C.KtG(ze.onFetchData());
            }),
            C._uU(9, "Fetch Data"),
            C.qZA()()()();
        }
      }
      let X = (() => {
          class B {
            constructor(W, he) {
              (this.datastorage = W),
                (this.authService = he),
                (this.isAuthenticated = !1);
            }
            ngOnInit() {
              this.userSub = this.authService.user.subscribe((W) => {
                this.isAuthenticated = !!W;
              });
            }
            onSaveData() {
              this.datastorage.storeRecipe();
            }
            onFetchData() {
              this.datastorage.fetchRecipes().subscribe();
            }
            onLogOut() {
              this.authService.logout();
            }
            ngOnDestroy() {
              this.userSub.unsubscribe();
            }
          }
          return (
            (B.ɵfac = function (W) {
              return new (W || B)(C.Y36(Ie.Z), C.Y36(Q.e));
            }),
            (B.ɵcmp = C.Xpm({
              type: B,
              selectors: [["app-header"]],
              decls: 15,
              vars: 5,
              consts: [
                [1, "navbar", "navbar-expand-lg"],
                [1, "container-fluid"],
                [1, "navbar-header"],
                ["href", "#", 1, "navbar-brand"],
                ["id", "navbarNavAltMarkup", 1, "collapse", "navbar-collapse"],
                [1, "nav", "navbar-nav"],
                ["routerLinkActive", "active", 4, "ngIf"],
                ["routerLinkActive", "active"],
                [1, "nav-link", 3, "routerLink"],
                [1, "nav", "navbar-nav", "ms-auto"],
                [4, "ngIf"],
                ["appDropdown", "", 4, "ngIf"],
                [1, "nav-link", "active", 2, "cursor", "pointer", 3, "click"],
                ["appDropdown", ""],
                [
                  "role",
                  "button",
                  "id",
                  "dropdownMenuLink",
                  "data-bs-toggle",
                  "dropdown",
                  "aria-expanded",
                  "false",
                  1,
                  "nav-link",
                  "active",
                  "dropdown-toggle",
                  2,
                  "cursor",
                  "pointer",
                ],
                [
                  "aria-labelledby",
                  "dropdownMenuLink",
                  1,
                  "dropdown-menu",
                  "dropdown-menu-end",
                  "dropdown-menu-lg-start",
                ],
                [1, "dropdown-item", 2, "cursor", "pointer", 3, "click"],
              ],
              template: function (W, he) {
                1 & W &&
                  (C.TgZ(0, "nav", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3),
                  C._uU(4, "Recipe Book"),
                  C.qZA()(),
                  C.TgZ(5, "div", 4)(6, "ul", 5),
                  C.YNc(7, se, 3, 1, "li", 6),
                  C.YNc(8, q, 3, 1, "li", 6),
                  C.TgZ(9, "li", 7)(10, "a", 8),
                  C._uU(11, "Shopping List"),
                  C.qZA()()(),
                  C.TgZ(12, "ul", 9),
                  C.YNc(13, Ee, 3, 0, "li", 10),
                  C.YNc(14, Te, 10, 0, "li", 11),
                  C.qZA()()()()),
                  2 & W &&
                    (C.xp6(7),
                    C.Q6J("ngIf", he.isAuthenticated),
                    C.xp6(1),
                    C.Q6J("ngIf", !he.isAuthenticated),
                    C.xp6(2),
                    C.Q6J("routerLink", "/shopping-list"),
                    C.xp6(3),
                    C.Q6J("ngIf", he.isAuthenticated),
                    C.xp6(1),
                    C.Q6J("ngIf", he.isAuthenticated));
              },
              dependencies: [ve.O5, H.yS, H.Od],
            })),
            B
          );
        })(),
        Me = (() => {
          class B {
            constructor(W) {
              this.authService = W;
            }
            ngOnInit() {
              this.authService.autoLogin();
            }
          }
          return (
            (B.ɵfac = function (W) {
              return new (W || B)(C.Y36(Q.e));
            }),
            (B.ɵcmp = C.Xpm({
              type: B,
              selectors: [["app-root"]],
              decls: 5,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "row"],
                [1, "col-md-12"],
              ],
              template: function (W, he) {
                1 & W &&
                  (C._UZ(0, "app-header"),
                  C.TgZ(1, "div", 0)(2, "div", 1)(3, "div", 2),
                  C._UZ(4, "router-outlet"),
                  C.qZA()()());
              },
              dependencies: [H.lC, X],
            })),
            B
          );
        })();
      var Ne = I(5698),
        Qe = I(4004),
        Ke = I(8421),
        Et = I(4482),
        Re = I(5403);
      function Ae(B, ge) {
        return ge
          ? (W) =>
              W.pipe(
                Ae((he, ze) =>
                  (0, Ke.Xf)(B(he, ze)).pipe(
                    (0, Qe.U)((pt, _t) => ge(he, pt, ze, _t))
                  )
                )
              )
          : (0, Et.e)((W, he) => {
              let ze = 0,
                pt = null,
                _t = !1;
              W.subscribe(
                (0, Re.x)(
                  he,
                  (gt) => {
                    pt ||
                      ((pt = (0, Re.x)(he, void 0, () => {
                        (pt = null), _t && he.complete();
                      })),
                      (0, Ke.Xf)(B(gt, ze++)).subscribe(pt));
                  },
                  () => {
                    (_t = !0), !pt && he.complete();
                  }
                )
              );
            });
      }
      let we = (() => {
        class B {
          constructor(W) {
            this.authService = W;
          }
          intercept(W, he) {
            return this.authService.user.pipe(
              (0, Ne.q)(1),
              Ae((ze) => {
                if (!ze) return he.handle(W);
                const pt = W.clone({
                  params: new k.LE().set("auth", ze.token),
                });
                return he.handle(pt);
              })
            );
          }
        }
        return (
          (B.ɵfac = function (W) {
            return new (W || B)(C.LFG(Q.e));
          }),
          (B.ɵprov = C.Yz7({ token: B, factory: B.ɵfac })),
          B
        );
      })();
      var fe = I(2457),
        ot = I(6238),
        K = I(433);
      const ae = ["f"];
      function xe(B, ge) {
        if (1 & B) {
          const W = C.EpF();
          C.TgZ(0, "button", 14),
            C.NdJ("click", function () {
              C.CHM(W);
              const ze = C.oxw();
              return C.KtG(ze.onDelete());
            }),
            C._uU(1, "Delete"),
            C.qZA();
        }
      }
      let Be = (() => {
        class B {
          constructor(W) {
            (this.slService = W), (this.editMode = !1);
          }
          ngOnInit() {
            this.subscription = this.slService.startedEditing.subscribe((W) => {
              (this.editMode = !0),
                (this.editedItemIndex = W),
                (this.editedItem = this.slService.getIngredient(W)),
                this.slForm.setValue({
                  name: this.editedItem.name,
                  amount: this.editedItem.amount,
                });
            });
          }
          onSubmit(W) {
            const he = W.value,
              ze = new ot.p(he.name, he.amount);
            this.editMode
              ? this.slService.updateIngredient(this.editedItemIndex, ze)
              : this.slService.addIngredient(ze),
              (this.editMode = !1),
              this.slForm.reset();
          }
          onClear() {
            this.slForm.reset(), (this.editMode = !1);
          }
          onDelete() {
            this.slService.deleteIngredient(this.editedItemIndex),
              this.onClear();
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }
        return (
          (B.ɵfac = function (W) {
            return new (W || B)(C.Y36(fe._));
          }),
          (B.ɵcmp = C.Xpm({
            type: B,
            selectors: [["app-shopping-edit"]],
            viewQuery: function (W, he) {
              if ((1 & W && C.Gf(ae, 5), 2 & W)) {
                let ze;
                C.iGM((ze = C.CRH())) && (he.slForm = ze.first);
              }
            },
            decls: 20,
            vars: 3,
            consts: [
              [1, "row"],
              [1, "col-xs-12"],
              [3, "ngSubmit"],
              ["f", "ngForm"],
              [1, "col-sm-5", "form-group"],
              ["for", "name"],
              [
                "type",
                "text",
                "id",
                "name",
                "name",
                "name",
                "ngModel",
                "",
                "required",
                "",
                1,
                "form-control",
              ],
              [1, "col-sm-2", "form-group"],
              ["for", "amount"],
              [
                "type",
                "number",
                "id",
                "amount",
                "name",
                "amount",
                "ngModel",
                "",
                "required",
                "",
                "pattern",
                "^[1-9]+[0-9]*$",
                1,
                "form-control",
              ],
              [1, "row", "mt-3"],
              [
                "type",
                "submit",
                1,
                "btn",
                "btn-success",
                "me-2",
                3,
                "disabled",
              ],
              [
                "class",
                "btn btn-danger me-2",
                "type",
                "button",
                3,
                "click",
                4,
                "ngIf",
              ],
              ["type", "button", 1, "btn", "btn-primary", "me-2", 3, "click"],
              ["type", "button", 1, "btn", "btn-danger", "me-2", 3, "click"],
            ],
            template: function (W, he) {
              if (1 & W) {
                const ze = C.EpF();
                C.TgZ(0, "div", 0)(1, "div", 1)(2, "form", 2, 3),
                  C.NdJ("ngSubmit", function () {
                    C.CHM(ze);
                    const _t = C.MAs(3);
                    return C.KtG(he.onSubmit(_t));
                  }),
                  C.TgZ(4, "div", 0)(5, "div", 4)(6, "label", 5),
                  C._uU(7, "Name"),
                  C.qZA(),
                  C._UZ(8, "input", 6),
                  C.qZA(),
                  C.TgZ(9, "div", 7)(10, "label", 8),
                  C._uU(11, "Amount"),
                  C.qZA(),
                  C._UZ(12, "input", 9),
                  C.qZA()(),
                  C.TgZ(13, "div", 10)(14, "div", 1)(15, "button", 11),
                  C._uU(16),
                  C.qZA(),
                  C.YNc(17, xe, 2, 0, "button", 12),
                  C.TgZ(18, "button", 13),
                  C.NdJ("click", function () {
                    return he.onClear();
                  }),
                  C._uU(19, "Clear"),
                  C.qZA()()()()()();
              }
              if (2 & W) {
                const ze = C.MAs(3);
                C.xp6(15),
                  C.Q6J("disabled", !ze.valid),
                  C.xp6(1),
                  C.Oqu(he.editMode ? "Update" : "Add"),
                  C.xp6(1),
                  C.Q6J("ngIf", he.editMode);
              }
            },
            dependencies: [
              ve.O5,
              K._Y,
              K.Fj,
              K.wV,
              K.JJ,
              K.JL,
              K.Q7,
              K.c5,
              K.On,
              K.F,
            ],
          })),
          B
        );
      })();
      function Le(B, ge) {
        if (1 & B) {
          const W = C.EpF();
          C.TgZ(0, "a", 4),
            C.NdJ("click", function () {
              const pt = C.CHM(W).index,
                _t = C.oxw();
              return C.KtG(_t.onEditItem(pt));
            }),
            C._uU(1),
            C.qZA();
        }
        if (2 & B) {
          const W = ge.$implicit;
          C.xp6(1), C.AsE(" ", W.name, " (", W.amount, ")");
        }
      }
      let nt = (() => {
        class B {
          constructor(W) {
            this.slService = W;
          }
          ngOnInit() {
            (this.ingredients = this.slService.getIngredients()),
              (this.subscription = this.slService.ingredientChanged.subscribe(
                (W) => {
                  this.ingredients = W;
                }
              ));
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          onEditItem(W) {
            this.slService.startedEditing.next(W);
          }
        }
        return (
          (B.ɵfac = function (W) {
            return new (W || B)(C.Y36(fe._));
          }),
          (B.ɵcmp = C.Xpm({
            type: B,
            selectors: [["app-shopping-list"]],
            decls: 6,
            vars: 1,
            consts: [
              [1, "row"],
              [1, "col-xs-10"],
              [1, "list-group"],
              [
                "class",
                "list-group-item",
                "style",
                "cursor: pointer",
                3,
                "click",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "list-group-item", 2, "cursor", "pointer", 3, "click"],
            ],
            template: function (W, he) {
              1 & W &&
                (C.TgZ(0, "div", 0)(1, "div", 1),
                C._UZ(2, "app-shopping-edit")(3, "hr"),
                C.TgZ(4, "ul", 2),
                C.YNc(5, Le, 2, 2, "a", 3),
                C.qZA()()()),
                2 & W && (C.xp6(5), C.Q6J("ngForOf", he.ingredients));
            },
            dependencies: [ve.sg, Be],
          })),
          B
        );
      })();
      var be = I(4466);
      let lt = (() => {
          class B {}
          return (
            (B.ɵfac = function (W) {
              return new (W || B)();
            }),
            (B.ɵmod = C.oAB({ type: B })),
            (B.ɵinj = C.cJS({
              imports: [
                be.m,
                K.u5,
                H.Bz.forChild([{ path: "shopping-list", component: nt }]),
              ],
            })),
            B
          );
        })(),
        Z = (() => {
          class B {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (B.ɵfac = function (W) {
              return new (W || B)();
            }),
            (B.ɵcmp = C.Xpm({
              type: B,
              selectors: [["app-loading-spinner"]],
              decls: 5,
              vars: 0,
              consts: [[1, "lds-ring"]],
              template: function (W, he) {
                1 & W &&
                  (C.TgZ(0, "div", 0),
                  C._UZ(1, "div")(2, "div")(3, "div")(4, "div"),
                  C.qZA());
              },
              styles: [
                ".lds-ring[_ngcontent-%COMP%]{display:inline-block;position:relative;width:80px;height:80px}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid #0619e7;border-radius:50%;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:#778dfc transparent transparent transparent}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1){animation-delay:-.45s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){animation-delay:-.3s}.lds-ring[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}",
              ],
            })),
            B
          );
        })(),
        ee = (() => {
          class B {
            constructor() {
              this.close = new C.vpe();
            }
            ngOnInit() {}
            onClose() {
              this.close.emit();
            }
          }
          return (
            (B.ɵfac = function (W) {
              return new (W || B)();
            }),
            (B.ɵcmp = C.Xpm({
              type: B,
              selectors: [["app-alert"]],
              inputs: { message: "message" },
              outputs: { close: "close" },
              decls: 7,
              vars: 1,
              consts: [
                [1, "backdrop", 3, "click"],
                [1, "alert-box"],
                [1, "alert-box-action"],
                [1, "btn", "btn-primary", 3, "click"],
              ],
              template: function (W, he) {
                1 & W &&
                  (C.TgZ(0, "div", 0),
                  C.NdJ("click", function () {
                    return he.onClose();
                  }),
                  C.qZA(),
                  C.TgZ(1, "div", 1)(2, "p"),
                  C._uU(3),
                  C.qZA(),
                  C.TgZ(4, "div", 2)(5, "button", 3),
                  C.NdJ("click", function () {
                    return he.onClose();
                  }),
                  C._uU(6, "Close"),
                  C.qZA()()()),
                  2 & W && (C.xp6(3), C.Oqu(he.message));
              },
              styles: [
                ".backdrop[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.75);z-index:50}.alert-box[_ngcontent-%COMP%]{position:fixed;top:30vh;left:20vw;width:60vw;padding:16px;z-index:100;background:white;box-shadow:0,2px,8px,#00000042}.alert-box-action[_ngcontent-%COMP%]{text-align:right}",
              ],
            })),
            B
          );
        })();
      function te(B, ge) {
        if (1 & B) {
          const W = C.EpF();
          C.TgZ(0, "app-alert", 5),
            C.NdJ("close", function () {
              C.CHM(W);
              const ze = C.oxw();
              return C.KtG(ze.onHandleError());
            }),
            C.qZA();
        }
        if (2 & B) {
          const W = C.oxw();
          C.Q6J("message", W.error);
        }
      }
      function de(B, ge) {
        1 & B && (C.TgZ(0, "div", 6), C._UZ(1, "app-loading-spinner"), C.qZA());
      }
      function me(B, ge) {
        if (1 & B) {
          const W = C.EpF();
          C.TgZ(0, "form", 7, 8),
            C.NdJ("ngSubmit", function () {
              C.CHM(W);
              const ze = C.MAs(1),
                pt = C.oxw();
              return C.KtG(pt.onSubmit(ze));
            }),
            C.TgZ(2, "div", 9)(3, "label", 10),
            C._uU(4, "E-Mail"),
            C.qZA(),
            C._UZ(5, "input", 11),
            C.qZA(),
            C.TgZ(6, "div", 9)(7, "label", 12),
            C._uU(8, "Password"),
            C.qZA(),
            C._UZ(9, "input", 13),
            C.qZA(),
            C.TgZ(10, "div")(11, "button", 14),
            C._uU(12),
            C.qZA(),
            C._uU(13, " | "),
            C.TgZ(14, "button", 15),
            C.NdJ("click", function () {
              C.CHM(W);
              const ze = C.oxw();
              return C.KtG(ze.onSwitchMode());
            }),
            C._uU(15),
            C.qZA()()();
        }
        if (2 & B) {
          const W = C.MAs(1),
            he = C.oxw();
          C.xp6(11),
            C.Q6J("disabled", !W.valid),
            C.xp6(1),
            C.hij(" ", he.isLoginMode ? "Login" : "Sign Up", " "),
            C.xp6(3),
            C.hij(" Switch to ", he.isLoginMode ? "Sign Up" : "Login", " ");
        }
      }
      let Ce = (() => {
          class B {
            constructor(W, he) {
              (this.authService = W),
                (this.router = he),
                (this.isLoginMode = !0),
                (this.isLoading = !1),
                (this.error = null);
            }
            onSwitchMode() {
              this.isLoginMode = !this.isLoginMode;
            }
            onSubmit(W) {
              if (!W.valid) return;
              const he = W.value.email,
                ze = W.value.password;
              let pt;
              (this.isLoading = !0),
                (pt = this.isLoginMode
                  ? this.authService.login(he, ze)
                  : this.authService.signUp(he, ze)),
                pt.subscribe(
                  (_t) => {
                    console.log(_t),
                      (this.isLoading = !1),
                      this.router.navigate(["/recipes"]);
                  },
                  (_t) => {
                    console.log(_t), (this.error = _t), (this.isLoading = !1);
                  }
                ),
                W.reset();
            }
            onHandleError() {
              this.error = null;
            }
          }
          return (
            (B.ɵfac = function (W) {
              return new (W || B)(C.Y36(Q.e), C.Y36(H.F0));
            }),
            (B.ɵcmp = C.Xpm({
              type: B,
              selectors: [["app-auth"]],
              decls: 5,
              vars: 3,
              consts: [
                [1, "row"],
                [1, "col-xs-12", "col-md-6", "col-md-offset-3"],
                [3, "message", "close", 4, "ngIf"],
                ["style", "text-align: center", 4, "ngIf"],
                [3, "ngSubmit", 4, "ngIf"],
                [3, "message", "close"],
                [2, "text-align", "center"],
                [3, "ngSubmit"],
                ["authForm", "ngForm"],
                [1, "form-group"],
                ["for", "email"],
                [
                  "type",
                  "email",
                  "id",
                  "email",
                  "ngModel",
                  "",
                  "name",
                  "email",
                  "required",
                  "",
                  "email",
                  "",
                  1,
                  "form-control",
                ],
                ["for", "password"],
                [
                  "type",
                  "password",
                  "id",
                  "password",
                  "ngModel",
                  "",
                  "name",
                  "password",
                  "required",
                  "",
                  "minlength",
                  "6",
                  1,
                  "form-control",
                ],
                ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"],
                ["type", "button", 1, "btn", "btn-primary", 3, "click"],
              ],
              template: function (W, he) {
                1 & W &&
                  (C.TgZ(0, "div", 0)(1, "div", 1),
                  C.YNc(2, te, 1, 1, "app-alert", 2),
                  C.YNc(3, de, 2, 0, "div", 3),
                  C.YNc(4, me, 16, 3, "form", 4),
                  C.qZA()()),
                  2 & W &&
                    (C.xp6(2),
                    C.Q6J("ngIf", he.error),
                    C.xp6(1),
                    C.Q6J("ngIf", he.isLoading),
                    C.xp6(1),
                    C.Q6J("ngIf", !he.isLoading));
              },
              dependencies: [
                K._Y,
                K.Fj,
                K.JJ,
                K.JL,
                K.Q7,
                K.wO,
                K.on,
                K.On,
                K.F,
                ve.O5,
                Z,
                ee,
              ],
              encapsulation: 2,
            })),
            B
          );
        })(),
        Je = (() => {
          class B {}
          return (
            (B.ɵfac = function (W) {
              return new (W || B)();
            }),
            (B.ɵmod = C.oAB({ type: B })),
            (B.ɵinj = C.cJS({
              imports: [
                K.u5,
                ve.ez,
                H.Bz.forChild([{ path: "auth", component: Ce }]),
                be.m,
              ],
            })),
            B
          );
        })(),
        ct = (() => {
          class B {}
          return (
            (B.ɵfac = function (W) {
              return new (W || B)();
            }),
            (B.ɵmod = C.oAB({ type: B, bootstrap: [Me] })),
            (B.ɵinj = C.cJS({
              providers: [{ provide: k.TP, useClass: we, multi: !0 }],
              imports: [d.b2, k.JF, ye, lt, Je],
            })),
            B
          );
        })();
      I(2340).N.production && (0, C.G48)(),
        d
          .q6()
          .bootstrapModule(ct)
          .catch((B) => console.error(B));
    },
    1135: (Ge, ue, I) => {
      I.d(ue, { X: () => C });
      var d = I(7579);
      class C extends d.x {
        constructor(H) {
          super(), (this._value = H);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(H) {
          const G = super._subscribe(H);
          return !G.closed && H.next(this._value), G;
        }
        getValue() {
          const { hasError: H, thrownError: G, _value: ye } = this;
          if (H) throw G;
          return this._throwIfClosed(), ye;
        }
        next(H) {
          super.next((this._value = H));
        }
      }
    },
    9751: (Ge, ue, I) => {
      I.d(ue, { y: () => Ie });
      var d = I(2961),
        C = I(727),
        k = I(8822),
        H = I(9635),
        G = I(2416),
        ye = I(576),
        Q = I(2806);
      let Ie = (() => {
        class Ee {
          constructor(X) {
            X && (this._subscribe = X);
          }
          lift(X) {
            const Me = new Ee();
            return (Me.source = this), (Me.operator = X), Me;
          }
          subscribe(X, Me, Ne) {
            const Qe = (function q(Ee) {
              return (
                (Ee && Ee instanceof d.Lv) ||
                ((function se(Ee) {
                  return (
                    Ee &&
                    (0, ye.m)(Ee.next) &&
                    (0, ye.m)(Ee.error) &&
                    (0, ye.m)(Ee.complete)
                  );
                })(Ee) &&
                  (0, C.Nn)(Ee))
              );
            })(X)
              ? X
              : new d.Hp(X, Me, Ne);
            return (
              (0, Q.x)(() => {
                const { operator: Ke, source: Et } = this;
                Qe.add(
                  Ke
                    ? Ke.call(Qe, Et)
                    : Et
                    ? this._subscribe(Qe)
                    : this._trySubscribe(Qe)
                );
              }),
              Qe
            );
          }
          _trySubscribe(X) {
            try {
              return this._subscribe(X);
            } catch (Me) {
              X.error(Me);
            }
          }
          forEach(X, Me) {
            return new (Me = ve(Me))((Ne, Qe) => {
              const Ke = new d.Hp({
                next: (Et) => {
                  try {
                    X(Et);
                  } catch (Re) {
                    Qe(Re), Ke.unsubscribe();
                  }
                },
                error: Qe,
                complete: Ne,
              });
              this.subscribe(Ke);
            });
          }
          _subscribe(X) {
            var Me;
            return null === (Me = this.source) || void 0 === Me
              ? void 0
              : Me.subscribe(X);
          }
          [k.L]() {
            return this;
          }
          pipe(...X) {
            return (0, H.U)(X)(this);
          }
          toPromise(X) {
            return new (X = ve(X))((Me, Ne) => {
              let Qe;
              this.subscribe(
                (Ke) => (Qe = Ke),
                (Ke) => Ne(Ke),
                () => Me(Qe)
              );
            });
          }
        }
        return (Ee.create = (Te) => new Ee(Te)), Ee;
      })();
      function ve(Ee) {
        var Te;
        return null !== (Te = Ee ?? G.v.Promise) && void 0 !== Te
          ? Te
          : Promise;
      }
    },
    7579: (Ge, ue, I) => {
      I.d(ue, { x: () => Q });
      var d = I(9751),
        C = I(727);
      const H = (0, I(3888).d)(
        (ve) =>
          function () {
            ve(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      var G = I(8737),
        ye = I(2806);
      let Q = (() => {
        class ve extends d.y {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(q) {
            const Ee = new Ie(this, this);
            return (Ee.operator = q), Ee;
          }
          _throwIfClosed() {
            if (this.closed) throw new H();
          }
          next(q) {
            (0, ye.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const Ee of this.currentObservers) Ee.next(q);
              }
            });
          }
          error(q) {
            (0, ye.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = q);
                const { observers: Ee } = this;
                for (; Ee.length; ) Ee.shift().error(q);
              }
            });
          }
          complete() {
            (0, ye.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: q } = this;
                for (; q.length; ) q.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var q;
            return (
              (null === (q = this.observers) || void 0 === q
                ? void 0
                : q.length) > 0
            );
          }
          _trySubscribe(q) {
            return this._throwIfClosed(), super._trySubscribe(q);
          }
          _subscribe(q) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(q),
              this._innerSubscribe(q)
            );
          }
          _innerSubscribe(q) {
            const { hasError: Ee, isStopped: Te, observers: X } = this;
            return Ee || Te
              ? C.Lc
              : ((this.currentObservers = null),
                X.push(q),
                new C.w0(() => {
                  (this.currentObservers = null), (0, G.P)(X, q);
                }));
          }
          _checkFinalizedStatuses(q) {
            const { hasError: Ee, thrownError: Te, isStopped: X } = this;
            Ee ? q.error(Te) : X && q.complete();
          }
          asObservable() {
            const q = new d.y();
            return (q.source = this), q;
          }
        }
        return (ve.create = (se, q) => new Ie(se, q)), ve;
      })();
      class Ie extends Q {
        constructor(se, q) {
          super(), (this.destination = se), (this.source = q);
        }
        next(se) {
          var q, Ee;
          null ===
            (Ee =
              null === (q = this.destination) || void 0 === q
                ? void 0
                : q.next) ||
            void 0 === Ee ||
            Ee.call(q, se);
        }
        error(se) {
          var q, Ee;
          null ===
            (Ee =
              null === (q = this.destination) || void 0 === q
                ? void 0
                : q.error) ||
            void 0 === Ee ||
            Ee.call(q, se);
        }
        complete() {
          var se, q;
          null ===
            (q =
              null === (se = this.destination) || void 0 === se
                ? void 0
                : se.complete) ||
            void 0 === q ||
            q.call(se);
        }
        _subscribe(se) {
          var q, Ee;
          return null !==
            (Ee =
              null === (q = this.source) || void 0 === q
                ? void 0
                : q.subscribe(se)) && void 0 !== Ee
            ? Ee
            : C.Lc;
        }
      }
    },
    2961: (Ge, ue, I) => {
      I.d(ue, { Hp: () => Ne, Lv: () => Ee });
      var d = I(576),
        C = I(727),
        k = I(2416),
        H = I(7849);
      function G() {}
      const ye = ve("C", void 0, void 0);
      function ve(Ae, we, fe) {
        return { kind: Ae, value: we, error: fe };
      }
      var se = I(3410),
        q = I(2806);
      class Ee extends C.w0 {
        constructor(we) {
          super(),
            (this.isStopped = !1),
            we
              ? ((this.destination = we), (0, C.Nn)(we) && we.add(this))
              : (this.destination = Re);
        }
        static create(we, fe, ot) {
          return new Ne(we, fe, ot);
        }
        next(we) {
          this.isStopped
            ? Et(
                (function Ie(Ae) {
                  return ve("N", Ae, void 0);
                })(we),
                this
              )
            : this._next(we);
        }
        error(we) {
          this.isStopped
            ? Et(
                (function Q(Ae) {
                  return ve("E", void 0, Ae);
                })(we),
                this
              )
            : ((this.isStopped = !0), this._error(we));
        }
        complete() {
          this.isStopped
            ? Et(ye, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(we) {
          this.destination.next(we);
        }
        _error(we) {
          try {
            this.destination.error(we);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Te = Function.prototype.bind;
      function X(Ae, we) {
        return Te.call(Ae, we);
      }
      class Me {
        constructor(we) {
          this.partialObserver = we;
        }
        next(we) {
          const { partialObserver: fe } = this;
          if (fe.next)
            try {
              fe.next(we);
            } catch (ot) {
              Qe(ot);
            }
        }
        error(we) {
          const { partialObserver: fe } = this;
          if (fe.error)
            try {
              fe.error(we);
            } catch (ot) {
              Qe(ot);
            }
          else Qe(we);
        }
        complete() {
          const { partialObserver: we } = this;
          if (we.complete)
            try {
              we.complete();
            } catch (fe) {
              Qe(fe);
            }
        }
      }
      class Ne extends Ee {
        constructor(we, fe, ot) {
          let K;
          if ((super(), (0, d.m)(we) || !we))
            K = {
              next: we ?? void 0,
              error: fe ?? void 0,
              complete: ot ?? void 0,
            };
          else {
            let ae;
            this && k.v.useDeprecatedNextContext
              ? ((ae = Object.create(we)),
                (ae.unsubscribe = () => this.unsubscribe()),
                (K = {
                  next: we.next && X(we.next, ae),
                  error: we.error && X(we.error, ae),
                  complete: we.complete && X(we.complete, ae),
                }))
              : (K = we);
          }
          this.destination = new Me(K);
        }
      }
      function Qe(Ae) {
        k.v.useDeprecatedSynchronousErrorHandling ? (0, q.O)(Ae) : (0, H.h)(Ae);
      }
      function Et(Ae, we) {
        const { onStoppedNotification: fe } = k.v;
        fe && se.z.setTimeout(() => fe(Ae, we));
      }
      const Re = {
        closed: !0,
        next: G,
        error: function Ke(Ae) {
          throw Ae;
        },
        complete: G,
      };
    },
    727: (Ge, ue, I) => {
      I.d(ue, { Lc: () => ye, w0: () => G, Nn: () => Q });
      var d = I(576);
      const k = (0, I(3888).d)(
        (ve) =>
          function (q) {
            ve(this),
              (this.message = q
                ? `${q.length} errors occurred during unsubscription:\n${q
                    .map((Ee, Te) => `${Te + 1}) ${Ee.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = q);
          }
      );
      var H = I(8737);
      class G {
        constructor(se) {
          (this.initialTeardown = se),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let se;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: q } = this;
            if (q)
              if (((this._parentage = null), Array.isArray(q)))
                for (const X of q) X.remove(this);
              else q.remove(this);
            const { initialTeardown: Ee } = this;
            if ((0, d.m)(Ee))
              try {
                Ee();
              } catch (X) {
                se = X instanceof k ? X.errors : [X];
              }
            const { _finalizers: Te } = this;
            if (Te) {
              this._finalizers = null;
              for (const X of Te)
                try {
                  Ie(X);
                } catch (Me) {
                  (se = se ?? []),
                    Me instanceof k
                      ? (se = [...se, ...Me.errors])
                      : se.push(Me);
                }
            }
            if (se) throw new k(se);
          }
        }
        add(se) {
          var q;
          if (se && se !== this)
            if (this.closed) Ie(se);
            else {
              if (se instanceof G) {
                if (se.closed || se._hasParent(this)) return;
                se._addParent(this);
              }
              (this._finalizers =
                null !== (q = this._finalizers) && void 0 !== q ? q : []).push(
                se
              );
            }
        }
        _hasParent(se) {
          const { _parentage: q } = this;
          return q === se || (Array.isArray(q) && q.includes(se));
        }
        _addParent(se) {
          const { _parentage: q } = this;
          this._parentage = Array.isArray(q)
            ? (q.push(se), q)
            : q
            ? [q, se]
            : se;
        }
        _removeParent(se) {
          const { _parentage: q } = this;
          q === se
            ? (this._parentage = null)
            : Array.isArray(q) && (0, H.P)(q, se);
        }
        remove(se) {
          const { _finalizers: q } = this;
          q && (0, H.P)(q, se), se instanceof G && se._removeParent(this);
        }
      }
      G.EMPTY = (() => {
        const ve = new G();
        return (ve.closed = !0), ve;
      })();
      const ye = G.EMPTY;
      function Q(ve) {
        return (
          ve instanceof G ||
          (ve &&
            "closed" in ve &&
            (0, d.m)(ve.remove) &&
            (0, d.m)(ve.add) &&
            (0, d.m)(ve.unsubscribe))
        );
      }
      function Ie(ve) {
        (0, d.m)(ve) ? ve() : ve.unsubscribe();
      }
    },
    2416: (Ge, ue, I) => {
      I.d(ue, { v: () => d });
      const d = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1,
      };
    },
    515: (Ge, ue, I) => {
      I.d(ue, { E: () => C });
      const C = new (I(9751).y)((G) => G.complete());
    },
    2076: (Ge, ue, I) => {
      I.d(ue, { D: () => ot });
      var d = I(8421),
        C = I(9672),
        k = I(4482),
        H = I(5403);
      function G(K, ae = 0) {
        return (0, k.e)((xe, Be) => {
          xe.subscribe(
            (0, H.x)(
              Be,
              (Le) => (0, C.f)(Be, K, () => Be.next(Le), ae),
              () => (0, C.f)(Be, K, () => Be.complete(), ae),
              (Le) => (0, C.f)(Be, K, () => Be.error(Le), ae)
            )
          );
        });
      }
      function ye(K, ae = 0) {
        return (0, k.e)((xe, Be) => {
          Be.add(K.schedule(() => xe.subscribe(Be), ae));
        });
      }
      var ve = I(9751),
        q = I(2202),
        Ee = I(576);
      function X(K, ae) {
        if (!K) throw new Error("Iterable cannot be null");
        return new ve.y((xe) => {
          (0, C.f)(xe, ae, () => {
            const Be = K[Symbol.asyncIterator]();
            (0, C.f)(
              xe,
              ae,
              () => {
                Be.next().then((Le) => {
                  Le.done ? xe.complete() : xe.next(Le.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      var Me = I(3670),
        Ne = I(8239),
        Qe = I(1144),
        Ke = I(6495),
        Et = I(2206),
        Re = I(4532),
        Ae = I(3260);
      function ot(K, ae) {
        return ae
          ? (function fe(K, ae) {
              if (null != K) {
                if ((0, Me.c)(K))
                  return (function Q(K, ae) {
                    return (0, d.Xf)(K).pipe(ye(ae), G(ae));
                  })(K, ae);
                if ((0, Qe.z)(K))
                  return (function se(K, ae) {
                    return new ve.y((xe) => {
                      let Be = 0;
                      return ae.schedule(function () {
                        Be === K.length
                          ? xe.complete()
                          : (xe.next(K[Be++]), xe.closed || this.schedule());
                      });
                    });
                  })(K, ae);
                if ((0, Ne.t)(K))
                  return (function Ie(K, ae) {
                    return (0, d.Xf)(K).pipe(ye(ae), G(ae));
                  })(K, ae);
                if ((0, Et.D)(K)) return X(K, ae);
                if ((0, Ke.T)(K))
                  return (function Te(K, ae) {
                    return new ve.y((xe) => {
                      let Be;
                      return (
                        (0, C.f)(xe, ae, () => {
                          (Be = K[q.h]()),
                            (0, C.f)(
                              xe,
                              ae,
                              () => {
                                let Le, nt;
                                try {
                                  ({ value: Le, done: nt } = Be.next());
                                } catch (be) {
                                  return void xe.error(be);
                                }
                                nt ? xe.complete() : xe.next(Le);
                              },
                              0,
                              !0
                            );
                        }),
                        () => (0, Ee.m)(Be?.return) && Be.return()
                      );
                    });
                  })(K, ae);
                if ((0, Ae.L)(K))
                  return (function we(K, ae) {
                    return X((0, Ae.Q)(K), ae);
                  })(K, ae);
              }
              throw (0, Re.z)(K);
            })(K, ae)
          : (0, d.Xf)(K);
      }
    },
    8421: (Ge, ue, I) => {
      I.d(ue, { Xf: () => Te });
      var d = I(7582),
        C = I(1144),
        k = I(8239),
        H = I(9751),
        G = I(3670),
        ye = I(2206),
        Q = I(4532),
        Ie = I(6495),
        ve = I(3260),
        se = I(576),
        q = I(7849),
        Ee = I(8822);
      function Te(Ae) {
        if (Ae instanceof H.y) return Ae;
        if (null != Ae) {
          if ((0, G.c)(Ae))
            return (function X(Ae) {
              return new H.y((we) => {
                const fe = Ae[Ee.L]();
                if ((0, se.m)(fe.subscribe)) return fe.subscribe(we);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(Ae);
          if ((0, C.z)(Ae))
            return (function Me(Ae) {
              return new H.y((we) => {
                for (let fe = 0; fe < Ae.length && !we.closed; fe++)
                  we.next(Ae[fe]);
                we.complete();
              });
            })(Ae);
          if ((0, k.t)(Ae))
            return (function Ne(Ae) {
              return new H.y((we) => {
                Ae.then(
                  (fe) => {
                    we.closed || (we.next(fe), we.complete());
                  },
                  (fe) => we.error(fe)
                ).then(null, q.h);
              });
            })(Ae);
          if ((0, ye.D)(Ae)) return Ke(Ae);
          if ((0, Ie.T)(Ae))
            return (function Qe(Ae) {
              return new H.y((we) => {
                for (const fe of Ae) if ((we.next(fe), we.closed)) return;
                we.complete();
              });
            })(Ae);
          if ((0, ve.L)(Ae))
            return (function Et(Ae) {
              return Ke((0, ve.Q)(Ae));
            })(Ae);
        }
        throw (0, Q.z)(Ae);
      }
      function Ke(Ae) {
        return new H.y((we) => {
          (function Re(Ae, we) {
            var fe, ot, K, ae;
            return (0, d.mG)(this, void 0, void 0, function* () {
              try {
                for (fe = (0, d.KL)(Ae); !(ot = yield fe.next()).done; )
                  if ((we.next(ot.value), we.closed)) return;
              } catch (xe) {
                K = { error: xe };
              } finally {
                try {
                  ot && !ot.done && (ae = fe.return) && (yield ae.call(fe));
                } finally {
                  if (K) throw K.error;
                }
              }
              we.complete();
            });
          })(Ae, we).catch((fe) => we.error(fe));
        });
      }
    },
    9646: (Ge, ue, I) => {
      I.d(ue, { of: () => k });
      var d = I(7669),
        C = I(2076);
      function k(...H) {
        const G = (0, d.yG)(H);
        return (0, C.D)(H, G);
      }
    },
    2843: (Ge, ue, I) => {
      I.d(ue, { _: () => k });
      var d = I(9751),
        C = I(576);
      function k(H, G) {
        const ye = (0, C.m)(H) ? H : () => H,
          Q = (Ie) => Ie.error(ye());
        return new d.y(G ? (Ie) => G.schedule(Q, 0, Ie) : Q);
      }
    },
    5403: (Ge, ue, I) => {
      I.d(ue, { x: () => C });
      var d = I(2961);
      function C(H, G, ye, Q, Ie) {
        return new k(H, G, ye, Q, Ie);
      }
      class k extends d.Lv {
        constructor(G, ye, Q, Ie, ve, se) {
          super(G),
            (this.onFinalize = ve),
            (this.shouldUnsubscribe = se),
            (this._next = ye
              ? function (q) {
                  try {
                    ye(q);
                  } catch (Ee) {
                    G.error(Ee);
                  }
                }
              : super._next),
            (this._error = Ie
              ? function (q) {
                  try {
                    Ie(q);
                  } catch (Ee) {
                    G.error(Ee);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = Q
              ? function () {
                  try {
                    Q();
                  } catch (q) {
                    G.error(q);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var G;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: ye } = this;
            super.unsubscribe(),
              !ye &&
                (null === (G = this.onFinalize) ||
                  void 0 === G ||
                  G.call(this));
          }
        }
      }
    },
    262: (Ge, ue, I) => {
      I.d(ue, { K: () => H });
      var d = I(8421),
        C = I(5403),
        k = I(4482);
      function H(G) {
        return (0, k.e)((ye, Q) => {
          let se,
            Ie = null,
            ve = !1;
          (Ie = ye.subscribe(
            (0, C.x)(Q, void 0, void 0, (q) => {
              (se = (0, d.Xf)(G(q, H(G)(ye)))),
                Ie
                  ? (Ie.unsubscribe(), (Ie = null), se.subscribe(Q))
                  : (ve = !0);
            })
          )),
            ve && (Ie.unsubscribe(), (Ie = null), se.subscribe(Q));
        });
      }
    },
    4351: (Ge, ue, I) => {
      I.d(ue, { b: () => k });
      var d = I(5577),
        C = I(576);
      function k(H, G) {
        return (0, C.m)(G) ? (0, d.z)(H, G, 1) : (0, d.z)(H, 1);
      }
    },
    9300: (Ge, ue, I) => {
      I.d(ue, { h: () => k });
      var d = I(4482),
        C = I(5403);
      function k(H, G) {
        return (0, d.e)((ye, Q) => {
          let Ie = 0;
          ye.subscribe((0, C.x)(Q, (ve) => H.call(G, ve, Ie++) && Q.next(ve)));
        });
      }
    },
    4004: (Ge, ue, I) => {
      I.d(ue, { U: () => k });
      var d = I(4482),
        C = I(5403);
      function k(H, G) {
        return (0, d.e)((ye, Q) => {
          let Ie = 0;
          ye.subscribe(
            (0, C.x)(Q, (ve) => {
              Q.next(H.call(G, ve, Ie++));
            })
          );
        });
      }
    },
    8189: (Ge, ue, I) => {
      I.d(ue, { J: () => k });
      var d = I(5577),
        C = I(4671);
      function k(H = 1 / 0) {
        return (0, d.z)(C.y, H);
      }
    },
    5577: (Ge, ue, I) => {
      I.d(ue, { z: () => Ie });
      var d = I(4004),
        C = I(8421),
        k = I(4482),
        H = I(9672),
        G = I(5403),
        Q = I(576);
      function Ie(ve, se, q = 1 / 0) {
        return (0, Q.m)(se)
          ? Ie(
              (Ee, Te) =>
                (0, d.U)((X, Me) => se(Ee, X, Te, Me))((0, C.Xf)(ve(Ee, Te))),
              q
            )
          : ("number" == typeof se && (q = se),
            (0, k.e)((Ee, Te) =>
              (function ye(ve, se, q, Ee, Te, X, Me, Ne) {
                const Qe = [];
                let Ke = 0,
                  Et = 0,
                  Re = !1;
                const Ae = () => {
                    Re && !Qe.length && !Ke && se.complete();
                  },
                  we = (ot) => (Ke < Ee ? fe(ot) : Qe.push(ot)),
                  fe = (ot) => {
                    X && se.next(ot), Ke++;
                    let K = !1;
                    (0, C.Xf)(q(ot, Et++)).subscribe(
                      (0, G.x)(
                        se,
                        (ae) => {
                          Te?.(ae), X ? we(ae) : se.next(ae);
                        },
                        () => {
                          K = !0;
                        },
                        void 0,
                        () => {
                          if (K)
                            try {
                              for (Ke--; Qe.length && Ke < Ee; ) {
                                const ae = Qe.shift();
                                Me ? (0, H.f)(se, Me, () => fe(ae)) : fe(ae);
                              }
                              Ae();
                            } catch (ae) {
                              se.error(ae);
                            }
                        }
                      )
                    );
                  };
                return (
                  ve.subscribe(
                    (0, G.x)(se, we, () => {
                      (Re = !0), Ae();
                    })
                  ),
                  () => {
                    Ne?.();
                  }
                );
              })(Ee, Te, ve, q)
            ));
      }
    },
    5698: (Ge, ue, I) => {
      I.d(ue, { q: () => H });
      var d = I(515),
        C = I(4482),
        k = I(5403);
      function H(G) {
        return G <= 0
          ? () => d.E
          : (0, C.e)((ye, Q) => {
              let Ie = 0;
              ye.subscribe(
                (0, k.x)(Q, (ve) => {
                  ++Ie <= G && (Q.next(ve), G <= Ie && Q.complete());
                })
              );
            });
      }
    },
    8505: (Ge, ue, I) => {
      I.d(ue, { b: () => G });
      var d = I(576),
        C = I(4482),
        k = I(5403),
        H = I(4671);
      function G(ye, Q, Ie) {
        const ve =
          (0, d.m)(ye) || Q || Ie ? { next: ye, error: Q, complete: Ie } : ye;
        return ve
          ? (0, C.e)((se, q) => {
              var Ee;
              null === (Ee = ve.subscribe) || void 0 === Ee || Ee.call(ve);
              let Te = !0;
              se.subscribe(
                (0, k.x)(
                  q,
                  (X) => {
                    var Me;
                    null === (Me = ve.next) || void 0 === Me || Me.call(ve, X),
                      q.next(X);
                  },
                  () => {
                    var X;
                    (Te = !1),
                      null === (X = ve.complete) || void 0 === X || X.call(ve),
                      q.complete();
                  },
                  (X) => {
                    var Me;
                    (Te = !1),
                      null === (Me = ve.error) ||
                        void 0 === Me ||
                        Me.call(ve, X),
                      q.error(X);
                  },
                  () => {
                    var X, Me;
                    Te &&
                      (null === (X = ve.unsubscribe) ||
                        void 0 === X ||
                        X.call(ve)),
                      null === (Me = ve.finalize) ||
                        void 0 === Me ||
                        Me.call(ve);
                  }
                )
              );
            })
          : H.y;
      }
    },
    3410: (Ge, ue, I) => {
      I.d(ue, { z: () => d });
      const d = {
        setTimeout(C, k, ...H) {
          const { delegate: G } = d;
          return G?.setTimeout
            ? G.setTimeout(C, k, ...H)
            : setTimeout(C, k, ...H);
        },
        clearTimeout(C) {
          const { delegate: k } = d;
          return (k?.clearTimeout || clearTimeout)(C);
        },
        delegate: void 0,
      };
    },
    2202: (Ge, ue, I) => {
      I.d(ue, { h: () => C });
      const C = (function d() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
    },
    8822: (Ge, ue, I) => {
      I.d(ue, { L: () => d });
      const d =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
    },
    7669: (Ge, ue, I) => {
      I.d(ue, { _6: () => ye, jO: () => H, yG: () => G });
      var d = I(576);
      function k(Q) {
        return Q[Q.length - 1];
      }
      function H(Q) {
        return (0, d.m)(k(Q)) ? Q.pop() : void 0;
      }
      function G(Q) {
        return (function C(Q) {
          return Q && (0, d.m)(Q.schedule);
        })(k(Q))
          ? Q.pop()
          : void 0;
      }
      function ye(Q, Ie) {
        return "number" == typeof k(Q) ? Q.pop() : Ie;
      }
    },
    4742: (Ge, ue, I) => {
      I.d(ue, { D: () => G });
      const { isArray: d } = Array,
        { getPrototypeOf: C, prototype: k, keys: H } = Object;
      function G(Q) {
        if (1 === Q.length) {
          const Ie = Q[0];
          if (d(Ie)) return { args: Ie, keys: null };
          if (
            (function ye(Q) {
              return Q && "object" == typeof Q && C(Q) === k;
            })(Ie)
          ) {
            const ve = H(Ie);
            return { args: ve.map((se) => Ie[se]), keys: ve };
          }
        }
        return { args: Q, keys: null };
      }
    },
    8737: (Ge, ue, I) => {
      function d(C, k) {
        if (C) {
          const H = C.indexOf(k);
          0 <= H && C.splice(H, 1);
        }
      }
      I.d(ue, { P: () => d });
    },
    3888: (Ge, ue, I) => {
      function d(C) {
        const H = C((G) => {
          Error.call(G), (G.stack = new Error().stack);
        });
        return (
          (H.prototype = Object.create(Error.prototype)),
          (H.prototype.constructor = H),
          H
        );
      }
      I.d(ue, { d: () => d });
    },
    1810: (Ge, ue, I) => {
      function d(C, k) {
        return C.reduce((H, G, ye) => ((H[G] = k[ye]), H), {});
      }
      I.d(ue, { n: () => d });
    },
    2806: (Ge, ue, I) => {
      I.d(ue, { O: () => H, x: () => k });
      var d = I(2416);
      let C = null;
      function k(G) {
        if (d.v.useDeprecatedSynchronousErrorHandling) {
          const ye = !C;
          if ((ye && (C = { errorThrown: !1, error: null }), G(), ye)) {
            const { errorThrown: Q, error: Ie } = C;
            if (((C = null), Q)) throw Ie;
          }
        } else G();
      }
      function H(G) {
        d.v.useDeprecatedSynchronousErrorHandling &&
          C &&
          ((C.errorThrown = !0), (C.error = G));
      }
    },
    9672: (Ge, ue, I) => {
      function d(C, k, H, G = 0, ye = !1) {
        const Q = k.schedule(function () {
          H(), ye ? C.add(this.schedule(null, G)) : this.unsubscribe();
        }, G);
        if ((C.add(Q), !ye)) return Q;
      }
      I.d(ue, { f: () => d });
    },
    4671: (Ge, ue, I) => {
      function d(C) {
        return C;
      }
      I.d(ue, { y: () => d });
    },
    1144: (Ge, ue, I) => {
      I.d(ue, { z: () => d });
      const d = (C) =>
        C && "number" == typeof C.length && "function" != typeof C;
    },
    2206: (Ge, ue, I) => {
      I.d(ue, { D: () => C });
      var d = I(576);
      function C(k) {
        return Symbol.asyncIterator && (0, d.m)(k?.[Symbol.asyncIterator]);
      }
    },
    576: (Ge, ue, I) => {
      function d(C) {
        return "function" == typeof C;
      }
      I.d(ue, { m: () => d });
    },
    3670: (Ge, ue, I) => {
      I.d(ue, { c: () => k });
      var d = I(8822),
        C = I(576);
      function k(H) {
        return (0, C.m)(H[d.L]);
      }
    },
    6495: (Ge, ue, I) => {
      I.d(ue, { T: () => k });
      var d = I(2202),
        C = I(576);
      function k(H) {
        return (0, C.m)(H?.[d.h]);
      }
    },
    8239: (Ge, ue, I) => {
      I.d(ue, { t: () => C });
      var d = I(576);
      function C(k) {
        return (0, d.m)(k?.then);
      }
    },
    3260: (Ge, ue, I) => {
      I.d(ue, { L: () => H, Q: () => k });
      var d = I(7582),
        C = I(576);
      function k(G) {
        return (0, d.FC)(this, arguments, function* () {
          const Q = G.getReader();
          try {
            for (;;) {
              const { value: Ie, done: ve } = yield (0, d.qq)(Q.read());
              if (ve) return yield (0, d.qq)(void 0);
              yield yield (0, d.qq)(Ie);
            }
          } finally {
            Q.releaseLock();
          }
        });
      }
      function H(G) {
        return (0, C.m)(G?.getReader);
      }
    },
    4482: (Ge, ue, I) => {
      I.d(ue, { A: () => C, e: () => k });
      var d = I(576);
      function C(H) {
        return (0, d.m)(H?.lift);
      }
      function k(H) {
        return (G) => {
          if (C(G))
            return G.lift(function (ye) {
              try {
                return H(ye, this);
              } catch (Q) {
                this.error(Q);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
    },
    3268: (Ge, ue, I) => {
      I.d(ue, { Z: () => H });
      var d = I(4004);
      const { isArray: C } = Array;
      function H(G) {
        return (0, d.U)((ye) =>
          (function k(G, ye) {
            return C(ye) ? G(...ye) : G(ye);
          })(G, ye)
        );
      }
    },
    9635: (Ge, ue, I) => {
      I.d(ue, { U: () => k, z: () => C });
      var d = I(4671);
      function C(...H) {
        return k(H);
      }
      function k(H) {
        return 0 === H.length
          ? d.y
          : 1 === H.length
          ? H[0]
          : function (ye) {
              return H.reduce((Q, Ie) => Ie(Q), ye);
            };
      }
    },
    7849: (Ge, ue, I) => {
      I.d(ue, { h: () => k });
      var d = I(2416),
        C = I(3410);
      function k(H) {
        C.z.setTimeout(() => {
          const { onUnhandledError: G } = d.v;
          if (!G) throw H;
          G(H);
        });
      }
    },
    4532: (Ge, ue, I) => {
      function d(C) {
        return new TypeError(
          `You provided ${
            null !== C && "object" == typeof C ? "an invalid object" : `'${C}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      I.d(ue, { z: () => d });
    },
    6895: (Ge, ue, I) => {
      I.d(ue, {
        Do: () => Re,
        EM: () => kr,
        HT: () => G,
        JF: () => ai,
        K0: () => Q,
        Mx: () => hr,
        O5: () => It,
        S$: () => Qe,
        V_: () => se,
        Ye: () => Ae,
        b0: () => Et,
        bD: () => ho,
        ez: () => wn,
        q: () => k,
        sg: () => rn,
        w_: () => ye,
      });
      var d = I(8256);
      let C = null;
      function k() {
        return C;
      }
      function G(f) {
        C || (C = f);
      }
      class ye {}
      const Q = new d.OlP("DocumentToken");
      let Ie = (() => {
        class f {
          historyGo(g) {
            throw new Error("Not implemented");
          }
        }
        return (
          (f.ɵfac = function (g) {
            return new (g || f)();
          }),
          (f.ɵprov = d.Yz7({
            token: f,
            factory: function () {
              return (function ve() {
                return (0, d.LFG)(q);
              })();
            },
            providedIn: "platform",
          })),
          f
        );
      })();
      const se = new d.OlP("Location Initialized");
      let q = (() => {
        class f extends Ie {
          constructor(g) {
            super(), (this._doc = g), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return k().getBaseHref(this._doc);
          }
          onPopState(g) {
            const b = k().getGlobalEventTarget(this._doc, "window");
            return (
              b.addEventListener("popstate", g, !1),
              () => b.removeEventListener("popstate", g)
            );
          }
          onHashChange(g) {
            const b = k().getGlobalEventTarget(this._doc, "window");
            return (
              b.addEventListener("hashchange", g, !1),
              () => b.removeEventListener("hashchange", g)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(g) {
            this.location.pathname = g;
          }
          pushState(g, b, N) {
            Ee() ? this._history.pushState(g, b, N) : (this.location.hash = N);
          }
          replaceState(g, b, N) {
            Ee()
              ? this._history.replaceState(g, b, N)
              : (this.location.hash = N);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(g = 0) {
            this._history.go(g);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (f.ɵfac = function (g) {
            return new (g || f)(d.LFG(Q));
          }),
          (f.ɵprov = d.Yz7({
            token: f,
            factory: function () {
              return (function Te() {
                return new q((0, d.LFG)(Q));
              })();
            },
            providedIn: "platform",
          })),
          f
        );
      })();
      function Ee() {
        return !!window.history.pushState;
      }
      function X(f, E) {
        if (0 == f.length) return E;
        if (0 == E.length) return f;
        let g = 0;
        return (
          f.endsWith("/") && g++,
          E.startsWith("/") && g++,
          2 == g ? f + E.substring(1) : 1 == g ? f + E : f + "/" + E
        );
      }
      function Me(f) {
        const E = f.match(/#|\?|$/),
          g = (E && E.index) || f.length;
        return f.slice(0, g - ("/" === f[g - 1] ? 1 : 0)) + f.slice(g);
      }
      function Ne(f) {
        return f && "?" !== f[0] ? "?" + f : f;
      }
      let Qe = (() => {
        class f {
          historyGo(g) {
            throw new Error("Not implemented");
          }
        }
        return (
          (f.ɵfac = function (g) {
            return new (g || f)();
          }),
          (f.ɵprov = d.Yz7({
            token: f,
            factory: function () {
              return (0, d.f3M)(Et);
            },
            providedIn: "root",
          })),
          f
        );
      })();
      const Ke = new d.OlP("appBaseHref");
      let Et = (() => {
          class f extends Qe {
            constructor(g, b) {
              super(),
                (this._platformLocation = g),
                (this._removeListenerFns = []),
                (this._baseHref =
                  b ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  (0, d.f3M)(Q).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(g) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(g),
                this._platformLocation.onHashChange(g)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(g) {
              return X(this._baseHref, g);
            }
            path(g = !1) {
              const b =
                  this._platformLocation.pathname +
                  Ne(this._platformLocation.search),
                N = this._platformLocation.hash;
              return N && g ? `${b}${N}` : b;
            }
            pushState(g, b, N, z) {
              const ie = this.prepareExternalUrl(N + Ne(z));
              this._platformLocation.pushState(g, b, ie);
            }
            replaceState(g, b, N, z) {
              const ie = this.prepareExternalUrl(N + Ne(z));
              this._platformLocation.replaceState(g, b, ie);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(g = 0) {
              this._platformLocation.historyGo?.(g);
            }
          }
          return (
            (f.ɵfac = function (g) {
              return new (g || f)(d.LFG(Ie), d.LFG(Ke, 8));
            }),
            (f.ɵprov = d.Yz7({
              token: f,
              factory: f.ɵfac,
              providedIn: "root",
            })),
            f
          );
        })(),
        Re = (() => {
          class f extends Qe {
            constructor(g, b) {
              super(),
                (this._platformLocation = g),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != b && (this._baseHref = b);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(g) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(g),
                this._platformLocation.onHashChange(g)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(g = !1) {
              let b = this._platformLocation.hash;
              return null == b && (b = "#"), b.length > 0 ? b.substring(1) : b;
            }
            prepareExternalUrl(g) {
              const b = X(this._baseHref, g);
              return b.length > 0 ? "#" + b : b;
            }
            pushState(g, b, N, z) {
              let ie = this.prepareExternalUrl(N + Ne(z));
              0 == ie.length && (ie = this._platformLocation.pathname),
                this._platformLocation.pushState(g, b, ie);
            }
            replaceState(g, b, N, z) {
              let ie = this.prepareExternalUrl(N + Ne(z));
              0 == ie.length && (ie = this._platformLocation.pathname),
                this._platformLocation.replaceState(g, b, ie);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(g = 0) {
              this._platformLocation.historyGo?.(g);
            }
          }
          return (
            (f.ɵfac = function (g) {
              return new (g || f)(d.LFG(Ie), d.LFG(Ke, 8));
            }),
            (f.ɵprov = d.Yz7({ token: f, factory: f.ɵfac })),
            f
          );
        })(),
        Ae = (() => {
          class f {
            constructor(g) {
              (this._subject = new d.vpe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = g);
              const b = this._locationStrategy.getBaseHref();
              (this._baseHref = Me(ot(b))),
                this._locationStrategy.onPopState((N) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: N.state,
                    type: N.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(g = !1) {
              return this.normalize(this._locationStrategy.path(g));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(g, b = "") {
              return this.path() == this.normalize(g + Ne(b));
            }
            normalize(g) {
              return f.stripTrailingSlash(
                (function fe(f, E) {
                  return f && E.startsWith(f) ? E.substring(f.length) : E;
                })(this._baseHref, ot(g))
              );
            }
            prepareExternalUrl(g) {
              return (
                g && "/" !== g[0] && (g = "/" + g),
                this._locationStrategy.prepareExternalUrl(g)
              );
            }
            go(g, b = "", N = null) {
              this._locationStrategy.pushState(N, "", g, b),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(g + Ne(b)),
                  N
                );
            }
            replaceState(g, b = "", N = null) {
              this._locationStrategy.replaceState(N, "", g, b),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(g + Ne(b)),
                  N
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(g = 0) {
              this._locationStrategy.historyGo?.(g);
            }
            onUrlChange(g) {
              return (
                this._urlChangeListeners.push(g),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((b) => {
                    this._notifyUrlChangeListeners(b.url, b.state);
                  })),
                () => {
                  const b = this._urlChangeListeners.indexOf(g);
                  this._urlChangeListeners.splice(b, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(g = "", b) {
              this._urlChangeListeners.forEach((N) => N(g, b));
            }
            subscribe(g, b, N) {
              return this._subject.subscribe({
                next: g,
                error: b,
                complete: N,
              });
            }
          }
          return (
            (f.normalizeQueryParams = Ne),
            (f.joinWithSlash = X),
            (f.stripTrailingSlash = Me),
            (f.ɵfac = function (g) {
              return new (g || f)(d.LFG(Qe));
            }),
            (f.ɵprov = d.Yz7({
              token: f,
              factory: function () {
                return (function we() {
                  return new Ae((0, d.LFG)(Qe));
                })();
              },
              providedIn: "root",
            })),
            f
          );
        })();
      function ot(f) {
        return f.replace(/\/index.html$/, "");
      }
      function hr(f, E) {
        E = encodeURIComponent(E);
        for (const g of f.split(";")) {
          const b = g.indexOf("="),
            [N, z] = -1 == b ? [g, ""] : [g.slice(0, b), g.slice(b + 1)];
          if (N.trim() === E) return decodeURIComponent(z);
        }
        return null;
      }
      class Qn {
        constructor(E, g, b, N) {
          (this.$implicit = E),
            (this.ngForOf = g),
            (this.index = b),
            (this.count = N);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let rn = (() => {
        class f {
          constructor(g, b, N) {
            (this._viewContainer = g),
              (this._template = b),
              (this._differs = N),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(g) {
            (this._ngForOf = g), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(g) {
            this._trackByFn = g;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(g) {
            g && (this._template = g);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const g = this._ngForOf;
              !this._differ &&
                g &&
                (this._differ = this._differs
                  .find(g)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const g = this._differ.diff(this._ngForOf);
              g && this._applyChanges(g);
            }
          }
          _applyChanges(g) {
            const b = this._viewContainer;
            g.forEachOperation((N, z, ie) => {
              if (null == N.previousIndex)
                b.createEmbeddedView(
                  this._template,
                  new Qn(N.item, this._ngForOf, -1, -1),
                  null === ie ? void 0 : ie
                );
              else if (null == ie) b.remove(null === z ? void 0 : z);
              else if (null !== z) {
                const Ve = b.get(z);
                b.move(Ve, ie), Dn(Ve, N);
              }
            });
            for (let N = 0, z = b.length; N < z; N++) {
              const Ve = b.get(N).context;
              (Ve.index = N), (Ve.count = z), (Ve.ngForOf = this._ngForOf);
            }
            g.forEachIdentityChange((N) => {
              Dn(b.get(N.currentIndex), N);
            });
          }
          static ngTemplateContextGuard(g, b) {
            return !0;
          }
        }
        return (
          (f.ɵfac = function (g) {
            return new (g || f)(d.Y36(d.s_b), d.Y36(d.Rgc), d.Y36(d.ZZ4));
          }),
          (f.ɵdir = d.lG2({
            type: f,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          f
        );
      })();
      function Dn(f, E) {
        f.context.$implicit = E.item;
      }
      let It = (() => {
        class f {
          constructor(g, b) {
            (this._viewContainer = g),
              (this._context = new pr()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = b);
          }
          set ngIf(g) {
            (this._context.$implicit = this._context.ngIf = g),
              this._updateView();
          }
          set ngIfThen(g) {
            Pr("ngIfThen", g),
              (this._thenTemplateRef = g),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(g) {
            Pr("ngIfElse", g),
              (this._elseTemplateRef = g),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(g, b) {
            return !0;
          }
        }
        return (
          (f.ɵfac = function (g) {
            return new (g || f)(d.Y36(d.s_b), d.Y36(d.Rgc));
          }),
          (f.ɵdir = d.lG2({
            type: f,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          f
        );
      })();
      class pr {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Pr(f, E) {
        if (E && !E.createEmbeddedView)
          throw new Error(
            `${f} must be a TemplateRef, but received '${(0, d.AaK)(E)}'.`
          );
      }
      let wn = (() => {
        class f {}
        return (
          (f.ɵfac = function (g) {
            return new (g || f)();
          }),
          (f.ɵmod = d.oAB({ type: f })),
          (f.ɵinj = d.cJS({})),
          f
        );
      })();
      const ho = "browser";
      let kr = (() => {
        class f {}
        return (
          (f.ɵprov = (0, d.Yz7)({
            token: f,
            providedIn: "root",
            factory: () => new gn((0, d.LFG)(Q), window),
          })),
          f
        );
      })();
      class gn {
        constructor(E, g) {
          (this.document = E), (this.window = g), (this.offset = () => [0, 0]);
        }
        setOffset(E) {
          this.offset = Array.isArray(E) ? () => E : E;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(E) {
          this.supportsScrolling() && this.window.scrollTo(E[0], E[1]);
        }
        scrollToAnchor(E) {
          if (!this.supportsScrolling()) return;
          const g = (function go(f, E) {
            const g = f.getElementById(E) || f.getElementsByName(E)[0];
            if (g) return g;
            if (
              "function" == typeof f.createTreeWalker &&
              f.body &&
              (f.body.createShadowRoot || f.body.attachShadow)
            ) {
              const b = f.createTreeWalker(f.body, NodeFilter.SHOW_ELEMENT);
              let N = b.currentNode;
              for (; N; ) {
                const z = N.shadowRoot;
                if (z) {
                  const ie =
                    z.getElementById(E) || z.querySelector(`[name="${E}"]`);
                  if (ie) return ie;
                }
                N = b.nextNode();
              }
            }
            return null;
          })(this.document, E);
          g && (this.scrollToElement(g), g.focus());
        }
        setHistoryScrollRestoration(E) {
          if (this.supportScrollRestoration()) {
            const g = this.window.history;
            g && g.scrollRestoration && (g.scrollRestoration = E);
          }
        }
        scrollToElement(E) {
          const g = E.getBoundingClientRect(),
            b = g.left + this.window.pageXOffset,
            N = g.top + this.window.pageYOffset,
            z = this.offset();
          this.window.scrollTo(b - z[0], N - z[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const E =
              Dr(this.window.history) ||
              Dr(Object.getPrototypeOf(this.window.history));
            return !(!E || (!E.writable && !E.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Dr(f) {
        return Object.getOwnPropertyDescriptor(f, "scrollRestoration");
      }
      class ai {}
    },
    529: (Ge, ue, I) => {
      I.d(ue, { JF: () => Vn, LE: () => Ke, TP: () => te, eN: () => Z });
      var d = I(6895),
        C = I(8256),
        k = I(9646),
        H = I(9751),
        G = I(4351),
        ye = I(9300),
        Q = I(4004);
      class Ie {}
      class ve {}
      class se {
        constructor(O) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            O
              ? (this.lazyInit =
                  "string" == typeof O
                    ? () => {
                        (this.headers = new Map()),
                          O.split("\n").forEach((P) => {
                            const $ = P.indexOf(":");
                            if ($ > 0) {
                              const oe = P.slice(0, $),
                                je = oe.toLowerCase(),
                                at = P.slice($ + 1).trim();
                              this.maybeSetNormalizedName(oe, je),
                                this.headers.has(je)
                                  ? this.headers.get(je).push(at)
                                  : this.headers.set(je, [at]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(O).forEach((P) => {
                            let $ = O[P];
                            const oe = P.toLowerCase();
                            "string" == typeof $ && ($ = [$]),
                              $.length > 0 &&
                                (this.headers.set(oe, $),
                                this.maybeSetNormalizedName(P, oe));
                          });
                      })
              : (this.headers = new Map());
        }
        has(O) {
          return this.init(), this.headers.has(O.toLowerCase());
        }
        get(O) {
          this.init();
          const P = this.headers.get(O.toLowerCase());
          return P && P.length > 0 ? P[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(O) {
          return this.init(), this.headers.get(O.toLowerCase()) || null;
        }
        append(O, P) {
          return this.clone({ name: O, value: P, op: "a" });
        }
        set(O, P) {
          return this.clone({ name: O, value: P, op: "s" });
        }
        delete(O, P) {
          return this.clone({ name: O, value: P, op: "d" });
        }
        maybeSetNormalizedName(O, P) {
          this.normalizedNames.has(P) || this.normalizedNames.set(P, O);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof se
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((O) => this.applyUpdate(O)),
              (this.lazyUpdate = null)));
        }
        copyFrom(O) {
          O.init(),
            Array.from(O.headers.keys()).forEach((P) => {
              this.headers.set(P, O.headers.get(P)),
                this.normalizedNames.set(P, O.normalizedNames.get(P));
            });
        }
        clone(O) {
          const P = new se();
          return (
            (P.lazyInit =
              this.lazyInit && this.lazyInit instanceof se
                ? this.lazyInit
                : this),
            (P.lazyUpdate = (this.lazyUpdate || []).concat([O])),
            P
          );
        }
        applyUpdate(O) {
          const P = O.name.toLowerCase();
          switch (O.op) {
            case "a":
            case "s":
              let $ = O.value;
              if (("string" == typeof $ && ($ = [$]), 0 === $.length)) return;
              this.maybeSetNormalizedName(O.name, P);
              const oe = ("a" === O.op ? this.headers.get(P) : void 0) || [];
              oe.push(...$), this.headers.set(P, oe);
              break;
            case "d":
              const je = O.value;
              if (je) {
                let at = this.headers.get(P);
                if (!at) return;
                (at = at.filter((yt) => -1 === je.indexOf(yt))),
                  0 === at.length
                    ? (this.headers.delete(P), this.normalizedNames.delete(P))
                    : this.headers.set(P, at);
              } else this.headers.delete(P), this.normalizedNames.delete(P);
          }
        }
        forEach(O) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((P) =>
              O(this.normalizedNames.get(P), this.headers.get(P))
            );
        }
      }
      class Ee {
        encodeKey(O) {
          return Ne(O);
        }
        encodeValue(O) {
          return Ne(O);
        }
        decodeKey(O) {
          return decodeURIComponent(O);
        }
        decodeValue(O) {
          return decodeURIComponent(O);
        }
      }
      const X = /%(\d[a-f0-9])/gi,
        Me = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Ne(le) {
        return encodeURIComponent(le).replace(X, (O, P) => Me[P] ?? O);
      }
      function Qe(le) {
        return `${le}`;
      }
      class Ke {
        constructor(O = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = O.encoder || new Ee()),
            O.fromString)
          ) {
            if (O.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function Te(le, O) {
              const P = new Map();
              return (
                le.length > 0 &&
                  le
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((oe) => {
                      const je = oe.indexOf("="),
                        [at, yt] =
                          -1 == je
                            ? [O.decodeKey(oe), ""]
                            : [
                                O.decodeKey(oe.slice(0, je)),
                                O.decodeValue(oe.slice(je + 1)),
                              ],
                        Ue = P.get(at) || [];
                      Ue.push(yt), P.set(at, Ue);
                    }),
                P
              );
            })(O.fromString, this.encoder);
          } else
            O.fromObject
              ? ((this.map = new Map()),
                Object.keys(O.fromObject).forEach((P) => {
                  const $ = O.fromObject[P],
                    oe = Array.isArray($) ? $.map(Qe) : [Qe($)];
                  this.map.set(P, oe);
                }))
              : (this.map = null);
        }
        has(O) {
          return this.init(), this.map.has(O);
        }
        get(O) {
          this.init();
          const P = this.map.get(O);
          return P ? P[0] : null;
        }
        getAll(O) {
          return this.init(), this.map.get(O) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(O, P) {
          return this.clone({ param: O, value: P, op: "a" });
        }
        appendAll(O) {
          const P = [];
          return (
            Object.keys(O).forEach(($) => {
              const oe = O[$];
              Array.isArray(oe)
                ? oe.forEach((je) => {
                    P.push({ param: $, value: je, op: "a" });
                  })
                : P.push({ param: $, value: oe, op: "a" });
            }),
            this.clone(P)
          );
        }
        set(O, P) {
          return this.clone({ param: O, value: P, op: "s" });
        }
        delete(O, P) {
          return this.clone({ param: O, value: P, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((O) => {
                const P = this.encoder.encodeKey(O);
                return this.map
                  .get(O)
                  .map(($) => P + "=" + this.encoder.encodeValue($))
                  .join("&");
              })
              .filter((O) => "" !== O)
              .join("&")
          );
        }
        clone(O) {
          const P = new Ke({ encoder: this.encoder });
          return (
            (P.cloneFrom = this.cloneFrom || this),
            (P.updates = (this.updates || []).concat(O)),
            P
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((O) => this.map.set(O, this.cloneFrom.map.get(O))),
              this.updates.forEach((O) => {
                switch (O.op) {
                  case "a":
                  case "s":
                    const P =
                      ("a" === O.op ? this.map.get(O.param) : void 0) || [];
                    P.push(Qe(O.value)), this.map.set(O.param, P);
                    break;
                  case "d":
                    if (void 0 === O.value) {
                      this.map.delete(O.param);
                      break;
                    }
                    {
                      let $ = this.map.get(O.param) || [];
                      const oe = $.indexOf(Qe(O.value));
                      -1 !== oe && $.splice(oe, 1),
                        $.length > 0
                          ? this.map.set(O.param, $)
                          : this.map.delete(O.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class Re {
        constructor() {
          this.map = new Map();
        }
        set(O, P) {
          return this.map.set(O, P), this;
        }
        get(O) {
          return (
            this.map.has(O) || this.map.set(O, O.defaultValue()),
            this.map.get(O)
          );
        }
        delete(O) {
          return this.map.delete(O), this;
        }
        has(O) {
          return this.map.has(O);
        }
        keys() {
          return this.map.keys();
        }
      }
      function we(le) {
        return typeof ArrayBuffer < "u" && le instanceof ArrayBuffer;
      }
      function fe(le) {
        return typeof Blob < "u" && le instanceof Blob;
      }
      function ot(le) {
        return typeof FormData < "u" && le instanceof FormData;
      }
      class ae {
        constructor(O, P, $, oe) {
          let je;
          if (
            ((this.url = P),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = O.toUpperCase()),
            (function Ae(le) {
              switch (le) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || oe
              ? ((this.body = void 0 !== $ ? $ : null), (je = oe))
              : (je = $),
            je &&
              ((this.reportProgress = !!je.reportProgress),
              (this.withCredentials = !!je.withCredentials),
              je.responseType && (this.responseType = je.responseType),
              je.headers && (this.headers = je.headers),
              je.context && (this.context = je.context),
              je.params && (this.params = je.params)),
            this.headers || (this.headers = new se()),
            this.context || (this.context = new Re()),
            this.params)
          ) {
            const at = this.params.toString();
            if (0 === at.length) this.urlWithParams = P;
            else {
              const yt = P.indexOf("?");
              this.urlWithParams =
                P + (-1 === yt ? "?" : yt < P.length - 1 ? "&" : "") + at;
            }
          } else (this.params = new Ke()), (this.urlWithParams = P);
        }
        serializeBody() {
          return null === this.body
            ? null
            : we(this.body) ||
              fe(this.body) ||
              ot(this.body) ||
              (function K(le) {
                return (
                  typeof URLSearchParams < "u" && le instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Ke
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || ot(this.body)
            ? null
            : fe(this.body)
            ? this.body.type || null
            : we(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Ke
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(O = {}) {
          const P = O.method || this.method,
            $ = O.url || this.url,
            oe = O.responseType || this.responseType,
            je = void 0 !== O.body ? O.body : this.body,
            at =
              void 0 !== O.withCredentials
                ? O.withCredentials
                : this.withCredentials,
            yt =
              void 0 !== O.reportProgress
                ? O.reportProgress
                : this.reportProgress;
          let Ue = O.headers || this.headers,
            Gt = O.params || this.params;
          const bt = O.context ?? this.context;
          return (
            void 0 !== O.setHeaders &&
              (Ue = Object.keys(O.setHeaders).reduce(
                (Kt, He) => Kt.set(He, O.setHeaders[He]),
                Ue
              )),
            O.setParams &&
              (Gt = Object.keys(O.setParams).reduce(
                (Kt, He) => Kt.set(He, O.setParams[He]),
                Gt
              )),
            new ae(P, $, je, {
              params: Gt,
              headers: Ue,
              context: bt,
              reportProgress: yt,
              responseType: oe,
              withCredentials: at,
            })
          );
        }
      }
      var xe = (() => (
        ((xe = xe || {})[(xe.Sent = 0)] = "Sent"),
        (xe[(xe.UploadProgress = 1)] = "UploadProgress"),
        (xe[(xe.ResponseHeader = 2)] = "ResponseHeader"),
        (xe[(xe.DownloadProgress = 3)] = "DownloadProgress"),
        (xe[(xe.Response = 4)] = "Response"),
        (xe[(xe.User = 5)] = "User"),
        xe
      ))();
      class Be {
        constructor(O, P = 200, $ = "OK") {
          (this.headers = O.headers || new se()),
            (this.status = void 0 !== O.status ? O.status : P),
            (this.statusText = O.statusText || $),
            (this.url = O.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Le extends Be {
        constructor(O = {}) {
          super(O), (this.type = xe.ResponseHeader);
        }
        clone(O = {}) {
          return new Le({
            headers: O.headers || this.headers,
            status: void 0 !== O.status ? O.status : this.status,
            statusText: O.statusText || this.statusText,
            url: O.url || this.url || void 0,
          });
        }
      }
      class nt extends Be {
        constructor(O = {}) {
          super(O),
            (this.type = xe.Response),
            (this.body = void 0 !== O.body ? O.body : null);
        }
        clone(O = {}) {
          return new nt({
            body: void 0 !== O.body ? O.body : this.body,
            headers: O.headers || this.headers,
            status: void 0 !== O.status ? O.status : this.status,
            statusText: O.statusText || this.statusText,
            url: O.url || this.url || void 0,
          });
        }
      }
      class be extends Be {
        constructor(O) {
          super(O, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${O.url || "(unknown url)"}`
                : `Http failure response for ${O.url || "(unknown url)"}: ${
                    O.status
                  } ${O.statusText}`),
            (this.error = O.error || null);
        }
      }
      function lt(le, O) {
        return {
          body: O,
          headers: le.headers,
          context: le.context,
          observe: le.observe,
          params: le.params,
          reportProgress: le.reportProgress,
          responseType: le.responseType,
          withCredentials: le.withCredentials,
        };
      }
      let Z = (() => {
        class le {
          constructor(P) {
            this.handler = P;
          }
          request(P, $, oe = {}) {
            let je;
            if (P instanceof ae) je = P;
            else {
              let Ue, Gt;
              (Ue = oe.headers instanceof se ? oe.headers : new se(oe.headers)),
                oe.params &&
                  (Gt =
                    oe.params instanceof Ke
                      ? oe.params
                      : new Ke({ fromObject: oe.params })),
                (je = new ae(P, $, void 0 !== oe.body ? oe.body : null, {
                  headers: Ue,
                  context: oe.context,
                  params: Gt,
                  reportProgress: oe.reportProgress,
                  responseType: oe.responseType || "json",
                  withCredentials: oe.withCredentials,
                }));
            }
            const at = (0, k.of)(je).pipe(
              (0, G.b)((Ue) => this.handler.handle(Ue))
            );
            if (P instanceof ae || "events" === oe.observe) return at;
            const yt = at.pipe((0, ye.h)((Ue) => Ue instanceof nt));
            switch (oe.observe || "body") {
              case "body":
                switch (je.responseType) {
                  case "arraybuffer":
                    return yt.pipe(
                      (0, Q.U)((Ue) => {
                        if (
                          null !== Ue.body &&
                          !(Ue.body instanceof ArrayBuffer)
                        )
                          throw new Error("Response is not an ArrayBuffer.");
                        return Ue.body;
                      })
                    );
                  case "blob":
                    return yt.pipe(
                      (0, Q.U)((Ue) => {
                        if (null !== Ue.body && !(Ue.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return Ue.body;
                      })
                    );
                  case "text":
                    return yt.pipe(
                      (0, Q.U)((Ue) => {
                        if (null !== Ue.body && "string" != typeof Ue.body)
                          throw new Error("Response is not a string.");
                        return Ue.body;
                      })
                    );
                  default:
                    return yt.pipe((0, Q.U)((Ue) => Ue.body));
                }
              case "response":
                return yt;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${oe.observe}}`
                );
            }
          }
          delete(P, $ = {}) {
            return this.request("DELETE", P, $);
          }
          get(P, $ = {}) {
            return this.request("GET", P, $);
          }
          head(P, $ = {}) {
            return this.request("HEAD", P, $);
          }
          jsonp(P, $) {
            return this.request("JSONP", P, {
              params: new Ke().append($, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(P, $ = {}) {
            return this.request("OPTIONS", P, $);
          }
          patch(P, $, oe = {}) {
            return this.request("PATCH", P, lt(oe, $));
          }
          post(P, $, oe = {}) {
            return this.request("POST", P, lt(oe, $));
          }
          put(P, $, oe = {}) {
            return this.request("PUT", P, lt(oe, $));
          }
        }
        return (
          (le.ɵfac = function (P) {
            return new (P || le)(C.LFG(Ie));
          }),
          (le.ɵprov = C.Yz7({ token: le, factory: le.ɵfac })),
          le
        );
      })();
      class ee {
        constructor(O, P) {
          (this.next = O), (this.interceptor = P);
        }
        handle(O) {
          return this.interceptor.intercept(O, this.next);
        }
      }
      const te = new C.OlP("HTTP_INTERCEPTORS");
      let de = (() => {
        class le {
          intercept(P, $) {
            return $.handle(P);
          }
        }
        return (
          (le.ɵfac = function (P) {
            return new (P || le)();
          }),
          (le.ɵprov = C.Yz7({ token: le, factory: le.ɵfac })),
          le
        );
      })();
      const ze = /^\)\]\}',?\n/;
      let _t = (() => {
        class le {
          constructor(P) {
            this.xhrFactory = P;
          }
          handle(P) {
            if ("JSONP" === P.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new H.y(($) => {
              const oe = this.xhrFactory.build();
              if (
                (oe.open(P.method, P.urlWithParams),
                P.withCredentials && (oe.withCredentials = !0),
                P.headers.forEach((Pt, Mt) =>
                  oe.setRequestHeader(Pt, Mt.join(","))
                ),
                P.headers.has("Accept") ||
                  oe.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !P.headers.has("Content-Type"))
              ) {
                const Pt = P.detectContentTypeHeader();
                null !== Pt && oe.setRequestHeader("Content-Type", Pt);
              }
              if (P.responseType) {
                const Pt = P.responseType.toLowerCase();
                oe.responseType = "json" !== Pt ? Pt : "text";
              }
              const je = P.serializeBody();
              let at = null;
              const yt = () => {
                  if (null !== at) return at;
                  const Pt = oe.statusText || "OK",
                    Mt = new se(oe.getAllResponseHeaders()),
                    Zt =
                      (function pt(le) {
                        return "responseURL" in le && le.responseURL
                          ? le.responseURL
                          : /^X-Request-URL:/m.test(le.getAllResponseHeaders())
                          ? le.getResponseHeader("X-Request-URL")
                          : null;
                      })(oe) || P.url;
                  return (
                    (at = new Le({
                      headers: Mt,
                      status: oe.status,
                      statusText: Pt,
                      url: Zt,
                    })),
                    at
                  );
                },
                Ue = () => {
                  let {
                      headers: Pt,
                      status: Mt,
                      statusText: Zt,
                      url: it,
                    } = yt(),
                    $e = null;
                  204 !== Mt &&
                    ($e =
                      typeof oe.response > "u" ? oe.responseText : oe.response),
                    0 === Mt && (Mt = $e ? 200 : 0);
                  let pn = Mt >= 200 && Mt < 300;
                  if ("json" === P.responseType && "string" == typeof $e) {
                    const Tn = $e;
                    $e = $e.replace(ze, "");
                    try {
                      $e = "" !== $e ? JSON.parse($e) : null;
                    } catch (zt) {
                      ($e = Tn),
                        pn && ((pn = !1), ($e = { error: zt, text: $e }));
                    }
                  }
                  pn
                    ? ($.next(
                        new nt({
                          body: $e,
                          headers: Pt,
                          status: Mt,
                          statusText: Zt,
                          url: it || void 0,
                        })
                      ),
                      $.complete())
                    : $.error(
                        new be({
                          error: $e,
                          headers: Pt,
                          status: Mt,
                          statusText: Zt,
                          url: it || void 0,
                        })
                      );
                },
                Gt = (Pt) => {
                  const { url: Mt } = yt(),
                    Zt = new be({
                      error: Pt,
                      status: oe.status || 0,
                      statusText: oe.statusText || "Unknown Error",
                      url: Mt || void 0,
                    });
                  $.error(Zt);
                };
              let bt = !1;
              const Kt = (Pt) => {
                  bt || ($.next(yt()), (bt = !0));
                  let Mt = { type: xe.DownloadProgress, loaded: Pt.loaded };
                  Pt.lengthComputable && (Mt.total = Pt.total),
                    "text" === P.responseType &&
                      !!oe.responseText &&
                      (Mt.partialText = oe.responseText),
                    $.next(Mt);
                },
                He = (Pt) => {
                  let Mt = { type: xe.UploadProgress, loaded: Pt.loaded };
                  Pt.lengthComputable && (Mt.total = Pt.total), $.next(Mt);
                };
              return (
                oe.addEventListener("load", Ue),
                oe.addEventListener("error", Gt),
                oe.addEventListener("timeout", Gt),
                oe.addEventListener("abort", Gt),
                P.reportProgress &&
                  (oe.addEventListener("progress", Kt),
                  null !== je &&
                    oe.upload &&
                    oe.upload.addEventListener("progress", He)),
                oe.send(je),
                $.next({ type: xe.Sent }),
                () => {
                  oe.removeEventListener("error", Gt),
                    oe.removeEventListener("abort", Gt),
                    oe.removeEventListener("load", Ue),
                    oe.removeEventListener("timeout", Gt),
                    P.reportProgress &&
                      (oe.removeEventListener("progress", Kt),
                      null !== je &&
                        oe.upload &&
                        oe.upload.removeEventListener("progress", He)),
                    oe.readyState !== oe.DONE && oe.abort();
                }
              );
            });
          }
        }
        return (
          (le.ɵfac = function (P) {
            return new (P || le)(C.LFG(d.JF));
          }),
          (le.ɵprov = C.Yz7({ token: le, factory: le.ɵfac })),
          le
        );
      })();
      const gt = new C.OlP("XSRF_COOKIE_NAME"),
        on = new C.OlP("XSRF_HEADER_NAME");
      class sn {}
      let Mn = (() => {
          class le {
            constructor(P, $, oe) {
              (this.doc = P),
                (this.platform = $),
                (this.cookieName = oe),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const P = this.doc.cookie || "";
              return (
                P !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = (0, d.Mx)(P, this.cookieName)),
                  (this.lastCookieString = P)),
                this.lastToken
              );
            }
          }
          return (
            (le.ɵfac = function (P) {
              return new (P || le)(C.LFG(d.K0), C.LFG(C.Lbi), C.LFG(gt));
            }),
            (le.ɵprov = C.Yz7({ token: le, factory: le.ɵfac })),
            le
          );
        })(),
        et = (() => {
          class le {
            constructor(P, $) {
              (this.tokenService = P), (this.headerName = $);
            }
            intercept(P, $) {
              const oe = P.url.toLowerCase();
              if (
                "GET" === P.method ||
                "HEAD" === P.method ||
                oe.startsWith("http://") ||
                oe.startsWith("https://")
              )
                return $.handle(P);
              const je = this.tokenService.getToken();
              return (
                null !== je &&
                  !P.headers.has(this.headerName) &&
                  (P = P.clone({
                    headers: P.headers.set(this.headerName, je),
                  })),
                $.handle(P)
              );
            }
          }
          return (
            (le.ɵfac = function (P) {
              return new (P || le)(C.LFG(sn), C.LFG(on));
            }),
            (le.ɵprov = C.Yz7({ token: le, factory: le.ɵfac })),
            le
          );
        })(),
        Lt = (() => {
          class le {
            constructor(P, $) {
              (this.backend = P), (this.injector = $), (this.chain = null);
            }
            handle(P) {
              if (null === this.chain) {
                const $ = this.injector.get(te, []);
                this.chain = $.reduceRight(
                  (oe, je) => new ee(oe, je),
                  this.backend
                );
              }
              return this.chain.handle(P);
            }
          }
          return (
            (le.ɵfac = function (P) {
              return new (P || le)(C.LFG(ve), C.LFG(C.zs3));
            }),
            (le.ɵprov = C.Yz7({ token: le, factory: le.ɵfac })),
            le
          );
        })(),
        yn = (() => {
          class le {
            static disable() {
              return {
                ngModule: le,
                providers: [{ provide: et, useClass: de }],
              };
            }
            static withOptions(P = {}) {
              return {
                ngModule: le,
                providers: [
                  P.cookieName ? { provide: gt, useValue: P.cookieName } : [],
                  P.headerName ? { provide: on, useValue: P.headerName } : [],
                ],
              };
            }
          }
          return (
            (le.ɵfac = function (P) {
              return new (P || le)();
            }),
            (le.ɵmod = C.oAB({ type: le })),
            (le.ɵinj = C.cJS({
              providers: [
                et,
                { provide: te, useExisting: et, multi: !0 },
                { provide: sn, useClass: Mn },
                { provide: gt, useValue: "XSRF-TOKEN" },
                { provide: on, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            le
          );
        })(),
        Vn = (() => {
          class le {}
          return (
            (le.ɵfac = function (P) {
              return new (P || le)();
            }),
            (le.ɵmod = C.oAB({ type: le })),
            (le.ɵinj = C.cJS({
              providers: [
                Z,
                { provide: Ie, useClass: Lt },
                _t,
                { provide: ve, useExisting: _t },
              ],
              imports: [
                yn.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            le
          );
        })();
    },
    8256: (Ge, ue, I) => {
      I.d(ue, {
        tb: () => Pg,
        AFp: () => xg,
        ip1: () => Tg,
        CZH: () => ul,
        hGG: () => _w,
        z2F: () => dl,
        sBO: () => rw,
        Sil: () => VE,
        _Vd: () => Js,
        EJc: () => LE,
        Xts: () => nu,
        SBq: () => Qs,
        lqb: () => Ai,
        qLn: () => Xs,
        vpe: () => uo,
        XFs: () => O,
        OlP: () => Vt,
        zs3: () => Ti,
        ZZ4: () => Nc,
        aQg: () => Fc,
        soG: () => cl,
        YKP: () => Vp,
        h0i: () => Es,
        PXZ: () => JE,
        R0b: () => Or,
        FiY: () => js,
        Lbi: () => PE,
        g9A: () => Rg,
        Qsj: () => Ky,
        FYo: () => nf,
        JOm: () => oo,
        tp0: () => Hs,
        Rgc: () => fa,
        dDg: () => YE,
        eoX: () => Ug,
        GfV: () => rf,
        s_b: () => sl,
        ifc: () => Kt,
        MMx: () => uc,
        Lck: () => MC,
        eFA: () => $g,
        G48: () => nw,
        Gpc: () => Et,
        f3M: () => Qc,
        _c5: () => vw,
        c2e: () => NE,
        zSh: () => iu,
        wAp: () => tt,
        vHH: () => fe,
        lri: () => Vg,
        rWj: () => Bg,
        D6c: () => Dw,
        cg1: () => tc,
        kL8: () => up,
        dqk: () => He,
        Z0I: () => et,
        sIi: () => na,
        CqO: () => mh,
        QGY: () => Yu,
        QP$: () => Ze,
        F4k: () => gh,
        RDi: () => uy,
        AaK: () => Ne,
        qOj: () => Vu,
        TTD: () => vr,
        _Bn: () => kp,
        jDz: () => Up,
        xp6: () => ff,
        uIk: () => ju,
        ekj: () => Ju,
        Suo: () => sg,
        Xpm: () => cr,
        lG2: () => U,
        Yz7: () => gt,
        cJS: () => sn,
        oAB: () => Sn,
        Yjl: () => L,
        Y36: () => as,
        _UZ: () => Gu,
        qZA: () => Qa,
        TgZ: () => Ja,
        EpF: () => ph,
        n5z: () => Ns,
        LFG: () => dn,
        $8M: () => Ma,
        $Z: () => Mf,
        NdJ: () => Ku,
        CRH: () => ag,
        oxw: () => Ch,
        Q6J: () => Hu,
        s9C: () => Zu,
        VKq: () => Yp,
        iGM: () => og,
        MAs: () => fh,
        KtG: () => jt,
        CHM: () => ci,
        LSH: () => tu,
        YNc: () => dh,
        _uU: () => Gh,
        Oqu: () => Xu,
        hij: () => el,
        AsE: () => ec,
        Gf: () => ig,
      });
      var d = I(7579),
        C = I(727),
        k = I(9751),
        H = I(8189),
        G = I(8421),
        ye = I(515),
        Q = I(7669),
        Ie = I(2076),
        se = I(2961),
        q = I(4482);
      function Te(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new se.Hp({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function X(e) {
        for (let t in e) if (e[t] === X) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Me(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function Ne(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Ne).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Qe(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Ke = X({ __forward_ref__: X });
      function Et(e) {
        return (
          (e.__forward_ref__ = Et),
          (e.toString = function () {
            return Ne(this());
          }),
          e
        );
      }
      function Re(e) {
        return Ae(e) ? e() : e;
      }
      function Ae(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Ke) &&
          e.__forward_ref__ === Et
        );
      }
      class fe extends Error {
        constructor(t, n) {
          super(
            (function ot(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function K(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function nt(e, t) {
        throw new fe(-201, !1);
      }
      function W(e, t) {
        null == e &&
          (function he(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function gt(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function sn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Mn(e) {
        return Lt(e, Vn) || Lt(e, Bn);
      }
      function et(e) {
        return null !== Mn(e);
      }
      function Lt(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function yn(e) {
        return e && (e.hasOwnProperty(hn) || e.hasOwnProperty(le))
          ? e[hn]
          : null;
      }
      const Vn = X({ ɵprov: X }),
        hn = X({ ɵinj: X }),
        Bn = X({ ngInjectableDef: X }),
        le = X({ ngInjectorDef: X });
      var O = (() => (
        ((O = O || {})[(O.Default = 0)] = "Default"),
        (O[(O.Host = 1)] = "Host"),
        (O[(O.Self = 2)] = "Self"),
        (O[(O.SkipSelf = 4)] = "SkipSelf"),
        (O[(O.Optional = 8)] = "Optional"),
        O
      ))();
      let P;
      function oe(e) {
        const t = P;
        return (P = e), t;
      }
      function je(e, t, n) {
        const r = Mn(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & O.Optional
          ? null
          : void 0 !== t
          ? t
          : void nt(Ne(e));
      }
      function yt(e) {
        return { toString: e }.toString();
      }
      var Ue = (() => (
          ((Ue = Ue || {})[(Ue.OnPush = 0)] = "OnPush"),
          (Ue[(Ue.Default = 1)] = "Default"),
          Ue
        ))(),
        Kt = (() => {
          return (
            ((e = Kt || (Kt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Kt
          );
          var e;
        })();
      const He = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Zt = {},
        it = [],
        $e = X({ ɵcmp: X }),
        pn = X({ ɵdir: X }),
        Tn = X({ ɵpipe: X }),
        zt = X({ ɵmod: X }),
        nn = X({ ɵfac: X }),
        vn = X({ __NG_ELEMENT_ID__: X });
      let Un = 0;
      function cr(e) {
        return yt(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Ue.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || it,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || Kt.Emulated,
              id: "c" + Un++,
              styles: e.styles || it,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = nr(e.inputs, r)),
            (o.outputs = nr(e.outputs)),
            s && s.forEach((c) => c(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(jn).filter(Rr)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(ne).filter(Rr)
              : null),
            o
          );
        });
      }
      function jn(e) {
        return T(e) || j(e);
      }
      function Rr(e) {
        return null !== e;
      }
      function Sn(e) {
        return yt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || it,
          declarations: e.declarations || it,
          imports: e.imports || it,
          exports: e.exports || it,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function nr(e, t) {
        if (null == e) return Zt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const U = cr;
      function L(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function T(e) {
        return e[$e] || null;
      }
      function j(e) {
        return e[pn] || null;
      }
      function ne(e) {
        return e[Tn] || null;
      }
      function Ze(e) {
        const t = T(e) || j(e) || ne(e);
        return null !== t && t.standalone;
      }
      function We(e, t) {
        const n = e[zt] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${Ne(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Ut(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function Cn(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function sr(e) {
        return 0 != (8 & e.flags);
      }
      function en(e) {
        return 2 == (2 & e.flags);
      }
      function mr(e) {
        return 1 == (1 & e.flags);
      }
      function In(e) {
        return null !== e.template;
      }
      function Ao(e) {
        return 0 != (256 & e[2]);
      }
      function wn(e, t) {
        return e.hasOwnProperty(nn) ? e[nn] : null;
      }
      class ho {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function vr() {
        return po;
      }
      function po(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = No), Lr;
      }
      function Lr() {
        const e = _r(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Zt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function No(e, t, n, r) {
        const o =
            _r(e) ||
            (function ki(e, t) {
              return (e[ii] = t);
            })(e, { previous: Zt, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          c = this.declaredInputs[n],
          p = s[c];
        (i[c] = new ho(p && p.currentValue, t, s === Zt)), (e[r] = t);
      }
      vr.ngInherit = !0;
      const ii = "__ngSimpleChanges__";
      function _r(e) {
        return e[ii] || null;
      }
      function Tt(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Zr(e, t) {
        return Tt(t[e]);
      }
      function qt(e, t) {
        return Tt(t[e.index]);
      }
      function Fo(e, t) {
        return e.data[t];
      }
      function bn(e, t) {
        const n = t[e];
        return Ut(n) ? n : n[0];
      }
      function Vr(e) {
        return 64 == (64 & e[2]);
      }
      function er(e, t) {
        return null == t ? null : e[t];
      }
      function qr(e) {
        e[18] = 0;
      }
      function Jr(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const Ye = { lFrame: Uo(null), bindingsEnabled: !0 };
      function Qr() {
        return Ye.bindingsEnabled;
      }
      function ce() {
        return Ye.lFrame.lView;
      }
      function ht() {
        return Ye.lFrame.tView;
      }
      function ci(e) {
        return (Ye.lFrame.contextLView = e), e[8];
      }
      function jt(e) {
        return (Ye.lFrame.contextLView = null), e;
      }
      function _() {
        let e = y();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function y() {
        return Ye.lFrame.currentTNode;
      }
      function S(e, t) {
        const n = Ye.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function J() {
        return Ye.lFrame.isParent;
      }
      function wr() {
        return Ye.lFrame.bindingIndex++;
      }
      function An(e) {
        const t = Ye.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function ji(e, t) {
        const n = Ye.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), $i(t);
      }
      function $i(e) {
        Ye.lFrame.currentDirectiveIndex = e;
      }
      function zi() {
        return Ye.lFrame.currentQueryIndex;
      }
      function yo(e) {
        Ye.lFrame.currentQueryIndex = e;
      }
      function ga(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function di(e, t, n) {
        if (n & O.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & O.Host ||
              ((o = ga(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (Ye.lFrame = hi());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function fi(e) {
        const t = hi(),
          n = e[1];
        (Ye.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function hi() {
        const e = Ye.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Uo(e) : t;
      }
      function Uo(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function As() {
        const e = Ye.lFrame;
        return (
          (Ye.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Ts = As;
      function Wi() {
        const e = As();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function ln() {
        return Ye.lFrame.selectedIndex;
      }
      function br(e) {
        Ye.lFrame.selectedIndex = e;
      }
      function Ft() {
        const e = Ye.lFrame;
        return Fo(e.tView, e.selectedIndex);
      }
      function gi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: c,
              ngAfterViewInit: p,
              ngAfterViewChecked: D,
              ngOnDestroy: M,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            c &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, c),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, c)),
            p && (e.viewHooks || (e.viewHooks = [])).push(-n, p),
            D &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, D),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, D)),
            null != M && (e.destroyHooks || (e.destroyHooks = [])).push(n, M);
        }
      }
      function mi(e, t, n) {
        Rs(e, t, 3, n);
      }
      function yi(e, t, n, r) {
        (3 & e[2]) === n && Rs(e, t, n, r);
      }
      function vo(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Rs(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let c = 0;
        for (let p = void 0 !== r ? 65535 & e[18] : 0; p < s; p++)
          if ("number" == typeof t[p + 1]) {
            if (((c = t[p]), null != r && c >= r)) break;
          } else
            t[p] < 0 && (e[18] += 65536),
              (c < i || -1 == i) &&
                (f(e, n, t, p), (e[18] = (4294901760 & e[18]) + p + 2)),
              p++;
      }
      function f(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          c = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(c);
            } finally {
            }
          }
        } else
          try {
            i.call(c);
          } finally {
          }
      }
      const E = -1;
      class g {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function ft(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              c = n[r++];
            e.setAttribute(t, s, c, i);
          } else {
            const i = o,
              s = n[++r];
            xt(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Yt(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function xt(e) {
        return 64 === e.charCodeAt(0);
      }
      function Jt(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Mr(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Mr(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const c = e[i++];
            if ("number" == typeof c) {
              if (c === t) {
                s = -1;
                break;
              }
              if (c > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const c = e[i];
          if ("number" == typeof c) break;
          if (c === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Wn(e) {
        return e !== E;
      }
      function Nn(e) {
        return 32767 & e;
      }
      function tr(e, t) {
        let n = (function Sr(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Ur = !0;
      function eo(e) {
        const t = Ur;
        return (Ur = e), t;
      }
      let yl = 0;
      const Ir = {};
      function to(e, t) {
        const n = vi(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Yi(r.data, e),
          Yi(t, null),
          Yi(r.blueprint, null));
        const o = $o(e, t),
          i = e.injectorIndex;
        if (Wn(o)) {
          const s = Nn(o),
            c = tr(o, t),
            p = c[1].data;
          for (let D = 0; D < 8; D++) t[i + D] = c[s + D] | p[s + D];
        }
        return (t[i + 8] = o), i;
      }
      function Yi(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function vi(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function $o(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Cl(o)), null === r)) return E;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return E;
      }
      function Ki(e, t, n) {
        !(function vl(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(vn) && (r = n[vn]),
            null == r && (r = n[vn] = yl++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function _i(e, t, n) {
        if (n & O.Optional || void 0 !== e) return e;
        nt();
      }
      function Da(e, t, n, r) {
        if (
          (n & O.Optional && void 0 === r && (r = null),
          0 == (n & (O.Self | O.Host)))
        ) {
          const o = e[9],
            i = oe(void 0);
          try {
            return o ? o.get(t, r, n & O.Optional) : je(t, r, n & O.Optional);
          } finally {
            oe(i);
          }
        }
        return _i(r, 0, n);
      }
      function Ca(e, t, n, r = O.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function ba(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const c = Ea(i, s, n, r | O.Self, Ir);
                if (c !== Ir) return c;
                let p = i.parent;
                if (!p) {
                  const D = s[21];
                  if (D) {
                    const M = D.get(n, Ir, r);
                    if (M !== Ir) return M;
                  }
                  (p = Cl(s)), (s = s[15]);
                }
                i = p;
              }
              return o;
            })(e, t, n, r, Ir);
            if (s !== Ir) return s;
          }
          const i = Ea(e, t, n, r, Ir);
          if (i !== Ir) return i;
        }
        return Da(t, n, r, o);
      }
      function Ea(e, t, n, r, o) {
        const i = (function un(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(vn) ? e[vn] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : qi) : t;
        })(n);
        if ("function" == typeof i) {
          if (!di(t, e, r)) return r & O.Host ? _i(o, 0, r) : Da(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & O.Optional) return s;
            nt();
          } finally {
            Ts();
          }
        } else if ("number" == typeof i) {
          let s = null,
            c = vi(e, t),
            p = E,
            D = r & O.Host ? t[16][6] : null;
          for (
            (-1 === c || r & O.SkipSelf) &&
            ((p = -1 === c ? $o(e, t) : t[c + 8]),
            p !== E && Ps(r, !1)
              ? ((s = t[1]), (c = Nn(p)), (t = tr(p, t)))
              : (c = -1));
            -1 !== c;

          ) {
            const M = t[1];
            if (wa(i, c, M.data)) {
              const A = Dl(c, t, n, s, r, D);
              if (A !== Ir) return A;
            }
            (p = t[c + 8]),
              p !== E && Ps(r, t[1].data[c + 8] === D) && wa(i, c, t)
                ? ((s = M), (c = Nn(p)), (t = tr(p, t)))
                : (c = -1);
          }
        }
        return o;
      }
      function Dl(e, t, n, r, o, i) {
        const s = t[1],
          c = s.data[e + 8],
          M = Zi(
            c,
            s,
            n,
            null == r ? en(c) && Ur : r != s && 0 != (3 & c.type),
            o & O.Host && i === c
          );
        return null !== M ? Go(t, s, M, c) : Ir;
      }
      function Zi(e, t, n, r, o) {
        const i = e.providerIndexes,
          s = t.data,
          c = 1048575 & i,
          p = e.directiveStart,
          M = i >> 20,
          F = o ? c + M : e.directiveEnd;
        for (let V = r ? c : c + M; V < F; V++) {
          const re = s[V];
          if ((V < p && n === re) || (V >= p && re.type === n)) return V;
        }
        if (o) {
          const V = s[p];
          if (V && In(V) && V.type === n) return p;
        }
        return null;
      }
      function Go(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function b(e) {
            return e instanceof g;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function xe(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new fe(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function ae(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : K(e);
              })(i[n])
            );
          const c = eo(s.canSeeViewProviders);
          s.resolving = !0;
          const p = s.injectImpl ? oe(s.injectImpl) : null;
          di(e, r, O.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function va(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = po(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== p && oe(p), eo(c), (s.resolving = !1), Ts();
          }
        }
        return o;
      }
      function wa(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Ps(e, t) {
        return !(e & O.Self || (e & O.Host && t));
      }
      class no {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Ca(this._tNode, this._lView, t, r, n);
        }
      }
      function qi() {
        return new no(_(), ce());
      }
      function Ns(e) {
        return yt(() => {
          const t = e.prototype.constructor,
            n = t[nn] || Fs(t),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[nn] || Fs(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function Fs(e) {
        return Ae(e)
          ? () => {
              const t = Fs(Re(e));
              return t && t();
            }
          : wn(e);
      }
      function Cl(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      function Ma(e) {
        return (function _l(e, t) {
          if ("class" === t) return e.classes;
          if ("style" === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let o = 0;
            for (; o < r; ) {
              const i = n[o];
              if (Yt(i)) break;
              if (0 === i) o += 2;
              else if ("number" == typeof i)
                for (o++; o < r && "string" == typeof n[o]; ) o++;
              else {
                if (i === t) return n[o + 1];
                o += 2;
              }
            }
          }
          return null;
        })(_(), e);
      }
      const ro = "__parameters__";
      function Do(e, t, n) {
        return yt(() => {
          const r = (function Sa(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (c.annotation = s), c;
            function c(p, D, M) {
              const A = p.hasOwnProperty(ro)
                ? p[ro]
                : Object.defineProperty(p, ro, { value: [] })[ro];
              for (; A.length <= M; ) A.push(null);
              return (A[M] = A[M] || []).push(s), p;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class Vt {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = gt({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Yn(e, t) {
        void 0 === t && (t = e);
        for (let n = 0; n < e.length; n++) {
          let r = e[n];
          Array.isArray(r)
            ? (t === e && (t = e.slice(0, n)), Yn(r, t))
            : t !== e && t.push(r);
        }
        return t;
      }
      function jr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? jr(n, t) : t(n)));
      }
      function Aa(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Qi(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function h(e, t, n) {
        let r = w(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Zc(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function v(e, t) {
        const n = w(e, t);
        if (n >= 0) return e[1 | n];
      }
      function w(e, t) {
        return (function R(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const Wo = {},
        Co = "__NG_DI_FLAG__",
        Xi = "ngTempTokenPath",
        cm = /\n/gm,
        qc = "__source";
      let Bs;
      function es(e) {
        const t = Bs;
        return (Bs = e), t;
      }
      function fm(e, t = O.Default) {
        if (void 0 === Bs) throw new fe(-203, !1);
        return null === Bs
          ? je(e, void 0, t)
          : Bs.get(e, t & O.Optional ? null : void 0, t);
      }
      function dn(e, t = O.Default) {
        return (
          (function $() {
            return P;
          })() || fm
        )(Re(e), t);
      }
      function Qc(e, t = O.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          dn(e, t)
        );
      }
      function Il(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = Re(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new fe(900, !1);
            let o,
              i = O.Default;
            for (let s = 0; s < r.length; s++) {
              const c = r[s],
                p = hm(c);
              "number" == typeof p
                ? -1 === p
                  ? (o = c.token)
                  : (i |= p)
                : (o = c);
            }
            t.push(dn(o, i));
          } else t.push(dn(r));
        }
        return t;
      }
      function Us(e, t) {
        return (e[Co] = t), (e.prototype[Co] = t), e;
      }
      function hm(e) {
        return e[Co];
      }
      const js = Us(Do("Optional"), 8),
        Hs = Us(Do("SkipSelf"), 4);
      var oo = (() => (
        ((oo = oo || {})[(oo.Important = 1)] = "Important"),
        (oo[(oo.DashCase = 2)] = "DashCase"),
        oo
      ))();
      const Rl = new Map();
      let Om = 0;
      const Nl = "__ngContext__";
      function Ln(e, t) {
        Ut(t)
          ? ((e[Nl] = t[20]),
            (function Pm(e) {
              Rl.set(e[20], e);
            })(t))
          : (e[Nl] = t);
      }
      function Ll(e, t) {
        return undefined(e, t);
      }
      function Ws(e) {
        const t = e[3];
        return Cn(t) ? t[3] : t;
      }
      function kl(e) {
        return vd(e[13]);
      }
      function Vl(e) {
        return vd(e[4]);
      }
      function vd(e) {
        for (; null !== e && !Cn(e); ) e = e[4];
        return e;
      }
      function ns(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Cn(r) ? (i = r) : Ut(r) && ((s = !0), (r = r[0]));
          const c = Tt(r);
          0 === e && null !== n
            ? null == o
              ? bd(t, n, c)
              : Mi(t, n, c, o || null, !0)
            : 1 === e && null !== n
            ? Mi(t, n, c, o || null, !0)
            : 2 === e
            ? (function zl(e, t, n) {
                const r = Oa(e, t);
                r &&
                  (function ty(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, c, s)
            : 3 === e && t.destroyNode(c),
            null != i &&
              (function oy(e, t, n, r, o) {
                const i = n[7];
                i !== Tt(n) && ns(t, e, r, i, o);
                for (let c = 10; c < n.length; c++) {
                  const p = n[c];
                  Ys(p[1], p, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Ul(e, t, n) {
        return e.createElement(t, n);
      }
      function Dd(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), Jr(o, -1)), n.splice(r, 1);
      }
      function jl(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && Dd(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = Qi(e, 10 + t);
          !(function Ym(e, t) {
            Ys(e, t, t[11], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function Cd(e, t) {
        if (!(128 & t[2])) {
          const n = t[11];
          n.destroyNode && Ys(e, t, n, 3, null, null),
            (function qm(e) {
              let t = e[13];
              if (!t) return Hl(e[1], e);
              for (; t; ) {
                let n = null;
                if (Ut(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Ut(t) && Hl(t[1], t), (t = t[3]);
                  null === t && (t = e), Ut(t) && Hl(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Hl(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function ey(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof g)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const c = o[i[s]],
                          p = i[s + 1];
                        try {
                          p.call(c);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function Xm(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      c = "function" == typeof s ? s(t) : Tt(t[s]),
                      p = r[(o = n[i + 2])],
                      D = n[i + 3];
                    "boolean" == typeof D
                      ? c.removeEventListener(n[i], p, D)
                      : D >= 0
                      ? r[(o = D)]()
                      : r[(o = -D)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[11].destroy();
          const n = t[17];
          if (null !== n && Cn(t[3])) {
            n !== t[3] && Dd(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function Nm(e) {
            Rl.delete(e[20]);
          })(t);
        }
      }
      function Ed(e, t, n) {
        return (function wd(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const o = e.data[r.directiveStart].encapsulation;
            if (o === Kt.None || o === Kt.Emulated) return null;
          }
          return qt(r, n);
        })(e, t.parent, n);
      }
      function Mi(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function bd(e, t, n) {
        e.appendChild(t, n);
      }
      function Md(e, t, n, r, o) {
        null !== r ? Mi(e, t, n, r, o) : bd(e, t, n);
      }
      function Oa(e, t) {
        return e.parentNode(t);
      }
      let Zl,
        Ad = function Id(e, t, n) {
          return 40 & e.type ? qt(e, n) : null;
        };
      function Ra(e, t, n, r) {
        const o = Ed(e, r, t),
          i = t[11],
          c = (function Sd(e, t, n) {
            return Ad(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let p = 0; p < n.length; p++) Md(i, o, n[p], c, !1);
          else Md(i, o, n, c, !1);
      }
      function Pa(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return qt(t, e);
          if (4 & n) return Gl(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Pa(e, r);
            {
              const o = e[t.index];
              return Cn(o) ? Gl(-1, o) : Tt(o);
            }
          }
          if (32 & n) return Ll(t, e)() || Tt(e[t.index]);
          {
            const r = xd(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Pa(Ws(e[16]), r)
              : Pa(e, t.next);
          }
        }
        return null;
      }
      function xd(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function Gl(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return Pa(r, o);
        }
        return t[7];
      }
      function Wl(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const c = r[n.index],
            p = n.type;
          if (
            (s && 0 === t && (c && Ln(Tt(c), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & p) Wl(e, t, n.child, r, o, i, !1), ns(t, e, o, c, i);
            else if (32 & p) {
              const D = Ll(n, r);
              let M;
              for (; (M = D()); ) ns(t, e, o, M, i);
              ns(t, e, o, c, i);
            } else 16 & p ? Od(e, t, r, n, o, i) : ns(t, e, o, c, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Ys(e, t, n, r, o, i) {
        Wl(n, r, e.firstChild, t, o, i, !1);
      }
      function Od(e, t, n, r, o, i) {
        const s = n[16],
          p = s[6].projection[r.projection];
        if (Array.isArray(p))
          for (let D = 0; D < p.length; D++) ns(t, e, o, p[D], i);
        else Wl(e, t, p, s[3], o, i, !0);
      }
      function Rd(e, t, n) {
        e.setAttribute(t, "style", n);
      }
      function Yl(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function uy(e) {
        Zl = e;
      }
      class kd {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function Yo(e) {
        return e instanceof kd ? e.changingThisBreaksApplicationSecurity : e;
      }
      const _y =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var fn = (() => (
        ((fn = fn || {})[(fn.NONE = 0)] = "NONE"),
        (fn[(fn.HTML = 1)] = "HTML"),
        (fn[(fn.STYLE = 2)] = "STYLE"),
        (fn[(fn.SCRIPT = 3)] = "SCRIPT"),
        (fn[(fn.URL = 4)] = "URL"),
        (fn[(fn.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        fn
      ))();
      function tu(e) {
        const t = (function qs() {
          const e = ce();
          return e && e[12];
        })();
        return t
          ? t.sanitize(fn.URL, e) || ""
          : (function Ks(e, t) {
              const n = (function gy(e) {
                return (e instanceof kd && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(
                  `Required a safe ${t}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === t;
            })(e, "URL")
          ? Yo(e)
          : (function Jl(e) {
              return (e = String(e)).match(_y) ? e : "unsafe:" + e;
            })(K(e));
      }
      const nu = new Vt("ENVIRONMENT_INITIALIZER"),
        zd = new Vt("INJECTOR", -1),
        Wd = new Vt("INJECTOR_DEF_TYPES");
      class Yd {
        get(t, n = Wo) {
          if (n === Wo) {
            const r = new Error(`NullInjectorError: No provider for ${Ne(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function Py(...e) {
        return { ɵproviders: Kd(0, e) };
      }
      function Kd(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          jr(t, (i) => {
            const s = i;
            ru(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Zd(o, n),
          n
        );
      }
      function Zd(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          jr(o, (i) => {
            t.push(i);
          });
        }
      }
      function ru(e, t, n, r) {
        if (!(e = Re(e))) return !1;
        let o = null,
          i = yn(e);
        const s = !i && T(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const p = e.ngModule;
          if (((i = yn(p)), !i)) return !1;
          o = p;
        }
        const c = r.has(o);
        if (s) {
          if (c) return !1;
          if ((r.add(o), s.dependencies)) {
            const p =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const D of p) ru(D, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !c) {
              let D;
              r.add(o);
              try {
                jr(i.imports, (M) => {
                  ru(M, t, n, r) && (D || (D = []), D.push(M));
                });
              } finally {
              }
              void 0 !== D && Zd(D, t);
            }
            if (!c) {
              const D = wn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: D, deps: it },
                { provide: Wd, useValue: o, multi: !0 },
                { provide: nu, useValue: () => dn(o), multi: !0 }
              );
            }
            const p = i.providers;
            null == p ||
              c ||
              jr(p, (M) => {
                t.push(M);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      const Ny = X({ provide: String, useValue: X });
      function ou(e) {
        return null !== e && "object" == typeof e && Ny in e;
      }
      function Ii(e) {
        return "function" == typeof e;
      }
      const iu = new Vt("Set Injector scope."),
        ka = {},
        Ly = {};
      let su;
      function Va() {
        return void 0 === su && (su = new Yd()), su;
      }
      class Ai {}
      class Qd extends Ai {
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            lu(t, (s) => this.processProvider(s)),
            this.records.set(zd, rs(void 0, this)),
            o.has("environment") && this.records.set(Ai, rs(void 0, this));
          const i = this.records.get(iu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Wd.multi, it, O.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = es(this),
            r = oe(void 0);
          try {
            return t();
          } finally {
            es(n), oe(r);
          }
        }
        get(t, n = Wo, r = O.Default) {
          this.assertNotDestroyed();
          const o = es(this),
            i = oe(void 0);
          try {
            if (!(r & O.SkipSelf)) {
              let c = this.records.get(t);
              if (void 0 === c) {
                const p =
                  (function jy(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof Vt)
                    );
                  })(t) && Mn(t);
                (c = p && this.injectableDefInScope(p) ? rs(au(t), ka) : null),
                  this.records.set(t, c);
              }
              if (null != c) return this.hydrate(t, c);
            }
            return (r & O.Self ? Va() : this.parent).get(
              t,
              (n = r & O.Optional && n === Wo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Xi] = s[Xi] || []).unshift(Ne(t)), o)) throw s;
              return (function pm(e, t, n, r) {
                const o = e[Xi];
                throw (
                  (t[qc] && o.unshift(t[qc]),
                  (e.message = (function gm(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = Ne(t);
                    if (Array.isArray(t)) o = t.map(Ne).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let c = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof c ? JSON.stringify(c) : Ne(c))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      cm,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Xi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            oe(i), es(o);
          }
        }
        resolveInjectorInitializers() {
          const t = es(this),
            n = oe(void 0);
          try {
            const r = this.get(nu.multi, it, O.Self);
            for (const o of r) o();
          } finally {
            es(t), oe(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(Ne(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new fe(205, !1);
        }
        processProvider(t) {
          let n = Ii((t = Re(t))) ? t : Re(t && t.provide);
          const r = (function Vy(e) {
            return ou(e) ? rs(void 0, e.useValue) : rs(Xd(e), ka);
          })(t);
          if (Ii(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = rs(void 0, ka, !0)),
              (o.factory = () => Il(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === ka && ((n.value = Ly), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function Uy(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = Re(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function au(e) {
        const t = Mn(e),
          n = null !== t ? t.factory : wn(e);
        if (null !== n) return n;
        if (e instanceof Vt) throw new fe(204, !1);
        if (e instanceof Function)
          return (function ky(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function bi(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new fe(204, !1))
              );
            const n = (function qn(e) {
              const t = e && (e[Vn] || e[Bn]);
              if (t) {
                const n = (function kt(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new fe(204, !1);
      }
      function Xd(e, t, n) {
        let r;
        if (Ii(e)) {
          const o = Re(e);
          return wn(o) || au(o);
        }
        if (ou(e)) r = () => Re(e.useValue);
        else if (
          (function Jd(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Il(e.deps || []));
        else if (
          (function qd(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => dn(Re(e.useExisting));
        else {
          const o = Re(e && (e.useClass || e.provide));
          if (
            !(function By(e) {
              return !!e.deps;
            })(e)
          )
            return wn(o) || au(o);
          r = () => new o(...Il(e.deps));
        }
        return r;
      }
      function rs(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Hy(e) {
        return !!e.ɵproviders;
      }
      function lu(e, t) {
        for (const n of e)
          Array.isArray(n) ? lu(n, t) : Hy(n) ? lu(n.ɵproviders, t) : t(n);
      }
      class ef {}
      class zy {
        resolveComponentFactory(t) {
          throw (function Gy(e) {
            const t = Error(
              `No component factory found for ${Ne(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Js = (() => {
        class e {}
        return (e.NULL = new zy()), e;
      })();
      function Wy() {
        return os(_(), ce());
      }
      function os(e, t) {
        return new Qs(qt(e, t));
      }
      let Qs = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = Wy), e;
      })();
      function Yy(e) {
        return e instanceof Qs ? e.nativeElement : e;
      }
      class nf {}
      let Ky = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function Zy() {
                const e = ce(),
                  n = bn(_().index, e);
                return (Ut(n) ? n : e)[11];
              })()),
            e
          );
        })(),
        qy = (() => {
          class e {}
          return (
            (e.ɵprov = gt({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class rf {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Jy = new rf("14.3.0"),
        uu = {};
      function du(e) {
        return e.ngOriginalError;
      }
      class Xs {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && du(t);
          for (; n && du(n); ) n = du(n);
          return n || null;
        }
      }
      function wo(e) {
        return e instanceof Function ? e() : e;
      }
      function af(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const lf = "ng-template";
      function lv(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== af(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function uf(e) {
        return 4 === e.type && e.value !== lf;
      }
      function uv(e, t, n) {
        return t === (4 !== e.type || n ? e.value : lf);
      }
      function cv(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function hv(e) {
            for (let t = 0; t < e.length; t++) if (Yt(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let c = 0; c < t.length; c++) {
          const p = t[c];
          if ("number" != typeof p) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== p && !uv(e, p, n)) || ("" === p && 1 === t.length))
                ) {
                  if (Hr(r)) return !1;
                  s = !0;
                }
              } else {
                const D = 8 & r ? p : t[++c];
                if (8 & r && null !== e.attrs) {
                  if (!lv(e.attrs, D, n)) {
                    if (Hr(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const A = dv(8 & r ? "class" : p, o, uf(e), n);
                if (-1 === A) {
                  if (Hr(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== D) {
                  let F;
                  F = A > i ? "" : o[A + 1].toLowerCase();
                  const V = 8 & r ? F : null;
                  if ((V && -1 !== af(V, D, 0)) || (2 & r && D !== F)) {
                    if (Hr(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Hr(r) && !Hr(p)) return !1;
            if (s && Hr(p)) continue;
            (s = !1), (r = p | (1 & r));
          }
        }
        return Hr(r) || s;
      }
      function Hr(e) {
        return 0 == (1 & e);
      }
      function dv(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let c = t[++o];
                for (; "string" == typeof c; ) c = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function pv(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function cf(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (cv(e, t[r], n)) return !0;
        return !1;
      }
      function df(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function mv(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const c = e[++n];
              o += "[" + s + (c.length > 0 ? '="' + c + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Hr(s) && ((t += df(i, o)), (o = "")),
              (r = s),
              (i = i || !Hr(r));
          n++;
        }
        return "" !== o && (t += df(i, o)), t;
      }
      const dt = {};
      function ff(e) {
        hf(ht(), ce(), ln() + e, !1);
      }
      function hf(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && mi(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && yi(t, i, 0, n);
          }
        br(n);
      }
      function yf(e, t = null, n = null, r) {
        const o = vf(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function vf(e, t = null, n = null, r, o = new Set()) {
        const i = [n || it, Py(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : Ne(e))),
          new Qd(i, t || Va(), r || null, o)
        );
      }
      let Ti = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return yf({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return yf({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Wo),
          (e.NULL = new Yd()),
          (e.ɵprov = gt({
            token: e,
            providedIn: "any",
            factory: () => dn(zd),
          })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function as(e, t = O.Default) {
        const n = ce();
        return null === n ? dn(e, t) : Ca(_(), n, Re(e), t);
      }
      function Mf() {
        throw new Error("invalid");
      }
      function Ua(e, t) {
        return (e << 17) | (t << 2);
      }
      function $r(e) {
        return (e >> 17) & 32767;
      }
      function mu(e) {
        return 2 | e;
      }
      function bo(e) {
        return (131068 & e) >> 2;
      }
      function yu(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function vu(e) {
        return 1 | e;
      }
      function Lf(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              yo(o), s.contentQueries(2, t[i], i);
            }
          }
      }
      function $a(e, t, n, r, o, i, s, c, p, D, M) {
        const A = t.blueprint.slice();
        return (
          (A[0] = o),
          (A[2] = 76 | r),
          (null !== M || (e && 1024 & e[2])) && (A[2] |= 1024),
          qr(A),
          (A[3] = A[15] = e),
          (A[8] = n),
          (A[10] = s || (e && e[10])),
          (A[11] = c || (e && e[11])),
          (A[12] = p || (e && e[12]) || null),
          (A[9] = D || (e && e[9]) || null),
          (A[6] = i),
          (A[20] = (function Rm() {
            return Om++;
          })()),
          (A[21] = M),
          (A[16] = 2 == t.type ? e[16] : A),
          A
        );
      }
      function ls(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Su(e, t, n, r, o) {
            const i = y(),
              s = J(),
              p = (e.data[t] = (function Qv(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = p),
              null !== i &&
                (s
                  ? null == i.child && null !== p.parent && (i.child = p)
                  : null === i.next && (i.next = p)),
              p
            );
          })(e, t, n, r, o)),
            (function pa() {
              return Ye.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function m() {
            const e = Ye.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return S(i, !0), i;
      }
      function us(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Iu(e, t, n) {
        fi(t);
        try {
          const r = e.viewQuery;
          null !== r && Fu(1, r, n);
          const o = e.template;
          null !== o && kf(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Lf(e, t),
            e.staticViewQueries && Fu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function Zv(e, t) {
              for (let n = 0; n < t.length; n++) p_(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Wi();
        }
      }
      function Ga(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          fi(t);
          try {
            qr(t),
              (function ar(e) {
                return (Ye.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && kf(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const D = e.preOrderCheckHooks;
              null !== D && mi(t, D, null);
            } else {
              const D = e.preOrderHooks;
              null !== D && yi(t, D, 0, null), vo(t, 0);
            }
            if (
              ((function f_(e) {
                for (let t = kl(e); null !== t; t = Vl(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r],
                      i = o[3];
                    0 == (512 & o[2]) && Jr(i, 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function d_(e) {
                for (let t = kl(e); null !== t; t = Vl(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    Vr(r) && Ga(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && Lf(e, t),
              s)
            ) {
              const D = e.contentCheckHooks;
              null !== D && mi(t, D);
            } else {
              const D = e.contentHooks;
              null !== D && yi(t, D, 1), vo(t, 1);
            }
            !(function Yv(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) br(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        c = n[++r];
                      ji(s, i), c(2, t[i]);
                    }
                  }
                } finally {
                  br(-1);
                }
            })(e, t);
            const c = e.components;
            null !== c &&
              (function Kv(e, t) {
                for (let n = 0; n < t.length; n++) h_(e, t[n]);
              })(t, c);
            const p = e.viewQuery;
            if ((null !== p && Fu(2, p, r), s)) {
              const D = e.viewCheckHooks;
              null !== D && mi(t, D);
            } else {
              const D = e.viewHooks;
              null !== D && yi(t, D, 2), vo(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), Jr(t[3], -1));
          } finally {
            Wi();
          }
        }
      }
      function kf(e, t, n, r, o) {
        const i = ln(),
          s = 2 & r;
        try {
          br(-1), s && t.length > 22 && hf(e, t, 22, !1), n(r, o);
        } finally {
          br(i);
        }
      }
      function Au(e, t, n) {
        !Qr() ||
          ((function r_(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            e.firstCreatePass || to(n, t), Ln(r, t);
            const s = n.initialInputs;
            for (let c = o; c < i; c++) {
              const p = e.data[c],
                D = In(p);
              D && l_(t, n, p);
              const M = Go(t, e, c, n);
              Ln(M, t),
                null !== s && u_(0, c - o, M, p, 0, s),
                D && (bn(n.index, t)[8] = M);
            }
          })(e, t, n, qt(n, t)),
          128 == (128 & n.flags) &&
            (function o_(e, t, n) {
              const r = n.directiveStart,
                o = n.directiveEnd,
                i = n.index,
                s = (function Hi() {
                  return Ye.lFrame.currentDirectiveIndex;
                })();
              try {
                br(i);
                for (let c = r; c < o; c++) {
                  const p = e.data[c],
                    D = t[c];
                  $i(c),
                    (null !== p.hostBindings ||
                      0 !== p.hostVars ||
                      null !== p.hostAttrs) &&
                      zf(p, D);
                }
              } finally {
                br(-1), $i(s);
              }
            })(e, t, n));
      }
      function Tu(e, t, n = qt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              c = -1 === s ? n(t, e) : e[s];
            e[o++] = c;
          }
        }
      }
      function Bf(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = xu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function xu(e, t, n, r, o, i, s, c, p, D) {
        const M = 22 + r,
          A = M + o,
          F = (function qv(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : dt);
            return n;
          })(M, A),
          V = "function" == typeof D ? D() : D;
        return (F[1] = {
          type: e,
          blueprint: F,
          template: n,
          queries: null,
          viewQuery: c,
          declTNode: t,
          data: F.slice().fill(null, M),
          bindingStartIndex: M,
          expandoStartIndex: A,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: p,
          consts: V,
          incompleteFirstPass: !1,
        });
      }
      function Uf(e, t, n, r) {
        const o = qf(t);
        null === n
          ? o.push(r)
          : (o.push(n), e.firstCreatePass && Jf(e).push(r, o.length - 1));
      }
      function jf(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const o = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, o)
              : (n[r] = [t, o]);
          }
        return n;
      }
      function Hf(e, t) {
        const r = t.directiveEnd,
          o = e.data,
          i = t.attrs,
          s = [];
        let c = null,
          p = null;
        for (let D = t.directiveStart; D < r; D++) {
          const M = o[D],
            A = M.inputs,
            F = null === i || uf(t) ? null : c_(A, i);
          s.push(F), (c = jf(A, D, c)), (p = jf(M.outputs, D, p));
        }
        null !== c &&
          (c.hasOwnProperty("class") && (t.flags |= 16),
          c.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = c),
          (t.outputs = p);
      }
      function ur(e, t, n, r, o, i, s, c) {
        const p = qt(t, n);
        let M,
          D = t.inputs;
        !c && null != D && (M = D[r])
          ? (Lu(e, n, M, r, o), en(t) && $f(n, t.index))
          : 3 & t.type &&
            ((r = (function Xv(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (o = null != s ? s(o, t.value || "", r) : o),
            i.setProperty(p, r, o));
      }
      function $f(e, t) {
        const n = bn(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function Ou(e, t, n, r) {
        let o = !1;
        if (Qr()) {
          const i = (function i_(e, t, n) {
              const r = e.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  cf(n, s.selectors, !1) &&
                    (o || (o = []),
                    Ki(to(n, t), e, s.type),
                    In(s) ? (Wf(e, n), o.unshift(s)) : o.push(s));
                }
              return o;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== i) {
            (o = !0), Yf(n, e.data.length, i.length);
            for (let M = 0; M < i.length; M++) {
              const A = i[M];
              A.providersResolver && A.providersResolver(A);
            }
            let c = !1,
              p = !1,
              D = us(e, t, i.length, null);
            for (let M = 0; M < i.length; M++) {
              const A = i[M];
              (n.mergedAttrs = Jt(n.mergedAttrs, A.hostAttrs)),
                Kf(e, n, t, D, A),
                a_(D, A, s),
                null !== A.contentQueries && (n.flags |= 8),
                (null !== A.hostBindings ||
                  null !== A.hostAttrs ||
                  0 !== A.hostVars) &&
                  (n.flags |= 128);
              const F = A.type.prototype;
              !c &&
                (F.ngOnChanges || F.ngOnInit || F.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (c = !0)),
                !p &&
                  (F.ngOnChanges || F.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (p = !0)),
                D++;
            }
            Hf(e, n);
          }
          s &&
            (function s_(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let o = 0; o < t.length; o += 2) {
                  const i = n[t[o + 1]];
                  if (null == i) throw new fe(-301, !1);
                  r.push(t[o], i);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = Jt(n.mergedAttrs, n.attrs)), o;
      }
      function Gf(e, t, n, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let c = e.hostBindingOpCodes;
          null === c && (c = e.hostBindingOpCodes = []);
          const p = ~t.index;
          (function n_(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(c) != p && c.push(p),
            c.push(r, o, s);
        }
      }
      function zf(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Wf(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function a_(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          In(t) && (n[""] = e);
        }
      }
      function Yf(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function Kf(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = wn(o.type)),
          s = new g(i, In(o), as);
        (e.blueprint[r] = s),
          (n[r] = s),
          Gf(e, t, 0, r, us(e, n, o.hostVars, dt), o);
      }
      function l_(e, t, n) {
        const r = qt(t, e),
          o = Bf(n),
          i = e[10],
          s = za(
            e,
            $a(
              e,
              o,
              null,
              n.onPush ? 32 : 16,
              r,
              t,
              i,
              i.createRenderer(r, n),
              null,
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function io(e, t, n, r, o, i) {
        const s = qt(e, t);
        !(function Ru(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const c = null == s ? K(i) : s(i, r || "", o);
            e.setAttribute(t, o, c, n);
          }
        })(t[11], s, i, e.value, n, r, o);
      }
      function u_(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const c = r.setInput;
          for (let p = 0; p < s.length; ) {
            const D = s[p++],
              M = s[p++],
              A = s[p++];
            null !== c ? r.setInput(n, A, D, M) : (n[M] = A);
          }
        }
      }
      function c_(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              e.hasOwnProperty(o) &&
                (null === n && (n = []), n.push(o, e[o], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function Zf(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function h_(e, t) {
        const n = bn(t, e);
        if (Vr(n)) {
          const r = n[1];
          48 & n[2] ? Ga(r, n, r.template, n[8]) : n[5] > 0 && Pu(n);
        }
      }
      function Pu(e) {
        for (let r = kl(e); null !== r; r = Vl(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (Vr(i))
              if (512 & i[2]) {
                const s = i[1];
                Ga(s, i, s.template, i[8]);
              } else i[5] > 0 && Pu(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = bn(n[r], e);
            Vr(o) && o[5] > 0 && Pu(o);
          }
      }
      function p_(e, t) {
        const n = bn(t, e),
          r = n[1];
        (function g_(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Iu(r, n, n[8]);
      }
      function za(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Nu(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = Ws(e);
          if (Ao(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Wa(e, t, n, r = !0) {
        const o = t[10];
        o.begin && o.begin();
        try {
          Ga(e, t, e.template, n);
        } catch (s) {
          throw (r && Xf(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Fu(e, t, n) {
        yo(0), t(e, n);
      }
      function qf(e) {
        return e[7] || (e[7] = []);
      }
      function Jf(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Xf(e, t) {
        const n = e[9],
          r = n ? n.get(Xs, null) : null;
        r && r.handleError(t);
      }
      function Lu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            c = n[i++],
            p = t[s],
            D = e.data[s];
          null !== D.setInput ? D.setInput(p, o, r, c) : (p[c] = o);
        }
      }
      function Mo(e, t, n) {
        const r = Zr(t, e);
        !(function _d(e, t, n) {
          e.setValue(t, n);
        })(e[11], r, n);
      }
      function Ya(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const c = t[s];
            "number" == typeof c
              ? (i = c)
              : 1 == i
              ? (o = Qe(o, c))
              : 2 == i && (r = Qe(r, c + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Ka(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Tt(i)), Cn(i)))
            for (let c = 10; c < i.length; c++) {
              const p = i[c],
                D = p[1].firstChild;
              null !== D && Ka(p[1], p, D, r);
            }
          const s = n.type;
          if (8 & s) Ka(e, t, n.child, r);
          else if (32 & s) {
            const c = Ll(n, t);
            let p;
            for (; (p = c()); ) r.push(p);
          } else if (16 & s) {
            const c = xd(t, n);
            if (Array.isArray(c)) r.push(...c);
            else {
              const p = Ws(t[16]);
              Ka(p[1], p, c, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class ea {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Ka(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Cn(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (jl(t, r), Qi(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Cd(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Uf(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Nu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          Wa(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new fe(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Zm(e, t) {
              Ys(e, t, t[11], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new fe(902, !1);
          this._appRef = t;
        }
      }
      class m_ extends ea {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Wa(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class ku extends Js {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = T(t);
          return new ta(n, this.ngModule);
        }
      }
      function eh(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class v_ {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          const o = this.injector.get(t, uu, r);
          return o !== uu || n === uu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class ta extends ef {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function yv(e) {
              return e.map(mv).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return eh(this.componentDef.inputs);
        }
        get outputs() {
          return eh(this.componentDef.outputs);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Ai ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new v_(t, i) : t,
            c = s.get(nf, null);
          if (null === c) throw new fe(407, !1);
          const p = s.get(qy, null),
            D = c.createRenderer(null, this.componentDef),
            M = this.componentDef.selectors[0][0] || "div",
            A = r
              ? (function Jv(e, t, n) {
                  return e.selectRootElement(t, n === Kt.ShadowDom);
                })(D, r, this.componentDef.encapsulation)
              : Ul(
                  D,
                  M,
                  (function y_(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(M)
                ),
            F = this.componentDef.onPush ? 288 : 272,
            V = xu(0, null, null, 1, 0, null, null, null, null, null),
            re = $a(null, V, null, F, null, null, c, D, p, s, null);
          let _e, Oe;
          fi(re);
          try {
            const Fe = (function C_(e, t, n, r, o, i) {
              const s = n[1];
              n[22] = e;
              const p = ls(s, 22, 2, "#host", null),
                D = (p.mergedAttrs = t.hostAttrs);
              null !== D &&
                (Ya(p, D, !0),
                null !== e &&
                  (ft(o, e, D),
                  null !== p.classes && Yl(o, e, p.classes),
                  null !== p.styles && Rd(o, e, p.styles)));
              const M = r.createRenderer(e, t),
                A = $a(
                  n,
                  Bf(t),
                  null,
                  t.onPush ? 32 : 16,
                  n[22],
                  p,
                  r,
                  M,
                  i || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Ki(to(p, n), s, t.type), Wf(s, p), Yf(p, n.length, 1)),
                za(n, A),
                (n[22] = A)
              );
            })(A, this.componentDef, re, c, D);
            if (A)
              if (r) ft(D, A, ["ng-version", Jy.full]);
              else {
                const { attrs: qe, classes: pe } = (function vv(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    o = 2;
                  for (; r < e.length; ) {
                    let i = e[r];
                    if ("string" == typeof i)
                      2 === o
                        ? "" !== i && t.push(i, e[++r])
                        : 8 === o && n.push(i);
                    else {
                      if (!Hr(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                qe && ft(D, A, qe),
                  pe && pe.length > 0 && Yl(D, A, pe.join(" "));
              }
            if (((Oe = Fo(V, 22)), void 0 !== n)) {
              const qe = (Oe.projection = []);
              for (let pe = 0; pe < this.ngContentSelectors.length; pe++) {
                const st = n[pe];
                qe.push(null != st ? Array.from(st) : null);
              }
            }
            (_e = (function E_(e, t, n, r) {
              const o = n[1],
                i = (function t_(e, t, n) {
                  const r = _();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Kf(e, r, t, us(e, t, 1, null), n),
                    Hf(e, r));
                  const o = Go(t, e, r.directiveStart, r);
                  Ln(o, t);
                  const i = qt(r, t);
                  return i && Ln(i, t), o;
                })(o, n, t);
              if (((e[8] = n[8] = i), null !== r)) for (const c of r) c(i, t);
              if (t.contentQueries) {
                const c = _();
                t.contentQueries(1, i, c.directiveStart);
              }
              const s = _();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (br(s.index),
                  Gf(n[1], s, 0, s.directiveStart, s.directiveEnd, t),
                  zf(t, i)),
                i
              );
            })(Fe, this.componentDef, re, [w_])),
              Iu(V, re, null);
          } finally {
            Wi();
          }
          return new D_(this.componentType, _e, os(Oe, re), re, Oe);
        }
      }
      class D_ extends class $y {} {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new m_(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Lu(i[1], i, o, t, n), $f(i, this._tNode.index);
          }
        }
        get injector() {
          return new no(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function w_() {
        const e = _();
        gi(ce()[1], e);
      }
      function Vu(e) {
        let t = (function th(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let o;
          if (In(e)) o = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new fe(903, !1);
            o = t.ɵdir;
          }
          if (o) {
            if (n) {
              r.push(o);
              const s = e;
              (s.inputs = Bu(e.inputs)),
                (s.declaredInputs = Bu(e.declaredInputs)),
                (s.outputs = Bu(e.outputs));
              const c = o.hostBindings;
              c && I_(e, c);
              const p = o.viewQuery,
                D = o.contentQueries;
              if (
                (p && M_(e, p),
                D && S_(e, D),
                Me(e.inputs, o.inputs),
                Me(e.declaredInputs, o.declaredInputs),
                Me(e.outputs, o.outputs),
                In(o) && o.data.animation)
              ) {
                const M = e.data;
                M.animation = (M.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const c = i[s];
                c && c.ngInherit && c(e), c === Vu && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function b_(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = t += o.hostVars),
              (o.hostAttrs = Jt(o.hostAttrs, (n = Jt(n, o.hostAttrs))));
          }
        })(r);
      }
      function Bu(e) {
        return e === Zt ? {} : e === it ? [] : e;
      }
      function M_(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      function S_(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, o, i) => {
              t(r, o, i), n(r, o, i);
            }
          : t;
      }
      function I_(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, o) => {
              t(r, o), n(r, o);
            }
          : t;
      }
      let Za = null;
      function xi() {
        if (!Za) {
          const e = He.Symbol;
          if (e && e.iterator) Za = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Za = r);
            }
          }
        }
        return Za;
      }
      function na(e) {
        return (
          !!Uu(e) && (Array.isArray(e) || (!(e instanceof Map) && xi() in e))
        );
      }
      function Uu(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function kn(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function ju(e, t, n, r) {
        const o = ce();
        return kn(o, wr(), t) && (ht(), io(Ft(), o, e, t, n, r)), ju;
      }
      function ds(e, t, n, r) {
        return kn(e, wr(), n) ? t + K(n) + r : dt;
      }
      function fs(e, t, n, r, o, i) {
        const c = (function Oi(e, t, n, r) {
          const o = kn(e, t, n);
          return kn(e, t + 1, r) || o;
        })(
          e,
          (function an() {
            return Ye.lFrame.bindingIndex;
          })(),
          n,
          o
        );
        return An(2), c ? t + K(n) + r + K(o) + i : dt;
      }
      function dh(e, t, n, r, o, i, s, c) {
        const p = ce(),
          D = ht(),
          M = e + 22,
          A = D.firstCreatePass
            ? (function F_(e, t, n, r, o, i, s, c, p) {
                const D = t.consts,
                  M = ls(t, e, 4, s || null, er(D, c));
                Ou(t, n, M, er(D, p)), gi(t, M);
                const A = (M.tViews = xu(
                  2,
                  M,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  D
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, M),
                    (A.queries = t.queries.embeddedTView(M))),
                  M
                );
              })(M, D, p, t, n, r, o, i, s)
            : D.data[M];
        S(A, !1);
        const F = p[11].createComment("");
        Ra(D, p, F, A),
          Ln(F, p),
          za(p, (p[M] = Zf(F, p, F, A))),
          mr(A) && Au(D, p, A),
          null != s && Tu(p, A, c);
      }
      function fh(e) {
        return (function Rn(e, t) {
          return e[t];
        })(
          (function Pn() {
            return Ye.lFrame.contextLView;
          })(),
          22 + e
        );
      }
      function Hu(e, t, n) {
        const r = ce();
        return kn(r, wr(), t) && ur(ht(), Ft(), r, e, t, r[11], n, !1), Hu;
      }
      function $u(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Lu(e, n, t.inputs[s], s, r);
      }
      function Ja(e, t, n, r) {
        const o = ce(),
          i = ht(),
          s = 22 + e,
          c = o[11],
          p = (o[s] = Ul(
            c,
            t,
            (function ya() {
              return Ye.lFrame.currentNamespace;
            })()
          )),
          D = i.firstCreatePass
            ? (function k_(e, t, n, r, o, i, s) {
                const c = t.consts,
                  D = ls(t, e, 2, o, er(c, i));
                return (
                  Ou(t, n, D, er(c, s)),
                  null !== D.attrs && Ya(D, D.attrs, !1),
                  null !== D.mergedAttrs && Ya(D, D.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, D),
                  D
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        S(D, !0);
        const M = D.mergedAttrs;
        null !== M && ft(c, p, M);
        const A = D.classes;
        null !== A && Yl(c, p, A);
        const F = D.styles;
        return (
          null !== F && Rd(c, p, F),
          64 != (64 & D.flags) && Ra(i, o, p, D),
          0 ===
            (function li() {
              return Ye.lFrame.elementDepthCount;
            })() && Ln(p, o),
          (function ui() {
            Ye.lFrame.elementDepthCount++;
          })(),
          mr(D) &&
            (Au(i, o, D),
            (function Vf(e, t, n) {
              if (sr(t)) {
                const o = t.directiveEnd;
                for (let i = t.directiveStart; i < o; i++) {
                  const s = e.data[i];
                  s.contentQueries && s.contentQueries(1, n[i], i);
                }
              }
            })(i, D, o)),
          null !== r && Tu(o, D),
          Ja
        );
      }
      function Qa() {
        let e = _();
        J()
          ? (function ke() {
              Ye.lFrame.isParent = !1;
            })()
          : ((e = e.parent), S(e, !1));
        const t = e;
        !(function Bo() {
          Ye.lFrame.elementDepthCount--;
        })();
        const n = ht();
        return (
          n.firstCreatePass && (gi(n, e), sr(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Ve(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            $u(n, t, ce(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Ct(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            $u(n, t, ce(), t.stylesWithoutHost, !1),
          Qa
        );
      }
      function Gu(e, t, n, r) {
        return Ja(e, t, n, r), Qa(), Gu;
      }
      function ph() {
        return ce();
      }
      function Yu(e) {
        return !!e && "function" == typeof e.then;
      }
      function gh(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      const mh = gh;
      function Ku(e, t, n, r) {
        const o = ce(),
          i = ht(),
          s = _();
        return (
          (function vh(e, t, n, r, o, i, s, c) {
            const p = mr(r),
              M = e.firstCreatePass && Jf(e),
              A = t[8],
              F = qf(t);
            let V = !0;
            if (3 & r.type || c) {
              const Oe = qt(r, t),
                Fe = c ? c(Oe) : Oe,
                qe = F.length,
                pe = c ? (Rt) => c(Tt(Rt[r.index])) : r.index;
              let st = null;
              if (
                (!c &&
                  p &&
                  (st = (function B_(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const c = t[7],
                            p = o[i + 2];
                          return c.length > p ? c[p] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== st)
              )
                ((st.__ngLastListenerFn__ || st).__ngNextListenerFn__ = i),
                  (st.__ngLastListenerFn__ = i),
                  (V = !1);
              else {
                i = Dh(r, t, A, i, !1);
                const Rt = n.listen(Fe, o, i);
                F.push(i, Rt), M && M.push(o, pe, qe, qe + 1);
              }
            } else i = Dh(r, t, A, i, !1);
            const re = r.outputs;
            let _e;
            if (V && null !== re && (_e = re[o])) {
              const Oe = _e.length;
              if (Oe)
                for (let Fe = 0; Fe < Oe; Fe += 2) {
                  const Qt = t[_e[Fe]][_e[Fe + 1]].subscribe(i),
                    Ni = F.length;
                  F.push(i, Qt), M && M.push(o, r.index, Ni, -(Ni + 1));
                }
            }
          })(i, o, o[11], s, e, t, 0, r),
          Ku
        );
      }
      function _h(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return Xf(e, o), !1;
        }
      }
      function Dh(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Nu(2 & e.flags ? bn(e.index, t) : t);
          let p = _h(t, 0, r, s),
            D = i.__ngNextListenerFn__;
          for (; D; ) (p = _h(t, 0, D, s) && p), (D = D.__ngNextListenerFn__);
          return o && !1 === p && (s.preventDefault(), (s.returnValue = !1)), p;
        };
      }
      function Ch(e = 1) {
        return (function ma(e) {
          return (Ye.lFrame.contextLView = (function pi(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, Ye.lFrame.contextLView))[8];
        })(e);
      }
      function Zu(e, t, n) {
        return qu(e, "", t, "", n), Zu;
      }
      function qu(e, t, n, r, o) {
        const i = ce(),
          s = ds(i, t, n, r);
        return s !== dt && ur(ht(), Ft(), i, e, s, i[11], o, !1), qu;
      }
      function xh(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let c = r ? $r(i) : bo(i),
          p = !1;
        for (; 0 !== c && (!1 === p || s); ) {
          const M = e[c + 1];
          z_(e[c], t) && ((p = !0), (e[c + 1] = r ? vu(M) : mu(M))),
            (c = r ? $r(M) : bo(M));
        }
        p && (e[n + 1] = r ? mu(i) : vu(i));
      }
      function z_(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && w(e, t) >= 0)
        );
      }
      function Ju(e, t) {
        return (
          (function Gr(e, t, n, r) {
            const o = ce(),
              i = ht(),
              s = An(2);
            i.firstUpdatePass &&
              (function Bh(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[ln()],
                    s = (function Vh(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function $h(e, t) {
                    return 0 != (e.flags & (t ? 16 : 32));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function eD(e, t, n, r) {
                      const o = (function Gi(e) {
                        const t = Ye.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = oa((n = Qu(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = Qu(o, e, t, n, r)), null === i)) {
                            let p = (function tD(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== bo(r)) return e[$r(r)];
                            })(e, t, r);
                            void 0 !== p &&
                              Array.isArray(p) &&
                              ((p = Qu(null, e, t, p[1], r)),
                              (p = oa(p, t.attrs, r)),
                              (function nD(e, t, n, r) {
                                e[$r(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, p));
                          } else
                            i = (function rD(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = oa(r, e[i].hostAttrs, n);
                              return oa(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function $_(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        c = $r(s),
                        p = bo(s);
                      e[r] = n;
                      let M,
                        D = !1;
                      if (Array.isArray(n)) {
                        const A = n;
                        (M = A[1]), (null === M || w(A, M) > 0) && (D = !0);
                      } else M = n;
                      if (o)
                        if (0 !== p) {
                          const F = $r(e[c + 1]);
                          (e[r + 1] = Ua(F, c)),
                            0 !== F && (e[F + 1] = yu(e[F + 1], r)),
                            (e[c + 1] = (function kv(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[c + 1], r));
                        } else
                          (e[r + 1] = Ua(c, 0)),
                            0 !== c && (e[c + 1] = yu(e[c + 1], r)),
                            (c = r);
                      else
                        (e[r + 1] = Ua(p, 0)),
                          0 === c ? (c = r) : (e[p + 1] = yu(e[p + 1], r)),
                          (p = r);
                      D && (e[r + 1] = mu(e[r + 1])),
                        xh(e, M, r, !0),
                        xh(e, M, r, !1),
                        (function G_(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            w(i, t) >= 0 &&
                            (n[r + 1] = vu(n[r + 1]));
                        })(t, M, e, r, i),
                        (s = Ua(c, p)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== dt &&
                kn(o, s, t) &&
                (function jh(e, t, n, r, o, i, s, c) {
                  if (!(3 & t.type)) return;
                  const p = e.data,
                    D = p[c + 1];
                  Xa(
                    (function Af(e) {
                      return 1 == (1 & e);
                    })(D)
                      ? Hh(p, t, n, o, bo(D), s)
                      : void 0
                  ) ||
                    (Xa(i) ||
                      ((function If(e) {
                        return 2 == (2 & e);
                      })(D) &&
                        (i = Hh(p, null, n, o, c, s))),
                    (function iy(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : oo.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= oo.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, Zr(ln(), n), o, i));
                })(
                  i,
                  i.data[ln()],
                  o,
                  o[11],
                  e,
                  (o[s + 1] = (function sD(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = Ne(Yo(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Ju
        );
      }
      function Qu(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let c = n.directiveStylingLast;
        for (
          -1 === c ? (c = n.directiveStart) : c++;
          c < s && ((i = t[c]), (r = oa(r, i.hostAttrs, o)), i !== e);

        )
          c++;
        return null !== e && (n.directiveStylingLast = c), r;
      }
      function oa(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                h(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function Hh(e, t, n, r, o, i) {
        const s = null === t;
        let c;
        for (; o > 0; ) {
          const p = e[o],
            D = Array.isArray(p),
            M = D ? p[1] : p,
            A = null === M;
          let F = n[o + 1];
          F === dt && (F = A ? it : void 0);
          let V = A ? v(F, r) : M === r ? F : void 0;
          if ((D && !Xa(V) && (V = v(p, r)), Xa(V) && ((c = V), s))) return c;
          const re = e[o + 1];
          o = s ? $r(re) : bo(re);
        }
        if (null !== t) {
          let p = i ? t.residualClasses : t.residualStyles;
          null != p && (c = v(p, r));
        }
        return c;
      }
      function Xa(e) {
        return void 0 !== e;
      }
      function Gh(e, t = "") {
        const n = ce(),
          r = ht(),
          o = e + 22,
          i = r.firstCreatePass ? ls(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Bl(e, t) {
            return e.createText(t);
          })(n[11], t));
        Ra(r, n, s, i), S(i, !1);
      }
      function Xu(e) {
        return el("", e, ""), Xu;
      }
      function el(e, t, n) {
        const r = ce(),
          o = ds(r, e, t, n);
        return o !== dt && Mo(r, ln(), o), el;
      }
      function ec(e, t, n, r, o) {
        const i = ce(),
          s = fs(i, e, t, n, r, o);
        return s !== dt && Mo(i, ln(), s), ec;
      }
      const Ri = void 0;
      var SD = [
        "en",
        [["a", "p"], ["AM", "PM"], Ri],
        [["AM", "PM"], Ri, Ri],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Ri,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Ri,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Ri, "{1} 'at' {0}", Ri],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function MD(e) {
          const n = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let Ds = {};
      function tc(e) {
        const t = (function ID(e) {
          return e.toLowerCase().replace(/_/g, "-");
        })(e);
        let n = cp(t);
        if (n) return n;
        const r = t.split("-")[0];
        if (((n = cp(r)), n)) return n;
        if ("en" === r) return SD;
        throw new fe(701, !1);
      }
      function up(e) {
        return tc(e)[tt.PluralCase];
      }
      function cp(e) {
        return (
          e in Ds ||
            (Ds[e] =
              He.ng &&
              He.ng.common &&
              He.ng.common.locales &&
              He.ng.common.locales[e]),
          Ds[e]
        );
      }
      var tt = (() => (
        ((tt = tt || {})[(tt.LocaleId = 0)] = "LocaleId"),
        (tt[(tt.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (tt[(tt.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (tt[(tt.DaysFormat = 3)] = "DaysFormat"),
        (tt[(tt.DaysStandalone = 4)] = "DaysStandalone"),
        (tt[(tt.MonthsFormat = 5)] = "MonthsFormat"),
        (tt[(tt.MonthsStandalone = 6)] = "MonthsStandalone"),
        (tt[(tt.Eras = 7)] = "Eras"),
        (tt[(tt.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (tt[(tt.WeekendRange = 9)] = "WeekendRange"),
        (tt[(tt.DateFormat = 10)] = "DateFormat"),
        (tt[(tt.TimeFormat = 11)] = "TimeFormat"),
        (tt[(tt.DateTimeFormat = 12)] = "DateTimeFormat"),
        (tt[(tt.NumberSymbols = 13)] = "NumberSymbols"),
        (tt[(tt.NumberFormats = 14)] = "NumberFormats"),
        (tt[(tt.CurrencyCode = 15)] = "CurrencyCode"),
        (tt[(tt.CurrencySymbol = 16)] = "CurrencySymbol"),
        (tt[(tt.CurrencyName = 17)] = "CurrencyName"),
        (tt[(tt.Currencies = 18)] = "Currencies"),
        (tt[(tt.Directionality = 19)] = "Directionality"),
        (tt[(tt.PluralCase = 20)] = "PluralCase"),
        (tt[(tt.ExtraData = 21)] = "ExtraData"),
        tt
      ))();
      const Cs = "en-US";
      let dp = Cs;
      function oc(e, t, n, r, o) {
        if (((e = Re(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) oc(e[i], t, n, r, o);
        else {
          const i = ht(),
            s = ce();
          let c = Ii(e) ? e : Re(e.provide),
            p = Xd(e);
          const D = _(),
            M = 1048575 & D.providerIndexes,
            A = D.directiveStart,
            F = D.providerIndexes >> 20;
          if (Ii(e) || !e.multi) {
            const V = new g(p, o, as),
              re = sc(c, t, o ? M : M + F, A);
            -1 === re
              ? (Ki(to(D, s), i, c),
                ic(i, e, t.length),
                t.push(c),
                D.directiveStart++,
                D.directiveEnd++,
                o && (D.providerIndexes += 1048576),
                n.push(V),
                s.push(V))
              : ((n[re] = V), (s[re] = V));
          } else {
            const V = sc(c, t, M + F, A),
              re = sc(c, t, M, M + F),
              _e = V >= 0 && n[V],
              Oe = re >= 0 && n[re];
            if ((o && !Oe) || (!o && !_e)) {
              Ki(to(D, s), i, c);
              const Fe = (function bC(e, t, n, r, o) {
                const i = new g(e, n, as);
                return (
                  (i.multi = []),
                  (i.index = t),
                  (i.componentProviders = 0),
                  Lp(i, o, r && !n),
                  i
                );
              })(o ? wC : EC, n.length, o, r, p);
              !o && Oe && (n[re].providerFactory = Fe),
                ic(i, e, t.length, 0),
                t.push(c),
                D.directiveStart++,
                D.directiveEnd++,
                o && (D.providerIndexes += 1048576),
                n.push(Fe),
                s.push(Fe);
            } else ic(i, e, V > -1 ? V : re, Lp(n[o ? re : V], p, !o && r));
            !o && r && Oe && n[re].componentProviders++;
          }
        }
      }
      function ic(e, t, n, r) {
        const o = Ii(t),
          i = (function Fy(e) {
            return !!e.useClass;
          })(t);
        if (o || i) {
          const p = (i ? Re(t.useClass) : t).prototype.ngOnDestroy;
          if (p) {
            const D = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
              const M = D.indexOf(n);
              -1 === M ? D.push(n, [r, p]) : D[M + 1].push(r, p);
            } else D.push(n, p);
          }
        }
      }
      function Lp(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function sc(e, t, n, r) {
        for (let o = n; o < r; o++) if (t[o] === e) return o;
        return -1;
      }
      function EC(e, t, n, r) {
        return ac(this.multi, []);
      }
      function wC(e, t, n, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            c = Go(n, n[1], this.providerFactory.index, r);
          (i = c.slice(0, s)), ac(o, i);
          for (let p = s; p < c.length; p++) i.push(c[p]);
        } else (i = []), ac(o, i);
        return i;
      }
      function ac(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function kp(e, t = []) {
        return (n) => {
          n.providersResolver = (r, o) =>
            (function CC(e, t, n) {
              const r = ht();
              if (r.firstCreatePass) {
                const o = In(e);
                oc(n, r.data, r.blueprint, o, !0),
                  oc(t, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, t);
        };
      }
      class Es {}
      class Vp {}
      function MC(e, t) {
        return new Bp(e, t ?? null);
      }
      class Bp extends Es {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ku(this));
          const r = We(t);
          (this._bootstrapComponents = wo(r.bootstrap)),
            (this._r3Injector = vf(
              t,
              n,
              [
                { provide: Es, useValue: this },
                { provide: Js, useValue: this.componentFactoryResolver },
              ],
              Ne(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class lc extends Vp {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Bp(this.moduleType, t);
        }
      }
      class SC extends Es {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new ku(this)),
            (this.instance = null);
          const o = new Qd(
            [
              ...t,
              { provide: Es, useValue: this },
              { provide: Js, useValue: this.componentFactoryResolver },
            ],
            n || Va(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function uc(e, t, n = null) {
        return new SC(e, t, n).injector;
      }
      let IC = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Kd(0, n.type),
                o =
                  r.length > 0
                    ? uc([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = gt({
            token: e,
            providedIn: "environment",
            factory: () => new e(dn(Ai)),
          })),
          e
        );
      })();
      function Up(e) {
        e.getStandaloneInjector = (t) =>
          t.get(IC).getOrCreateStandaloneInjector(e);
      }
      function Yp(e, t, n, r) {
        return (function Kp(e, t, n, r, o, i) {
          const s = t + n;
          return kn(e, s, o)
            ? (function so(e, t, n) {
                return (e[t] = n);
              })(e, s + 1, i ? r.call(i, o) : r(o))
            : (function ca(e, t) {
                const n = e[t];
                return n === dt ? void 0 : n;
              })(e, s + 1);
        })(
          ce(),
          (function $t() {
            const e = Ye.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r
        );
      }
      function dc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const uo = class QC extends d.x {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const p = t;
            (o = p.next?.bind(p)),
              (i = p.error?.bind(p)),
              (s = p.complete?.bind(p));
          }
          this.__isAsync && ((i = dc(i)), o && (o = dc(o)), s && (s = dc(s)));
          const c = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof C.w0 && t.add(c), c;
        }
      };
      function XC() {
        return this._results[xi()]();
      }
      class fc {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = xi(),
            r = fc.prototype;
          r[n] || (r[n] = XC);
        }
        get changes() {
          return this._changes || (this._changes = new uo());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const o = Yn(t);
          (this._changesDetected = !(function Ml(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = t[r];
              if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, n)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let fa = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = nE), e;
      })();
      const eE = fa,
        tE = class extends eE {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = $a(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              Iu(r, o, t),
              new ea(o)
            );
          }
        };
      function nE() {
        return il(_(), ce());
      }
      function il(e, t) {
        return 4 & e.type ? new tE(t, e, os(e, t)) : null;
      }
      let sl = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = rE), e;
      })();
      function rE() {
        return tg(_(), ce());
      }
      const oE = sl,
        Xp = class extends oE {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return os(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new no(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = $o(this._hostTNode, this._hostLView);
            if (Wn(t)) {
              const n = tr(t, this._hostLView),
                r = Nn(t);
              return new no(n[1].data[r + 8], n);
            }
            return new no(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = eg(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function wi(e) {
                return "function" == typeof e;
              })(t);
            let c;
            if (s) c = n;
            else {
              const A = n || {};
              (c = A.index),
                (r = A.injector),
                (o = A.projectableNodes),
                (i = A.environmentInjector || A.ngModuleRef);
            }
            const p = s ? t : new ta(T(t)),
              D = r || this.parentInjector;
            if (!i && null == p.ngModule) {
              const F = (s ? D : this.parentInjector).get(Ai, null);
              F && (i = F);
            }
            const M = p.create(D, o, void 0, i);
            return this.insert(M.hostView, c), M;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function ko(e) {
                return Cn(e[3]);
              })(r)
            ) {
              const M = this.indexOf(t);
              if (-1 !== M) this.detach(M);
              else {
                const A = r[3],
                  F = new Xp(A, A[6], A[3]);
                F.detach(F.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function Jm(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), Aa(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function Qm(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const c = t[19];
              null !== c && c.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const c = Gl(i, s),
              p = r[11],
              D = Oa(p, s[7]);
            return (
              null !== D &&
                (function Km(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), Ys(e, r, n, 1, o, i);
                })(o, s[6], p, r, D, c),
              t.attachToViewContainerRef(),
              Aa(hc(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = eg(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = jl(this._lContainer, n);
            r && (Qi(hc(this._lContainer), n), Cd(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = jl(this._lContainer, n);
            return r && null != Qi(hc(this._lContainer), n) ? new ea(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function eg(e) {
        return e[8];
      }
      function hc(e) {
        return e[8] || (e[8] = []);
      }
      function tg(e, t) {
        let n;
        const r = t[e.index];
        if (Cn(r)) n = r;
        else {
          let o;
          if (8 & e.type) o = Tt(r);
          else {
            const i = t[11];
            o = i.createComment("");
            const s = qt(e, t);
            Mi(
              i,
              Oa(i, s),
              o,
              (function ny(e, t) {
                return e.nextSibling(t);
              })(i, s),
              !1
            );
          }
          (t[e.index] = n = Zf(r, t, o, e)), za(t, n);
        }
        return new Xp(n, e, t);
      }
      class pc {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new pc(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class gc {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = n.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new gc(o);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== cg(t, n).matches && this.queries[n].setDirty();
        }
      }
      class ng {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class mc {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== n ? n.length : 0,
              i = this.getByIndex(r).embeddedTView(t, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== n ? n.push(i) : (n = [i]));
          }
          return null !== n ? new mc(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class yc {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new yc(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(t, n, aE(n, i)),
                this.matchTNodeWithReadOption(t, n, Zi(n, t, i, !1, !1));
            }
          else
            r === fa
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Zi(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === Qs || o === sl || (o === fa && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const i = Zi(n, t, o, !1, !1);
                null !== i && this.addMatch(n.index, i);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function aE(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function uE(e, t, n, r) {
        return -1 === n
          ? (function lE(e, t) {
              return 11 & e.type ? os(e, t) : 4 & e.type ? il(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function cE(e, t, n) {
              return n === Qs
                ? os(t, e)
                : n === fa
                ? il(t, e)
                : n === sl
                ? tg(t, e)
                : void 0;
            })(e, t, r)
          : Go(e, e[1], n, t);
      }
      function rg(e, t, n, r) {
        const o = t[19].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = n.matches,
            c = [];
          for (let p = 0; p < s.length; p += 2) {
            const D = s[p];
            c.push(D < 0 ? null : uE(t, i[D], s[p + 1], n.metadata.read));
          }
          o.matches = c;
        }
        return o.matches;
      }
      function vc(e, t, n, r) {
        const o = e.queries.getByIndex(n),
          i = o.matches;
        if (null !== i) {
          const s = rg(e, t, o, n);
          for (let c = 0; c < i.length; c += 2) {
            const p = i[c];
            if (p > 0) r.push(s[c / 2]);
            else {
              const D = i[c + 1],
                M = t[-p];
              for (let A = 10; A < M.length; A++) {
                const F = M[A];
                F[17] === F[3] && vc(F[1], F, D, r);
              }
              if (null !== M[9]) {
                const A = M[9];
                for (let F = 0; F < A.length; F++) {
                  const V = A[F];
                  vc(V[1], V, D, r);
                }
              }
            }
          }
        }
        return r;
      }
      function og(e) {
        const t = ce(),
          n = ht(),
          r = zi();
        yo(r + 1);
        const o = cg(n, r);
        if (
          e.dirty &&
          (function Lo(e) {
            return 4 == (4 & e[2]);
          })(t) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? vc(n, t, r, []) : rg(n, t, o, r);
            e.reset(i, Yy), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function ig(e, t, n) {
        const r = ht();
        r.firstCreatePass &&
          (ug(r, new ng(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          lg(r, ce(), t);
      }
      function sg(e, t, n, r) {
        const o = ht();
        if (o.firstCreatePass) {
          const i = _();
          ug(o, new ng(t, n, r), i.index),
            (function fE(e, t) {
              const n = e.contentQueries || (e.contentQueries = []);
              t !== (n.length ? n[n.length - 1] : -1) &&
                n.push(e.queries.length - 1, t);
            })(o, e),
            2 == (2 & n) && (o.staticContentQueries = !0);
        }
        lg(o, ce(), n);
      }
      function ag() {
        return (function dE(e, t) {
          return e[19].queries[t].queryList;
        })(ce(), zi());
      }
      function lg(e, t, n) {
        const r = new fc(4 == (4 & n));
        Uf(e, t, r, r.destroy),
          null === t[19] && (t[19] = new gc()),
          t[19].queries.push(new pc(r));
      }
      function ug(e, t, n) {
        null === e.queries && (e.queries = new mc()),
          e.queries.track(new yc(t, n));
      }
      function cg(e, t) {
        return e.queries.getByIndex(t);
      }
      function ll(...e) {}
      const Tg = new Vt("Application Initializer");
      let ul = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ll),
              (this.reject = ll),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Yu(i)) n.push(i);
                else if (mh(i)) {
                  const s = new Promise((c, p) => {
                    i.subscribe({ complete: c, error: p });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(dn(Tg, 8));
          }),
          (e.ɵprov = gt({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const xg = new Vt("AppId", {
        providedIn: "root",
        factory: function Og() {
          return `${wc()}${wc()}${wc()}`;
        },
      });
      function wc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Rg = new Vt("Platform Initializer"),
        PE = new Vt("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Pg = new Vt("appBootstrapListener");
      let NE = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = gt({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const cl = new Vt("LocaleId", {
          providedIn: "root",
          factory: () =>
            Qc(cl, O.Optional | O.SkipSelf) ||
            (function FE() {
              return (typeof $localize < "u" && $localize.locale) || Cs;
            })(),
        }),
        LE = new Vt("DefaultCurrencyCode", {
          providedIn: "root",
          factory: () => "USD",
        });
      class kE {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let VE = (() => {
        class e {
          compileModuleSync(n) {
            return new lc(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = wo(We(n).declarations).reduce((s, c) => {
                const p = T(c);
                return p && s.push(new ta(p)), s;
              }, []);
            return new kE(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = gt({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const jE = (() => Promise.resolve(0))();
      function bc(e) {
        typeof Zone > "u"
          ? jE.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Or {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new uo(!1)),
            (this.onMicrotaskEmpty = new uo(!1)),
            (this.onStable = new uo(!1)),
            (this.onError = new uo(!1)),
            typeof Zone > "u")
          )
            throw new fe(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (
            ((o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function HE() {
              let e = He.requestAnimationFrame,
                t = He.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function zE(e) {
              const t = () => {
                !(function GE(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(He, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Sc(e),
                                (e.isCheckStableRunning = !0),
                                Mc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Sc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, c) => {
                  try {
                    return Lg(e), n.invokeTask(o, i, s, c);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      kg(e);
                  }
                },
                onInvoke: (n, r, o, i, s, c, p) => {
                  try {
                    return Lg(e), n.invoke(o, i, s, c, p);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), kg(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Sc(e),
                          Mc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Or.isInAngularZone()) throw new fe(909, !1);
        }
        static assertNotInAngularZone() {
          if (Or.isInAngularZone()) throw new fe(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, $E, ll, ll);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const $E = {};
      function Mc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Sc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Lg(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function kg(e) {
        e._nesting--, Mc(e);
      }
      class WE {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new uo()),
            (this.onMicrotaskEmpty = new uo()),
            (this.onStable = new uo()),
            (this.onError = new uo());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Vg = new Vt(""),
        Bg = new Vt("");
      let Ic,
        YE = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Ic ||
                  ((function KE(e) {
                    Ic = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Or.assertNotInAngularZone(),
                        bc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                bc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(dn(Or), dn(Ug), dn(Bg));
            }),
            (e.ɵprov = gt({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ug = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Ic?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = gt({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        qo = null;
      const jg = new Vt("AllowMultipleToken"),
        Ac = new Vt("PlatformDestroyListeners");
      class JE {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function $g(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new Vt(r);
        return (i = []) => {
          let s = Tc();
          if (!s || s.injector.get(jg, !1)) {
            const c = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(c)
              : (function QE(e) {
                  if (qo && !qo.get(jg, !1)) throw new fe(400, !1);
                  qo = e;
                  const t = e.get(zg);
                  (function Hg(e) {
                    const t = e.get(Rg, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Gg(e = [], t) {
                    return Ti.create({
                      name: t,
                      providers: [
                        { provide: iu, useValue: "platform" },
                        { provide: Ac, useValue: new Set([() => (qo = null)]) },
                        ...e,
                      ],
                    });
                  })(c, r)
                );
          }
          return (function ew(e) {
            const t = Tc();
            if (!t) throw new fe(401, !1);
            return t;
          })();
        };
      }
      function Tc() {
        return qo?.get(zg) ?? null;
      }
      let zg = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Yg(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new WE()
                      : ("zone.js" === e ? void 0 : e) || new Or(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Wg(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: Or, useValue: o }];
            return o.run(() => {
              const s = Ti.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(s),
                p = c.injector.get(Xs, null);
              if (!p) throw new fe(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const D = o.onError.subscribe({
                    next: (M) => {
                      p.handleError(M);
                    },
                  });
                  c.onDestroy(() => {
                    fl(this._modules, c), D.unsubscribe();
                  });
                }),
                (function Kg(e, t, n) {
                  try {
                    const r = n();
                    return Yu(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(p, o, () => {
                  const D = c.injector.get(ul);
                  return (
                    D.runInitializers(),
                    D.donePromise.then(
                      () => (
                        (function fp(e) {
                          W(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (dp = e.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(cl, Cs) || Cs),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Zg({}, r);
            return (function ZE(e, t, n) {
              const r = new lc(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(dl);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new fe(403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new fe(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Ac, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(dn(Ti));
          }),
          (e.ɵprov = gt({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Zg(e, t) {
        return Array.isArray(t) ? t.reduce(Zg, e) : { ...e, ...t };
      }
      let dl = (() => {
        class e {
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new k.y((c) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    c.next(this._stable), c.complete();
                  });
              }),
              s = new k.y((c) => {
                let p;
                this._zone.runOutsideAngular(() => {
                  p = this._zone.onStable.subscribe(() => {
                    Or.assertNotInAngularZone(),
                      bc(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), c.next(!0));
                      });
                  });
                });
                const D = this._zone.onUnstable.subscribe(() => {
                  Or.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        c.next(!1);
                      }));
                });
                return () => {
                  p.unsubscribe(), D.unsubscribe();
                };
              });
            this.isStable = (function ve(...e) {
              const t = (0, Q.yG)(e),
                n = (0, Q._6)(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? (0, G.Xf)(r[0])
                  : (0, H.J)(n)((0, Ie.D)(r, t))
                : ye.E;
            })(
              i,
              s.pipe(
                (function Ee(e = {}) {
                  const {
                    connector: t = () => new d.x(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      c,
                      p,
                      D = 0,
                      M = !1,
                      A = !1;
                    const F = () => {
                        c?.unsubscribe(), (c = void 0);
                      },
                      V = () => {
                        F(), (s = p = void 0), (M = A = !1);
                      },
                      re = () => {
                        const _e = s;
                        V(), _e?.unsubscribe();
                      };
                    return (0, q.e)((_e, Oe) => {
                      D++, !A && !M && F();
                      const Fe = (p = p ?? t());
                      Oe.add(() => {
                        D--, 0 === D && !A && !M && (c = Te(re, o));
                      }),
                        Fe.subscribe(Oe),
                        !s &&
                          D > 0 &&
                          ((s = new se.Hp({
                            next: (qe) => Fe.next(qe),
                            error: (qe) => {
                              (A = !0), F(), (c = Te(V, n, qe)), Fe.error(qe);
                            },
                            complete: () => {
                              (M = !0), F(), (c = Te(V, r)), Fe.complete();
                            },
                          })),
                          (0, G.Xf)(_e).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const o = n instanceof ef;
            if (!this._injector.get(ul).done)
              throw (!o && Ze(n), new fe(405, false));
            let s;
            (s = o ? n : this._injector.get(Js).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const c = (function qE(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Es),
              D = s.create(Ti.NULL, [], r || s.selector, c),
              M = D.location.nativeElement,
              A = D.injector.get(Vg, null);
            return (
              A?.registerApplication(M),
              D.onDestroy(() => {
                this.detachView(D.hostView),
                  fl(this.components, D),
                  A?.unregisterApplication(M);
              }),
              this._loadComponent(D),
              D
            );
          }
          tick() {
            if (this._runningTick) throw new fe(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            fl(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(Pg, [])
                .concat(this._bootstrapListeners)
                .forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => fl(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new fe(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(dn(Or), dn(Ai), dn(Xs));
          }),
          (e.ɵprov = gt({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function fl(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Jg = !0;
      function nw() {
        Jg = !1;
      }
      let rw = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = ow), e;
      })();
      function ow(e) {
        return (function iw(e, t, n) {
          if (en(e) && !n) {
            const r = bn(e.index, t);
            return new ea(r, r);
          }
          return 47 & e.type ? new ea(t[16], t) : null;
        })(_(), ce(), 16 == (16 & e));
      }
      class nm {
        constructor() {}
        supports(t) {
          return na(t);
        }
        create(t) {
          return new dw(t);
        }
      }
      const cw = (e, t) => t;
      class dw {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || cw);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < om(r, o, i)) ? n : r,
              c = om(s, o, i),
              p = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const D = c - o,
                M = p - o;
              if (D != M) {
                for (let F = 0; F < D; F++) {
                  const V = F < i.length ? i[F] : (i[F] = 0),
                    re = V + F;
                  M <= re && re < D && (i[F] = V + 1);
                }
                i[s.previousIndex] = M - D;
              }
            }
            c !== p && t(s, c, p);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !na(t))) throw new fe(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let c = 0; c < this.length; c++)
              (i = t[c]),
                (s = this._trackByFn(c, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, c)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, c)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function R_(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[xi()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (c) => {
                (s = this._trackByFn(o, c)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, c, s, o)),
                      Object.is(n.item, c) || this._addIdentityChange(n, c))
                    : ((n = this._mismatch(n, c, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new fw(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new rm()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new rm()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class fw {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class hw {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class rm {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new hw()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function om(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class im {
        constructor() {}
        supports(t) {
          return t instanceof Map || Uu(t);
        }
        create() {
          return new pw();
        }
      }
      class pw {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Uu(t))) throw new fe(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new gw(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class gw {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function sm() {
        return new Nc([new nm()]);
      }
      let Nc = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || sm()),
              deps: [[e, new Hs(), new js()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new fe(901, !1);
          }
        }
        return (e.ɵprov = gt({ token: e, providedIn: "root", factory: sm })), e;
      })();
      function am() {
        return new Fc([new im()]);
      }
      let Fc = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || am()),
              deps: [[e, new Hs(), new js()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new fe(901, !1);
          }
        }
        return (e.ɵprov = gt({ token: e, providedIn: "root", factory: am })), e;
      })();
      const vw = $g(null, "core", []);
      let _w = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(dn(dl));
          }),
          (e.ɵmod = Sn({ type: e })),
          (e.ɵinj = sn({})),
          e
        );
      })();
      function Dw(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
    },
    433: (Ge, ue, I) => {
      I.d(ue, {
        Fj: () => Ae,
        on: () => Rn,
        Oe: () => Bo,
        CE: () => En,
        NI: () => ir,
        u: () => wn,
        cw: () => L,
        sg: () => Xn,
        x0: () => yr,
        u5: () => li,
        wO: () => Lo,
        JJ: () => le,
        JL: () => O,
        F: () => Pr,
        On: () => To,
        wV: () => Oo,
        c5: () => qr,
        UX: () => ui,
        Q7: () => qt,
        kI: () => Be,
        _Y: () => xo,
      });
      var d = I(8256),
        C = I(6895),
        k = I(2076),
        H = I(9751),
        G = I(4742),
        ye = I(8421),
        Q = I(7669),
        Ie = I(5403),
        ve = I(3268),
        se = I(1810),
        Ee = I(4004);
      let Te = (() => {
          class _ {
            constructor(m, S) {
              (this._renderer = m),
                (this._elementRef = S),
                (this.onChange = (J) => {}),
                (this.onTouched = () => {});
            }
            setProperty(m, S) {
              this._renderer.setProperty(this._elementRef.nativeElement, m, S);
            }
            registerOnTouched(m) {
              this.onTouched = m;
            }
            registerOnChange(m) {
              this.onChange = m;
            }
            setDisabledState(m) {
              this.setProperty("disabled", m);
            }
          }
          return (
            (_.ɵfac = function (m) {
              return new (m || _)(d.Y36(d.Qsj), d.Y36(d.SBq));
            }),
            (_.ɵdir = d.lG2({ type: _ })),
            _
          );
        })(),
        X = (() => {
          class _ extends Te {}
          return (
            (_.ɵfac = (function () {
              let y;
              return function (S) {
                return (y || (y = d.n5z(_)))(S || _);
              };
            })()),
            (_.ɵdir = d.lG2({ type: _, features: [d.qOj] })),
            _
          );
        })();
      const Me = new d.OlP("NgValueAccessor"),
        Ke = { provide: Me, useExisting: (0, d.Gpc)(() => Ae), multi: !0 },
        Re = new d.OlP("CompositionEventMode");
      let Ae = (() => {
        class _ extends Te {
          constructor(m, S, J) {
            super(m, S),
              (this._compositionMode = J),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function Et() {
                  const _ = (0, C.q)() ? (0, C.q)().getUserAgent() : "";
                  return /android (\d+)/.test(_.toLowerCase());
                })());
          }
          writeValue(m) {
            this.setProperty("value", m ?? "");
          }
          _handleInput(m) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(m);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(m) {
            (this._composing = !1), this._compositionMode && this.onChange(m);
          }
        }
        return (
          (_.ɵfac = function (m) {
            return new (m || _)(d.Y36(d.Qsj), d.Y36(d.SBq), d.Y36(Re, 8));
          }),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (m, S) {
              1 & m &&
                d.NdJ("input", function (ke) {
                  return S._handleInput(ke.target.value);
                })("blur", function () {
                  return S.onTouched();
                })("compositionstart", function () {
                  return S._compositionStart();
                })("compositionend", function (ke) {
                  return S._compositionEnd(ke.target.value);
                });
            },
            features: [d._Bn([Ke]), d.qOj],
          })),
          _
        );
      })();
      function fe(_) {
        return (
          null == _ ||
          (("string" == typeof _ || Array.isArray(_)) && 0 === _.length)
        );
      }
      function ot(_) {
        return null != _ && "number" == typeof _.length;
      }
      const K = new d.OlP("NgValidators"),
        ae = new d.OlP("NgAsyncValidators"),
        xe =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Be {
        static min(y) {
          return (function Le(_) {
            return (y) => {
              if (fe(y.value) || fe(_)) return null;
              const m = parseFloat(y.value);
              return !isNaN(m) && m < _
                ? { min: { min: _, actual: y.value } }
                : null;
            };
          })(y);
        }
        static max(y) {
          return (function nt(_) {
            return (y) => {
              if (fe(y.value) || fe(_)) return null;
              const m = parseFloat(y.value);
              return !isNaN(m) && m > _
                ? { max: { max: _, actual: y.value } }
                : null;
            };
          })(y);
        }
        static required(y) {
          return be(y);
        }
        static requiredTrue(y) {
          return (function lt(_) {
            return !0 === _.value ? null : { required: !0 };
          })(y);
        }
        static email(y) {
          return Z(y);
        }
        static minLength(y) {
          return ee(y);
        }
        static maxLength(y) {
          return (function te(_) {
            return (y) =>
              ot(y.value) && y.value.length > _
                ? {
                    maxlength: {
                      requiredLength: _,
                      actualLength: y.value.length,
                    },
                  }
                : null;
          })(y);
        }
        static pattern(y) {
          return de(y);
        }
        static nullValidator(y) {
          return null;
        }
        static compose(y) {
          return W(y);
        }
        static composeAsync(y) {
          return ze(y);
        }
      }
      function be(_) {
        return fe(_.value) ? { required: !0 } : null;
      }
      function Z(_) {
        return fe(_.value) || xe.test(_.value) ? null : { email: !0 };
      }
      function ee(_) {
        return (y) =>
          fe(y.value) || !ot(y.value)
            ? null
            : y.value.length < _
            ? { minlength: { requiredLength: _, actualLength: y.value.length } }
            : null;
      }
      function de(_) {
        if (!_) return me;
        let y, m;
        return (
          "string" == typeof _
            ? ((m = ""),
              "^" !== _.charAt(0) && (m += "^"),
              (m += _),
              "$" !== _.charAt(_.length - 1) && (m += "$"),
              (y = new RegExp(m)))
            : ((m = _.toString()), (y = _)),
          (S) => {
            if (fe(S.value)) return null;
            const J = S.value;
            return y.test(J)
              ? null
              : { pattern: { requiredPattern: m, actualValue: J } };
          }
        );
      }
      function me(_) {
        return null;
      }
      function Ce(_) {
        return null != _;
      }
      function Je(_) {
        return (0, d.QGY)(_) ? (0, k.D)(_) : _;
      }
      function ct(_) {
        let y = {};
        return (
          _.forEach((m) => {
            y = null != m ? { ...y, ...m } : y;
          }),
          0 === Object.keys(y).length ? null : y
        );
      }
      function Dt(_, y) {
        return y.map((m) => m(_));
      }
      function ge(_) {
        return _.map((y) =>
          (function B(_) {
            return !_.validate;
          })(y)
            ? y
            : (m) => y.validate(m)
        );
      }
      function W(_) {
        if (!_) return null;
        const y = _.filter(Ce);
        return 0 == y.length
          ? null
          : function (m) {
              return ct(Dt(m, y));
            };
      }
      function he(_) {
        return null != _ ? W(ge(_)) : null;
      }
      function ze(_) {
        if (!_) return null;
        const y = _.filter(Ce);
        return 0 == y.length
          ? null
          : function (m) {
              return (function q(..._) {
                const y = (0, Q.jO)(_),
                  { args: m, keys: S } = (0, G.D)(_),
                  J = new H.y((ke) => {
                    const { length: Ht } = m;
                    if (!Ht) return void ke.complete();
                    const Pn = new Array(Ht);
                    let Xr = Ht,
                      Er = Ht;
                    for (let $t = 0; $t < Ht; $t++) {
                      let an = !1;
                      (0, ye.Xf)(m[$t]).subscribe(
                        (0, Ie.x)(
                          ke,
                          (ar) => {
                            an || ((an = !0), Er--), (Pn[$t] = ar);
                          },
                          () => Xr--,
                          void 0,
                          () => {
                            (!Xr || !an) &&
                              (Er || ke.next(S ? (0, se.n)(S, Pn) : Pn),
                              ke.complete());
                          }
                        )
                      );
                    }
                  });
                return y ? J.pipe((0, ve.Z)(y)) : J;
              })(Dt(m, y).map(Je)).pipe((0, Ee.U)(ct));
            };
      }
      function pt(_) {
        return null != _ ? ze(ge(_)) : null;
      }
      function _t(_, y) {
        return null === _ ? [y] : Array.isArray(_) ? [..._, y] : [_, y];
      }
      function gt(_) {
        return _._rawValidators;
      }
      function on(_) {
        return _._rawAsyncValidators;
      }
      function sn(_) {
        return _ ? (Array.isArray(_) ? _ : [_]) : [];
      }
      function Mn(_, y) {
        return Array.isArray(_) ? _.includes(y) : _ === y;
      }
      function et(_, y) {
        const m = sn(y);
        return (
          sn(_).forEach((J) => {
            Mn(m, J) || m.push(J);
          }),
          m
        );
      }
      function Lt(_, y) {
        return sn(y).filter((m) => !Mn(_, m));
      }
      class qn {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(y) {
          (this._rawValidators = y || []),
            (this._composedValidatorFn = he(this._rawValidators));
        }
        _setAsyncValidators(y) {
          (this._rawAsyncValidators = y || []),
            (this._composedAsyncValidatorFn = pt(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(y) {
          this._onDestroyCallbacks.push(y);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((y) => y()),
            (this._onDestroyCallbacks = []);
        }
        reset(y) {
          this.control && this.control.reset(y);
        }
        hasError(y, m) {
          return !!this.control && this.control.hasError(y, m);
        }
        getError(y, m) {
          return this.control ? this.control.getError(y, m) : null;
        }
      }
      class kt extends qn {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class yn extends qn {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Vn {
        constructor(y) {
          this._cd = y;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let le = (() => {
          class _ extends Vn {
            constructor(m) {
              super(m);
            }
          }
          return (
            (_.ɵfac = function (m) {
              return new (m || _)(d.Y36(yn, 2));
            }),
            (_.ɵdir = d.lG2({
              type: _,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (m, S) {
                2 & m &&
                  d.ekj("ng-untouched", S.isUntouched)(
                    "ng-touched",
                    S.isTouched
                  )("ng-pristine", S.isPristine)("ng-dirty", S.isDirty)(
                    "ng-valid",
                    S.isValid
                  )("ng-invalid", S.isInvalid)("ng-pending", S.isPending);
              },
              features: [d.qOj],
            })),
            _
          );
        })(),
        O = (() => {
          class _ extends Vn {
            constructor(m) {
              super(m);
            }
          }
          return (
            (_.ɵfac = function (m) {
              return new (m || _)(d.Y36(kt, 10));
            }),
            (_.ɵdir = d.lG2({
              type: _,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (m, S) {
                2 & m &&
                  d.ekj("ng-untouched", S.isUntouched)(
                    "ng-touched",
                    S.isTouched
                  )("ng-pristine", S.isPristine)("ng-dirty", S.isDirty)(
                    "ng-valid",
                    S.isValid
                  )("ng-invalid", S.isInvalid)("ng-pending", S.isPending)(
                    "ng-submitted",
                    S.isSubmitted
                  );
              },
              features: [d.qOj],
            })),
            _
          );
        })();
      const zt = "VALID",
        nn = "INVALID",
        vn = "PENDING",
        Un = "DISABLED";
      function cr(_) {
        return (Sn(_) ? _.validators : _) || null;
      }
      function dr(_) {
        return Array.isArray(_) ? he(_) : _ || null;
      }
      function jn(_, y) {
        return (Sn(y) ? y.asyncValidators : _) || null;
      }
      function Rr(_) {
        return Array.isArray(_) ? pt(_) : _ || null;
      }
      function Sn(_) {
        return null != _ && !Array.isArray(_) && "object" == typeof _;
      }
      function Yr(_, y, m) {
        const S = _.controls;
        if (!(y ? Object.keys(S) : S).length) throw new d.vHH(1e3, "");
        if (!S[m]) throw new d.vHH(1001, "");
      }
      function nr(_, y, m) {
        _._forEachChild((S, J) => {
          if (void 0 === m[J]) throw new d.vHH(1002, "");
        });
      }
      class U {
        constructor(y, m) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = y),
            (this._rawAsyncValidators = m),
            (this._composedValidatorFn = dr(this._rawValidators)),
            (this._composedAsyncValidatorFn = Rr(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(y) {
          this._rawValidators = this._composedValidatorFn = y;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(y) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = y;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === zt;
        }
        get invalid() {
          return this.status === nn;
        }
        get pending() {
          return this.status == vn;
        }
        get disabled() {
          return this.status === Un;
        }
        get enabled() {
          return this.status !== Un;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(y) {
          (this._rawValidators = y), (this._composedValidatorFn = dr(y));
        }
        setAsyncValidators(y) {
          (this._rawAsyncValidators = y),
            (this._composedAsyncValidatorFn = Rr(y));
        }
        addValidators(y) {
          this.setValidators(et(y, this._rawValidators));
        }
        addAsyncValidators(y) {
          this.setAsyncValidators(et(y, this._rawAsyncValidators));
        }
        removeValidators(y) {
          this.setValidators(Lt(y, this._rawValidators));
        }
        removeAsyncValidators(y) {
          this.setAsyncValidators(Lt(y, this._rawAsyncValidators));
        }
        hasValidator(y) {
          return Mn(this._rawValidators, y);
        }
        hasAsyncValidator(y) {
          return Mn(this._rawAsyncValidators, y);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(y = {}) {
          (this.touched = !0),
            this._parent && !y.onlySelf && this._parent.markAsTouched(y);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((y) => y.markAllAsTouched());
        }
        markAsUntouched(y = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((m) => {
              m.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !y.onlySelf && this._parent._updateTouched(y);
        }
        markAsDirty(y = {}) {
          (this.pristine = !1),
            this._parent && !y.onlySelf && this._parent.markAsDirty(y);
        }
        markAsPristine(y = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((m) => {
              m.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !y.onlySelf && this._parent._updatePristine(y);
        }
        markAsPending(y = {}) {
          (this.status = vn),
            !1 !== y.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !y.onlySelf && this._parent.markAsPending(y);
        }
        disable(y = {}) {
          const m = this._parentMarkedDirty(y.onlySelf);
          (this.status = Un),
            (this.errors = null),
            this._forEachChild((S) => {
              S.disable({ ...y, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== y.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...y, skipPristineCheck: m }),
            this._onDisabledChange.forEach((S) => S(!0));
        }
        enable(y = {}) {
          const m = this._parentMarkedDirty(y.onlySelf);
          (this.status = zt),
            this._forEachChild((S) => {
              S.enable({ ...y, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: y.emitEvent,
            }),
            this._updateAncestors({ ...y, skipPristineCheck: m }),
            this._onDisabledChange.forEach((S) => S(!1));
        }
        _updateAncestors(y) {
          this._parent &&
            !y.onlySelf &&
            (this._parent.updateValueAndValidity(y),
            y.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(y) {
          this._parent = y;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(y = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === zt || this.status === vn) &&
                this._runAsyncValidator(y.emitEvent)),
            !1 !== y.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !y.onlySelf &&
              this._parent.updateValueAndValidity(y);
        }
        _updateTreeValidity(y = { emitEvent: !0 }) {
          this._forEachChild((m) => m._updateTreeValidity(y)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: y.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Un : zt;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(y) {
          if (this.asyncValidator) {
            (this.status = vn), (this._hasOwnPendingAsyncValidator = !0);
            const m = Je(this.asyncValidator(this));
            this._asyncValidationSubscription = m.subscribe((S) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(S, { emitEvent: y });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(y, m = {}) {
          (this.errors = y), this._updateControlsErrors(!1 !== m.emitEvent);
        }
        get(y) {
          let m = y;
          return null == m ||
            (Array.isArray(m) || (m = m.split(".")), 0 === m.length)
            ? null
            : m.reduce((S, J) => S && S._find(J), this);
        }
        getError(y, m) {
          const S = m ? this.get(m) : this;
          return S && S.errors ? S.errors[y] : null;
        }
        hasError(y, m) {
          return !!this.getError(y, m);
        }
        get root() {
          let y = this;
          for (; y._parent; ) y = y._parent;
          return y;
        }
        _updateControlsErrors(y) {
          (this.status = this._calculateStatus()),
            y && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(y);
        }
        _initObservables() {
          (this.valueChanges = new d.vpe()), (this.statusChanges = new d.vpe());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Un
            : this.errors
            ? nn
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(vn)
            ? vn
            : this._anyControlsHaveStatus(nn)
            ? nn
            : zt;
        }
        _anyControlsHaveStatus(y) {
          return this._anyControls((m) => m.status === y);
        }
        _anyControlsDirty() {
          return this._anyControls((y) => y.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((y) => y.touched);
        }
        _updatePristine(y = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !y.onlySelf && this._parent._updatePristine(y);
        }
        _updateTouched(y = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !y.onlySelf && this._parent._updateTouched(y);
        }
        _registerOnCollectionChange(y) {
          this._onCollectionChange = y;
        }
        _setUpdateStrategy(y) {
          Sn(y) && null != y.updateOn && (this._updateOn = y.updateOn);
        }
        _parentMarkedDirty(y) {
          return (
            !y &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(y) {
          return null;
        }
      }
      class L extends U {
        constructor(y, m, S) {
          super(cr(m), jn(S, m)),
            (this.controls = y),
            this._initObservables(),
            this._setUpdateStrategy(m),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(y, m) {
          return this.controls[y]
            ? this.controls[y]
            : ((this.controls[y] = m),
              m.setParent(this),
              m._registerOnCollectionChange(this._onCollectionChange),
              m);
        }
        addControl(y, m, S = {}) {
          this.registerControl(y, m),
            this.updateValueAndValidity({ emitEvent: S.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(y, m = {}) {
          this.controls[y] &&
            this.controls[y]._registerOnCollectionChange(() => {}),
            delete this.controls[y],
            this.updateValueAndValidity({ emitEvent: m.emitEvent }),
            this._onCollectionChange();
        }
        setControl(y, m, S = {}) {
          this.controls[y] &&
            this.controls[y]._registerOnCollectionChange(() => {}),
            delete this.controls[y],
            m && this.registerControl(y, m),
            this.updateValueAndValidity({ emitEvent: S.emitEvent }),
            this._onCollectionChange();
        }
        contains(y) {
          return this.controls.hasOwnProperty(y) && this.controls[y].enabled;
        }
        setValue(y, m = {}) {
          nr(this, 0, y),
            Object.keys(y).forEach((S) => {
              Yr(this, !0, S),
                this.controls[S].setValue(y[S], {
                  onlySelf: !0,
                  emitEvent: m.emitEvent,
                });
            }),
            this.updateValueAndValidity(m);
        }
        patchValue(y, m = {}) {
          null != y &&
            (Object.keys(y).forEach((S) => {
              const J = this.controls[S];
              J && J.patchValue(y[S], { onlySelf: !0, emitEvent: m.emitEvent });
            }),
            this.updateValueAndValidity(m));
        }
        reset(y = {}, m = {}) {
          this._forEachChild((S, J) => {
            S.reset(y[J], { onlySelf: !0, emitEvent: m.emitEvent });
          }),
            this._updatePristine(m),
            this._updateTouched(m),
            this.updateValueAndValidity(m);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (y, m, S) => ((y[S] = m.getRawValue()), y)
          );
        }
        _syncPendingControls() {
          let y = this._reduceChildren(
            !1,
            (m, S) => !!S._syncPendingControls() || m
          );
          return y && this.updateValueAndValidity({ onlySelf: !0 }), y;
        }
        _forEachChild(y) {
          Object.keys(this.controls).forEach((m) => {
            const S = this.controls[m];
            S && y(S, m);
          });
        }
        _setUpControls() {
          this._forEachChild((y) => {
            y.setParent(this),
              y._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(y) {
          for (const [m, S] of Object.entries(this.controls))
            if (this.contains(m) && y(S)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (m, S, J) => ((S.enabled || this.disabled) && (m[J] = S.value), m)
          );
        }
        _reduceChildren(y, m) {
          let S = y;
          return (
            this._forEachChild((J, ke) => {
              S = m(S, J, ke);
            }),
            S
          );
        }
        _allControlsDisabled() {
          for (const y of Object.keys(this.controls))
            if (this.controls[y].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(y) {
          return this.controls.hasOwnProperty(y) ? this.controls[y] : null;
        }
      }
      function We(_, y) {
        return [...y.path, _];
      }
      function mt(_, y) {
        Xt(_, y),
          y.valueAccessor.writeValue(_.value),
          _.disabled && y.valueAccessor.setDisabledState?.(!0),
          (function Bt(_, y) {
            y.valueAccessor.registerOnChange((m) => {
              (_._pendingValue = m),
                (_._pendingChange = !0),
                (_._pendingDirty = !0),
                "change" === _.updateOn && vt(_, y);
            });
          })(_, y),
          (function Hn(_, y) {
            const m = (S, J) => {
              y.valueAccessor.writeValue(S), J && y.viewToModelUpdate(S);
            };
            _.registerOnChange(m),
              y._registerOnDestroy(() => {
                _._unregisterOnChange(m);
              });
          })(_, y),
          (function rr(_, y) {
            y.valueAccessor.registerOnTouched(() => {
              (_._pendingTouched = !0),
                "blur" === _.updateOn && _._pendingChange && vt(_, y),
                "submit" !== _.updateOn && _.markAsTouched();
            });
          })(_, y),
          (function St(_, y) {
            if (y.valueAccessor.setDisabledState) {
              const m = (S) => {
                y.valueAccessor.setDisabledState(S);
              };
              _.registerOnDisabledChange(m),
                y._registerOnDestroy(() => {
                  _._unregisterOnDisabledChange(m);
                });
            }
          })(_, y);
      }
      function De(_, y, m = !0) {
        const S = () => {};
        y.valueAccessor &&
          (y.valueAccessor.registerOnChange(S),
          y.valueAccessor.registerOnTouched(S)),
          _n(_, y),
          _ &&
            (y._invokeOnDestroyCallbacks(),
            _._registerOnCollectionChange(() => {}));
      }
      function Xe(_, y) {
        _.forEach((m) => {
          m.registerOnValidatorChange && m.registerOnValidatorChange(y);
        });
      }
      function Xt(_, y) {
        const m = gt(_);
        null !== y.validator
          ? _.setValidators(_t(m, y.validator))
          : "function" == typeof m && _.setValidators([m]);
        const S = on(_);
        null !== y.asyncValidator
          ? _.setAsyncValidators(_t(S, y.asyncValidator))
          : "function" == typeof S && _.setAsyncValidators([S]);
        const J = () => _.updateValueAndValidity();
        Xe(y._rawValidators, J), Xe(y._rawAsyncValidators, J);
      }
      function _n(_, y) {
        let m = !1;
        if (null !== _) {
          if (null !== y.validator) {
            const J = gt(_);
            if (Array.isArray(J) && J.length > 0) {
              const ke = J.filter((Ht) => Ht !== y.validator);
              ke.length !== J.length && ((m = !0), _.setValidators(ke));
            }
          }
          if (null !== y.asyncValidator) {
            const J = on(_);
            if (Array.isArray(J) && J.length > 0) {
              const ke = J.filter((Ht) => Ht !== y.asyncValidator);
              ke.length !== J.length && ((m = !0), _.setAsyncValidators(ke));
            }
          }
        }
        const S = () => {};
        return Xe(y._rawValidators, S), Xe(y._rawAsyncValidators, S), m;
      }
      function vt(_, y) {
        _._pendingDirty && _.markAsDirty(),
          _.setValue(_._pendingValue, { emitModelToViewChange: !1 }),
          y.viewToModelUpdate(_._pendingValue),
          (_._pendingChange = !1);
      }
      function fr(_, y) {
        Xt(_, y);
      }
      function Nt(_, y) {
        if (!_.hasOwnProperty("model")) return !1;
        const m = _.model;
        return !!m.isFirstChange() || !Object.is(y, m.currentValue);
      }
      function Qn(_, y) {
        _._syncPendingControls(),
          y.forEach((m) => {
            const S = m.control;
            "submit" === S.updateOn &&
              S._pendingChange &&
              (m.viewToModelUpdate(S._pendingValue), (S._pendingChange = !1));
          });
      }
      function rn(_, y) {
        if (!y) return null;
        let m, S, J;
        return (
          Array.isArray(y),
          y.forEach((ke) => {
            ke.constructor === Ae
              ? (m = ke)
              : (function or(_) {
                  return Object.getPrototypeOf(_.constructor) === X;
                })(ke)
              ? (S = ke)
              : (J = ke);
          }),
          J || S || m || null
        );
      }
      const It = { provide: kt, useExisting: (0, d.Gpc)(() => Pr) },
        pr = (() => Promise.resolve())();
      let Pr = (() => {
        class _ extends kt {
          constructor(m, S) {
            super(),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new d.vpe()),
              (this.form = new L({}, he(m), pt(S)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(m) {
            pr.then(() => {
              const S = this._findContainer(m.path);
              (m.control = S.registerControl(m.name, m.control)),
                mt(m.control, m),
                m.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(m);
            });
          }
          getControl(m) {
            return this.form.get(m.path);
          }
          removeControl(m) {
            pr.then(() => {
              const S = this._findContainer(m.path);
              S && S.removeControl(m.name), this._directives.delete(m);
            });
          }
          addFormGroup(m) {
            pr.then(() => {
              const S = this._findContainer(m.path),
                J = new L({});
              fr(J, m),
                S.registerControl(m.name, J),
                J.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(m) {
            pr.then(() => {
              const S = this._findContainer(m.path);
              S && S.removeControl(m.name);
            });
          }
          getFormGroup(m) {
            return this.form.get(m.path);
          }
          updateModel(m, S) {
            pr.then(() => {
              this.form.get(m.path).setValue(S);
            });
          }
          setValue(m) {
            this.control.setValue(m);
          }
          onSubmit(m) {
            return (
              (this.submitted = !0),
              Qn(this.form, this._directives),
              this.ngSubmit.emit(m),
              "dialog" === m?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(m) {
            this.form.reset(m), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(m) {
            return m.pop(), m.length ? this.form.get(m) : this.form;
          }
        }
        return (
          (_.ɵfac = function (m) {
            return new (m || _)(d.Y36(K, 10), d.Y36(ae, 10));
          }),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (m, S) {
              1 & m &&
                d.NdJ("submit", function (ke) {
                  return S.onSubmit(ke);
                })("reset", function () {
                  return S.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [d._Bn([It]), d.qOj],
          })),
          _
        );
      })();
      function $n(_, y) {
        const m = _.indexOf(y);
        m > -1 && _.splice(m, 1);
      }
      function On(_) {
        return (
          "object" == typeof _ &&
          null !== _ &&
          2 === Object.keys(_).length &&
          "value" in _ &&
          "disabled" in _
        );
      }
      const ir = class extends U {
        constructor(y = null, m, S) {
          super(cr(m), jn(S, m)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(y),
            this._setUpdateStrategy(m),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            Sn(m) &&
              (m.nonNullable || m.initialValueIsDefault) &&
              (this.defaultValue = On(y) ? y.value : y);
        }
        setValue(y, m = {}) {
          (this.value = this._pendingValue = y),
            this._onChange.length &&
              !1 !== m.emitModelToViewChange &&
              this._onChange.forEach((S) =>
                S(this.value, !1 !== m.emitViewToModelChange)
              ),
            this.updateValueAndValidity(m);
        }
        patchValue(y, m = {}) {
          this.setValue(y, m);
        }
        reset(y = this.defaultValue, m = {}) {
          this._applyFormState(y),
            this.markAsPristine(m),
            this.markAsUntouched(m),
            this.setValue(this.value, m),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(y) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(y) {
          this._onChange.push(y);
        }
        _unregisterOnChange(y) {
          $n(this._onChange, y);
        }
        registerOnDisabledChange(y) {
          this._onDisabledChange.push(y);
        }
        _unregisterOnDisabledChange(y) {
          $n(this._onDisabledChange, y);
        }
        _forEachChild(y) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(y) {
          On(y)
            ? ((this.value = this._pendingValue = y.value),
              y.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = y);
        }
      };
      let Wt = (() => {
        class _ extends kt {
          ngOnInit() {
            this._checkParentType(), this.formDirective.addFormGroup(this);
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeFormGroup(this);
          }
          get control() {
            return this.formDirective.getFormGroup(this);
          }
          get path() {
            return We(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            );
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          _checkParentType() {}
        }
        return (
          (_.ɵfac = (function () {
            let y;
            return function (S) {
              return (y || (y = d.n5z(_)))(S || _);
            };
          })()),
          (_.ɵdir = d.lG2({ type: _, features: [d.qOj] })),
          _
        );
      })();
      const In = { provide: yn, useExisting: (0, d.Gpc)(() => To) },
        Ao = (() => Promise.resolve())();
      let To = (() => {
          class _ extends yn {
            constructor(m, S, J, ke, Ht) {
              super(),
                (this._changeDetectorRef = Ht),
                (this.control = new ir()),
                (this._registered = !1),
                (this.update = new d.vpe()),
                (this._parent = m),
                this._setValidators(S),
                this._setAsyncValidators(J),
                (this.valueAccessor = rn(0, ke));
            }
            ngOnChanges(m) {
              if ((this._checkForErrors(), !this._registered || "name" in m)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const S = m.name.previousValue;
                  this.formDirective.removeControl({
                    name: S,
                    path: this._getPath(S),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in m && this._updateDisabled(m),
                Nt(m, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(m) {
              (this.viewModel = m), this.update.emit(m);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              mt(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(m) {
              Ao.then(() => {
                this.control.setValue(m, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(m) {
              const S = m.isDisabled.currentValue,
                J = 0 !== S && (0, d.D6c)(S);
              Ao.then(() => {
                J && !this.control.disabled
                  ? this.control.disable()
                  : !J && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(m) {
              return this._parent ? We(m, this._parent) : [m];
            }
          }
          return (
            (_.ɵfac = function (m) {
              return new (m || _)(
                d.Y36(kt, 9),
                d.Y36(K, 10),
                d.Y36(ae, 10),
                d.Y36(Me, 10),
                d.Y36(d.sBO, 8)
              );
            }),
            (_.ɵdir = d.lG2({
              type: _,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [d._Bn([In]), d.qOj, d.TTD],
            })),
            _
          );
        })(),
        xo = (() => {
          class _ {}
          return (
            (_.ɵfac = function (m) {
              return new (m || _)();
            }),
            (_.ɵdir = d.lG2({
              type: _,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            _
          );
        })();
      const Xo = { provide: Me, useExisting: (0, d.Gpc)(() => Oo), multi: !0 };
      let Oo = (() => {
          class _ extends X {
            writeValue(m) {
              this.setProperty("value", m ?? "");
            }
            registerOnChange(m) {
              this.onChange = (S) => {
                m("" == S ? null : parseFloat(S));
              };
            }
          }
          return (
            (_.ɵfac = (function () {
              let y;
              return function (S) {
                return (y || (y = d.n5z(_)))(S || _);
              };
            })()),
            (_.ɵdir = d.lG2({
              type: _,
              selectors: [
                ["input", "type", "number", "formControlName", ""],
                ["input", "type", "number", "formControl", ""],
                ["input", "type", "number", "ngModel", ""],
              ],
              hostBindings: function (m, S) {
                1 & m &&
                  d.NdJ("input", function (ke) {
                    return S.onChange(ke.target.value);
                  })("blur", function () {
                    return S.onTouched();
                  });
              },
              features: [d._Bn([Xo]), d.qOj],
            })),
            _
          );
        })(),
        ei = (() => {
          class _ {}
          return (
            (_.ɵfac = function (m) {
              return new (m || _)();
            }),
            (_.ɵmod = d.oAB({ type: _ })),
            (_.ɵinj = d.cJS({})),
            _
          );
        })();
      const co = new d.OlP("NgModelWithFormControlWarning"),
        Gn = { provide: kt, useExisting: (0, d.Gpc)(() => Xn) };
      let Xn = (() => {
        class _ extends kt {
          constructor(m, S) {
            super(),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new d.vpe()),
              this._setValidators(m),
              this._setAsyncValidators(S);
          }
          ngOnChanges(m) {
            this._checkFormPresent(),
              m.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          ngOnDestroy() {
            this.form &&
              (_n(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(m) {
            const S = this.form.get(m.path);
            return (
              mt(S, m),
              S.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(m),
              S
            );
          }
          getControl(m) {
            return this.form.get(m.path);
          }
          removeControl(m) {
            De(m.control || null, m, !1),
              (function Dn(_, y) {
                const m = _.indexOf(y);
                m > -1 && _.splice(m, 1);
              })(this.directives, m);
          }
          addFormGroup(m) {
            this._setUpFormContainer(m);
          }
          removeFormGroup(m) {
            this._cleanUpFormContainer(m);
          }
          getFormGroup(m) {
            return this.form.get(m.path);
          }
          addFormArray(m) {
            this._setUpFormContainer(m);
          }
          removeFormArray(m) {
            this._cleanUpFormContainer(m);
          }
          getFormArray(m) {
            return this.form.get(m.path);
          }
          updateModel(m, S) {
            this.form.get(m.path).setValue(S);
          }
          onSubmit(m) {
            return (
              (this.submitted = !0),
              Qn(this.form, this.directives),
              this.ngSubmit.emit(m),
              "dialog" === m?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(m) {
            this.form.reset(m), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach((m) => {
              const S = m.control,
                J = this.form.get(m.path);
              S !== J &&
                (De(S || null, m),
                ((_) => _ instanceof ir)(J) && (mt(J, m), (m.control = J)));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _setUpFormContainer(m) {
            const S = this.form.get(m.path);
            fr(S, m), S.updateValueAndValidity({ emitEvent: !1 });
          }
          _cleanUpFormContainer(m) {
            if (this.form) {
              const S = this.form.get(m.path);
              S &&
                (function ut(_, y) {
                  return _n(_, y);
                })(S, m) &&
                S.updateValueAndValidity({ emitEvent: !1 });
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Xt(this.form, this), this._oldForm && _n(this._oldForm, this);
          }
          _checkFormPresent() {}
        }
        return (
          (_.ɵfac = function (m) {
            return new (m || _)(d.Y36(K, 10), d.Y36(ae, 10));
          }),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [["", "formGroup", ""]],
            hostBindings: function (m, S) {
              1 & m &&
                d.NdJ("submit", function (ke) {
                  return S.onSubmit(ke);
                })("reset", function () {
                  return S.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [d._Bn([Gn]), d.qOj, d.TTD],
          })),
          _
        );
      })();
      const oi = { provide: kt, useExisting: (0, d.Gpc)(() => yr) };
      let yr = (() => {
        class _ extends Wt {
          constructor(m, S, J) {
            super(),
              (this._parent = m),
              this._setValidators(S),
              this._setAsyncValidators(J);
          }
          _checkParentType() {
            Po(this._parent);
          }
        }
        return (
          (_.ɵfac = function (m) {
            return new (m || _)(d.Y36(kt, 13), d.Y36(K, 10), d.Y36(ae, 10));
          }),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [["", "formGroupName", ""]],
            inputs: { name: ["formGroupName", "name"] },
            features: [d._Bn([oi]), d.qOj],
          })),
          _
        );
      })();
      const Fr = { provide: kt, useExisting: (0, d.Gpc)(() => En) };
      let En = (() => {
        class _ extends kt {
          constructor(m, S, J) {
            super(),
              (this._parent = m),
              this._setValidators(S),
              this._setAsyncValidators(J);
          }
          ngOnInit() {
            this._checkParentType(), this.formDirective.addFormArray(this);
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeFormArray(this);
          }
          get control() {
            return this.formDirective.getFormArray(this);
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          get path() {
            return We(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            );
          }
          _checkParentType() {
            Po(this._parent);
          }
        }
        return (
          (_.ɵfac = function (m) {
            return new (m || _)(d.Y36(kt, 13), d.Y36(K, 10), d.Y36(ae, 10));
          }),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [["", "formArrayName", ""]],
            inputs: { name: ["formArrayName", "name"] },
            features: [d._Bn([Fr]), d.qOj],
          })),
          _
        );
      })();
      function Po(_) {
        return !(_ instanceof yr || _ instanceof Xn || _ instanceof En);
      }
      const Ss = { provide: yn, useExisting: (0, d.Gpc)(() => wn) };
      let wn = (() => {
        class _ extends yn {
          constructor(m, S, J, ke, Ht) {
            super(),
              (this._ngModelWarningConfig = Ht),
              (this._added = !1),
              (this.update = new d.vpe()),
              (this._ngModelWarningSent = !1),
              (this._parent = m),
              this._setValidators(S),
              this._setAsyncValidators(J),
              (this.valueAccessor = rn(0, ke));
          }
          set isDisabled(m) {}
          ngOnChanges(m) {
            this._added || this._setUpControl(),
              Nt(m, this.viewModel) &&
                ((this.viewModel = this.model),
                this.formDirective.updateModel(this, this.model));
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this);
          }
          viewToModelUpdate(m) {
            (this.viewModel = m), this.update.emit(m);
          }
          get path() {
            return We(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            );
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null;
          }
          _checkParentType() {}
          _setUpControl() {
            this._checkParentType(),
              (this.control = this.formDirective.addControl(this)),
              (this._added = !0);
          }
        }
        return (
          (_._ngModelWarningSentOnce = !1),
          (_.ɵfac = function (m) {
            return new (m || _)(
              d.Y36(kt, 13),
              d.Y36(K, 10),
              d.Y36(ae, 10),
              d.Y36(Me, 10),
              d.Y36(co, 8)
            );
          }),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [["", "formControlName", ""]],
            inputs: {
              name: ["formControlName", "name"],
              isDisabled: ["disabled", "isDisabled"],
              model: ["ngModel", "model"],
            },
            outputs: { update: "ngModelChange" },
            features: [d._Bn([Ss]), d.qOj, d.TTD],
          })),
          _
        );
      })();
      let zn = (() => {
        class _ {
          constructor() {
            this._validator = me;
          }
          ngOnChanges(m) {
            if (this.inputName in m) {
              const S = this.normalizeInput(m[this.inputName].currentValue);
              (this._enabled = this.enabled(S)),
                (this._validator = this._enabled
                  ? this.createValidator(S)
                  : me),
                this._onChange && this._onChange();
            }
          }
          validate(m) {
            return this._validator(m);
          }
          registerOnValidatorChange(m) {
            this._onChange = m;
          }
          enabled(m) {
            return null != m;
          }
        }
        return (
          (_.ɵfac = function (m) {
            return new (m || _)();
          }),
          (_.ɵdir = d.lG2({ type: _, features: [d.TTD] })),
          _
        );
      })();
      const Vi = { provide: K, useExisting: (0, d.Gpc)(() => qt), multi: !0 };
      let qt = (() => {
        class _ extends zn {
          constructor() {
            super(...arguments),
              (this.inputName = "required"),
              (this.normalizeInput = d.D6c),
              (this.createValidator = (m) => be);
          }
          enabled(m) {
            return m;
          }
        }
        return (
          (_.ɵfac = (function () {
            let y;
            return function (S) {
              return (y || (y = d.n5z(_)))(S || _);
            };
          })()),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [
              [
                "",
                "required",
                "",
                "formControlName",
                "",
                3,
                "type",
                "checkbox",
              ],
              ["", "required", "", "formControl", "", 3, "type", "checkbox"],
              ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
            ],
            hostVars: 1,
            hostBindings: function (m, S) {
              2 & m && d.uIk("required", S._enabled ? "" : null);
            },
            inputs: { required: "required" },
            features: [d._Bn([Vi]), d.qOj],
          })),
          _
        );
      })();
      const Fo = { provide: K, useExisting: (0, d.Gpc)(() => Rn), multi: !0 };
      let Rn = (() => {
        class _ extends zn {
          constructor() {
            super(...arguments),
              (this.inputName = "email"),
              (this.normalizeInput = d.D6c),
              (this.createValidator = (m) => Z);
          }
          enabled(m) {
            return m;
          }
        }
        return (
          (_.ɵfac = (function () {
            let y;
            return function (S) {
              return (y || (y = d.n5z(_)))(S || _);
            };
          })()),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [
              ["", "email", "", "formControlName", ""],
              ["", "email", "", "formControl", ""],
              ["", "email", "", "ngModel", ""],
            ],
            inputs: { email: "email" },
            features: [d._Bn([Fo]), d.qOj],
          })),
          _
        );
      })();
      const bn = { provide: K, useExisting: (0, d.Gpc)(() => Lo), multi: !0 };
      let Lo = (() => {
        class _ extends zn {
          constructor() {
            super(...arguments),
              (this.inputName = "minlength"),
              (this.normalizeInput = (m) =>
                (function Dr(_) {
                  return "number" == typeof _ ? _ : parseInt(_, 10);
                })(m)),
              (this.createValidator = (m) => ee(m));
          }
        }
        return (
          (_.ɵfac = (function () {
            let y;
            return function (S) {
              return (y || (y = d.n5z(_)))(S || _);
            };
          })()),
          (_.ɵdir = d.lG2({
            type: _,
            selectors: [
              ["", "minlength", "", "formControlName", ""],
              ["", "minlength", "", "formControl", ""],
              ["", "minlength", "", "ngModel", ""],
            ],
            hostVars: 1,
            hostBindings: function (m, S) {
              2 & m && d.uIk("minlength", S._enabled ? S.minlength : null);
            },
            inputs: { minlength: "minlength" },
            features: [d._Bn([bn]), d.qOj],
          })),
          _
        );
      })();
      const er = { provide: K, useExisting: (0, d.Gpc)(() => qr), multi: !0 };
      let qr = (() => {
          class _ extends zn {
            constructor() {
              super(...arguments),
                (this.inputName = "pattern"),
                (this.normalizeInput = (m) => m),
                (this.createValidator = (m) => de(m));
            }
          }
          return (
            (_.ɵfac = (function () {
              let y;
              return function (S) {
                return (y || (y = d.n5z(_)))(S || _);
              };
            })()),
            (_.ɵdir = d.lG2({
              type: _,
              selectors: [
                ["", "pattern", "", "formControlName", ""],
                ["", "pattern", "", "formControl", ""],
                ["", "pattern", "", "ngModel", ""],
              ],
              hostVars: 1,
              hostBindings: function (m, S) {
                2 & m && d.uIk("pattern", S._enabled ? S.pattern : null);
              },
              inputs: { pattern: "pattern" },
              features: [d._Bn([er]), d.qOj],
            })),
            _
          );
        })(),
        Br = (() => {
          class _ {}
          return (
            (_.ɵfac = function (m) {
              return new (m || _)();
            }),
            (_.ɵmod = d.oAB({ type: _ })),
            (_.ɵinj = d.cJS({ imports: [ei] })),
            _
          );
        })(),
        li = (() => {
          class _ {}
          return (
            (_.ɵfac = function (m) {
              return new (m || _)();
            }),
            (_.ɵmod = d.oAB({ type: _ })),
            (_.ɵinj = d.cJS({ imports: [Br] })),
            _
          );
        })(),
        ui = (() => {
          class _ {
            static withConfig(m) {
              return {
                ngModule: _,
                providers: [
                  { provide: co, useValue: m.warnOnNgModelWithFormControl },
                ],
              };
            }
          }
          return (
            (_.ɵfac = function (m) {
              return new (m || _)();
            }),
            (_.ɵmod = d.oAB({ type: _ })),
            (_.ɵinj = d.cJS({ imports: [Br] })),
            _
          );
        })();
      class Bo extends U {
        constructor(y, m, S) {
          super(cr(m), jn(S, m)),
            (this.controls = y),
            this._initObservables(),
            this._setUpdateStrategy(m),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        at(y) {
          return this.controls[this._adjustIndex(y)];
        }
        push(y, m = {}) {
          this.controls.push(y),
            this._registerControl(y),
            this.updateValueAndValidity({ emitEvent: m.emitEvent }),
            this._onCollectionChange();
        }
        insert(y, m, S = {}) {
          this.controls.splice(y, 0, m),
            this._registerControl(m),
            this.updateValueAndValidity({ emitEvent: S.emitEvent });
        }
        removeAt(y, m = {}) {
          let S = this._adjustIndex(y);
          S < 0 && (S = 0),
            this.controls[S] &&
              this.controls[S]._registerOnCollectionChange(() => {}),
            this.controls.splice(S, 1),
            this.updateValueAndValidity({ emitEvent: m.emitEvent });
        }
        setControl(y, m, S = {}) {
          let J = this._adjustIndex(y);
          J < 0 && (J = 0),
            this.controls[J] &&
              this.controls[J]._registerOnCollectionChange(() => {}),
            this.controls.splice(J, 1),
            m && (this.controls.splice(J, 0, m), this._registerControl(m)),
            this.updateValueAndValidity({ emitEvent: S.emitEvent }),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(y, m = {}) {
          nr(this, 0, y),
            y.forEach((S, J) => {
              Yr(this, !1, J),
                this.at(J).setValue(S, {
                  onlySelf: !0,
                  emitEvent: m.emitEvent,
                });
            }),
            this.updateValueAndValidity(m);
        }
        patchValue(y, m = {}) {
          null != y &&
            (y.forEach((S, J) => {
              this.at(J) &&
                this.at(J).patchValue(S, {
                  onlySelf: !0,
                  emitEvent: m.emitEvent,
                });
            }),
            this.updateValueAndValidity(m));
        }
        reset(y = [], m = {}) {
          this._forEachChild((S, J) => {
            S.reset(y[J], { onlySelf: !0, emitEvent: m.emitEvent });
          }),
            this._updatePristine(m),
            this._updateTouched(m),
            this.updateValueAndValidity(m);
        }
        getRawValue() {
          return this.controls.map((y) => y.getRawValue());
        }
        clear(y = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((m) => m._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: y.emitEvent }));
        }
        _adjustIndex(y) {
          return y < 0 ? y + this.length : y;
        }
        _syncPendingControls() {
          let y = this.controls.reduce(
            (m, S) => !!S._syncPendingControls() || m,
            !1
          );
          return y && this.updateValueAndValidity({ onlySelf: !0 }), y;
        }
        _forEachChild(y) {
          this.controls.forEach((m, S) => {
            y(m, S);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((y) => y.enabled || this.disabled)
            .map((y) => y.value);
        }
        _anyControls(y) {
          return this.controls.some((m) => m.enabled && y(m));
        }
        _setUpControls() {
          this._forEachChild((y) => this._registerControl(y));
        }
        _allControlsDisabled() {
          for (const y of this.controls) if (y.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(y) {
          y.setParent(this),
            y._registerOnCollectionChange(this._onCollectionChange);
        }
        _find(y) {
          return this.at(y) ?? null;
        }
      }
    },
    1481: (Ge, ue, I) => {
      I.d(ue, { Dx: () => le, b2: () => kt, q6: () => Mn });
      var d = I(6895),
        C = I(8256);
      class k extends d.w_ {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class H extends k {
        static makeCurrent() {
          (0, d.HT)(new H());
        }
        onAndCancel(L, T, j) {
          return (
            L.addEventListener(T, j, !1),
            () => {
              L.removeEventListener(T, j, !1);
            }
          );
        }
        dispatchEvent(L, T) {
          L.dispatchEvent(T);
        }
        remove(L) {
          L.parentNode && L.parentNode.removeChild(L);
        }
        createElement(L, T) {
          return (T = T || this.getDefaultDocument()).createElement(L);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(L) {
          return L.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(L) {
          return L instanceof DocumentFragment;
        }
        getGlobalEventTarget(L, T) {
          return "window" === T
            ? window
            : "document" === T
            ? L
            : "body" === T
            ? L.body
            : null;
        }
        getBaseHref(L) {
          const T = (function ye() {
            return (
              (G = G || document.querySelector("base")),
              G ? G.getAttribute("href") : null
            );
          })();
          return null == T
            ? null
            : (function Ie(U) {
                (Q = Q || document.createElement("a")),
                  Q.setAttribute("href", U);
                const L = Q.pathname;
                return "/" === L.charAt(0) ? L : `/${L}`;
              })(T);
        }
        resetBaseElement() {
          G = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(L) {
          return (0, d.Mx)(document.cookie, L);
        }
      }
      let Q,
        G = null;
      const ve = new C.OlP("TRANSITION_ID"),
        q = [
          {
            provide: C.ip1,
            useFactory: function se(U, L, T) {
              return () => {
                T.get(C.CZH).donePromise.then(() => {
                  const j = (0, d.q)(),
                    ne = L.querySelectorAll(`style[ng-transition="${U}"]`);
                  for (let Ze = 0; Ze < ne.length; Ze++) j.remove(ne[Ze]);
                });
              };
            },
            deps: [ve, d.K0, C.zs3],
            multi: !0,
          },
        ];
      let Te = (() => {
        class U {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (U.ɵfac = function (T) {
            return new (T || U)();
          }),
          (U.ɵprov = C.Yz7({ token: U, factory: U.ɵfac })),
          U
        );
      })();
      const X = new C.OlP("EventManagerPlugins");
      let Me = (() => {
        class U {
          constructor(T, j) {
            (this._zone = j),
              (this._eventNameToPlugin = new Map()),
              T.forEach((ne) => (ne.manager = this)),
              (this._plugins = T.slice().reverse());
          }
          addEventListener(T, j, ne) {
            return this._findPluginFor(j).addEventListener(T, j, ne);
          }
          addGlobalEventListener(T, j, ne) {
            return this._findPluginFor(j).addGlobalEventListener(T, j, ne);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(T) {
            const j = this._eventNameToPlugin.get(T);
            if (j) return j;
            const ne = this._plugins;
            for (let Ze = 0; Ze < ne.length; Ze++) {
              const We = ne[Ze];
              if (We.supports(T)) return this._eventNameToPlugin.set(T, We), We;
            }
            throw new Error(`No event manager plugin found for event ${T}`);
          }
        }
        return (
          (U.ɵfac = function (T) {
            return new (T || U)(C.LFG(X), C.LFG(C.R0b));
          }),
          (U.ɵprov = C.Yz7({ token: U, factory: U.ɵfac })),
          U
        );
      })();
      class Ne {
        constructor(L) {
          this._doc = L;
        }
        addGlobalEventListener(L, T, j) {
          const ne = (0, d.q)().getGlobalEventTarget(this._doc, L);
          if (!ne)
            throw new Error(`Unsupported event target ${ne} for event ${T}`);
          return this.addEventListener(ne, T, j);
        }
      }
      let Qe = (() => {
          class U {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(T) {
              const j = new Set();
              T.forEach((ne) => {
                this._stylesSet.has(ne) || (this._stylesSet.add(ne), j.add(ne));
              }),
                this.onStylesAdded(j);
            }
            onStylesAdded(T) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (U.ɵfac = function (T) {
              return new (T || U)();
            }),
            (U.ɵprov = C.Yz7({ token: U, factory: U.ɵfac })),
            U
          );
        })(),
        Ke = (() => {
          class U extends Qe {
            constructor(T) {
              super(),
                (this._doc = T),
                (this._hostNodes = new Map()),
                this._hostNodes.set(T.head, []);
            }
            _addStylesToHost(T, j, ne) {
              T.forEach((Ze) => {
                const We = this._doc.createElement("style");
                (We.textContent = Ze), ne.push(j.appendChild(We));
              });
            }
            addHost(T) {
              const j = [];
              this._addStylesToHost(this._stylesSet, T, j),
                this._hostNodes.set(T, j);
            }
            removeHost(T) {
              const j = this._hostNodes.get(T);
              j && j.forEach(Et), this._hostNodes.delete(T);
            }
            onStylesAdded(T) {
              this._hostNodes.forEach((j, ne) => {
                this._addStylesToHost(T, ne, j);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((T) => T.forEach(Et));
            }
          }
          return (
            (U.ɵfac = function (T) {
              return new (T || U)(C.LFG(d.K0));
            }),
            (U.ɵprov = C.Yz7({ token: U, factory: U.ɵfac })),
            U
          );
        })();
      function Et(U) {
        (0, d.q)().remove(U);
      }
      const Re = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Ae = /%COMP%/g;
      function Be(U, L, T) {
        for (let j = 0; j < L.length; j++) {
          let ne = L[j];
          Array.isArray(ne)
            ? Be(U, ne, T)
            : ((ne = ne.replace(Ae, U)), T.push(ne));
        }
        return T;
      }
      function Le(U) {
        return (L) => {
          if ("__ngUnwrap__" === L) return U;
          !1 === U(L) && (L.preventDefault(), (L.returnValue = !1));
        };
      }
      let be = (() => {
        class U {
          constructor(T, j, ne) {
            (this.eventManager = T),
              (this.sharedStylesHost = j),
              (this.appId = ne),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new lt(T));
          }
          createRenderer(T, j) {
            if (!T || !j) return this.defaultRenderer;
            switch (j.encapsulation) {
              case C.ifc.Emulated: {
                let ne = this.rendererByCompId.get(j.id);
                return (
                  ne ||
                    ((ne = new de(
                      this.eventManager,
                      this.sharedStylesHost,
                      j,
                      this.appId
                    )),
                    this.rendererByCompId.set(j.id, ne)),
                  ne.applyToHost(T),
                  ne
                );
              }
              case 1:
              case C.ifc.ShadowDom:
                return new me(this.eventManager, this.sharedStylesHost, T, j);
              default:
                if (!this.rendererByCompId.has(j.id)) {
                  const ne = Be(j.id, j.styles, []);
                  this.sharedStylesHost.addStyles(ne),
                    this.rendererByCompId.set(j.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (U.ɵfac = function (T) {
            return new (T || U)(C.LFG(Me), C.LFG(Ke), C.LFG(C.AFp));
          }),
          (U.ɵprov = C.Yz7({ token: U, factory: U.ɵfac })),
          U
        );
      })();
      class lt {
        constructor(L) {
          (this.eventManager = L),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(L, T) {
          return T
            ? document.createElementNS(Re[T] || T, L)
            : document.createElement(L);
        }
        createComment(L) {
          return document.createComment(L);
        }
        createText(L) {
          return document.createTextNode(L);
        }
        appendChild(L, T) {
          (te(L) ? L.content : L).appendChild(T);
        }
        insertBefore(L, T, j) {
          L && (te(L) ? L.content : L).insertBefore(T, j);
        }
        removeChild(L, T) {
          L && L.removeChild(T);
        }
        selectRootElement(L, T) {
          let j = "string" == typeof L ? document.querySelector(L) : L;
          if (!j)
            throw new Error(`The selector "${L}" did not match any elements`);
          return T || (j.textContent = ""), j;
        }
        parentNode(L) {
          return L.parentNode;
        }
        nextSibling(L) {
          return L.nextSibling;
        }
        setAttribute(L, T, j, ne) {
          if (ne) {
            T = ne + ":" + T;
            const Ze = Re[ne];
            Ze ? L.setAttributeNS(Ze, T, j) : L.setAttribute(T, j);
          } else L.setAttribute(T, j);
        }
        removeAttribute(L, T, j) {
          if (j) {
            const ne = Re[j];
            ne ? L.removeAttributeNS(ne, T) : L.removeAttribute(`${j}:${T}`);
          } else L.removeAttribute(T);
        }
        addClass(L, T) {
          L.classList.add(T);
        }
        removeClass(L, T) {
          L.classList.remove(T);
        }
        setStyle(L, T, j, ne) {
          ne & (C.JOm.DashCase | C.JOm.Important)
            ? L.style.setProperty(T, j, ne & C.JOm.Important ? "important" : "")
            : (L.style[T] = j);
        }
        removeStyle(L, T, j) {
          j & C.JOm.DashCase ? L.style.removeProperty(T) : (L.style[T] = "");
        }
        setProperty(L, T, j) {
          L[T] = j;
        }
        setValue(L, T) {
          L.nodeValue = T;
        }
        listen(L, T, j) {
          return "string" == typeof L
            ? this.eventManager.addGlobalEventListener(L, T, Le(j))
            : this.eventManager.addEventListener(L, T, Le(j));
        }
      }
      function te(U) {
        return "TEMPLATE" === U.tagName && void 0 !== U.content;
      }
      class de extends lt {
        constructor(L, T, j, ne) {
          super(L), (this.component = j);
          const Ze = Be(ne + "-" + j.id, j.styles, []);
          T.addStyles(Ze),
            (this.contentAttr = (function ae(U) {
              return "_ngcontent-%COMP%".replace(Ae, U);
            })(ne + "-" + j.id)),
            (this.hostAttr = (function xe(U) {
              return "_nghost-%COMP%".replace(Ae, U);
            })(ne + "-" + j.id));
        }
        applyToHost(L) {
          super.setAttribute(L, this.hostAttr, "");
        }
        createElement(L, T) {
          const j = super.createElement(L, T);
          return super.setAttribute(j, this.contentAttr, ""), j;
        }
      }
      class me extends lt {
        constructor(L, T, j, ne) {
          super(L),
            (this.sharedStylesHost = T),
            (this.hostEl = j),
            (this.shadowRoot = j.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const Ze = Be(ne.id, ne.styles, []);
          for (let We = 0; We < Ze.length; We++) {
            const mt = document.createElement("style");
            (mt.textContent = Ze[We]), this.shadowRoot.appendChild(mt);
          }
        }
        nodeOrShadowRoot(L) {
          return L === this.hostEl ? this.shadowRoot : L;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(L, T) {
          return super.appendChild(this.nodeOrShadowRoot(L), T);
        }
        insertBefore(L, T, j) {
          return super.insertBefore(this.nodeOrShadowRoot(L), T, j);
        }
        removeChild(L, T) {
          return super.removeChild(this.nodeOrShadowRoot(L), T);
        }
        parentNode(L) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(L))
          );
        }
      }
      let Ce = (() => {
        class U extends Ne {
          constructor(T) {
            super(T);
          }
          supports(T) {
            return !0;
          }
          addEventListener(T, j, ne) {
            return (
              T.addEventListener(j, ne, !1),
              () => this.removeEventListener(T, j, ne)
            );
          }
          removeEventListener(T, j, ne) {
            return T.removeEventListener(j, ne);
          }
        }
        return (
          (U.ɵfac = function (T) {
            return new (T || U)(C.LFG(d.K0));
          }),
          (U.ɵprov = C.Yz7({ token: U, factory: U.ɵfac })),
          U
        );
      })();
      const Je = ["alt", "control", "meta", "shift"],
        ct = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Dt = {
          alt: (U) => U.altKey,
          control: (U) => U.ctrlKey,
          meta: (U) => U.metaKey,
          shift: (U) => U.shiftKey,
        };
      let B = (() => {
        class U extends Ne {
          constructor(T) {
            super(T);
          }
          supports(T) {
            return null != U.parseEventName(T);
          }
          addEventListener(T, j, ne) {
            const Ze = U.parseEventName(j),
              We = U.eventCallback(Ze.fullKey, ne, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() =>
                (0, d.q)().onAndCancel(T, Ze.domEventName, We)
              );
          }
          static parseEventName(T) {
            const j = T.toLowerCase().split("."),
              ne = j.shift();
            if (0 === j.length || ("keydown" !== ne && "keyup" !== ne))
              return null;
            const Ze = U._normalizeKey(j.pop());
            let We = "",
              mt = j.indexOf("code");
            if (
              (mt > -1 && (j.splice(mt, 1), (We = "code.")),
              Je.forEach((Xe) => {
                const St = j.indexOf(Xe);
                St > -1 && (j.splice(St, 1), (We += Xe + "."));
              }),
              (We += Ze),
              0 != j.length || 0 === Ze.length)
            )
              return null;
            const De = {};
            return (De.domEventName = ne), (De.fullKey = We), De;
          }
          static matchEventFullKeyCode(T, j) {
            let ne = ct[T.key] || T.key,
              Ze = "";
            return (
              j.indexOf("code.") > -1 && ((ne = T.code), (Ze = "code.")),
              !(null == ne || !ne) &&
                ((ne = ne.toLowerCase()),
                " " === ne ? (ne = "space") : "." === ne && (ne = "dot"),
                Je.forEach((We) => {
                  We !== ne && (0, Dt[We])(T) && (Ze += We + ".");
                }),
                (Ze += ne),
                Ze === j)
            );
          }
          static eventCallback(T, j, ne) {
            return (Ze) => {
              U.matchEventFullKeyCode(Ze, T) && ne.runGuarded(() => j(Ze));
            };
          }
          static _normalizeKey(T) {
            return "esc" === T ? "escape" : T;
          }
        }
        return (
          (U.ɵfac = function (T) {
            return new (T || U)(C.LFG(d.K0));
          }),
          (U.ɵprov = C.Yz7({ token: U, factory: U.ɵfac })),
          U
        );
      })();
      const Mn = (0, C.eFA)(C._c5, "browser", [
          { provide: C.Lbi, useValue: d.bD },
          {
            provide: C.g9A,
            useValue: function _t() {
              H.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: d.K0,
            useFactory: function on() {
              return (0, C.RDi)(document), document;
            },
            deps: [],
          },
        ]),
        et = new C.OlP(""),
        Lt = [
          {
            provide: C.rWj,
            useClass: class Ee {
              addToWindow(L) {
                (C.dqk.getAngularTestability = (j, ne = !0) => {
                  const Ze = L.findTestabilityInTree(j, ne);
                  if (null == Ze)
                    throw new Error("Could not find testability for element.");
                  return Ze;
                }),
                  (C.dqk.getAllAngularTestabilities = () =>
                    L.getAllTestabilities()),
                  (C.dqk.getAllAngularRootElements = () =>
                    L.getAllRootElements()),
                  C.dqk.frameworkStabilizers ||
                    (C.dqk.frameworkStabilizers = []),
                  C.dqk.frameworkStabilizers.push((j) => {
                    const ne = C.dqk.getAllAngularTestabilities();
                    let Ze = ne.length,
                      We = !1;
                    const mt = function (De) {
                      (We = We || De), Ze--, 0 == Ze && j(We);
                    };
                    ne.forEach(function (De) {
                      De.whenStable(mt);
                    });
                  });
              }
              findTestabilityInTree(L, T, j) {
                return null == T
                  ? null
                  : L.getTestability(T) ??
                      (j
                        ? (0, d.q)().isShadowRoot(T)
                          ? this.findTestabilityInTree(L, T.host, !0)
                          : this.findTestabilityInTree(L, T.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: C.lri, useClass: C.dDg, deps: [C.R0b, C.eoX, C.rWj] },
          { provide: C.dDg, useClass: C.dDg, deps: [C.R0b, C.eoX, C.rWj] },
        ],
        qn = [
          { provide: C.zSh, useValue: "root" },
          {
            provide: C.qLn,
            useFactory: function gt() {
              return new C.qLn();
            },
            deps: [],
          },
          { provide: X, useClass: Ce, multi: !0, deps: [d.K0, C.R0b, C.Lbi] },
          { provide: X, useClass: B, multi: !0, deps: [d.K0] },
          { provide: be, useClass: be, deps: [Me, Ke, C.AFp] },
          { provide: C.FYo, useExisting: be },
          { provide: Qe, useExisting: Ke },
          { provide: Ke, useClass: Ke, deps: [d.K0] },
          { provide: Me, useClass: Me, deps: [X, C.R0b] },
          { provide: d.JF, useClass: Te, deps: [] },
          [],
        ];
      let kt = (() => {
          class U {
            constructor(T) {}
            static withServerTransition(T) {
              return {
                ngModule: U,
                providers: [
                  { provide: C.AFp, useValue: T.appId },
                  { provide: ve, useExisting: C.AFp },
                  q,
                ],
              };
            }
          }
          return (
            (U.ɵfac = function (T) {
              return new (T || U)(C.LFG(et, 12));
            }),
            (U.ɵmod = C.oAB({ type: U })),
            (U.ɵinj = C.cJS({
              providers: [...qn, ...Lt],
              imports: [d.ez, C.hGG],
            })),
            U
          );
        })(),
        le = (() => {
          class U {
            constructor(T) {
              this._doc = T;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(T) {
              this._doc.title = T || "";
            }
          }
          return (
            (U.ɵfac = function (T) {
              return new (T || U)(C.LFG(d.K0));
            }),
            (U.ɵprov = C.Yz7({
              token: U,
              factory: function (T) {
                let j = null;
                return (
                  (j = T
                    ? new T()
                    : (function Bn() {
                        return new le((0, C.LFG)(d.K0));
                      })()),
                  j
                );
              },
              providedIn: "root",
            })),
            U
          );
        })();
      typeof window < "u" && window;
    },
    1196: (Ge, ue, I) => {
      I.d(ue, {
        gz: () => En,
        F0: () => un,
        Od: () => Ns,
        yS: () => qi,
        Bz: () => Ml,
        lC: () => mo,
      });
      var d = I(8256),
        C = I(2076),
        k = I(9646),
        H = I(1135);
      const ye = (0, I(3888).d)(
        (l) =>
          function () {
            l(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      var Q = I(9751),
        Ie = I(4742),
        ve = I(4671),
        se = I(3268),
        q = I(7669),
        Ee = I(1810),
        Te = I(5403),
        X = I(9672);
      function Me(...l) {
        const u = (0, q.yG)(l),
          a = (0, q.jO)(l),
          { args: h, keys: v } = (0, Ie.D)(l);
        if (0 === h.length) return (0, C.D)([], u);
        const w = new Q.y(
          (function Ne(l, u, a = ve.y) {
            return (h) => {
              Qe(
                u,
                () => {
                  const { length: v } = l,
                    w = new Array(v);
                  let x = v,
                    R = v;
                  for (let Y = 0; Y < v; Y++)
                    Qe(
                      u,
                      () => {
                        const Se = (0, C.D)(l[Y], u);
                        let rt = !1;
                        Se.subscribe(
                          (0, Te.x)(
                            h,
                            (Pe) => {
                              (w[Y] = Pe),
                                rt || ((rt = !0), R--),
                                R || h.next(a(w.slice()));
                            },
                            () => {
                              --x || h.complete();
                            }
                          )
                        );
                      },
                      h
                    );
                },
                h
              );
            };
          })(h, u, v ? (x) => (0, Ee.n)(v, x) : ve.y)
        );
        return a ? w.pipe((0, se.Z)(a)) : w;
      }
      function Qe(l, u, a) {
        l ? (0, X.f)(a, l, u) : u();
      }
      var Ke = I(8189);
      function Re(...l) {
        return (function Et() {
          return (0, Ke.J)(1);
        })()((0, C.D)(l, (0, q.yG)(l)));
      }
      var Ae = I(8421);
      function we(l) {
        return new Q.y((u) => {
          (0, Ae.Xf)(l()).subscribe(u);
        });
      }
      var fe = I(9635),
        ot = I(2843),
        K = I(515),
        ae = I(727),
        xe = I(4482);
      function Be() {
        return (0, xe.e)((l, u) => {
          let a = null;
          l._refCount++;
          const h = (0, Te.x)(u, void 0, void 0, void 0, () => {
            if (!l || l._refCount <= 0 || 0 < --l._refCount)
              return void (a = null);
            const v = l._connection,
              w = a;
            (a = null),
              v && (!w || v === w) && v.unsubscribe(),
              u.unsubscribe();
          });
          l.subscribe(h), h.closed || (a = l.connect());
        });
      }
      class Le extends Q.y {
        constructor(u, a) {
          super(),
            (this.source = u),
            (this.subjectFactory = a),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            (0, xe.A)(u) && (this.lift = u.lift);
        }
        _subscribe(u) {
          return this.getSubject().subscribe(u);
        }
        getSubject() {
          const u = this._subject;
          return (
            (!u || u.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: u } = this;
          (this._subject = this._connection = null), u?.unsubscribe();
        }
        connect() {
          let u = this._connection;
          if (!u) {
            u = this._connection = new ae.w0();
            const a = this.getSubject();
            u.add(
              this.source.subscribe(
                (0, Te.x)(
                  a,
                  void 0,
                  () => {
                    this._teardown(), a.complete();
                  },
                  (h) => {
                    this._teardown(), a.error(h);
                  },
                  () => this._teardown()
                )
              )
            ),
              u.closed && ((this._connection = null), (u = ae.w0.EMPTY));
          }
          return u;
        }
        refCount() {
          return Be()(this);
        }
      }
      var nt = I(7579),
        be = I(6895),
        lt = I(4004);
      function Z(l, u) {
        return (0, xe.e)((a, h) => {
          let v = null,
            w = 0,
            x = !1;
          const R = () => x && !v && h.complete();
          a.subscribe(
            (0, Te.x)(
              h,
              (Y) => {
                v?.unsubscribe();
                let Se = 0;
                const rt = w++;
                (0, Ae.Xf)(l(Y, rt)).subscribe(
                  (v = (0, Te.x)(
                    h,
                    (Pe) => h.next(u ? u(Y, Pe, rt, Se++) : Pe),
                    () => {
                      (v = null), R();
                    }
                  ))
                );
              },
              () => {
                (x = !0), R();
              }
            )
          );
        });
      }
      var ee = I(5698),
        de = I(9300),
        me = I(5577);
      function Ce(l) {
        return (0, xe.e)((u, a) => {
          let h = !1;
          u.subscribe(
            (0, Te.x)(
              a,
              (v) => {
                (h = !0), a.next(v);
              },
              () => {
                h || a.next(l), a.complete();
              }
            )
          );
        });
      }
      function Je(l = ct) {
        return (0, xe.e)((u, a) => {
          let h = !1;
          u.subscribe(
            (0, Te.x)(
              a,
              (v) => {
                (h = !0), a.next(v);
              },
              () => (h ? a.complete() : a.error(l()))
            )
          );
        });
      }
      function ct() {
        return new ye();
      }
      function Dt(l, u) {
        const a = arguments.length >= 2;
        return (h) =>
          h.pipe(
            l ? (0, de.h)((v, w) => l(v, w, h)) : ve.y,
            (0, ee.q)(1),
            a ? Ce(u) : Je(() => new ye())
          );
      }
      var B = I(4351),
        ge = I(8505),
        W = I(262);
      function he(l, u, a, h, v) {
        return (w, x) => {
          let R = a,
            Y = u,
            Se = 0;
          w.subscribe(
            (0, Te.x)(
              x,
              (rt) => {
                const Pe = Se++;
                (Y = R ? l(Y, rt, Pe) : ((R = !0), rt)), h && x.next(Y);
              },
              v &&
                (() => {
                  R && x.next(Y), x.complete();
                })
            )
          );
        };
      }
      function ze(l, u) {
        return (0, xe.e)(he(l, u, arguments.length >= 2, !0));
      }
      function pt(l) {
        return l <= 0
          ? () => K.E
          : (0, xe.e)((u, a) => {
              let h = [];
              u.subscribe(
                (0, Te.x)(
                  a,
                  (v) => {
                    h.push(v), l < h.length && h.shift();
                  },
                  () => {
                    for (const v of h) a.next(v);
                    a.complete();
                  },
                  void 0,
                  () => {
                    h = null;
                  }
                )
              );
            });
      }
      function _t(l, u) {
        const a = arguments.length >= 2;
        return (h) =>
          h.pipe(
            l ? (0, de.h)((v, w) => l(v, w, h)) : ve.y,
            pt(1),
            a ? Ce(u) : Je(() => new ye())
          );
      }
      function sn(l) {
        return (0, xe.e)((u, a) => {
          try {
            u.subscribe(a);
          } finally {
            a.add(l);
          }
        });
      }
      var Mn = I(1481);
      const et = "primary",
        Lt = Symbol("RouteTitle");
      class qn {
        constructor(u) {
          this.params = u || {};
        }
        has(u) {
          return Object.prototype.hasOwnProperty.call(this.params, u);
        }
        get(u) {
          if (this.has(u)) {
            const a = this.params[u];
            return Array.isArray(a) ? a[0] : a;
          }
          return null;
        }
        getAll(u) {
          if (this.has(u)) {
            const a = this.params[u];
            return Array.isArray(a) ? a : [a];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function kt(l) {
        return new qn(l);
      }
      function yn(l, u, a) {
        const h = a.path.split("/");
        if (
          h.length > l.length ||
          ("full" === a.pathMatch && (u.hasChildren() || h.length < l.length))
        )
          return null;
        const v = {};
        for (let w = 0; w < h.length; w++) {
          const x = h[w],
            R = l[w];
          if (x.startsWith(":")) v[x.substring(1)] = R;
          else if (x !== R.path) return null;
        }
        return { consumed: l.slice(0, h.length), posParams: v };
      }
      function hn(l, u) {
        const a = l ? Object.keys(l) : void 0,
          h = u ? Object.keys(u) : void 0;
        if (!a || !h || a.length != h.length) return !1;
        let v;
        for (let w = 0; w < a.length; w++)
          if (((v = a[w]), !Bn(l[v], u[v]))) return !1;
        return !0;
      }
      function Bn(l, u) {
        if (Array.isArray(l) && Array.isArray(u)) {
          if (l.length !== u.length) return !1;
          const a = [...l].sort(),
            h = [...u].sort();
          return a.every((v, w) => h[w] === v);
        }
        return l === u;
      }
      function le(l) {
        return Array.prototype.concat.apply([], l);
      }
      function O(l) {
        return l.length > 0 ? l[l.length - 1] : null;
      }
      function $(l, u) {
        for (const a in l) l.hasOwnProperty(a) && u(l[a], a);
      }
      function oe(l) {
        return (0, d.CqO)(l)
          ? l
          : (0, d.QGY)(l)
          ? (0, C.D)(Promise.resolve(l))
          : (0, k.of)(l);
      }
      const yt = {
          exact: function Kt(l, u, a) {
            if (
              !zt(l.segments, u.segments) ||
              !Zt(l.segments, u.segments, a) ||
              l.numberOfChildren !== u.numberOfChildren
            )
              return !1;
            for (const h in u.children)
              if (!l.children[h] || !Kt(l.children[h], u.children[h], a))
                return !1;
            return !0;
          },
          subset: Pt,
        },
        Ue = {
          exact: function bt(l, u) {
            return hn(l, u);
          },
          subset: function He(l, u) {
            return (
              Object.keys(u).length <= Object.keys(l).length &&
              Object.keys(u).every((a) => Bn(l[a], u[a]))
            );
          },
          ignored: () => !0,
        };
      function Gt(l, u, a) {
        return (
          yt[a.paths](l.root, u.root, a.matrixParams) &&
          Ue[a.queryParams](l.queryParams, u.queryParams) &&
          !("exact" === a.fragment && l.fragment !== u.fragment)
        );
      }
      function Pt(l, u, a) {
        return Mt(l, u, u.segments, a);
      }
      function Mt(l, u, a, h) {
        if (l.segments.length > a.length) {
          const v = l.segments.slice(0, a.length);
          return !(!zt(v, a) || u.hasChildren() || !Zt(v, a, h));
        }
        if (l.segments.length === a.length) {
          if (!zt(l.segments, a) || !Zt(l.segments, a, h)) return !1;
          for (const v in u.children)
            if (!l.children[v] || !Pt(l.children[v], u.children[v], h))
              return !1;
          return !0;
        }
        {
          const v = a.slice(0, l.segments.length),
            w = a.slice(l.segments.length);
          return (
            !!(zt(l.segments, v) && Zt(l.segments, v, h) && l.children[et]) &&
            Mt(l.children[et], u, w, h)
          );
        }
      }
      function Zt(l, u, a) {
        return u.every((h, v) => Ue[a](l[v].parameters, h.parameters));
      }
      class it {
        constructor(u, a, h) {
          (this.root = u), (this.queryParams = a), (this.fragment = h);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = kt(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return cr.serialize(this);
        }
      }
      class $e {
        constructor(u, a) {
          (this.segments = u),
            (this.children = a),
            (this.parent = null),
            $(a, (h, v) => (h.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return dr(this);
        }
      }
      class pn {
        constructor(u, a) {
          (this.path = u), (this.parameters = a);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = kt(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return T(this);
        }
      }
      function zt(l, u) {
        return l.length === u.length && l.every((a, h) => a.path === u[h].path);
      }
      let vn = (() => {
        class l {}
        return (
          (l.ɵfac = function (a) {
            return new (a || l)();
          }),
          (l.ɵprov = d.Yz7({
            token: l,
            factory: function () {
              return new Un();
            },
            providedIn: "root",
          })),
          l
        );
      })();
      class Un {
        parse(u) {
          const a = new Xt(u);
          return new it(
            a.parseRootSegment(),
            a.parseQueryParams(),
            a.parseFragment()
          );
        }
        serialize(u) {
          const a = `/${jn(u.root, !0)}`,
            h = (function ne(l) {
              const u = Object.keys(l)
                .map((a) => {
                  const h = l[a];
                  return Array.isArray(h)
                    ? h.map((v) => `${Sn(a)}=${Sn(v)}`).join("&")
                    : `${Sn(a)}=${Sn(h)}`;
                })
                .filter((a) => !!a);
              return u.length ? `?${u.join("&")}` : "";
            })(u.queryParams);
          return `${a}${h}${
            "string" == typeof u.fragment
              ? `#${(function Yr(l) {
                  return encodeURI(l);
                })(u.fragment)}`
              : ""
          }`;
        }
      }
      const cr = new Un();
      function dr(l) {
        return l.segments.map((u) => T(u)).join("/");
      }
      function jn(l, u) {
        if (!l.hasChildren()) return dr(l);
        if (u) {
          const a = l.children[et] ? jn(l.children[et], !1) : "",
            h = [];
          return (
            $(l.children, (v, w) => {
              w !== et && h.push(`${w}:${jn(v, !1)}`);
            }),
            h.length > 0 ? `${a}(${h.join("//")})` : a
          );
        }
        {
          const a = (function nn(l, u) {
            let a = [];
            return (
              $(l.children, (h, v) => {
                v === et && (a = a.concat(u(h, v)));
              }),
              $(l.children, (h, v) => {
                v !== et && (a = a.concat(u(h, v)));
              }),
              a
            );
          })(l, (h, v) =>
            v === et ? [jn(l.children[et], !1)] : [`${v}:${jn(h, !1)}`]
          );
          return 1 === Object.keys(l.children).length && null != l.children[et]
            ? `${dr(l)}/${a[0]}`
            : `${dr(l)}/(${a.join("//")})`;
        }
      }
      function Rr(l) {
        return encodeURIComponent(l)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Sn(l) {
        return Rr(l).replace(/%3B/gi, ";");
      }
      function nr(l) {
        return Rr(l)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function U(l) {
        return decodeURIComponent(l);
      }
      function L(l) {
        return U(l.replace(/\+/g, "%20"));
      }
      function T(l) {
        return `${nr(l.path)}${(function j(l) {
          return Object.keys(l)
            .map((u) => `;${nr(u)}=${nr(l[u])}`)
            .join("");
        })(l.parameters)}`;
      }
      const Ze = /^[^\/()?;=#]+/;
      function We(l) {
        const u = l.match(Ze);
        return u ? u[0] : "";
      }
      const mt = /^[^=?&#]+/,
        Xe = /^[^&#]+/;
      class Xt {
        constructor(u) {
          (this.url = u), (this.remaining = u);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new $e([], {})
              : new $e([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const u = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(u);
            } while (this.consumeOptional("&"));
          return u;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const u = [];
          for (
            this.peekStartsWith("(") || u.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), u.push(this.parseSegment());
          let a = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (a = this.parseParens(!0)));
          let h = {};
          return (
            this.peekStartsWith("(") && (h = this.parseParens(!1)),
            (u.length > 0 || Object.keys(a).length > 0) &&
              (h[et] = new $e(u, a)),
            h
          );
        }
        parseSegment() {
          const u = We(this.remaining);
          if ("" === u && this.peekStartsWith(";")) throw new d.vHH(4009, !1);
          return this.capture(u), new pn(U(u), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const u = {};
          for (; this.consumeOptional(";"); ) this.parseParam(u);
          return u;
        }
        parseParam(u) {
          const a = We(this.remaining);
          if (!a) return;
          this.capture(a);
          let h = "";
          if (this.consumeOptional("=")) {
            const v = We(this.remaining);
            v && ((h = v), this.capture(h));
          }
          u[U(a)] = U(h);
        }
        parseQueryParam(u) {
          const a = (function De(l) {
            const u = l.match(mt);
            return u ? u[0] : "";
          })(this.remaining);
          if (!a) return;
          this.capture(a);
          let h = "";
          if (this.consumeOptional("=")) {
            const x = (function St(l) {
              const u = l.match(Xe);
              return u ? u[0] : "";
            })(this.remaining);
            x && ((h = x), this.capture(h));
          }
          const v = L(a),
            w = L(h);
          if (u.hasOwnProperty(v)) {
            let x = u[v];
            Array.isArray(x) || ((x = [x]), (u[v] = x)), x.push(w);
          } else u[v] = w;
        }
        parseParens(u) {
          const a = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const h = We(this.remaining),
              v = this.remaining[h.length];
            if ("/" !== v && ")" !== v && ";" !== v) throw new d.vHH(4010, !1);
            let w;
            h.indexOf(":") > -1
              ? ((w = h.slice(0, h.indexOf(":"))),
                this.capture(w),
                this.capture(":"))
              : u && (w = et);
            const x = this.parseChildren();
            (a[w] = 1 === Object.keys(x).length ? x[et] : new $e([], x)),
              this.consumeOptional("//");
          }
          return a;
        }
        peekStartsWith(u) {
          return this.remaining.startsWith(u);
        }
        consumeOptional(u) {
          return (
            !!this.peekStartsWith(u) &&
            ((this.remaining = this.remaining.substring(u.length)), !0)
          );
        }
        capture(u) {
          if (!this.consumeOptional(u)) throw new d.vHH(4011, !1);
        }
      }
      function _n(l) {
        return l.segments.length > 0 ? new $e([], { [et]: l }) : l;
      }
      function Bt(l) {
        const u = {};
        for (const h of Object.keys(l.children)) {
          const w = Bt(l.children[h]);
          (w.segments.length > 0 || w.hasChildren()) && (u[h] = w);
        }
        return (function rr(l) {
          if (1 === l.numberOfChildren && l.children[et]) {
            const u = l.children[et];
            return new $e(l.segments.concat(u.segments), u.children);
          }
          return l;
        })(new $e(l.segments, u));
      }
      function vt(l) {
        return l instanceof it;
      }
      function hr(l, u, a, h, v) {
        if (0 === a.length) return Nt(u.root, u.root, u.root, h, v);
        const w = (function rn(l) {
          if ("string" == typeof l[0] && 1 === l.length && "/" === l[0])
            return new Qn(!0, 0, l);
          let u = 0,
            a = !1;
          const h = l.reduce((v, w, x) => {
            if ("object" == typeof w && null != w) {
              if (w.outlets) {
                const R = {};
                return (
                  $(w.outlets, (Y, Se) => {
                    R[Se] = "string" == typeof Y ? Y.split("/") : Y;
                  }),
                  [...v, { outlets: R }]
                );
              }
              if (w.segmentPath) return [...v, w.segmentPath];
            }
            return "string" != typeof w
              ? [...v, w]
              : 0 === x
              ? (w.split("/").forEach((R, Y) => {
                  (0 == Y && "." === R) ||
                    (0 == Y && "" === R
                      ? (a = !0)
                      : ".." === R
                      ? u++
                      : "" != R && v.push(R));
                }),
                v)
              : [...v, w];
          }, []);
          return new Qn(a, u, h);
        })(a);
        return w.toRoot()
          ? Nt(u.root, u.root, new $e([], {}), h, v)
          : (function x(Y) {
              const Se = (function It(l, u, a, h) {
                  if (l.isAbsolute) return new Dn(u.root, !0, 0);
                  if (-1 === h) return new Dn(a, a === u.root, 0);
                  return (function pr(l, u, a) {
                    let h = l,
                      v = u,
                      w = a;
                    for (; w > v; ) {
                      if (((w -= v), (h = h.parent), !h))
                        throw new d.vHH(4005, !1);
                      v = h.segments.length;
                    }
                    return new Dn(h, !1, v - w);
                  })(a, h + (Jn(l.commands[0]) ? 0 : 1), l.numberOfDoubleDots);
                })(w, u, l.snapshot?._urlSegment, Y),
                rt = Se.processChildren
                  ? On(Se.segmentGroup, Se.index, w.commands)
                  : $n(Se.segmentGroup, Se.index, w.commands);
              return Nt(u.root, Se.segmentGroup, rt, h, v);
            })(l.snapshot?._lastPathIndex);
      }
      function Jn(l) {
        return (
          "object" == typeof l && null != l && !l.outlets && !l.segmentPath
        );
      }
      function xn(l) {
        return "object" == typeof l && null != l && l.outlets;
      }
      function Nt(l, u, a, h, v) {
        let x,
          w = {};
        h &&
          $(h, (Y, Se) => {
            w[Se] = Array.isArray(Y) ? Y.map((rt) => `${rt}`) : `${Y}`;
          }),
          (x = l === u ? a : or(l, u, a));
        const R = _n(Bt(x));
        return new it(R, w, v);
      }
      function or(l, u, a) {
        const h = {};
        return (
          $(l.children, (v, w) => {
            h[w] = v === u ? a : or(v, u, a);
          }),
          new $e(l.segments, h)
        );
      }
      class Qn {
        constructor(u, a, h) {
          if (
            ((this.isAbsolute = u),
            (this.numberOfDoubleDots = a),
            (this.commands = h),
            u && h.length > 0 && Jn(h[0]))
          )
            throw new d.vHH(4003, !1);
          const v = h.find(xn);
          if (v && v !== O(h)) throw new d.vHH(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Dn {
        constructor(u, a, h) {
          (this.segmentGroup = u), (this.processChildren = a), (this.index = h);
        }
      }
      function $n(l, u, a) {
        if (
          (l || (l = new $e([], {})),
          0 === l.segments.length && l.hasChildren())
        )
          return On(l, u, a);
        const h = (function ir(l, u, a) {
            let h = 0,
              v = u;
            const w = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; v < l.segments.length; ) {
              if (h >= a.length) return w;
              const x = l.segments[v],
                R = a[h];
              if (xn(R)) break;
              const Y = `${R}`,
                Se = h < a.length - 1 ? a[h + 1] : null;
              if (v > 0 && void 0 === Y) break;
              if (Y && Se && "object" == typeof Se && void 0 === Se.outlets) {
                if (!Qo(Y, Se, x)) return w;
                h += 2;
              } else {
                if (!Qo(Y, {}, x)) return w;
                h++;
              }
              v++;
            }
            return { match: !0, pathIndex: v, commandIndex: h };
          })(l, u, a),
          v = a.slice(h.commandIndex);
        if (h.match && h.pathIndex < l.segments.length) {
          const w = new $e(l.segments.slice(0, h.pathIndex), {});
          return (
            (w.children[et] = new $e(
              l.segments.slice(h.pathIndex),
              l.children
            )),
            On(w, 0, v)
          );
        }
        return h.match && 0 === v.length
          ? new $e(l.segments, {})
          : h.match && !l.hasChildren()
          ? Nr(l, u, a)
          : h.match
          ? On(l, 0, v)
          : Nr(l, u, a);
      }
      function On(l, u, a) {
        if (0 === a.length) return new $e(l.segments, {});
        {
          const h = (function Pr(l) {
              return xn(l[0]) ? l[0].outlets : { [et]: l };
            })(a),
            v = {};
          return (
            $(h, (w, x) => {
              "string" == typeof w && (w = [w]),
                null !== w && (v[x] = $n(l.children[x], u, w));
            }),
            $(l.children, (w, x) => {
              void 0 === h[x] && (v[x] = w);
            }),
            new $e(l.segments, v)
          );
        }
      }
      function Nr(l, u, a) {
        const h = l.segments.slice(0, u);
        let v = 0;
        for (; v < a.length; ) {
          const w = a[v];
          if (xn(w)) {
            const Y = gr(w.outlets);
            return new $e(h, Y);
          }
          if (0 === v && Jn(a[0])) {
            h.push(new pn(l.segments[u].path, Wt(a[0]))), v++;
            continue;
          }
          const x = xn(w) ? w.outlets[et] : `${w}`,
            R = v < a.length - 1 ? a[v + 1] : null;
          x && R && Jn(R)
            ? (h.push(new pn(x, Wt(R))), (v += 2))
            : (h.push(new pn(x, {})), v++);
        }
        return new $e(h, {});
      }
      function gr(l) {
        const u = {};
        return (
          $(l, (a, h) => {
            "string" == typeof a && (a = [a]),
              null !== a && (u[h] = Nr(new $e([], {}), 0, a));
          }),
          u
        );
      }
      function Wt(l) {
        const u = {};
        return $(l, (a, h) => (u[h] = `${a}`)), u;
      }
      function Qo(l, u, a) {
        return l == a.path && hn(u, a.parameters);
      }
      class Ut {
        constructor(u, a) {
          (this.id = u), (this.url = a);
        }
      }
      class Cn extends Ut {
        constructor(u, a, h = "imperative", v = null) {
          super(u, a),
            (this.type = 0),
            (this.navigationTrigger = h),
            (this.restoredState = v);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class sr extends Ut {
        constructor(u, a, h) {
          super(u, a), (this.urlAfterRedirects = h), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class en extends Ut {
        constructor(u, a, h, v) {
          super(u, a), (this.reason = h), (this.code = v), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class mr extends Ut {
        constructor(u, a, h, v) {
          super(u, a), (this.error = h), (this.target = v), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class In extends Ut {
        constructor(u, a, h, v) {
          super(u, a),
            (this.urlAfterRedirects = h),
            (this.state = v),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Ao extends Ut {
        constructor(u, a, h, v) {
          super(u, a),
            (this.urlAfterRedirects = h),
            (this.state = v),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class To extends Ut {
        constructor(u, a, h, v, w) {
          super(u, a),
            (this.urlAfterRedirects = h),
            (this.state = v),
            (this.shouldActivate = w),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class xo extends Ut {
        constructor(u, a, h, v) {
          super(u, a),
            (this.urlAfterRedirects = h),
            (this.state = v),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Xo extends Ut {
        constructor(u, a, h, v) {
          super(u, a),
            (this.urlAfterRedirects = h),
            (this.state = v),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Oo {
        constructor(u) {
          (this.route = u), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Fi {
        constructor(u) {
          (this.route = u), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Ms {
        constructor(u) {
          (this.snapshot = u), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ei {
        constructor(u) {
          (this.snapshot = u), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Li {
        constructor(u) {
          (this.snapshot = u), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ti {
        constructor(u) {
          (this.snapshot = u), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ni {
        constructor(u, a, h) {
          (this.routerEvent = u),
            (this.position = a),
            (this.anchor = h),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class co {
        constructor(u) {
          this._root = u;
        }
        get root() {
          return this._root.value;
        }
        parent(u) {
          const a = this.pathFromRoot(u);
          return a.length > 1 ? a[a.length - 2] : null;
        }
        children(u) {
          const a = Ro(u, this._root);
          return a ? a.children.map((h) => h.value) : [];
        }
        firstChild(u) {
          const a = Ro(u, this._root);
          return a && a.children.length > 0 ? a.children[0].value : null;
        }
        siblings(u) {
          const a = fo(u, this._root);
          return a.length < 2
            ? []
            : a[a.length - 2].children
                .map((v) => v.value)
                .filter((v) => v !== u);
        }
        pathFromRoot(u) {
          return fo(u, this._root).map((a) => a.value);
        }
      }
      function Ro(l, u) {
        if (l === u.value) return u;
        for (const a of u.children) {
          const h = Ro(l, a);
          if (h) return h;
        }
        return null;
      }
      function fo(l, u) {
        if (l === u.value) return [u];
        for (const a of u.children) {
          const h = fo(l, a);
          if (h.length) return h.unshift(u), h;
        }
        return [];
      }
      class Gn {
        constructor(u, a) {
          (this.value = u), (this.children = a);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Xn(l) {
        const u = {};
        return l && l.children.forEach((a) => (u[a.value.outlet] = a)), u;
      }
      class oi extends co {
        constructor(u, a) {
          super(u), (this.snapshot = a), vr(this, u);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function yr(l, u) {
        const a = (function Fr(l, u) {
            const x = new wn([], {}, {}, "", {}, et, u, null, l.root, -1, {});
            return new ho("", new Gn(x, []));
          })(l, u),
          h = new H.X([new pn("", {})]),
          v = new H.X({}),
          w = new H.X({}),
          x = new H.X({}),
          R = new H.X(""),
          Y = new En(h, v, x, R, w, et, u, a.root);
        return (Y.snapshot = a.root), new oi(new Gn(Y, []), a);
      }
      class En {
        constructor(u, a, h, v, w, x, R, Y) {
          (this.url = u),
            (this.params = a),
            (this.queryParams = h),
            (this.fragment = v),
            (this.data = w),
            (this.outlet = x),
            (this.component = R),
            (this.title =
              this.data?.pipe((0, lt.U)((Se) => Se[Lt])) ?? (0, k.of)(void 0)),
            (this._futureSnapshot = Y);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe((0, lt.U)((u) => kt(u)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(
                (0, lt.U)((u) => kt(u))
              )),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Po(l, u = "emptyOnly") {
        const a = l.pathFromRoot;
        let h = 0;
        if ("always" !== u)
          for (h = a.length - 1; h >= 1; ) {
            const v = a[h],
              w = a[h - 1];
            if (v.routeConfig && "" === v.routeConfig.path) h--;
            else {
              if (w.component) break;
              h--;
            }
          }
        return (function Ss(l) {
          return l.reduce(
            (u, a) => ({
              params: { ...u.params, ...a.params },
              data: { ...u.data, ...a.data },
              resolve: {
                ...a.data,
                ...u.resolve,
                ...a.routeConfig?.data,
                ...a._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(a.slice(h));
      }
      class wn {
        constructor(u, a, h, v, w, x, R, Y, Se, rt, Pe, Ot) {
          (this.url = u),
            (this.params = a),
            (this.queryParams = h),
            (this.fragment = v),
            (this.data = w),
            (this.outlet = x),
            (this.component = R),
            (this.title = this.data?.[Lt]),
            (this.routeConfig = Y),
            (this._urlSegment = Se),
            (this._lastPathIndex = rt),
            (this._correctedLastPathIndex = Ot ?? rt),
            (this._resolve = Pe);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = kt(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = kt(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((h) => h.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class ho extends co {
        constructor(u, a) {
          super(a), (this.url = u), vr(this, a);
        }
        toString() {
          return po(this._root);
        }
      }
      function vr(l, u) {
        (u.value._routerState = l), u.children.forEach((a) => vr(l, a));
      }
      function po(l) {
        const u =
          l.children.length > 0 ? ` { ${l.children.map(po).join(", ")} } ` : "";
        return `${l.value}${u}`;
      }
      function Lr(l) {
        if (l.snapshot) {
          const u = l.snapshot,
            a = l._futureSnapshot;
          (l.snapshot = a),
            hn(u.queryParams, a.queryParams) ||
              l.queryParams.next(a.queryParams),
            u.fragment !== a.fragment && l.fragment.next(a.fragment),
            hn(u.params, a.params) || l.params.next(a.params),
            (function Vn(l, u) {
              if (l.length !== u.length) return !1;
              for (let a = 0; a < l.length; ++a) if (!hn(l[a], u[a])) return !1;
              return !0;
            })(u.url, a.url) || l.url.next(a.url),
            hn(u.data, a.data) || l.data.next(a.data);
        } else
          (l.snapshot = l._futureSnapshot), l.data.next(l._futureSnapshot.data);
      }
      function No(l, u) {
        const a =
          hn(l.params, u.params) &&
          (function Tn(l, u) {
            return (
              zt(l, u) && l.every((a, h) => hn(a.parameters, u[h].parameters))
            );
          })(l.url, u.url);
        return (
          a &&
          !(!l.parent != !u.parent) &&
          (!l.parent || No(l.parent, u.parent))
        );
      }
      function _r(l, u, a) {
        if (a && l.shouldReuseRoute(u.value, a.value.snapshot)) {
          const h = a.value;
          h._futureSnapshot = u.value;
          const v = (function ki(l, u, a) {
            return u.children.map((h) => {
              for (const v of a.children)
                if (l.shouldReuseRoute(h.value, v.value.snapshot))
                  return _r(l, h, v);
              return _r(l, h);
            });
          })(l, u, a);
          return new Gn(h, v);
        }
        {
          if (l.shouldAttach(u.value)) {
            const w = l.retrieve(u.value);
            if (null !== w) {
              const x = w.route;
              return (
                (x.value._futureSnapshot = u.value),
                (x.children = u.children.map((R) => _r(l, R))),
                x
              );
            }
          }
          const h = (function si(l) {
              return new En(
                new H.X(l.url),
                new H.X(l.params),
                new H.X(l.queryParams),
                new H.X(l.fragment),
                new H.X(l.data),
                l.outlet,
                l.component,
                l
              );
            })(u.value),
            v = u.children.map((w) => _r(l, w));
          return new Gn(h, v);
        }
      }
      const kr = "ngNavigationCancelingError";
      function gn(l, u) {
        const { redirectTo: a, navigationBehaviorOptions: h } = vt(u)
            ? { redirectTo: u, navigationBehaviorOptions: void 0 }
            : u,
          v = Dr(!1, 0, u);
        return (v.url = a), (v.navigationBehaviorOptions = h), v;
      }
      function Dr(l, u, a) {
        const h = new Error("NavigationCancelingError: " + (l || ""));
        return (h[kr] = !0), (h.cancellationCode = u), a && (h.url = a), h;
      }
      function go(l) {
        return zn(l) && vt(l.url);
      }
      function zn(l) {
        return l && l[kr];
      }
      class ai {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Kr()),
            (this.attachRef = null);
        }
      }
      let Kr = (() => {
        class l {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(a, h) {
            const v = this.getOrCreateContext(a);
            (v.outlet = h), this.contexts.set(a, v);
          }
          onChildOutletDestroyed(a) {
            const h = this.getContext(a);
            h && ((h.outlet = null), (h.attachRef = null));
          }
          onOutletDeactivated() {
            const a = this.contexts;
            return (this.contexts = new Map()), a;
          }
          onOutletReAttached(a) {
            this.contexts = a;
          }
          getOrCreateContext(a) {
            let h = this.getContext(a);
            return h || ((h = new ai()), this.contexts.set(a, h)), h;
          }
          getContext(a) {
            return this.contexts.get(a) || null;
          }
        }
        return (
          (l.ɵfac = function (a) {
            return new (a || l)();
          }),
          (l.ɵprov = d.Yz7({ token: l, factory: l.ɵfac, providedIn: "root" })),
          l
        );
      })();
      const Tt = !1;
      let mo = (() => {
        class l {
          constructor(a, h, v, w, x) {
            (this.parentContexts = a),
              (this.location = h),
              (this.changeDetector = w),
              (this.environmentInjector = x),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new d.vpe()),
              (this.deactivateEvents = new d.vpe()),
              (this.attachEvents = new d.vpe()),
              (this.detachEvents = new d.vpe()),
              (this.name = v || et),
              a.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const a = this.parentContexts.getContext(this.name);
              a &&
                a.route &&
                (a.attachRef
                  ? this.attach(a.attachRef, a.route)
                  : this.activateWith(a.route, a.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new d.vHH(4012, Tt);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new d.vHH(4012, Tt);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new d.vHH(4012, Tt);
            this.location.detach();
            const a = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(a.instance),
              a
            );
          }
          attach(a, h) {
            (this.activated = a),
              (this._activatedRoute = h),
              this.location.insert(a.hostView),
              this.attachEvents.emit(a.instance);
          }
          deactivate() {
            if (this.activated) {
              const a = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(a);
            }
          }
          activateWith(a, h) {
            if (this.isActivated) throw new d.vHH(4013, Tt);
            this._activatedRoute = a;
            const v = this.location,
              x = a._futureSnapshot.component,
              R = this.parentContexts.getOrCreateContext(this.name).children,
              Y = new Vi(a, R, v.injector);
            if (
              h &&
              (function Zr(l) {
                return !!l.resolveComponentFactory;
              })(h)
            ) {
              const Se = h.resolveComponentFactory(x);
              this.activated = v.createComponent(Se, v.length, Y);
            } else
              this.activated = v.createComponent(x, {
                index: v.length,
                injector: Y,
                environmentInjector: h ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (l.ɵfac = function (a) {
            return new (a || l)(
              d.Y36(Kr),
              d.Y36(d.s_b),
              d.$8M("name"),
              d.Y36(d.sBO),
              d.Y36(d.lqb)
            );
          }),
          (l.ɵdir = d.lG2({
            type: l,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
          })),
          l
        );
      })();
      class Vi {
        constructor(u, a, h) {
          (this.route = u), (this.childContexts = a), (this.parent = h);
        }
        get(u, a) {
          return u === En
            ? this.route
            : u === Kr
            ? this.childContexts
            : this.parent.get(u, a);
        }
      }
      let qt = (() => {
        class l {}
        return (
          (l.ɵfac = function (a) {
            return new (a || l)();
          }),
          (l.ɵcmp = d.Xpm({
            type: l,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [d.jDz],
            decls: 1,
            vars: 0,
            template: function (a, h) {
              1 & a && d._UZ(0, "router-outlet");
            },
            dependencies: [mo],
            encapsulation: 2,
          })),
          l
        );
      })();
      function Cr(l, u) {
        return (
          l.providers &&
            !l._injector &&
            (l._injector = (0, d.MMx)(l.providers, u, `Route: ${l.path}`)),
          l._injector ?? u
        );
      }
      function Jr(l) {
        const u = l.children && l.children.map(Jr),
          a = u ? { ...l, children: u } : { ...l };
        return (
          !a.component &&
            !a.loadComponent &&
            (u || a.loadChildren) &&
            a.outlet &&
            a.outlet !== et &&
            (a.component = qt),
          a
        );
      }
      function Ye(l) {
        return l.outlet || et;
      }
      function Vo(l, u) {
        const a = l.filter((h) => Ye(h) === u);
        return a.push(...l.filter((h) => Ye(h) !== u)), a;
      }
      function Br(l) {
        if (!l) return null;
        if (l.routeConfig?._injector) return l.routeConfig._injector;
        for (let u = l.parent; u; u = u.parent) {
          const a = u.routeConfig;
          if (a?._loadedInjector) return a._loadedInjector;
          if (a?._injector) return a._injector;
        }
        return null;
      }
      class ui {
        constructor(u, a, h, v) {
          (this.routeReuseStrategy = u),
            (this.futureState = a),
            (this.currState = h),
            (this.forwardEvent = v);
        }
        activate(u) {
          const a = this.futureState._root,
            h = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(a, h, u),
            Lr(this.futureState.root),
            this.activateChildRoutes(a, h, u);
        }
        deactivateChildRoutes(u, a, h) {
          const v = Xn(a);
          u.children.forEach((w) => {
            const x = w.value.outlet;
            this.deactivateRoutes(w, v[x], h), delete v[x];
          }),
            $(v, (w, x) => {
              this.deactivateRouteAndItsChildren(w, h);
            });
        }
        deactivateRoutes(u, a, h) {
          const v = u.value,
            w = a ? a.value : null;
          if (v === w)
            if (v.component) {
              const x = h.getContext(v.outlet);
              x && this.deactivateChildRoutes(u, a, x.children);
            } else this.deactivateChildRoutes(u, a, h);
          else w && this.deactivateRouteAndItsChildren(a, h);
        }
        deactivateRouteAndItsChildren(u, a) {
          u.value.component &&
          this.routeReuseStrategy.shouldDetach(u.value.snapshot)
            ? this.detachAndStoreRouteSubtree(u, a)
            : this.deactivateRouteAndOutlet(u, a);
        }
        detachAndStoreRouteSubtree(u, a) {
          const h = a.getContext(u.value.outlet),
            v = h && u.value.component ? h.children : a,
            w = Xn(u);
          for (const x of Object.keys(w))
            this.deactivateRouteAndItsChildren(w[x], v);
          if (h && h.outlet) {
            const x = h.outlet.detach(),
              R = h.children.onOutletDeactivated();
            this.routeReuseStrategy.store(u.value.snapshot, {
              componentRef: x,
              route: u,
              contexts: R,
            });
          }
        }
        deactivateRouteAndOutlet(u, a) {
          const h = a.getContext(u.value.outlet),
            v = h && u.value.component ? h.children : a,
            w = Xn(u);
          for (const x of Object.keys(w))
            this.deactivateRouteAndItsChildren(w[x], v);
          h &&
            h.outlet &&
            (h.outlet.deactivate(),
            h.children.onOutletDeactivated(),
            (h.attachRef = null),
            (h.resolver = null),
            (h.route = null));
        }
        activateChildRoutes(u, a, h) {
          const v = Xn(a);
          u.children.forEach((w) => {
            this.activateRoutes(w, v[w.value.outlet], h),
              this.forwardEvent(new ti(w.value.snapshot));
          }),
            u.children.length && this.forwardEvent(new ei(u.value.snapshot));
        }
        activateRoutes(u, a, h) {
          const v = u.value,
            w = a ? a.value : null;
          if ((Lr(v), v === w))
            if (v.component) {
              const x = h.getOrCreateContext(v.outlet);
              this.activateChildRoutes(u, a, x.children);
            } else this.activateChildRoutes(u, a, h);
          else if (v.component) {
            const x = h.getOrCreateContext(v.outlet);
            if (this.routeReuseStrategy.shouldAttach(v.snapshot)) {
              const R = this.routeReuseStrategy.retrieve(v.snapshot);
              this.routeReuseStrategy.store(v.snapshot, null),
                x.children.onOutletReAttached(R.contexts),
                (x.attachRef = R.componentRef),
                (x.route = R.route.value),
                x.outlet && x.outlet.attach(R.componentRef, R.route.value),
                Lr(R.route.value),
                this.activateChildRoutes(u, null, x.children);
            } else {
              const R = Br(v.snapshot),
                Y = R?.get(d._Vd) ?? null;
              (x.attachRef = null),
                (x.route = v),
                (x.resolver = Y),
                (x.injector = R),
                x.outlet && x.outlet.activateWith(v, x.injector),
                this.activateChildRoutes(u, null, x.children);
            }
          } else this.activateChildRoutes(u, null, h);
        }
      }
      class Bo {
        constructor(u) {
          (this.path = u), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Qr {
        constructor(u, a) {
          (this.component = u), (this.route = a);
        }
      }
      function Bi(l, u, a) {
        const h = l._root;
        return ht(h, u ? u._root : null, a, [h.value]);
      }
      function ce(l, u) {
        const a = Symbol(),
          h = u.get(l, a);
        return h === a
          ? "function" != typeof l || (0, d.Z0I)(l)
            ? u.get(l)
            : l
          : h;
      }
      function ht(
        l,
        u,
        a,
        h,
        v = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const w = Xn(u);
        return (
          l.children.forEach((x) => {
            (function ci(
              l,
              u,
              a,
              h,
              v = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const w = l.value,
                x = u ? u.value : null,
                R = a ? a.getContext(l.value.outlet) : null;
              if (x && w.routeConfig === x.routeConfig) {
                const Y = (function jt(l, u, a) {
                  if ("function" == typeof a) return a(l, u);
                  switch (a) {
                    case "pathParamsChange":
                      return !zt(l.url, u.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !zt(l.url, u.url) || !hn(l.queryParams, u.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !No(l, u) || !hn(l.queryParams, u.queryParams);
                    default:
                      return !No(l, u);
                  }
                })(x, w, w.routeConfig.runGuardsAndResolvers);
                Y
                  ? v.canActivateChecks.push(new Bo(h))
                  : ((w.data = x.data), (w._resolvedData = x._resolvedData)),
                  ht(l, u, w.component ? (R ? R.children : null) : a, h, v),
                  Y &&
                    R &&
                    R.outlet &&
                    R.outlet.isActivated &&
                    v.canDeactivateChecks.push(new Qr(R.outlet.component, x));
              } else
                x && _(u, R, v),
                  v.canActivateChecks.push(new Bo(h)),
                  ht(l, null, w.component ? (R ? R.children : null) : a, h, v);
            })(x, w[x.value.outlet], a, h.concat([x.value]), v),
              delete w[x.value.outlet];
          }),
          $(w, (x, R) => _(x, a.getContext(R), v)),
          v
        );
      }
      function _(l, u, a) {
        const h = Xn(l),
          v = l.value;
        $(h, (w, x) => {
          _(w, v.component ? (u ? u.children.getContext(x) : null) : u, a);
        }),
          a.canDeactivateChecks.push(
            new Qr(
              v.component && u && u.outlet && u.outlet.isActivated
                ? u.outlet.component
                : null,
              v
            )
          );
      }
      function y(l) {
        return "function" == typeof l;
      }
      function $t(l) {
        return l instanceof ye || "EmptyError" === l?.name;
      }
      const an = Symbol("INITIAL_VALUE");
      function ar() {
        return Z((l) =>
          Me(
            l.map((u) =>
              u.pipe(
                (0, ee.q)(1),
                (function te(...l) {
                  const u = (0, q.yG)(l);
                  return (0, xe.e)((a, h) => {
                    (u ? Re(l, a, u) : Re(l, a)).subscribe(h);
                  });
                })(an)
              )
            )
          ).pipe(
            (0, lt.U)((u) => {
              for (const a of u)
                if (!0 !== a) {
                  if (a === an) return an;
                  if (!1 === a || a instanceof it) return a;
                }
              return !0;
            }),
            (0, de.h)((u) => u !== an),
            (0, ee.q)(1)
          )
        );
      }
      function yo(l) {
        return (0, fe.z)(
          (0, ge.b)((u) => {
            if (vt(u)) throw gn(0, u);
          }),
          (0, lt.U)((u) => !0 === u)
        );
      }
      const di = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function fi(l, u, a, h, v) {
        const w = hi(l, u, a);
        return w.matched
          ? (function ga(l, u, a, h) {
              const v = u.canMatch;
              if (!v || 0 === v.length) return (0, k.of)(!0);
              const w = v.map((x) => {
                const R = ce(x, l);
                return oe(
                  (function Pn(l) {
                    return l && y(l.canMatch);
                  })(R)
                    ? R.canMatch(u, a)
                    : l.runInContext(() => R(u, a))
                );
              });
              return (0, k.of)(w).pipe(ar(), yo());
            })((h = Cr(u, h)), u, a).pipe(
              (0, lt.U)((x) => (!0 === x ? w : { ...di }))
            )
          : (0, k.of)(w);
      }
      function hi(l, u, a) {
        if ("" === u.path)
          return "full" === u.pathMatch && (l.hasChildren() || a.length > 0)
            ? { ...di }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: a,
                parameters: {},
                positionalParamSegments: {},
              };
        const v = (u.matcher || yn)(a, l, u);
        if (!v) return { ...di };
        const w = {};
        $(v.posParams, (R, Y) => {
          w[Y] = R.path;
        });
        const x =
          v.consumed.length > 0
            ? { ...w, ...v.consumed[v.consumed.length - 1].parameters }
            : w;
        return {
          matched: !0,
          consumedSegments: v.consumed,
          remainingSegments: a.slice(v.consumed.length),
          parameters: x,
          positionalParamSegments: v.posParams ?? {},
        };
      }
      function Uo(l, u, a, h, v = "corrected") {
        if (
          a.length > 0 &&
          (function Wi(l, u, a) {
            return a.some((h) => pi(l, u, h) && Ye(h) !== et);
          })(l, a, h)
        ) {
          const x = new $e(
            u,
            (function Ts(l, u, a, h) {
              const v = {};
              (v[et] = h),
                (h._sourceSegment = l),
                (h._segmentIndexShift = u.length);
              for (const w of a)
                if ("" === w.path && Ye(w) !== et) {
                  const x = new $e([], {});
                  (x._sourceSegment = l),
                    (x._segmentIndexShift = u.length),
                    (v[Ye(w)] = x);
                }
              return v;
            })(l, u, h, new $e(a, l.children))
          );
          return (
            (x._sourceSegment = l),
            (x._segmentIndexShift = u.length),
            { segmentGroup: x, slicedSegments: [] }
          );
        }
        if (
          0 === a.length &&
          (function ma(l, u, a) {
            return a.some((h) => pi(l, u, h));
          })(l, a, h)
        ) {
          const x = new $e(
            l.segments,
            (function As(l, u, a, h, v, w) {
              const x = {};
              for (const R of h)
                if (pi(l, a, R) && !v[Ye(R)]) {
                  const Y = new $e([], {});
                  (Y._sourceSegment = l),
                    (Y._segmentIndexShift =
                      "legacy" === w ? l.segments.length : u.length),
                    (x[Ye(R)] = Y);
                }
              return { ...v, ...x };
            })(l, u, a, h, l.children, v)
          );
          return (
            (x._sourceSegment = l),
            (x._segmentIndexShift = u.length),
            { segmentGroup: x, slicedSegments: a }
          );
        }
        const w = new $e(l.segments, l.children);
        return (
          (w._sourceSegment = l),
          (w._segmentIndexShift = u.length),
          { segmentGroup: w, slicedSegments: a }
        );
      }
      function pi(l, u, a) {
        return (
          (!(l.hasChildren() || u.length > 0) || "full" !== a.pathMatch) &&
          "" === a.path
        );
      }
      function ln(l, u, a, h) {
        return (
          !!(Ye(l) === h || (h !== et && pi(u, a, l))) &&
          ("**" === l.path || hi(u, l, a).matched)
        );
      }
      function br(l, u, a) {
        return 0 === u.length && !l.children[a];
      }
      const Ft = !1;
      class jo {
        constructor(u) {
          this.segmentGroup = u || null;
        }
      }
      class xs {
        constructor(u) {
          this.urlTree = u;
        }
      }
      function Ho(l) {
        return (0, ot._)(new jo(l));
      }
      function Os(l) {
        return (0, ot._)(new xs(l));
      }
      class mi {
        constructor(u, a, h, v, w) {
          (this.injector = u),
            (this.configLoader = a),
            (this.urlSerializer = h),
            (this.urlTree = v),
            (this.config = w),
            (this.allowRedirects = !0);
        }
        apply() {
          const u = Uo(this.urlTree.root, [], [], this.config).segmentGroup,
            a = new $e(u.segments, u.children);
          return this.expandSegmentGroup(this.injector, this.config, a, et)
            .pipe(
              (0, lt.U)((w) =>
                this.createUrlTree(
                  Bt(w),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              (0, W.K)((w) => {
                if (w instanceof xs)
                  return (this.allowRedirects = !1), this.match(w.urlTree);
                throw w instanceof jo ? this.noMatchError(w) : w;
              })
            );
        }
        match(u) {
          return this.expandSegmentGroup(this.injector, this.config, u.root, et)
            .pipe(
              (0, lt.U)((v) =>
                this.createUrlTree(Bt(v), u.queryParams, u.fragment)
              )
            )
            .pipe(
              (0, W.K)((v) => {
                throw v instanceof jo ? this.noMatchError(v) : v;
              })
            );
        }
        noMatchError(u) {
          return new d.vHH(4002, Ft);
        }
        createUrlTree(u, a, h) {
          const v = _n(u);
          return new it(v, a, h);
        }
        expandSegmentGroup(u, a, h, v) {
          return 0 === h.segments.length && h.hasChildren()
            ? this.expandChildren(u, a, h).pipe((0, lt.U)((w) => new $e([], w)))
            : this.expandSegment(u, h, a, h.segments, v, !0);
        }
        expandChildren(u, a, h) {
          const v = [];
          for (const w of Object.keys(h.children))
            "primary" === w ? v.unshift(w) : v.push(w);
          return (0, C.D)(v).pipe(
            (0, B.b)((w) => {
              const x = h.children[w],
                R = Vo(a, w);
              return this.expandSegmentGroup(u, R, x, w).pipe(
                (0, lt.U)((Y) => ({ segment: Y, outlet: w }))
              );
            }),
            ze((w, x) => ((w[x.outlet] = x.segment), w), {}),
            _t()
          );
        }
        expandSegment(u, a, h, v, w, x) {
          return (0, C.D)(h).pipe(
            (0, B.b)((R) =>
              this.expandSegmentAgainstRoute(u, a, h, R, v, w, x).pipe(
                (0, W.K)((Se) => {
                  if (Se instanceof jo) return (0, k.of)(null);
                  throw Se;
                })
              )
            ),
            Dt((R) => !!R),
            (0, W.K)((R, Y) => {
              if ($t(R)) return br(a, v, w) ? (0, k.of)(new $e([], {})) : Ho(a);
              throw R;
            })
          );
        }
        expandSegmentAgainstRoute(u, a, h, v, w, x, R) {
          return ln(v, a, w, x)
            ? void 0 === v.redirectTo
              ? this.matchSegmentAgainstRoute(u, a, v, w, x)
              : R && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(u, a, h, v, w, x)
              : Ho(a)
            : Ho(a);
        }
        expandSegmentAgainstRouteUsingRedirect(u, a, h, v, w, x) {
          return "**" === v.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(u, h, v, x)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                u,
                a,
                h,
                v,
                w,
                x
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(u, a, h, v) {
          const w = this.applyRedirectCommands([], h.redirectTo, {});
          return h.redirectTo.startsWith("/")
            ? Os(w)
            : this.lineralizeSegments(h, w).pipe(
                (0, me.z)((x) => {
                  const R = new $e(x, {});
                  return this.expandSegment(u, R, a, x, v, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(u, a, h, v, w, x) {
          const {
            matched: R,
            consumedSegments: Y,
            remainingSegments: Se,
            positionalParamSegments: rt,
          } = hi(a, v, w);
          if (!R) return Ho(a);
          const Pe = this.applyRedirectCommands(Y, v.redirectTo, rt);
          return v.redirectTo.startsWith("/")
            ? Os(Pe)
            : this.lineralizeSegments(v, Pe).pipe(
                (0, me.z)((Ot) =>
                  this.expandSegment(u, a, h, Ot.concat(Se), x, !1)
                )
              );
        }
        matchSegmentAgainstRoute(u, a, h, v, w) {
          return "**" === h.path
            ? ((u = Cr(h, u)),
              h.loadChildren
                ? (h._loadedRoutes
                    ? (0, k.of)({
                        routes: h._loadedRoutes,
                        injector: h._loadedInjector,
                      })
                    : this.configLoader.loadChildren(u, h)
                  ).pipe(
                    (0, lt.U)(
                      (R) => (
                        (h._loadedRoutes = R.routes),
                        (h._loadedInjector = R.injector),
                        new $e(v, {})
                      )
                    )
                  )
                : (0, k.of)(new $e(v, {})))
            : fi(a, h, v, u).pipe(
                Z(({ matched: x, consumedSegments: R, remainingSegments: Y }) =>
                  x
                    ? this.getChildConfig((u = h._injector ?? u), h, v).pipe(
                        (0, me.z)((rt) => {
                          const Pe = rt.injector ?? u,
                            Ot = rt.routes,
                            { segmentGroup: Fn, slicedSegments: lr } = Uo(
                              a,
                              R,
                              Y,
                              Ot
                            ),
                            Ar = new $e(Fn.segments, Fn.children);
                          if (0 === lr.length && Ar.hasChildren())
                            return this.expandChildren(Pe, Ot, Ar).pipe(
                              (0, lt.U)((Xi) => new $e(R, Xi))
                            );
                          if (0 === Ot.length && 0 === lr.length)
                            return (0, k.of)(new $e(R, {}));
                          const Tr = Ye(h) === w;
                          return this.expandSegment(
                            Pe,
                            Ar,
                            Ot,
                            lr,
                            Tr ? et : w,
                            !0
                          ).pipe(
                            (0, lt.U)(
                              (Co) => new $e(R.concat(Co.segments), Co.children)
                            )
                          );
                        })
                      )
                    : Ho(a)
                )
              );
        }
        getChildConfig(u, a, h) {
          return a.children
            ? (0, k.of)({ routes: a.children, injector: u })
            : a.loadChildren
            ? void 0 !== a._loadedRoutes
              ? (0, k.of)({
                  routes: a._loadedRoutes,
                  injector: a._loadedInjector,
                })
              : (function zi(l, u, a, h) {
                  const v = u.canLoad;
                  if (void 0 === v || 0 === v.length) return (0, k.of)(!0);
                  const w = v.map((x) => {
                    const R = ce(x, l);
                    return oe(
                      (function S(l) {
                        return l && y(l.canLoad);
                      })(R)
                        ? R.canLoad(u, a)
                        : l.runInContext(() => R(u, a))
                    );
                  });
                  return (0, k.of)(w).pipe(ar(), yo());
                })(u, a, h).pipe(
                  (0, me.z)((v) =>
                    v
                      ? this.configLoader.loadChildren(u, a).pipe(
                          (0, ge.b)((w) => {
                            (a._loadedRoutes = w.routes),
                              (a._loadedInjector = w.injector);
                          })
                        )
                      : (function va(l) {
                          return (0, ot._)(Dr(Ft, 3));
                        })()
                  )
                )
            : (0, k.of)({ routes: [], injector: u });
        }
        lineralizeSegments(u, a) {
          let h = [],
            v = a.root;
          for (;;) {
            if (((h = h.concat(v.segments)), 0 === v.numberOfChildren))
              return (0, k.of)(h);
            if (v.numberOfChildren > 1 || !v.children[et])
              return (0, ot._)(new d.vHH(4e3, Ft));
            v = v.children[et];
          }
        }
        applyRedirectCommands(u, a, h) {
          return this.applyRedirectCreateUrlTree(
            a,
            this.urlSerializer.parse(a),
            u,
            h
          );
        }
        applyRedirectCreateUrlTree(u, a, h, v) {
          const w = this.createSegmentGroup(u, a.root, h, v);
          return new it(
            w,
            this.createQueryParams(a.queryParams, this.urlTree.queryParams),
            a.fragment
          );
        }
        createQueryParams(u, a) {
          const h = {};
          return (
            $(u, (v, w) => {
              if ("string" == typeof v && v.startsWith(":")) {
                const R = v.substring(1);
                h[w] = a[R];
              } else h[w] = v;
            }),
            h
          );
        }
        createSegmentGroup(u, a, h, v) {
          const w = this.createSegments(u, a.segments, h, v);
          let x = {};
          return (
            $(a.children, (R, Y) => {
              x[Y] = this.createSegmentGroup(u, R, h, v);
            }),
            new $e(w, x)
          );
        }
        createSegments(u, a, h, v) {
          return a.map((w) =>
            w.path.startsWith(":")
              ? this.findPosParam(u, w, v)
              : this.findOrReturn(w, h)
          );
        }
        findPosParam(u, a, h) {
          const v = h[a.path.substring(1)];
          if (!v) throw new d.vHH(4001, Ft);
          return v;
        }
        findOrReturn(u, a) {
          let h = 0;
          for (const v of a) {
            if (v.path === u.path) return a.splice(h), v;
            h++;
          }
          return u;
        }
      }
      class Rs {}
      class g {
        constructor(u, a, h, v, w, x, R, Y) {
          (this.injector = u),
            (this.rootComponentType = a),
            (this.config = h),
            (this.urlTree = v),
            (this.url = w),
            (this.paramsInheritanceStrategy = x),
            (this.relativeLinkResolution = R),
            (this.urlSerializer = Y);
        }
        recognize() {
          const u = Uo(
            this.urlTree.root,
            [],
            [],
            this.config.filter((a) => void 0 === a.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            u,
            et
          ).pipe(
            (0, lt.U)((a) => {
              if (null === a) return null;
              const h = new wn(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  et,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                v = new Gn(h, a),
                w = new ho(this.url, v);
              return this.inheritParamsAndData(w._root), w;
            })
          );
        }
        inheritParamsAndData(u) {
          const a = u.value,
            h = Po(a, this.paramsInheritanceStrategy);
          (a.params = Object.freeze(h.params)),
            (a.data = Object.freeze(h.data)),
            u.children.forEach((v) => this.inheritParamsAndData(v));
        }
        processSegmentGroup(u, a, h, v) {
          return 0 === h.segments.length && h.hasChildren()
            ? this.processChildren(u, a, h)
            : this.processSegment(u, a, h, h.segments, v);
        }
        processChildren(u, a, h) {
          return (0, C.D)(Object.keys(h.children)).pipe(
            (0, B.b)((v) => {
              const w = h.children[v],
                x = Vo(a, v);
              return this.processSegmentGroup(u, x, w, v);
            }),
            ze((v, w) => (v && w ? (v.push(...w), v) : null)),
            (function gt(l, u = !1) {
              return (0, xe.e)((a, h) => {
                let v = 0;
                a.subscribe(
                  (0, Te.x)(h, (w) => {
                    const x = l(w, v++);
                    (x || u) && h.next(w), !x && h.complete();
                  })
                );
              });
            })((v) => null !== v),
            Ce(null),
            _t(),
            (0, lt.U)((v) => {
              if (null === v) return null;
              const w = ie(v);
              return (
                (function b(l) {
                  l.sort((u, a) =>
                    u.value.outlet === et
                      ? -1
                      : a.value.outlet === et
                      ? 1
                      : u.value.outlet.localeCompare(a.value.outlet)
                  );
                })(w),
                w
              );
            })
          );
        }
        processSegment(u, a, h, v, w) {
          return (0, C.D)(a).pipe(
            (0, B.b)((x) =>
              this.processSegmentAgainstRoute(x._injector ?? u, x, h, v, w)
            ),
            Dt((x) => !!x),
            (0, W.K)((x) => {
              if ($t(x)) return br(h, v, w) ? (0, k.of)([]) : (0, k.of)(null);
              throw x;
            })
          );
        }
        processSegmentAgainstRoute(u, a, h, v, w) {
          if (a.redirectTo || !ln(a, h, v, w)) return (0, k.of)(null);
          let x;
          if ("**" === a.path) {
            const R = v.length > 0 ? O(v).parameters : {},
              Y = wt(h) + v.length,
              Se = new wn(
                v,
                R,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                ft(a),
                Ye(a),
                a.component ?? a._loadedComponent ?? null,
                a,
                Ct(h),
                Y,
                Yt(a),
                Y
              );
            x = (0, k.of)({
              snapshot: Se,
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            x = fi(h, a, v, u).pipe(
              (0, lt.U)(
                ({
                  matched: R,
                  consumedSegments: Y,
                  remainingSegments: Se,
                  parameters: rt,
                }) => {
                  if (!R) return null;
                  const Pe = wt(h) + Y.length;
                  return {
                    snapshot: new wn(
                      Y,
                      rt,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      ft(a),
                      Ye(a),
                      a.component ?? a._loadedComponent ?? null,
                      a,
                      Ct(h),
                      Pe,
                      Yt(a),
                      Pe
                    ),
                    consumedSegments: Y,
                    remainingSegments: Se,
                  };
                }
              )
            );
          return x.pipe(
            Z((R) => {
              if (null === R) return (0, k.of)(null);
              const {
                snapshot: Y,
                consumedSegments: Se,
                remainingSegments: rt,
              } = R;
              u = a._injector ?? u;
              const Pe = a._loadedInjector ?? u,
                Ot = (function N(l) {
                  return l.children
                    ? l.children
                    : l.loadChildren
                    ? l._loadedRoutes
                    : [];
                })(a),
                { segmentGroup: Fn, slicedSegments: lr } = Uo(
                  h,
                  Se,
                  rt,
                  Ot.filter((Tr) => void 0 === Tr.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === lr.length && Fn.hasChildren())
                return this.processChildren(Pe, Ot, Fn).pipe(
                  (0, lt.U)((Tr) => (null === Tr ? null : [new Gn(Y, Tr)]))
                );
              if (0 === Ot.length && 0 === lr.length)
                return (0, k.of)([new Gn(Y, [])]);
              const Ar = Ye(a) === w;
              return this.processSegment(Pe, Ot, Fn, lr, Ar ? et : w).pipe(
                (0, lt.U)((Tr) => (null === Tr ? null : [new Gn(Y, Tr)]))
              );
            })
          );
        }
      }
      function z(l) {
        const u = l.value.routeConfig;
        return u && "" === u.path && void 0 === u.redirectTo;
      }
      function ie(l) {
        const u = [],
          a = new Set();
        for (const h of l) {
          if (!z(h)) {
            u.push(h);
            continue;
          }
          const v = u.find((w) => h.value.routeConfig === w.value.routeConfig);
          void 0 !== v ? (v.children.push(...h.children), a.add(v)) : u.push(h);
        }
        for (const h of a) {
          const v = ie(h.children);
          u.push(new Gn(h.value, v));
        }
        return u.filter((h) => !a.has(h));
      }
      function Ct(l) {
        let u = l;
        for (; u._sourceSegment; ) u = u._sourceSegment;
        return u;
      }
      function wt(l) {
        let u = l,
          a = u._segmentIndexShift ?? 0;
        for (; u._sourceSegment; )
          (u = u._sourceSegment), (a += u._segmentIndexShift ?? 0);
        return a - 1;
      }
      function ft(l) {
        return l.data || {};
      }
      function Yt(l) {
        return l.resolve || {};
      }
      function tr(l) {
        return "string" == typeof l.title || null === l.title;
      }
      function Ur(l) {
        return Z((u) => {
          const a = l(u);
          return a ? (0, C.D)(a).pipe((0, lt.U)(() => u)) : (0, k.of)(u);
        });
      }
      let eo = (() => {
          class l {
            buildTitle(a) {
              let h,
                v = a.root;
              for (; void 0 !== v; )
                (h = this.getResolvedTitleForRoute(v) ?? h),
                  (v = v.children.find((w) => w.outlet === et));
              return h;
            }
            getResolvedTitleForRoute(a) {
              return a.data[Lt];
            }
          }
          return (
            (l.ɵfac = function (a) {
              return new (a || l)();
            }),
            (l.ɵprov = d.Yz7({
              token: l,
              factory: function () {
                return (0, d.f3M)(gl);
              },
              providedIn: "root",
            })),
            l
          );
        })(),
        gl = (() => {
          class l extends eo {
            constructor(a) {
              super(), (this.title = a);
            }
            updateTitle(a) {
              const h = this.buildTitle(a);
              void 0 !== h && this.title.setTitle(h);
            }
          }
          return (
            (l.ɵfac = function (a) {
              return new (a || l)(d.LFG(Mn.Dx));
            }),
            (l.ɵprov = d.Yz7({
              token: l,
              factory: l.ɵfac,
              providedIn: "root",
            })),
            l
          );
        })();
      class _a {}
      class Ir extends class yl {
        shouldDetach(u) {
          return !1;
        }
        store(u, a) {}
        shouldAttach(u) {
          return !1;
        }
        retrieve(u) {
          return null;
        }
        shouldReuseRoute(u, a) {
          return u.routeConfig === a.routeConfig;
        }
      } {}
      const to = new d.OlP("", { providedIn: "root", factory: () => ({}) }),
        vi = new d.OlP("ROUTES");
      let $o = (() => {
        class l {
          constructor(a, h) {
            (this.injector = a),
              (this.compiler = h),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(a) {
            if (this.componentLoaders.get(a))
              return this.componentLoaders.get(a);
            if (a._loadedComponent) return (0, k.of)(a._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(a);
            const h = oe(a.loadComponent()).pipe(
                (0, ge.b)((w) => {
                  this.onLoadEndListener && this.onLoadEndListener(a),
                    (a._loadedComponent = w);
                }),
                sn(() => {
                  this.componentLoaders.delete(a);
                })
              ),
              v = new Le(h, () => new nt.x()).pipe(Be());
            return this.componentLoaders.set(a, v), v;
          }
          loadChildren(a, h) {
            if (this.childrenLoaders.get(h)) return this.childrenLoaders.get(h);
            if (h._loadedRoutes)
              return (0, k.of)({
                routes: h._loadedRoutes,
                injector: h._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(h);
            const w = this.loadModuleFactoryOrRoutes(h.loadChildren).pipe(
                (0, lt.U)((R) => {
                  this.onLoadEndListener && this.onLoadEndListener(h);
                  let Y,
                    Se,
                    rt = !1;
                  Array.isArray(R)
                    ? (Se = R)
                    : ((Y = R.create(a).injector),
                      (Se = le(Y.get(vi, [], d.XFs.Self | d.XFs.Optional))));
                  return { routes: Se.map(Jr), injector: Y };
                }),
                sn(() => {
                  this.childrenLoaders.delete(h);
                })
              ),
              x = new Le(w, () => new nt.x()).pipe(Be());
            return this.childrenLoaders.set(h, x), x;
          }
          loadModuleFactoryOrRoutes(a) {
            return oe(a()).pipe(
              (0, me.z)((h) =>
                h instanceof d.YKP || Array.isArray(h)
                  ? (0, k.of)(h)
                  : (0, C.D)(this.compiler.compileModuleAsync(h))
              )
            );
          }
        }
        return (
          (l.ɵfac = function (a) {
            return new (a || l)(d.LFG(d.zs3), d.LFG(d.Sil));
          }),
          (l.ɵprov = d.Yz7({ token: l, factory: l.ɵfac, providedIn: "root" })),
          l
        );
      })();
      class Ki {}
      class _l {
        shouldProcessUrl(u) {
          return !0;
        }
        extract(u) {
          return u;
        }
        merge(u, a) {
          return u;
        }
      }
      function Da(l) {
        throw l;
      }
      function Ca(l, u, a) {
        return u.parse("/");
      }
      const Ea = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        Dl = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      function Go() {
        const l = (0, d.f3M)(vn),
          u = (0, d.f3M)(Kr),
          a = (0, d.f3M)(be.Ye),
          h = (0, d.f3M)(d.zs3),
          v = (0, d.f3M)(d.Sil),
          w = (0, d.f3M)(vi, { optional: !0 }) ?? [],
          x = (0, d.f3M)(to, { optional: !0 }) ?? {},
          R = (0, d.f3M)(gl),
          Y = (0, d.f3M)(eo, { optional: !0 }),
          Se = (0, d.f3M)(Ki, { optional: !0 }),
          rt = (0, d.f3M)(_a, { optional: !0 }),
          Pe = new un(null, l, u, a, h, v, le(w));
        return (
          Se && (Pe.urlHandlingStrategy = Se),
          rt && (Pe.routeReuseStrategy = rt),
          (Pe.titleStrategy = Y ?? R),
          (function Zi(l, u) {
            l.errorHandler && (u.errorHandler = l.errorHandler),
              l.malformedUriErrorHandler &&
                (u.malformedUriErrorHandler = l.malformedUriErrorHandler),
              l.onSameUrlNavigation &&
                (u.onSameUrlNavigation = l.onSameUrlNavigation),
              l.paramsInheritanceStrategy &&
                (u.paramsInheritanceStrategy = l.paramsInheritanceStrategy),
              l.relativeLinkResolution &&
                (u.relativeLinkResolution = l.relativeLinkResolution),
              l.urlUpdateStrategy &&
                (u.urlUpdateStrategy = l.urlUpdateStrategy),
              l.canceledNavigationResolution &&
                (u.canceledNavigationResolution =
                  l.canceledNavigationResolution);
          })(x, Pe),
          Pe
        );
      }
      let un = (() => {
        class l {
          constructor(a, h, v, w, x, R, Y) {
            (this.rootComponentType = a),
              (this.urlSerializer = h),
              (this.rootContexts = v),
              (this.location = w),
              (this.config = Y),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new nt.x()),
              (this.errorHandler = Da),
              (this.malformedUriErrorHandler = Ca),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => (0, k.of)(void 0)),
              (this.urlHandlingStrategy = new _l()),
              (this.routeReuseStrategy = new Ir()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = x.get($o)),
              (this.configLoader.onLoadEndListener = (Ot) =>
                this.triggerEvent(new Fi(Ot))),
              (this.configLoader.onLoadStartListener = (Ot) =>
                this.triggerEvent(new Oo(Ot))),
              (this.ngModule = x.get(d.h0i)),
              (this.console = x.get(d.c2e));
            const Pe = x.get(d.R0b);
            (this.isNgZoneEnabled =
              Pe instanceof d.R0b && d.R0b.isInAngularZone()),
              this.resetConfig(Y),
              (this.currentUrlTree = (function at() {
                return new it(new $e([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = yr(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new H.X({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(a) {
            const h = this.events;
            return a.pipe(
              (0, de.h)((v) => 0 !== v.id),
              (0, lt.U)((v) => ({
                ...v,
                extractedUrl: this.urlHandlingStrategy.extract(v.rawUrl),
              })),
              Z((v) => {
                let w = !1,
                  x = !1;
                return (0, k.of)(v).pipe(
                  (0, ge.b)((R) => {
                    this.currentNavigation = {
                      id: R.id,
                      initialUrl: R.rawUrl,
                      extractedUrl: R.extractedUrl,
                      trigger: R.source,
                      extras: R.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  Z((R) => {
                    const Y = this.browserUrlTree.toString(),
                      Se =
                        !this.navigated ||
                        R.extractedUrl.toString() !== Y ||
                        Y !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || Se) &&
                      this.urlHandlingStrategy.shouldProcessUrl(R.rawUrl)
                    )
                      return (
                        Ps(R.source) && (this.browserUrlTree = R.extractedUrl),
                        (0, k.of)(R).pipe(
                          Z((Pe) => {
                            const Ot = this.transitions.getValue();
                            return (
                              h.next(
                                new Cn(
                                  Pe.id,
                                  this.serializeUrl(Pe.extractedUrl),
                                  Pe.source,
                                  Pe.restoredState
                                )
                              ),
                              Ot !== this.transitions.getValue()
                                ? K.E
                                : Promise.resolve(Pe)
                            );
                          }),
                          (function yi(l, u, a, h) {
                            return Z((v) =>
                              (function gi(l, u, a, h, v) {
                                return new mi(l, u, a, h, v).apply();
                              })(l, u, a, v.extractedUrl, h).pipe(
                                (0, lt.U)((w) => ({
                                  ...v,
                                  urlAfterRedirects: w,
                                }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          (0, ge.b)((Pe) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: Pe.urlAfterRedirects,
                            }),
                              (v.urlAfterRedirects = Pe.urlAfterRedirects);
                          }),
                          (function xt(l, u, a, h, v, w) {
                            return (0, me.z)((x) =>
                              (function E(
                                l,
                                u,
                                a,
                                h,
                                v,
                                w,
                                x = "emptyOnly",
                                R = "legacy"
                              ) {
                                return new g(l, u, a, h, v, x, R, w)
                                  .recognize()
                                  .pipe(
                                    Z((Y) =>
                                      null === Y
                                        ? (function f(l) {
                                            return new Q.y((u) => u.error(l));
                                          })(new Rs())
                                        : (0, k.of)(Y)
                                    )
                                  );
                              })(
                                l,
                                u,
                                a,
                                x.urlAfterRedirects,
                                h.serialize(x.urlAfterRedirects),
                                h,
                                v,
                                w
                              ).pipe(
                                (0, lt.U)((R) => ({ ...x, targetSnapshot: R }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          (0, ge.b)((Pe) => {
                            if (
                              ((v.targetSnapshot = Pe.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!Pe.extras.skipLocationChange) {
                                const Fn = this.urlHandlingStrategy.merge(
                                  Pe.urlAfterRedirects,
                                  Pe.rawUrl
                                );
                                this.setBrowserUrl(Fn, Pe);
                              }
                              this.browserUrlTree = Pe.urlAfterRedirects;
                            }
                            const Ot = new In(
                              Pe.id,
                              this.serializeUrl(Pe.extractedUrl),
                              this.serializeUrl(Pe.urlAfterRedirects),
                              Pe.targetSnapshot
                            );
                            h.next(Ot);
                          })
                        )
                      );
                    if (
                      Se &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: Ot,
                          extractedUrl: Fn,
                          source: lr,
                          restoredState: Ar,
                          extras: Tr,
                        } = R,
                        Wo = new Cn(Ot, this.serializeUrl(Fn), lr, Ar);
                      h.next(Wo);
                      const Co = yr(Fn, this.rootComponentType).snapshot;
                      return (
                        (v = {
                          ...R,
                          targetSnapshot: Co,
                          urlAfterRedirects: Fn,
                          extras: {
                            ...Tr,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        }),
                        (0, k.of)(v)
                      );
                    }
                    return (this.rawUrlTree = R.rawUrl), R.resolve(null), K.E;
                  }),
                  (0, ge.b)((R) => {
                    const Y = new Ao(
                      R.id,
                      this.serializeUrl(R.extractedUrl),
                      this.serializeUrl(R.urlAfterRedirects),
                      R.targetSnapshot
                    );
                    this.triggerEvent(Y);
                  }),
                  (0, lt.U)(
                    (R) =>
                      (v = {
                        ...R,
                        guards: Bi(
                          R.targetSnapshot,
                          R.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function wr(l, u) {
                    return (0, me.z)((a) => {
                      const {
                        targetSnapshot: h,
                        currentSnapshot: v,
                        guards: {
                          canActivateChecks: w,
                          canDeactivateChecks: x,
                        },
                      } = a;
                      return 0 === x.length && 0 === w.length
                        ? (0, k.of)({ ...a, guardsResult: !0 })
                        : (function An(l, u, a, h) {
                            return (0, C.D)(l).pipe(
                              (0, me.z)((v) =>
                                (function Gi(l, u, a, h, v) {
                                  const w =
                                    u && u.routeConfig
                                      ? u.routeConfig.canDeactivate
                                      : null;
                                  if (!w || 0 === w.length)
                                    return (0, k.of)(!0);
                                  const x = w.map((R) => {
                                    const Y = Br(u) ?? v,
                                      Se = ce(R, Y);
                                    return oe(
                                      (function Ht(l) {
                                        return l && y(l.canDeactivate);
                                      })(Se)
                                        ? Se.canDeactivate(l, u, a, h)
                                        : Y.runInContext(() => Se(l, u, a, h))
                                    ).pipe(Dt());
                                  });
                                  return (0, k.of)(x).pipe(ar());
                                })(v.component, v.route, a, u, h)
                              ),
                              Dt((v) => !0 !== v, !0)
                            );
                          })(x, h, v, l).pipe(
                            (0, me.z)((R) =>
                              R &&
                              (function m(l) {
                                return "boolean" == typeof l;
                              })(R)
                                ? (function pa(l, u, a, h) {
                                    return (0, C.D)(u).pipe(
                                      (0, B.b)((v) =>
                                        Re(
                                          (function ji(l, u) {
                                            return (
                                              null !== l && u && u(new Ms(l)),
                                              (0, k.of)(!0)
                                            );
                                          })(v.route.parent, h),
                                          (function Is(l, u) {
                                            return (
                                              null !== l && u && u(new Li(l)),
                                              (0, k.of)(!0)
                                            );
                                          })(v.route, h),
                                          (function $i(l, u, a) {
                                            const h = u[u.length - 1],
                                              w = u
                                                .slice(0, u.length - 1)
                                                .reverse()
                                                .map((x) =>
                                                  (function Ui(l) {
                                                    const u = l.routeConfig
                                                      ? l.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return u && 0 !== u.length
                                                      ? { node: l, guards: u }
                                                      : null;
                                                  })(x)
                                                )
                                                .filter((x) => null !== x)
                                                .map((x) =>
                                                  we(() => {
                                                    const R = x.guards.map(
                                                      (Y) => {
                                                        const Se =
                                                            Br(x.node) ?? a,
                                                          rt = ce(Y, Se);
                                                        return oe(
                                                          (function ke(l) {
                                                            return (
                                                              l &&
                                                              y(
                                                                l.canActivateChild
                                                              )
                                                            );
                                                          })(rt)
                                                            ? rt.canActivateChild(
                                                                h,
                                                                l
                                                              )
                                                            : Se.runInContext(
                                                                () => rt(h, l)
                                                              )
                                                        ).pipe(Dt());
                                                      }
                                                    );
                                                    return (0, k.of)(R).pipe(
                                                      ar()
                                                    );
                                                  })
                                                );
                                            return (0, k.of)(w).pipe(ar());
                                          })(l, v.path, a),
                                          (function Hi(l, u, a) {
                                            const h = u.routeConfig
                                              ? u.routeConfig.canActivate
                                              : null;
                                            if (!h || 0 === h.length)
                                              return (0, k.of)(!0);
                                            const v = h.map((w) =>
                                              we(() => {
                                                const x = Br(u) ?? a,
                                                  R = ce(w, x);
                                                return oe(
                                                  (function J(l) {
                                                    return (
                                                      l && y(l.canActivate)
                                                    );
                                                  })(R)
                                                    ? R.canActivate(u, l)
                                                    : x.runInContext(() =>
                                                        R(u, l)
                                                      )
                                                ).pipe(Dt());
                                              })
                                            );
                                            return (0, k.of)(v).pipe(ar());
                                          })(l, v.route, a)
                                        )
                                      ),
                                      Dt((v) => !0 !== v, !0)
                                    );
                                  })(h, w, l, u)
                                : (0, k.of)(R)
                            ),
                            (0, lt.U)((R) => ({ ...a, guardsResult: R }))
                          );
                    });
                  })(this.ngModule.injector, (R) => this.triggerEvent(R)),
                  (0, ge.b)((R) => {
                    if (((v.guardsResult = R.guardsResult), vt(R.guardsResult)))
                      throw gn(0, R.guardsResult);
                    const Y = new To(
                      R.id,
                      this.serializeUrl(R.extractedUrl),
                      this.serializeUrl(R.urlAfterRedirects),
                      R.targetSnapshot,
                      !!R.guardsResult
                    );
                    this.triggerEvent(Y);
                  }),
                  (0, de.h)(
                    (R) =>
                      !!R.guardsResult ||
                      (this.restoreHistory(R),
                      this.cancelNavigationTransition(R, "", 3),
                      !1)
                  ),
                  Ur((R) => {
                    if (R.guards.canActivateChecks.length)
                      return (0, k.of)(R).pipe(
                        (0, ge.b)((Y) => {
                          const Se = new xo(
                            Y.id,
                            this.serializeUrl(Y.extractedUrl),
                            this.serializeUrl(Y.urlAfterRedirects),
                            Y.targetSnapshot
                          );
                          this.triggerEvent(Se);
                        }),
                        Z((Y) => {
                          let Se = !1;
                          return (0, k.of)(Y).pipe(
                            (function Jt(l, u) {
                              return (0, me.z)((a) => {
                                const {
                                  targetSnapshot: h,
                                  guards: { canActivateChecks: v },
                                } = a;
                                if (!v.length) return (0, k.of)(a);
                                let w = 0;
                                return (0, C.D)(v).pipe(
                                  (0, B.b)((x) =>
                                    (function Mr(l, u, a, h) {
                                      const v = l.routeConfig,
                                        w = l._resolve;
                                      return (
                                        void 0 !== v?.title &&
                                          !tr(v) &&
                                          (w[Lt] = v.title),
                                        (function Wn(l, u, a, h) {
                                          const v = (function Nn(l) {
                                            return [
                                              ...Object.keys(l),
                                              ...Object.getOwnPropertySymbols(
                                                l
                                              ),
                                            ];
                                          })(l);
                                          if (0 === v.length)
                                            return (0, k.of)({});
                                          const w = {};
                                          return (0, C.D)(v).pipe(
                                            (0, me.z)((x) =>
                                              (function Sr(l, u, a, h) {
                                                const v = Br(u) ?? h,
                                                  w = ce(l, v);
                                                return oe(
                                                  w.resolve
                                                    ? w.resolve(u, a)
                                                    : v.runInContext(() =>
                                                        w(u, a)
                                                      )
                                                );
                                              })(l[x], u, a, h).pipe(
                                                Dt(),
                                                (0, ge.b)((R) => {
                                                  w[x] = R;
                                                })
                                              )
                                            ),
                                            pt(1),
                                            (function on(l) {
                                              return (0, lt.U)(() => l);
                                            })(w),
                                            (0, W.K)((x) =>
                                              $t(x) ? K.E : (0, ot._)(x)
                                            )
                                          );
                                        })(w, l, u, h).pipe(
                                          (0, lt.U)(
                                            (x) => (
                                              (l._resolvedData = x),
                                              (l.data = Po(l, a).resolve),
                                              v &&
                                                tr(v) &&
                                                (l.data[Lt] = v.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(x.route, h, l, u)
                                  ),
                                  (0, ge.b)(() => w++),
                                  pt(1),
                                  (0, me.z)((x) =>
                                    w === v.length ? (0, k.of)(a) : K.E
                                  )
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            (0, ge.b)({
                              next: () => (Se = !0),
                              complete: () => {
                                Se ||
                                  (this.restoreHistory(Y),
                                  this.cancelNavigationTransition(Y, "", 2));
                              },
                            })
                          );
                        }),
                        (0, ge.b)((Y) => {
                          const Se = new Xo(
                            Y.id,
                            this.serializeUrl(Y.extractedUrl),
                            this.serializeUrl(Y.urlAfterRedirects),
                            Y.targetSnapshot
                          );
                          this.triggerEvent(Se);
                        })
                      );
                  }),
                  Ur((R) => {
                    const Y = (Se) => {
                      const rt = [];
                      Se.routeConfig?.loadComponent &&
                        !Se.routeConfig._loadedComponent &&
                        rt.push(
                          this.configLoader.loadComponent(Se.routeConfig).pipe(
                            (0, ge.b)((Pe) => {
                              Se.component = Pe;
                            }),
                            (0, lt.U)(() => {})
                          )
                        );
                      for (const Pe of Se.children) rt.push(...Y(Pe));
                      return rt;
                    };
                    return Me(Y(R.targetSnapshot.root)).pipe(
                      Ce(),
                      (0, ee.q)(1)
                    );
                  }),
                  Ur(() => this.afterPreactivation()),
                  (0, lt.U)((R) => {
                    const Y = (function ii(l, u, a) {
                      const h = _r(l, u._root, a ? a._root : void 0);
                      return new oi(h, u);
                    })(
                      this.routeReuseStrategy,
                      R.targetSnapshot,
                      R.currentRouterState
                    );
                    return (v = { ...R, targetRouterState: Y });
                  }),
                  (0, ge.b)((R) => {
                    (this.currentUrlTree = R.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        R.urlAfterRedirects,
                        R.rawUrl
                      )),
                      (this.routerState = R.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (R.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, R),
                        (this.browserUrlTree = R.urlAfterRedirects));
                  }),
                  ((l, u, a) =>
                    (0, lt.U)(
                      (h) => (
                        new ui(
                          u,
                          h.targetRouterState,
                          h.currentRouterState,
                          a
                        ).activate(l),
                        h
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (R) =>
                    this.triggerEvent(R)
                  ),
                  (0, ge.b)({
                    next() {
                      w = !0;
                    },
                    complete() {
                      w = !0;
                    },
                  }),
                  sn(() => {
                    w || x || this.cancelNavigationTransition(v, "", 1),
                      this.currentNavigation?.id === v.id &&
                        (this.currentNavigation = null);
                  }),
                  (0, W.K)((R) => {
                    if (((x = !0), zn(R))) {
                      go(R) ||
                        ((this.navigated = !0), this.restoreHistory(v, !0));
                      const Y = new en(
                        v.id,
                        this.serializeUrl(v.extractedUrl),
                        R.message,
                        R.cancellationCode
                      );
                      if ((h.next(Y), go(R))) {
                        const Se = this.urlHandlingStrategy.merge(
                            R.url,
                            this.rawUrlTree
                          ),
                          rt = {
                            skipLocationChange: v.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              Ps(v.source),
                          };
                        this.scheduleNavigation(Se, "imperative", null, rt, {
                          resolve: v.resolve,
                          reject: v.reject,
                          promise: v.promise,
                        });
                      } else v.resolve(!1);
                    } else {
                      this.restoreHistory(v, !0);
                      const Y = new mr(
                        v.id,
                        this.serializeUrl(v.extractedUrl),
                        R,
                        v.targetSnapshot ?? void 0
                      );
                      h.next(Y);
                      try {
                        v.resolve(this.errorHandler(R));
                      } catch (Se) {
                        v.reject(Se);
                      }
                    }
                    return K.E;
                  })
                );
              })
            );
          }
          resetRootComponentType(a) {
            (this.rootComponentType = a),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(a) {
            this.transitions.next({ ...this.transitions.value, ...a });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((a) => {
                const h = "popstate" === a.type ? "popstate" : "hashchange";
                "popstate" === h &&
                  setTimeout(() => {
                    const v = { replaceUrl: !0 },
                      w = a.state?.navigationId ? a.state : null;
                    if (w) {
                      const R = { ...w };
                      delete R.navigationId,
                        delete R.ɵrouterPageId,
                        0 !== Object.keys(R).length && (v.state = R);
                    }
                    const x = this.parseUrl(a.url);
                    this.scheduleNavigation(x, h, w, v);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(a) {
            this.events.next(a);
          }
          resetConfig(a) {
            (this.config = a.map(Jr)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(a, h = {}) {
            const {
                relativeTo: v,
                queryParams: w,
                fragment: x,
                queryParamsHandling: R,
                preserveFragment: Y,
              } = h,
              Se = v || this.routerState.root,
              rt = Y ? this.currentUrlTree.fragment : x;
            let Pe = null;
            switch (R) {
              case "merge":
                Pe = { ...this.currentUrlTree.queryParams, ...w };
                break;
              case "preserve":
                Pe = this.currentUrlTree.queryParams;
                break;
              default:
                Pe = w || null;
            }
            return (
              null !== Pe && (Pe = this.removeEmptyProps(Pe)),
              hr(Se, this.currentUrlTree, a, Pe, rt ?? null)
            );
          }
          navigateByUrl(a, h = { skipLocationChange: !1 }) {
            const v = vt(a) ? a : this.parseUrl(a),
              w = this.urlHandlingStrategy.merge(v, this.rawUrlTree);
            return this.scheduleNavigation(w, "imperative", null, h);
          }
          navigate(a, h = { skipLocationChange: !1 }) {
            return (
              (function wa(l) {
                for (let u = 0; u < l.length; u++) {
                  if (null == l[u]) throw new d.vHH(4008, false);
                }
              })(a),
              this.navigateByUrl(this.createUrlTree(a, h), h)
            );
          }
          serializeUrl(a) {
            return this.urlSerializer.serialize(a);
          }
          parseUrl(a) {
            let h;
            try {
              h = this.urlSerializer.parse(a);
            } catch (v) {
              h = this.malformedUriErrorHandler(v, this.urlSerializer, a);
            }
            return h;
          }
          isActive(a, h) {
            let v;
            if (((v = !0 === h ? { ...Ea } : !1 === h ? { ...Dl } : h), vt(a)))
              return Gt(this.currentUrlTree, a, v);
            const w = this.parseUrl(a);
            return Gt(this.currentUrlTree, w, v);
          }
          removeEmptyProps(a) {
            return Object.keys(a).reduce((h, v) => {
              const w = a[v];
              return null != w && (h[v] = w), h;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (a) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = a.id),
                  (this.currentPageId = a.targetPageId),
                  this.events.next(
                    new sr(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  a.resolve(!0);
              },
              (a) => {
                this.console.warn(`Unhandled Navigation Error: ${a}`);
              }
            );
          }
          scheduleNavigation(a, h, v, w, x) {
            if (this.disposed) return Promise.resolve(!1);
            let R, Y, Se;
            x
              ? ((R = x.resolve), (Y = x.reject), (Se = x.promise))
              : (Se = new Promise((Ot, Fn) => {
                  (R = Ot), (Y = Fn);
                }));
            const rt = ++this.navigationId;
            let Pe;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (v = this.location.getState()),
                  (Pe =
                    v && v.ɵrouterPageId
                      ? v.ɵrouterPageId
                      : w.replaceUrl || w.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (Pe = 0),
              this.setTransition({
                id: rt,
                targetPageId: Pe,
                source: h,
                restoredState: v,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: a,
                extras: w,
                resolve: R,
                reject: Y,
                promise: Se,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              Se.catch((Ot) => Promise.reject(Ot))
            );
          }
          setBrowserUrl(a, h) {
            const v = this.urlSerializer.serialize(a),
              w = {
                ...h.extras.state,
                ...this.generateNgRouterState(h.id, h.targetPageId),
              };
            this.location.isCurrentPathEqualTo(v) || h.extras.replaceUrl
              ? this.location.replaceState(v, "", w)
              : this.location.go(v, "", w);
          }
          restoreHistory(a, h = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const v = this.currentPageId - a.targetPageId;
              ("popstate" !== a.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === v
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === v &&
                  (this.resetState(a),
                  (this.browserUrlTree = a.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(v);
            } else
              "replace" === this.canceledNavigationResolution &&
                (h && this.resetState(a), this.resetUrlToCurrentUrlTree());
          }
          resetState(a) {
            (this.routerState = a.currentRouterState),
              (this.currentUrlTree = a.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                a.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(a, h, v) {
            const w = new en(a.id, this.serializeUrl(a.extractedUrl), h, v);
            this.triggerEvent(w), a.resolve(!1);
          }
          generateNgRouterState(a, h) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: a, ɵrouterPageId: h }
              : { navigationId: a };
          }
        }
        return (
          (l.ɵfac = function (a) {
            d.$Z();
          }),
          (l.ɵprov = d.Yz7({
            token: l,
            factory: function () {
              return Go();
            },
            providedIn: "root",
          })),
          l
        );
      })();
      function Ps(l) {
        return "imperative" !== l;
      }
      let no = (() => {
          class l {
            constructor(a, h, v, w, x) {
              (this.router = a),
                (this.route = h),
                (this.tabIndexAttribute = v),
                (this.renderer = w),
                (this.el = x),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.commands = null),
                (this.onChanges = new nt.x()),
                this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(a) {
              this._preserveFragment = (0, d.D6c)(a);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(a) {
              this._skipLocationChange = (0, d.D6c)(a);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(a) {
              this._replaceUrl = (0, d.D6c)(a);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(a) {
              if (null != this.tabIndexAttribute) return;
              const h = this.renderer,
                v = this.el.nativeElement;
              null !== a
                ? h.setAttribute(v, "tabindex", a)
                : h.removeAttribute(v, "tabindex");
            }
            ngOnChanges(a) {
              this.onChanges.next(this);
            }
            set routerLink(a) {
              null != a
                ? ((this.commands = Array.isArray(a) ? a : [a]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick() {
              return (
                null === this.urlTree ||
                  this.router.navigateByUrl(this.urlTree, {
                    skipLocationChange: this.skipLocationChange,
                    replaceUrl: this.replaceUrl,
                    state: this.state,
                  }),
                !0
              );
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (l.ɵfac = function (a) {
              return new (a || l)(
                d.Y36(un),
                d.Y36(En),
                d.$8M("tabindex"),
                d.Y36(d.Qsj),
                d.Y36(d.SBq)
              );
            }),
            (l.ɵdir = d.lG2({
              type: l,
              selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
              hostBindings: function (a, h) {
                1 & a &&
                  d.NdJ("click", function () {
                    return h.onClick();
                  });
              },
              inputs: {
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [d.TTD],
            })),
            l
          );
        })(),
        qi = (() => {
          class l {
            constructor(a, h, v) {
              (this.router = a),
                (this.route = h),
                (this.locationStrategy = v),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.commands = null),
                (this.href = null),
                (this.onChanges = new nt.x()),
                (this.subscription = a.events.subscribe((w) => {
                  w instanceof sr && this.updateTargetUrlAndHref();
                }));
            }
            set preserveFragment(a) {
              this._preserveFragment = (0, d.D6c)(a);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(a) {
              this._skipLocationChange = (0, d.D6c)(a);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(a) {
              this._replaceUrl = (0, d.D6c)(a);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            set routerLink(a) {
              this.commands = null != a ? (Array.isArray(a) ? a : [a]) : null;
            }
            ngOnChanges(a) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(a, h, v, w, x) {
              return (
                !!(
                  0 !== a ||
                  h ||
                  v ||
                  w ||
                  x ||
                  ("string" == typeof this.target && "_self" != this.target) ||
                  null === this.urlTree
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !1)
              );
            }
            updateTargetUrlAndHref() {
              this.href =
                null !== this.urlTree
                  ? this.locationStrategy.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (l.ɵfac = function (a) {
              return new (a || l)(d.Y36(un), d.Y36(En), d.Y36(be.S$));
            }),
            (l.ɵdir = d.lG2({
              type: l,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (a, h) {
                1 & a &&
                  d.NdJ("click", function (w) {
                    return h.onClick(
                      w.button,
                      w.ctrlKey,
                      w.shiftKey,
                      w.altKey,
                      w.metaKey
                    );
                  }),
                  2 & a && d.uIk("target", h.target)("href", h.href, d.LSH);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [d.TTD],
            })),
            l
          );
        })(),
        Ns = (() => {
          class l {
            constructor(a, h, v, w, x, R) {
              (this.router = a),
                (this.element = h),
                (this.renderer = v),
                (this.cdr = w),
                (this.link = x),
                (this.linkWithHref = R),
                (this.classes = []),
                (this.isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new d.vpe()),
                (this.routerEventsSubscription = a.events.subscribe((Y) => {
                  Y instanceof sr && this.update();
                }));
            }
            ngAfterContentInit() {
              (0, k.of)(
                this.links.changes,
                this.linksWithHrefs.changes,
                (0, k.of)(null)
              )
                .pipe((0, Ke.J)())
                .subscribe((a) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const a = [
                ...this.links.toArray(),
                ...this.linksWithHrefs.toArray(),
                this.link,
                this.linkWithHref,
              ]
                .filter((h) => !!h)
                .map((h) => h.onChanges);
              this.linkInputChangesSubscription = (0, C.D)(a)
                .pipe((0, Ke.J)())
                .subscribe((h) => {
                  this.isActive !== this.isLinkActive(this.router)(h) &&
                    this.update();
                });
            }
            set routerLinkActive(a) {
              const h = Array.isArray(a) ? a : a.split(" ");
              this.classes = h.filter((v) => !!v);
            }
            ngOnChanges(a) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.linksWithHrefs ||
                !this.router.navigated ||
                Promise.resolve().then(() => {
                  const a = this.hasActiveLinks();
                  this.isActive !== a &&
                    ((this.isActive = a),
                    this.cdr.markForCheck(),
                    this.classes.forEach((h) => {
                      a
                        ? this.renderer.addClass(this.element.nativeElement, h)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            h
                          );
                    }),
                    a && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          "aria-current",
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(
                          this.element.nativeElement,
                          "aria-current"
                        ),
                    this.isActiveChange.emit(a));
                });
            }
            isLinkActive(a) {
              const h = (function Fs(l) {
                return !!l.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (v) => !!v.urlTree && a.isActive(v.urlTree, h);
            }
            hasActiveLinks() {
              const a = this.isLinkActive(this.router);
              return (
                (this.link && a(this.link)) ||
                (this.linkWithHref && a(this.linkWithHref)) ||
                this.links.some(a) ||
                this.linksWithHrefs.some(a)
              );
            }
          }
          return (
            (l.ɵfac = function (a) {
              return new (a || l)(
                d.Y36(un),
                d.Y36(d.SBq),
                d.Y36(d.Qsj),
                d.Y36(d.sBO),
                d.Y36(no, 8),
                d.Y36(qi, 8)
              );
            }),
            (l.ɵdir = d.lG2({
              type: l,
              selectors: [["", "routerLinkActive", ""]],
              contentQueries: function (a, h, v) {
                if ((1 & a && (d.Suo(v, no, 5), d.Suo(v, qi, 5)), 2 & a)) {
                  let w;
                  d.iGM((w = d.CRH())) && (h.links = w),
                    d.iGM((w = d.CRH())) && (h.linksWithHrefs = w);
                }
              },
              inputs: {
                routerLinkActiveOptions: "routerLinkActiveOptions",
                ariaCurrentWhenActive: "ariaCurrentWhenActive",
                routerLinkActive: "routerLinkActive",
              },
              outputs: { isActiveChange: "isActiveChange" },
              exportAs: ["routerLinkActive"],
              standalone: !0,
              features: [d.TTD],
            })),
            l
          );
        })();
      class ba {}
      let zo = (() => {
        class l {
          constructor(a, h, v, w, x) {
            (this.router = a),
              (this.injector = v),
              (this.preloadingStrategy = w),
              (this.loader = x);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                (0, de.h)((a) => a instanceof sr),
                (0, B.b)(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(a, h) {
            const v = [];
            for (const w of h) {
              w.providers &&
                !w._injector &&
                (w._injector = (0, d.MMx)(w.providers, a, `Route: ${w.path}`));
              const x = w._injector ?? a,
                R = w._loadedInjector ?? x;
              (w.loadChildren && !w._loadedRoutes && void 0 === w.canLoad) ||
              (w.loadComponent && !w._loadedComponent)
                ? v.push(this.preloadConfig(x, w))
                : (w.children || w._loadedRoutes) &&
                  v.push(this.processRoutes(R, w.children ?? w._loadedRoutes));
            }
            return (0, C.D)(v).pipe((0, Ke.J)());
          }
          preloadConfig(a, h) {
            return this.preloadingStrategy.preload(h, () => {
              let v;
              v =
                h.loadChildren && void 0 === h.canLoad
                  ? this.loader.loadChildren(a, h)
                  : (0, k.of)(null);
              const w = v.pipe(
                (0, me.z)((x) =>
                  null === x
                    ? (0, k.of)(void 0)
                    : ((h._loadedRoutes = x.routes),
                      (h._loadedInjector = x.injector),
                      this.processRoutes(x.injector ?? a, x.routes))
                )
              );
              if (h.loadComponent && !h._loadedComponent) {
                const x = this.loader.loadComponent(h);
                return (0, C.D)([w, x]).pipe((0, Ke.J)());
              }
              return w;
            });
          }
        }
        return (
          (l.ɵfac = function (a) {
            return new (a || l)(
              d.LFG(un),
              d.LFG(d.Sil),
              d.LFG(d.lqb),
              d.LFG(ba),
              d.LFG($o)
            );
          }),
          (l.ɵprov = d.Yz7({ token: l, factory: l.ɵfac, providedIn: "root" })),
          l
        );
      })();
      const ro = new d.OlP("");
      let _o = (() => {
        class l {
          constructor(a, h, v = {}) {
            (this.router = a),
              (this.viewportScroller = h),
              (this.options = v),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (v.scrollPositionRestoration =
                v.scrollPositionRestoration || "disabled"),
              (v.anchorScrolling = v.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((a) => {
              a instanceof Cn
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = a.navigationTrigger),
                  (this.restoredId = a.restoredState
                    ? a.restoredState.navigationId
                    : 0))
                : a instanceof sr &&
                  ((this.lastId = a.id),
                  this.scheduleScrollEvent(
                    a,
                    this.router.parseUrl(a.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((a) => {
              a instanceof ni &&
                (a.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(a.position)
                  : a.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(a.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(a, h) {
            this.router.triggerEvent(
              new ni(
                a,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                h
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (l.ɵfac = function (a) {
            d.$Z();
          }),
          (l.ɵprov = d.Yz7({ token: l, factory: l.ɵfac })),
          l
        );
      })();
      function Ci(l, u) {
        return { ɵkind: l, ɵproviders: u };
      }
      function Ls(l) {
        return [{ provide: vi, multi: !0, useValue: l }];
      }
      function El() {
        const l = (0, d.f3M)(d.zs3);
        return (u) => {
          const a = l.get(d.z2F);
          if (u !== a.components[0]) return;
          const h = l.get(un),
            v = l.get(wl);
          1 === l.get(Ia) && h.initialNavigation(),
            l.get(bl, null, d.XFs.Optional)?.setUpPreloading(),
            l.get(ro, null, d.XFs.Optional)?.init(),
            h.resetRootComponentType(a.componentTypes[0]),
            v.closed || (v.next(), v.unsubscribe());
        };
      }
      const wl = new d.OlP("", { factory: () => new nt.x() }),
        Ia = new d.OlP("", { providedIn: "root", factory: () => 1 });
      const bl = new d.OlP("");
      function Ei(l) {
        return Ci(0, [
          { provide: bl, useExisting: zo },
          { provide: ba, useExisting: l },
        ]);
      }
      const Ji = new d.OlP("ROUTER_FORROOT_GUARD"),
        wi = [
          be.Ye,
          { provide: vn, useClass: Un },
          { provide: un, useFactory: Go },
          Kr,
          {
            provide: En,
            useFactory: function Do(l) {
              return l.routerState.root;
            },
            deps: [un],
          },
          $o,
        ];
      function Kc() {
        return new d.PXZ("Router", un);
      }
      let Ml = (() => {
        class l {
          constructor(a) {}
          static forRoot(a, h) {
            return {
              ngModule: l,
              providers: [
                wi,
                [],
                Ls(a),
                {
                  provide: Ji,
                  useFactory: Qi,
                  deps: [[un, new d.FiY(), new d.tp0()]],
                },
                { provide: to, useValue: h || {} },
                h?.useHash
                  ? { provide: be.S$, useClass: be.Do }
                  : { provide: be.S$, useClass: be.b0 },
                {
                  provide: ro,
                  useFactory: () => {
                    const l = (0, d.f3M)(un),
                      u = (0, d.f3M)(be.EM),
                      a = (0, d.f3M)(to);
                    return (
                      a.scrollOffset && u.setOffset(a.scrollOffset),
                      new _o(l, u, a)
                    );
                  },
                },
                h?.preloadingStrategy
                  ? Ei(h.preloadingStrategy).ɵproviders
                  : [],
                { provide: d.PXZ, multi: !0, useFactory: Kc },
                h?.initialNavigation ? bi(h) : [],
                [
                  { provide: Vs, useFactory: El },
                  { provide: d.tb, multi: !0, useExisting: Vs },
                ],
              ],
            };
          }
          static forChild(a) {
            return { ngModule: l, providers: [Ls(a)] };
          }
        }
        return (
          (l.ɵfac = function (a) {
            return new (a || l)(d.LFG(Ji, 8));
          }),
          (l.ɵmod = d.oAB({ type: l })),
          (l.ɵinj = d.cJS({ imports: [qt] })),
          l
        );
      })();
      function Qi(l) {
        return "guarded";
      }
      function bi(l) {
        return [
          "disabled" === l.initialNavigation
            ? Ci(3, [
                {
                  provide: d.ip1,
                  multi: !0,
                  useFactory: () => {
                    const u = (0, d.f3M)(un);
                    return () => {
                      u.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Ia, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === l.initialNavigation
            ? Ci(2, [
                { provide: Ia, useValue: 0 },
                {
                  provide: d.ip1,
                  multi: !0,
                  deps: [d.zs3],
                  useFactory: (u) => {
                    const a = u.get(be.V_, Promise.resolve());
                    let h = !1;
                    return () =>
                      a.then(
                        () =>
                          new Promise((w) => {
                            const x = u.get(un),
                              R = u.get(wl);
                            (function v(w) {
                              u.get(un)
                                .events.pipe(
                                  (0, de.h)(
                                    (R) =>
                                      R instanceof sr ||
                                      R instanceof en ||
                                      R instanceof mr
                                  ),
                                  (0, lt.U)(
                                    (R) =>
                                      R instanceof sr ||
                                      (R instanceof en &&
                                        (0 === R.code || 1 === R.code) &&
                                        null)
                                  ),
                                  (0, de.h)((R) => null !== R),
                                  (0, ee.q)(1)
                                )
                                .subscribe(() => {
                                  w();
                                });
                            })(() => {
                              w(!0), (h = !0);
                            }),
                              (x.afterPreactivation = () => (
                                w(!0), h || R.closed ? (0, k.of)(void 0) : R
                              )),
                              x.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const Vs = new d.OlP("");
    },
    7582: (Ge, ue, I) => {
      function Ee(Z, ee, te, de) {
        return new (te || (te = Promise))(function (Ce, Je) {
          function ct(ge) {
            try {
              B(de.next(ge));
            } catch (W) {
              Je(W);
            }
          }
          function Dt(ge) {
            try {
              B(de.throw(ge));
            } catch (W) {
              Je(W);
            }
          }
          function B(ge) {
            ge.done
              ? Ce(ge.value)
              : (function me(Ce) {
                  return Ce instanceof te
                    ? Ce
                    : new te(function (Je) {
                        Je(Ce);
                      });
                })(ge.value).then(ct, Dt);
          }
          B((de = de.apply(Z, ee || [])).next());
        });
      }
      function Ae(Z) {
        return this instanceof Ae ? ((this.v = Z), this) : new Ae(Z);
      }
      function we(Z, ee, te) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var me,
          de = te.apply(Z, ee || []),
          Ce = [];
        return (
          (me = {}),
          Je("next"),
          Je("throw"),
          Je("return"),
          (me[Symbol.asyncIterator] = function () {
            return this;
          }),
          me
        );
        function Je(he) {
          de[he] &&
            (me[he] = function (ze) {
              return new Promise(function (pt, _t) {
                Ce.push([he, ze, pt, _t]) > 1 || ct(he, ze);
              });
            });
        }
        function ct(he, ze) {
          try {
            !(function Dt(he) {
              he.value instanceof Ae
                ? Promise.resolve(he.value.v).then(B, ge)
                : W(Ce[0][2], he);
            })(de[he](ze));
          } catch (pt) {
            W(Ce[0][3], pt);
          }
        }
        function B(he) {
          ct("next", he);
        }
        function ge(he) {
          ct("throw", he);
        }
        function W(he, ze) {
          he(ze), Ce.shift(), Ce.length && ct(Ce[0][0], Ce[0][1]);
        }
      }
      function ot(Z) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var te,
          ee = Z[Symbol.asyncIterator];
        return ee
          ? ee.call(Z)
          : ((Z = (function Ne(Z) {
              var ee = "function" == typeof Symbol && Symbol.iterator,
                te = ee && Z[ee],
                de = 0;
              if (te) return te.call(Z);
              if (Z && "number" == typeof Z.length)
                return {
                  next: function () {
                    return (
                      Z && de >= Z.length && (Z = void 0),
                      { value: Z && Z[de++], done: !Z }
                    );
                  },
                };
              throw new TypeError(
                ee
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(Z)),
            (te = {}),
            de("next"),
            de("throw"),
            de("return"),
            (te[Symbol.asyncIterator] = function () {
              return this;
            }),
            te);
        function de(Ce) {
          te[Ce] =
            Z[Ce] &&
            function (Je) {
              return new Promise(function (ct, Dt) {
                !(function me(Ce, Je, ct, Dt) {
                  Promise.resolve(Dt).then(function (B) {
                    Ce({ value: B, done: ct });
                  }, Je);
                })(ct, Dt, (Je = Z[Ce](Je)).done, Je.value);
              });
            };
        }
      }
      I.d(ue, { FC: () => we, KL: () => ot, mG: () => Ee, qq: () => Ae });
    },
  },
  (Ge) => {
    Ge((Ge.s = 2230));
  },
]);

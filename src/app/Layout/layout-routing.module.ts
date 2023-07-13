  import { NgModule } from "@angular/core";
  import { Routes, RouterModule } from "@angular/router";
  import { LayoutComponent } from "./layout-component/layout.component";
import { LoadFundsComponent } from "./load-funds/load-funds/load-funds.component";

  const routes: Routes = [
    {
      path: "",
      component: LayoutComponent,
      children: [
        {
          path: "",
          pathMatch: "full",
          redirectTo: "cards-layout",
          data: {
            expectedRole: "cards-layout",
          },
        },
        {
          path: "cards-layout",
          loadChildren: () =>
            import("./cards-layout/cards-layout.module").then((m) => m.CardsLayoutModule),
          data: {
            expectedRole: "cards-layout",
          },
        },
        {
          path: "load-funds",
          loadChildren: () =>
            import("./load-funds/load-funds.module").then((m) => m.LoadFundsModule),
          data: {
            expectedRole: "load-funds",
          },
        },

        {
          path: "user-preferences",
          loadChildren: () =>
            import("./user-preferences/user-preferences.module").then((m) => m.UserPreferencesModule),
          data: {
            expectedRole: "user-preferences",
          },
        },
        {
          path: "security-settings",
          loadChildren: () =>
            import("./security-settings/security-settings.module").then((m) => m.SecuritySettingsModule),
          data: {
            expectedRole: "security-settings",
          },
        },
        {
          path: "redeem-funds",
          loadChildren: () =>
            import("./redeem-funds/redeem-funds.module").then((m) => m.RedeemFundsModule),
          data: {
            expectedRole: "redeem-funds",
          },
        },
        {
          path: "customer-inquiry",
          loadChildren: () =>
            import("./customer-inquiry/customer-inquiry.module").then((m) => m.CustomerInquiryModule),
          data: {
            expectedRole: "customer-inquiry",
          },
        },
        // {
        //   path: "load-funds",
        //   component: LoadFundsComponent,
        //   data: {
        //     expectedRole: "load-funds",
        //   },
        // },
  
      ],
    },
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule {}

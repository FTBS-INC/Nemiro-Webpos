import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard, SessionGuard } from '../shared/guards';
import { RoleGuard } from '../shared/guards/role.guard';


const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("../Layout/layout.module").then((m) => m.LayoutModule),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("../login/login.module").then((m) => m.LoginModule),
    canActivate: [SessionGuard],
  },
  // {
  //   path: "dispenser",
  //   loadChildren: () =>
  //     import("../dispenser/dispenser.module").then((m) => m.DispenserModule),
  //   // canActivate: [SessionGuard],
  // },
  // {
  //   path: "user-management/roles",
  //   loadChildren: () =>
  //     import("../Layout/roles/roles.module").then((m) => m.RolesModule),
  //   data: {
  //     expectedRole: "user-management",
  //   },
  //   // canActivate: [RoleGuard],
  // },
  // {
  //   path: "kyc-review",
  //   loadChildren: () =>
  //     import("../Layout/kyc-review/kyc-review.module").then((m) => m.KycReviewModule),
  //   data: {
  //     expectedRole: "kyc-review",
  //   },
  //   // canActivate: [RoleGuard],
  // },
  // {
  //   path: "user-management/features",
  //   loadChildren: () =>
  //     import("../Layout/features/features.module").then(
  //       (m) => m.FeaturesModule
  //     ),
  //   data: {
  //     expectedRole: "user-management",
  //   },
  //   // canActivate: [RoleGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

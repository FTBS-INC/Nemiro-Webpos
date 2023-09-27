import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import {
  GlobalService,
  // RequestServices,
  StorageService,
} from "src/app/shared/services";
import { RequestServices } from "src/app/shared/services/request.services";
declare var $;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userArr: any;
  fieldTextType: boolean;
  flag: any = 1;
  isFullScreen = false;
  _login_variables = {
    _visibleModule: "",
    _buttonState: "",
    _buttonDisabled: false,
    _temp_token: null,
  };
  login_data = {};
  _loginForm: FormGroup;
  _recoverEmail: FormGroup;
  _setNewPassword: FormGroup;
  _currentDiv = "";


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public global: GlobalService,
    private service: RequestServices,
    private storage: StorageService,
    private readonly elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this._loginForm = formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      mainVersion: [1, Validators.nullValidator],
      subVersion: [1.7, Validators.nullValidator],
      device: ["web", Validators.nullValidator],
    });

    this._recoverEmail = formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      device: ["web", Validators.nullValidator],
    });
    this._setNewPassword = formBuilder.group({
      username: this._recoverEmail.get('username').value,
      otp: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
          Validators.minLength(8),
        ]),
      ],
      confirmPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
          Validators.minLength(8),
        ]),
      ],
      device: ["web", Validators.nullValidator],
    });
  }
  ngOnInit(): void {
    // const script = this.renderer.createElement('script');
    // script.src = 'http://iknow.com/this/does/not/work/either/file.js';
    // script.onload = () => {
    //
    // };
    // this.renderer.appendChild(this.elementRef.nativeElement, script)
    this._recoverEmail.get('username').valueChanges.subscribe((value) => {
      this._setNewPassword.get('username').setValue(value);
    });

    this._login_variables._temp_token =
      this.activateRoute.snapshot.queryParamMap.get("TokenID");
    this._login_variables._temp_token !== null
      ? (this._login_variables._visibleModule = "module_resetPass")
      : (this._login_variables._visibleModule = "");
    document
      .getElementsByTagName("body")[0]
      .classList.add("footer");
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  fullScreenClick() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  forgotCredential(forgotType?: any) {
    if (forgotType === undefined) {
      this._login_variables._visibleModule = "";
    } else {
      switch (forgotType) {
        // case "email":
        //   this._login_variables._visibleModule = "module_forgotEmail";
        //   break;
        case "password":
          this._login_variables._visibleModule = "module_forgotPass";
          break;
        // case "reset":
        //   this._login_variables._visibleModule = "module_resetPass";
        //   break;
      }
    }
    this._recoverEmail.reset();
    this._setNewPassword.reset();
  }
  ngOnDestroy(): void {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("background", "no-footer");
  }
  submitForm(form: any) {
    try {
      this._login_variables._buttonState = "show-spinner";
      this._login_variables._buttonDisabled = true;

      this.service.postRequest("v1/Account/login", form).subscribe(
        (response) => {


          if (response.statusCode === "Lg-400") {
            this.global.showNotification('Error', '', 'Invalid credential');
          } else {
            this.storage.setLocalStorage(
              this.global.settings.NEMIRO_USER,
              response.data.token

            );
            this.global.showNotification('Success', '', 'Login Successful');
            this.router.navigate(['/cards-layout'])

            this.userArr = response;
            console.log(this.userArr);
            this.getUserDetails();
          }
          this._login_variables._buttonState = "";
          this._login_variables._buttonDisabled = false;
        },
        (error) => {
          if (error.status === 500) {
            this.global.showNotification("Error", "", "Server error");
          } else if (error.status === 423) {
            this.global.showNotification(
              "Error",
              "",
              "Account is temporary blocked. Please contact admin"
            );
          } else if (error.status === 400) {
            this.global.showNotification(
              "Error",
              "",
              "Invalid Credentials"
            );
          } else {
            this.global.showNotification("Error", "", "Something went wrong");
          }
          this._login_variables._buttonState = "";
          this._login_variables._buttonDisabled = false;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  sendEmail(form: any) {
    try {
      var obj = {
        username: form.username,
        device: "web"
      };
      this.service.postRequest("v1/Account/forgotsentverificationcode", obj).subscribe(
        (response) => {
          if (response.isError === false) {
            this.global.showNotification(
              "Success",
              "",
              "We have sent you a password reset link. Please look into the spam folder if not received in inbox"
            );
            this._login_variables._visibleModule = "module_resetPass";
          } else {
            this.global.showNotification("Error", "", response.data);
          }
        },
        (error) => {
          if (error.status === 400) {
            this.global.showNotification("Error", "", "Something went wrong");
          } else if (error.status === 500) {
            this.global.showNotification("Error", "", "Something went wrong");
          } else {
            this.global.showNotification("Error", "", "Something went wrong");
          }
        }

      );

    } catch (error) {
      console.log(error);
    }
    // switch (type) {
    //   // case "emailForgot":
    //   //   this.global.showNotification(
    //   //     "Success",
    //   //     "",
    //   //     "Check your email for recover your login email"
    //   //   );
    //   //   break;
    //   case "passwordForgot":

    //     break;
    // }
  }
  resetPassword(form: any) {
    let obj = {
      code: form.otp,
      username: form.username,
      newPassword: form.password
    }
    // var obj = {
    //   token: this._login_variables._temp_token,
    //   password: password.password,
    // };
    this.service.postRequest("v1/Account/changeforgotpasswordwithcode", obj).subscribe(
      (response) => {
        if (response.isError === false) {
          this.global.showNotification(
            "Success",
            "",
            "Your password changed successfully"
          );
          setTimeout(() => {
            this.router.navigate([], {
              queryParams: { TokenID: null },
              queryParamsHandling: "merge",
            });
            this._setNewPassword.reset();
            this._login_variables._visibleModule = "";
          }, 200);
        }
      },
      (error) => { }
    );
  }
  getUserDetails() {

    let date = new Date();
    localStorage.setItem("username", this.userArr.data.username);
    localStorage.setItem("firstName", this.userArr.data.firstName);
    localStorage.setItem("lastName", this.userArr.data.lastName);
    localStorage.setItem("email", this.userArr.data.email);
    localStorage.setItem("phone", this.userArr.data.accountInfo.cellPhoneNumber);
    localStorage.setItem("city", this.userArr.data.accountInfo.city);
    localStorage.setItem("address", this.userArr.data.accountInfo.addressLine1);
    localStorage.setItem("zip", this.userArr.data.accountInfo.zipCode);
    localStorage.setItem("presentDate", date.toJSON());

    // this.getRoleFeatureFunction();
  }
  getRoleFeatureFunction() {
    // let rID = this.userArr.roleIDs;
    // let oID = this.userArr.orgID;
    // this.service
    //   .getRequest(`Role/GetFeaturesAssignedToRole?RoleID=${rID}`)
    //   .subscribe(
    //     (response) => {
    //       // if (response.statusCode === '200') {
    //       //   this.global.showNotification('Success', '', 'Check your email for recover your password');
    //       // }


    //       if (response.statusCode === "200") {
    //         var roleArr = [];
    //         var functionDic = {};
    //         response.data.forEach((place) => {
    //           var arr = [];
    //           if (functionDic[place.descp] === undefined) {
    //             functionDic[place.descp] = arr;
    //           }

    //           var roleArr = functionDic[place.descp];

    //           for (var i = 0; i < place.functions.length; i++) {
    //             if (roleArr.length === 0) {
    //               roleArr.push(place.functions[i].descp);
    //             } else {
    //               var index = roleArr.findIndex(
    //                 (obj) => obj === place.functions[i].descp
    //               );
    //               if (index === -1) {
    //                 roleArr.push(place.functions[i].descp);
    //               }
    //             }
    //           }
    //         });

    //         var encryptFunction = JSON.stringify(functionDic);
    //         encryptFunction = btoa(encryptFunction);
    //         this.storage.setLocalStorage("func", encryptFunction);


    //         // let obj = response.data.find((it) => it.isDefault === true);
    //         //let arr = response.data.map(it => it.feature);
    //         let arr = response.data;
    //         // for (var i = 0; i < arr.length; i++) {
    //         //   if (obj.featureID === arr[i].featureID) {
    //         //     arr[i].isDefault = true;
    //         //   } else {
    //         //     arr[i].isDefault = false;
    //         //   }
    //         // }
    //         var uniqueArr = [];
    //         var arr2 = arr.filter((el) => {
    //           // If it is not a duplicate, return true
    //           if (uniqueArr.indexOf(el.featureID) == -1) {
    //             uniqueArr.push(el.featureID);
    //             return true;
    //           }
    //           return false;
    //         });

    //         let defaultPath = {
    //           name: "users",
    //           path: "/user-management/user-management",
    //         };

    //         let roles = JSON.stringify(arr2);
    //         this.storage.setLocalStorage("roles", roles);
    //         let pathArr =
    //           this.router.config[0]["_loadedConfig"].routes[0].children;
    //         let a = arr2.find((it) => it.isDefault === true);
    //         let obj2 = pathArr.find(
    //           (it) =>
    //             it.data.expectedRole.toLowerCase() ===
    //             defaultPath.name.toLowerCase()
    //         );
    //         this.router.navigate([obj2.path]);
    //       }
    //     },
    //     (error) => {

    //       if (error.status === 400) {
    //         this.global.showNotification("Error", "", "Something went wrong");
    //       } else if (error.status === 500) {
    //         this.global.showNotification("Error", "", "Server error");
    //       } else {
    //         this.global.showNotification("Error", "", "Something went wrong");
    //       }
    //     }
    //   );
  }
}

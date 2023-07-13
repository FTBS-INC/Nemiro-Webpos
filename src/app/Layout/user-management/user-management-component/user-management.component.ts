import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  // ErrorHandler,
  GlobalService,
  // LoaderService,
  
} from "src/app/shared/services";
import { validationService } from "src/app/shared/services/validation.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  modalRef: BsModalRef;
  // usersList: any = [];
  btnForUpdate: any = true;
  loading: any = false;
  btnDisable: any = false;
  userIDForUpdate: any;
  tempArray: any = [];
  objUpdate: any;
  formForAdd: any = false;
  formForEdit: any = false;

  formDropDowns = {
    roles: [],
    fileName: "",
    imageSrc: "",
  };

  users = [
    // {
    //   "userID": 10086,
    //   "userName": "d@role.com",
    //   "branchID": 1022,
    //   "org": {
    //     "branchID": 1022,
    //     "branchCode": "testing86",
    //     "branchName": "testing86",
    //     "branchManager": "General Manager",
    //     "branchDescp": "testing86",
    //     "shelvesList": null,
    //     "noOfShelves": 1,
    //     "branchAddress": "lahore, Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "postalCode": "54000",
    //     "phoneNo": null,
    //     "empID": 3056,
    //     "emp": null,
    //     "openingTime": "2022-08-30T08:00:00.39",
    //     "closingTime": "2022-08-31T06:00:00.937",
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createDate": "2022-08-30T12:17:53.753",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": {
    //       "desigID": 1,
    //       "orgID": 0,
    //       "org": null,
    //       "title": null,
    //       "descp": null,
    //       "reportsToDesig": 0,
    //       "reportsToDescp": null,
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createdBy": 0,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updatedBy": 0,
    //       "updateDate": "0001-01-01T00:00:00"
    //     },
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3099,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3099,
    //     "orgID": 1022,
    //     "org": {
    //       "branchID": 1022,
    //       "branchCode": "testing86",
    //       "branchName": "testing86",
    //       "branchManager": "General Manager",
    //       "branchDescp": "testing86",
    //       "shelvesList": null,
    //       "noOfShelves": 1,
    //       "branchAddress": "lahore, Pakistan",
    //       "city": "Lahore",
    //       "state": "Punjab",
    //       "postalCode": "54000",
    //       "phoneNo": null,
    //       "empID": 3056,
    //       "emp": null,
    //       "openingTime": "2022-08-30T08:00:00.39",
    //       "closingTime": "2022-08-31T06:00:00.937",
    //       "isActive": true,
    //       "isDeleted": false,
    //       "createDate": "2022-08-30T12:17:53.753",
    //       "updateDate": "0001-01-01T00:00:00",
    //       "desg": {
    //         "desigID": 1,
    //         "orgID": 0,
    //         "org": null,
    //         "title": null,
    //         "descp": null,
    //         "reportsToDesig": 0,
    //         "reportsToDescp": null,
    //         "isActive": false,
    //         "isDeleted": false,
    //         "createdBy": 0,
    //         "createDate": "0001-01-01T00:00:00",
    //         "updatedBy": 0,
    //         "updateDate": "0001-01-01T00:00:00"
    //       },
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "SR",
    //     "lastName": "Role",
    //     "desigID": 1,
    //     "workPhone": "93125290972",
    //     "phoneExt": "",
    //     "mobilePhone": "93125290972",
    //     "professionalEmail": "d@role.com",
    //     "personalEmail": "sr@role.com",
    //     "faxNo": "",
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54000",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2022-08-31T06:16:29.037",
    //     "updatedBy": 0,
    //     "updateDate": "2023-04-29T09:12:56.19",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "SR Role",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "1049",
    //   "roleNames": "Super",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 0,
    //   "lastAttemptAt": "0001-01-01T00:00:00",
    //   "pwdExpiryDays": 0,
    //   "isActive": false,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-31T06:16:29.063",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    
    // {
    //   "userID": 10064,
    //   "userName": "mutyyabhassankhan6884@gmail.com",
    //   "branchID": 1,
    //   "org": {
    //     "branchID": 0,
    //     "branchCode": null,
    //     "branchName": null,
    //     "branchManager": null,
    //     "branchDescp": null,
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": null,
    //     "city": null,
    //     "state": null,
    //     "postalCode": null,
    //     "phoneNo": null,
    //     "empID": 0,
    //     "emp": null,
    //     "openingTime": "0001-01-01T00:00:00",
    //     "closingTime": "0001-01-01T00:00:00",
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createDate": "0001-01-01T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": null,
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3076,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3076,
    //     "orgID": 1,
    //     "org": {
    //       "branchID": 0,
    //       "branchCode": null,
    //       "branchName": null,
    //       "branchManager": null,
    //       "branchDescp": null,
    //       "shelvesList": null,
    //       "noOfShelves": 0,
    //       "branchAddress": null,
    //       "city": null,
    //       "state": null,
    //       "postalCode": null,
    //       "phoneNo": null,
    //       "empID": 0,
    //       "emp": null,
    //       "openingTime": "0001-01-01T00:00:00",
    //       "closingTime": "0001-01-01T00:00:00",
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updateDate": "0001-01-01T00:00:00",
    //       "desg": null,
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "Tabish",
    //     "lastName": "Hashmi",
    //     "desigID": 2,
    //     "workPhone": "03044441091",
    //     "phoneExt": "",
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "mutyyabhassankhan6884@gmail.com",
    //     "personalEmail": "mutyyabhassankhanqwerty@gmail.com",
    //     "faxNo": "",
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2022-08-17T05:48:10.707",
    //     "updatedBy": 0,
    //     "updateDate": "2022-08-18T10:56:03.73",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "Tabish Hashmi",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "1039",
    //   "roleNames": "Product1234",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 0,
    //   "lastAttemptAt": "2022-08-17T12:20:29.537",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-17T05:48:10.73",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 10062,
    //   "userName": "mutyyabhassankhan12345as@gmail.com",
    //   "branchID": 12,
    //   "org": {
    //     "branchID": 12,
    //     "branchCode": "Br112",
    //     "branchName": "Branch12",
    //     "branchManager": "General Manager",
    //     "branchDescp": "string",
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": "string",
    //     "city": "string",
    //     "state": "string",
    //     "postalCode": "string",
    //     "phoneNo": "string",
    //     "empID": 1,
    //     "emp": null,
    //     "openingTime": "2022-06-21T13:59:03.137",
    //     "closingTime": "2022-06-21T23:59:03.137",
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createDate": "2022-06-21T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": {
    //       "desigID": 1,
    //       "orgID": 0,
    //       "org": null,
    //       "title": null,
    //       "descp": null,
    //       "reportsToDesig": 0,
    //       "reportsToDescp": null,
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createdBy": 0,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updatedBy": 0,
    //       "updateDate": "0001-01-01T00:00:00"
    //     },
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3074,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3074,
    //     "orgID": 12,
    //     "org": {
    //       "branchID": 12,
    //       "branchCode": "Br112",
    //       "branchName": "Branch12",
    //       "branchManager": "General Manager",
    //       "branchDescp": "string",
    //       "shelvesList": null,
    //       "noOfShelves": 0,
    //       "branchAddress": "string",
    //       "city": "string",
    //       "state": "string",
    //       "postalCode": "string",
    //       "phoneNo": "string",
    //       "empID": 1,
    //       "emp": null,
    //       "openingTime": "2022-06-21T13:59:03.137",
    //       "closingTime": "2022-06-21T23:59:03.137",
    //       "isActive": true,
    //       "isDeleted": false,
    //       "createDate": "2022-06-21T00:00:00",
    //       "updateDate": "0001-01-01T00:00:00",
    //       "desg": {
    //         "desigID": 1,
    //         "orgID": 0,
    //         "org": null,
    //         "title": null,
    //         "descp": null,
    //         "reportsToDesig": 0,
    //         "reportsToDescp": null,
    //         "isActive": false,
    //         "isDeleted": false,
    //         "createdBy": 0,
    //         "createDate": "0001-01-01T00:00:00",
    //         "updatedBy": 0,
    //         "updateDate": "0001-01-01T00:00:00"
    //       },
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "John",
    //     "lastName": "Walker",
    //     "desigID": 1,
    //     "workPhone": "03044441091",
    //     "phoneExt": "",
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "mutyyabhassankhan12345as@gmail.com",
    //     "personalEmail": "mutyyabhassankhan@gmail.com",
    //     "faxNo": "",
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2022-08-15T11:42:36.223",
    //     "updatedBy": 0,
    //     "updateDate": "2022-08-18T13:10:10.363",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "John Walker",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "1044",
    //   "roleNames": "Project Manager",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 0,
    //   "lastAttemptAt": "2022-08-17T12:20:29.537",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-15T11:42:36.24",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 10051,
    //   "userName": "mutyyabhassankhan786@gmail.com",
    //   "branchID": 16,
    //   "org": {
    //     "branchID": 0,
    //     "branchCode": null,
    //     "branchName": null,
    //     "branchManager": null,
    //     "branchDescp": null,
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": null,
    //     "city": null,
    //     "state": null,
    //     "postalCode": null,
    //     "phoneNo": null,
    //     "empID": 0,
    //     "emp": null,
    //     "openingTime": "0001-01-01T00:00:00",
    //     "closingTime": "0001-01-01T00:00:00",
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createDate": "0001-01-01T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": null,
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3063,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3063,
    //     "orgID": 16,
    //     "org": {
    //       "branchID": 0,
    //       "branchCode": null,
    //       "branchName": null,
    //       "branchManager": null,
    //       "branchDescp": null,
    //       "shelvesList": null,
    //       "noOfShelves": 0,
    //       "branchAddress": null,
    //       "city": null,
    //       "state": null,
    //       "postalCode": null,
    //       "phoneNo": null,
    //       "empID": 0,
    //       "emp": null,
    //       "openingTime": "0001-01-01T00:00:00",
    //       "closingTime": "0001-01-01T00:00:00",
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updateDate": "0001-01-01T00:00:00",
    //       "desg": null,
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "Kareem",
    //     "lastName": "Ghazi",
    //     "desigID": 3,
    //     "workPhone": "03044441091",
    //     "phoneExt": "",
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "mutyyabhassankhan786@gmail.com",
    //     "personalEmail": "mutyyabhassankhan@gmail.com",
    //     "faxNo": "",
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2022-08-15T06:49:01.367",
    //     "updatedBy": 0,
    //     "updateDate": "0001-01-01T00:00:00",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "Kareem Ghazi",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "3",
    //   "roleNames": "Manager",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 5,
    //   "lastAttemptAt": "2022-08-17T12:20:29.537",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-15T06:49:01.39",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 10048,
    //   "userName": "mutyyabhassankhan1234@gmail.com",
    //   "branchID": 15,
    //   "org": {
    //     "branchID": 0,
    //     "branchCode": null,
    //     "branchName": null,
    //     "branchManager": null,
    //     "branchDescp": null,
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": null,
    //     "city": null,
    //     "state": null,
    //     "postalCode": null,
    //     "phoneNo": null,
    //     "empID": 0,
    //     "emp": null,
    //     "openingTime": "0001-01-01T00:00:00",
    //     "closingTime": "0001-01-01T00:00:00",
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createDate": "0001-01-01T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": null,
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3060,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3060,
    //     "orgID": 15,
    //     "org": {
    //       "branchID": 0,
    //       "branchCode": null,
    //       "branchName": null,
    //       "branchManager": null,
    //       "branchDescp": null,
    //       "shelvesList": null,
    //       "noOfShelves": 0,
    //       "branchAddress": null,
    //       "city": null,
    //       "state": null,
    //       "postalCode": null,
    //       "phoneNo": null,
    //       "empID": 0,
    //       "emp": null,
    //       "openingTime": "0001-01-01T00:00:00",
    //       "closingTime": "0001-01-01T00:00:00",
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updateDate": "0001-01-01T00:00:00",
    //       "desg": null,
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "Mehran",
    //     "lastName": "Khan",
    //     "desigID": 2,
    //     "workPhone": "03044441091",
    //     "phoneExt": "",
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "mutyyabhassankhan1234@gmail.com",
    //     "personalEmail": "mutyyabhassankhan@gmail.com",
    //     "faxNo": "",
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2022-08-15T06:06:48.143",
    //     "updatedBy": 0,
    //     "updateDate": "0001-01-01T00:00:00",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "Mehran Khan",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "3",
    //   "roleNames": "Manager",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 5,
    //   "lastAttemptAt": "2022-08-17T12:20:29.537",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-15T06:06:48.2",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 10036,
    //   "userName": "ab123qw4@cmail.com",
    //   "branchID": 14,
    //   "org": {
    //     "branchID": 0,
    //     "branchCode": null,
    //     "branchName": null,
    //     "branchManager": null,
    //     "branchDescp": null,
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": null,
    //     "city": null,
    //     "state": null,
    //     "postalCode": null,
    //     "phoneNo": null,
    //     "empID": 0,
    //     "emp": null,
    //     "openingTime": "0001-01-01T00:00:00",
    //     "closingTime": "0001-01-01T00:00:00",
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createDate": "0001-01-01T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": null,
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3048,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3048,
    //     "orgID": 14,
    //     "org": {
    //       "branchID": 0,
    //       "branchCode": null,
    //       "branchName": null,
    //       "branchManager": null,
    //       "branchDescp": null,
    //       "shelvesList": null,
    //       "noOfShelves": 0,
    //       "branchAddress": null,
    //       "city": null,
    //       "state": null,
    //       "postalCode": null,
    //       "phoneNo": null,
    //       "empID": 0,
    //       "emp": null,
    //       "openingTime": "0001-01-01T00:00:00",
    //       "closingTime": "0001-01-01T00:00:00",
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updateDate": "0001-01-01T00:00:00",
    //       "desg": null,
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "ali",
    //     "lastName": "khan",
    //     "desigID": 2,
    //     "workPhone": "03044441091",
    //     "phoneExt": "",
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "ab123qw4@cmail.com",
    //     "personalEmail": "mutyyabhassankhan@gmail.com",
    //     "faxNo": "",
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2022-08-11T10:44:14",
    //     "updatedBy": 0,
    //     "updateDate": "0001-01-01T00:00:00",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "ali khan",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "4",
    //   "roleNames": "Pharmacist",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 5,
    //   "lastAttemptAt": "2022-08-17T12:20:29.537",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-11T10:44:14.017",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 10023,
    //   "userName": "string@google.com",
    //   "branchID": 13,
    //   "org": {
    //     "branchID": 13,
    //     "branchCode": "Br113",
    //     "branchName": "Branch13",
    //     "branchManager": "General Manager",
    //     "branchDescp": "string",
    //     "shelvesList": null,
    //     "noOfShelves": 2,
    //     "branchAddress": "string",
    //     "city": "string",
    //     "state": "string",
    //     "postalCode": "string",
    //     "phoneNo": null,
    //     "empID": 3,
    //     "emp": null,
    //     "openingTime": "2022-06-21T13:59:03.137",
    //     "closingTime": "2022-06-21T23:59:03.137",
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createDate": "2022-06-21T00:00:00",
    //     "updateDate": "2022-08-18T10:45:59.507",
    //     "desg": {
    //       "desigID": 1,
    //       "orgID": 0,
    //       "org": null,
    //       "title": null,
    //       "descp": null,
    //       "reportsToDesig": 0,
    //       "reportsToDescp": null,
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createdBy": 0,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updatedBy": 0,
    //       "updateDate": "0001-01-01T00:00:00"
    //     },
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3,
    //     "orgID": 13,
    //     "org": {
    //       "branchID": 13,
    //       "branchCode": "Br113",
    //       "branchName": "Branch13",
    //       "branchManager": "General Manager",
    //       "branchDescp": "string",
    //       "shelvesList": null,
    //       "noOfShelves": 2,
    //       "branchAddress": "string",
    //       "city": "string",
    //       "state": "string",
    //       "postalCode": "string",
    //       "phoneNo": null,
    //       "empID": 3,
    //       "emp": null,
    //       "openingTime": "2022-06-21T13:59:03.137",
    //       "closingTime": "2022-06-21T23:59:03.137",
    //       "isActive": true,
    //       "isDeleted": false,
    //       "createDate": "2022-06-21T00:00:00",
    //       "updateDate": "2022-08-18T10:45:59.507",
    //       "desg": {
    //         "desigID": 1,
    //         "orgID": 0,
    //         "org": null,
    //         "title": null,
    //         "descp": null,
    //         "reportsToDesig": 0,
    //         "reportsToDescp": null,
    //         "isActive": false,
    //         "isDeleted": false,
    //         "createdBy": 0,
    //         "createDate": "0001-01-01T00:00:00",
    //         "updatedBy": 0,
    //         "updateDate": "0001-01-01T00:00:00"
    //       },
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "Mathew",
    //     "lastName": "Hoggard",
    //     "desigID": 1,
    //     "workPhone": "8775566308",
    //     "phoneExt": null,
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "string@google.com",
    //     "personalEmail": "mutyyabhassankhan@gmail.com",
    //     "faxNo": null,
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2020-09-03T11:11:39.293",
    //     "updatedBy": 0,
    //     "updateDate": "2022-08-15T06:57:09.873",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "Mathew Hoggard",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "3",
    //   "roleNames": "Manager",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 5,
    //   "lastAttemptAt": "2022-08-17T12:20:29.537",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-05T10:01:35.387",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 10022,
    //   "userName": "xyz@treats.com",
    //   "branchID": 1018,
    //   "org": {
    //     "branchID": 1018,
    //     "branchCode": "testb69",
    //     "branchName": "testbranch",
    //     "branchManager": "General Manager",
    //     "branchDescp": "tttesstttt",
    //     "shelvesList": null,
    //     "noOfShelves": 5,
    //     "branchAddress": "lahore, Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab`",
    //     "postalCode": "54000",
    //     "phoneNo": "",
    //     "empID": 3050,
    //     "emp": null,
    //     "openingTime": "2022-08-18T04:12:00.527",
    //     "closingTime": "2022-08-18T08:00:00.453",
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createDate": "2022-08-18T06:46:47.72",
    //     "updateDate": "2022-08-19T10:22:11.773",
    //     "desg": {
    //       "desigID": 1,
    //       "orgID": 0,
    //       "org": null,
    //       "title": null,
    //       "descp": null,
    //       "reportsToDesig": 0,
    //       "reportsToDescp": null,
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createdBy": 0,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updatedBy": 0,
    //       "updateDate": "0001-01-01T00:00:00"
    //     },
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 1,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 1,
    //     "orgID": 1018,
    //     "org": {
    //       "branchID": 1018,
    //       "branchCode": "testb69",
    //       "branchName": "testbranch",
    //       "branchManager": "General Manager",
    //       "branchDescp": "tttesstttt",
    //       "shelvesList": null,
    //       "noOfShelves": 5,
    //       "branchAddress": "lahore, Pakistan",
    //       "city": "Lahore",
    //       "state": "Punjab`",
    //       "postalCode": "54000",
    //       "phoneNo": "",
    //       "empID": 3050,
    //       "emp": null,
    //       "openingTime": "2022-08-18T04:12:00.527",
    //       "closingTime": "2022-08-18T08:00:00.453",
    //       "isActive": true,
    //       "isDeleted": false,
    //       "createDate": "2022-08-18T06:46:47.72",
    //       "updateDate": "2022-08-19T10:22:11.773",
    //       "desg": {
    //         "desigID": 1,
    //         "orgID": 0,
    //         "org": null,
    //         "title": null,
    //         "descp": null,
    //         "reportsToDesig": 0,
    //         "reportsToDescp": null,
    //         "isActive": false,
    //         "isDeleted": false,
    //         "createdBy": 0,
    //         "createDate": "0001-01-01T00:00:00",
    //         "updatedBy": 0,
    //         "updateDate": "0001-01-01T00:00:00"
    //       },
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "desigID": 1,
    //     "workPhone": "1235469870",
    //     "phoneExt": null,
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "xyz@treats.com",
    //     "personalEmail": "mutyyabhassankhan123@gmail.com",
    //     "faxNo": null,
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2020-08-10T18:56:43.193",
    //     "updatedBy": 0,
    //     "updateDate": "2022-08-27T08:20:37.14",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "John Doe",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "1",
    //   "roleNames": "Super User",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 3,
    //   "lastAttemptAt": "2022-08-27T08:22:44.893",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 0,
    //   "createDate": "2022-08-05T09:54:52.31",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 3,
    //   "userName": "citdev.main@gmail.com",
    //   "branchID": 1,
    //   "org": {
    //     "branchID": 0,
    //     "branchCode": null,
    //     "branchName": null,
    //     "branchManager": null,
    //     "branchDescp": null,
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": null,
    //     "city": null,
    //     "state": null,
    //     "postalCode": null,
    //     "phoneNo": null,
    //     "empID": 0,
    //     "emp": null,
    //     "openingTime": "0001-01-01T00:00:00",
    //     "closingTime": "0001-01-01T00:00:00",
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createDate": "0001-01-01T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": null,
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 3,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 3,
    //     "orgID": 13,
    //     "org": {
    //       "branchID": 13,
    //       "branchCode": "Br113",
    //       "branchName": "Branch13",
    //       "branchManager": "General Manager",
    //       "branchDescp": "string",
    //       "shelvesList": null,
    //       "noOfShelves": 2,
    //       "branchAddress": "string",
    //       "city": "string",
    //       "state": "string",
    //       "postalCode": "string",
    //       "phoneNo": null,
    //       "empID": 3,
    //       "emp": null,
    //       "openingTime": "2022-06-21T13:59:03.137",
    //       "closingTime": "2022-06-21T23:59:03.137",
    //       "isActive": true,
    //       "isDeleted": false,
    //       "createDate": "2022-06-21T00:00:00",
    //       "updateDate": "2022-08-18T10:45:59.507",
    //       "desg": {
    //         "desigID": 1,
    //         "orgID": 0,
    //         "org": null,
    //         "title": null,
    //         "descp": null,
    //         "reportsToDesig": 0,
    //         "reportsToDescp": null,
    //         "isActive": false,
    //         "isDeleted": false,
    //         "createdBy": 0,
    //         "createDate": "0001-01-01T00:00:00",
    //         "updatedBy": 0,
    //         "updateDate": "0001-01-01T00:00:00"
    //       },
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "Mathew",
    //     "lastName": "Hoggard",
    //     "desigID": 1,
    //     "workPhone": "8775566308",
    //     "phoneExt": null,
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "string@google.com",
    //     "personalEmail": "mutyyabhassankhan@gmail.com",
    //     "faxNo": null,
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2020-09-03T11:11:39.293",
    //     "updatedBy": 0,
    //     "updateDate": "2022-08-15T06:57:09.873",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "Mathew Hoggard",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "3",
    //   "roleNames": "Manager",
    //   "logo": null,
    //   "userType": 1,
    //   "adnlFeatures": null,
    //   "loginAttempts": 5,
    //   "lastAttemptAt": "2022-08-17T12:20:29.537",
    //   "pwdExpiryDays": 500,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 1,
    //   "createDate": "2020-09-03T11:12:14.433",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 2,
    //   "userName": "citdev.recruiter@gmail.com",
    //   "branchID": 1,
    //   "org": {
    //     "branchID": 0,
    //     "branchCode": null,
    //     "branchName": null,
    //     "branchManager": null,
    //     "branchDescp": null,
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": null,
    //     "city": null,
    //     "state": null,
    //     "postalCode": null,
    //     "phoneNo": null,
    //     "empID": 0,
    //     "emp": null,
    //     "openingTime": "0001-01-01T00:00:00",
    //     "closingTime": "0001-01-01T00:00:00",
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createDate": "0001-01-01T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": null,
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 2,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 2,
    //     "orgID": 1,
    //     "org": {
    //       "branchID": 0,
    //       "branchCode": null,
    //       "branchName": null,
    //       "branchManager": null,
    //       "branchDescp": null,
    //       "shelvesList": null,
    //       "noOfShelves": 0,
    //       "branchAddress": null,
    //       "city": null,
    //       "state": null,
    //       "postalCode": null,
    //       "phoneNo": null,
    //       "empID": 0,
    //       "emp": null,
    //       "openingTime": "0001-01-01T00:00:00",
    //       "closingTime": "0001-01-01T00:00:00",
    //       "isActive": false,
    //       "isDeleted": false,
    //       "createDate": "0001-01-01T00:00:00",
    //       "updateDate": "0001-01-01T00:00:00",
    //       "desg": null,
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "Abdullah",
    //     "lastName": "Waqar",
    //     "desigID": 1,
    //     "workPhone": "8775566308",
    //     "phoneExt": null,
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "citdev.recruiter@gmail.com",
    //     "personalEmail": "mutyyabhassankhan@gmail.com",
    //     "faxNo": null,
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2020-09-03T11:07:25.05",
    //     "updatedBy": 0,
    //     "updateDate": "2022-08-25T15:41:56.563",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "Abdullah Waqar",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "2",
    //   "roleNames": "Admin",
    //   "logo": null,
    //   "userType": 1,
    //   "adnlFeatures": null,
    //   "loginAttempts": 26,
    //   "lastAttemptAt": "2022-08-27T09:35:28.29",
    //   "pwdExpiryDays": 500,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 1,
    //   "createDate": "2020-09-03T11:09:26.053",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // },
    // {
    //   "userID": 1,
    //   "userName": "admin@treats.com",
    //   "branchID": 1,
    //   "org": {
    //     "branchID": 0,
    //     "branchCode": null,
    //     "branchName": null,
    //     "branchManager": null,
    //     "branchDescp": null,
    //     "shelvesList": null,
    //     "noOfShelves": 0,
    //     "branchAddress": null,
    //     "city": null,
    //     "state": null,
    //     "postalCode": null,
    //     "phoneNo": null,
    //     "empID": 0,
    //     "emp": null,
    //     "openingTime": "0001-01-01T00:00:00",
    //     "closingTime": "0001-01-01T00:00:00",
    //     "isActive": false,
    //     "isDeleted": false,
    //     "createDate": "0001-01-01T00:00:00",
    //     "updateDate": "0001-01-01T00:00:00",
    //     "desg": null,
    //     "shelfID": 0,
    //     "shelfName": null
    //   },
    //   "password": null,
    //   "empID": 1,
    //   "employee": {
    //     "userID": 0,
    //     "empID": 1,
    //     "orgID": 1018,
    //     "org": {
    //       "branchID": 1018,
    //       "branchCode": "testb69",
    //       "branchName": "testbranch",
    //       "branchManager": "General Manager",
    //       "branchDescp": "tttesstttt",
    //       "shelvesList": null,
    //       "noOfShelves": 5,
    //       "branchAddress": "lahore, Pakistan",
    //       "city": "Lahore",
    //       "state": "Punjab`",
    //       "postalCode": "54000",
    //       "phoneNo": "",
    //       "empID": 3050,
    //       "emp": null,
    //       "openingTime": "2022-08-18T04:12:00.527",
    //       "closingTime": "2022-08-18T08:00:00.453",
    //       "isActive": true,
    //       "isDeleted": false,
    //       "createDate": "2022-08-18T06:46:47.72",
    //       "updateDate": "2022-08-19T10:22:11.773",
    //       "desg": {
    //         "desigID": 1,
    //         "orgID": 0,
    //         "org": null,
    //         "title": null,
    //         "descp": null,
    //         "reportsToDesig": 0,
    //         "reportsToDescp": null,
    //         "isActive": false,
    //         "isDeleted": false,
    //         "createdBy": 0,
    //         "createDate": "0001-01-01T00:00:00",
    //         "updatedBy": 0,
    //         "updateDate": "0001-01-01T00:00:00"
    //       },
    //       "shelfID": 0,
    //       "shelfName": null
    //     },
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "desigID": 1,
    //     "workPhone": "1235469870",
    //     "phoneExt": null,
    //     "mobilePhone": "03044441091",
    //     "professionalEmail": "xyz@treats.com",
    //     "personalEmail": "mutyyabhassankhan123@gmail.com",
    //     "faxNo": null,
    //     "cellNo": null,
    //     "imagePath": null,
    //     "country": "Pakistan",
    //     "city": "Lahore",
    //     "state": "Punjab",
    //     "zip": "54770",
    //     "address1": null,
    //     "address2": null,
    //     "isActive": true,
    //     "isDeleted": false,
    //     "createdBy": 0,
    //     "createDate": "2020-08-10T18:56:43.193",
    //     "updatedBy": 0,
    //     "updateDate": "2022-08-27T08:20:37.14",
    //     "entryLog": null,
    //     "manager": null
    //   },
    //   "empName": "John Doe",
    //   "desigID": 0,
    //   "roleID": 0,
    //   "roleIDs": "1",
    //   "roleNames": "Super User",
    //   "logo": null,
    //   "userType": 0,
    //   "adnlFeatures": null,
    //   "loginAttempts": 81,
    //   "lastAttemptAt": "2023-04-29T12:06:11.65",
    //   "pwdExpiryDays": 0,
    //   "isActive": true,
    //   "isDeleted": false,
    //   "accessLevel": null,
    //   "roles": null,
    //   "entryLog": null,
    //   "loginHistory": null,
    //   "pwdHistory": null,
    //   "createdBy": 1,
    //   "createDate": "2020-08-10T18:57:28.593",
    //   "updatedBy": 0,
    //   "updateDate": "0001-01-01T00:00:00"
    // }
  ];
  // date: any = new Date();
  selectedObj: any;
  fieldTextType: boolean;
  APILoader: string;
  constructor(
    protected global: GlobalService,
    private modalService: BsModalService,
    // private service: RequestServices,
    private formBuilder: FormBuilder,
    private validator: validationService // private ErrorService: ErrorHandler, // private loader: LoaderService
  ) {}

  UI = {
    loaderText: "",
    searchString: "",
    userTempString: "",
    userTempStringForTiles: "",
    tileClick: false,
  };
  // Active inactive user tiles

  _user_variables = {
    // _tilesList: [
    //   { name: "Total Users", value: 0 },
    //   { name: "Inactive Users", value: 0 },
    //   { name: "Active Users", value: 0 },
    // ],
    _userID: null,
    _step: 1,
    _btn_previous: false,
    _buttonState: "",
    _buttonDisabled: false,
  };
  
  type: "";
  userRegisterFormStep1: FormGroup;
  userRegisterFormStep2: FormGroup;
  // userRegisterFormStep3: FormGroup;

  initializeForm() {
    this.userRegisterFormStep1 = this.formBuilder.group({
      userID: [-1, Validators.nullValidator],
      // userName: ["", Validators.required],
      // userID: [-1, Validators.required],
      roleIDs: [null, Validators.required],
      // roleID: ["", Validators.required],
      // role: this.formBuilder.group({
      //   roleID: [null, Validators.required],
      // }),
      // branch: this.formBuilder.group({
      //   branchID: [null, Validators.required],
      // }),
      // branchID: [null, Validators.required],

      //branchID: [branch.branchID],
      isActive: [true, Validators.nullValidator],
      userName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/
          ),
        ]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
          Validators.minLength(8),
        ]),
      ],
    });

    this.userRegisterFormStep2 = this.formBuilder.group({
      //employeeID: [-1, Validators.nullValidator],
      // employeeID: [-1, Validators.nullValidator],
      // designationID: [-1, Validators.required],
      // firstName: ["", Validators.compose([Validators.required])],
      // lastName: ["", Validators.compose([Validators.nullValidator])],
      // phoneExt: ["", Validators.compose([Validators.nullValidator])],
      // designation: this.formBuilder.group({
      //   //designationID: [-1, Validators.required],
      //   desigID: [0, Validators.required],
      // }),
      // desigID: [null, Validators.required],
      // city: [null, Validators.compose([Validators.nullValidator])],
      // country: [null, Validators.compose([Validators.nullValidator])],
      // state: [null, Validators.compose([Validators.nullValidator])],
      // address1: ["", Validators.required],
      // zip: [
      //   "",
      //   Validators.compose([
      //     Validators.nullValidator,
      //     Validators.pattern("^[0-9]{5}(?:-[0-9]{4})?$"),
      //   ]),],
      // workPhone: ["", Validators.compose([Validators.required])],
      // homePhone: ["", Validators.compose([Validators.required])],
      // faxNo: ["", Validators.compose([Validators.nullValidator])],
      // homePhone: ["", Validators.nullValidator],
      // mobilePhone: ["", Validators.required],
      // professionalEmail: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      //   ]),
      // ],
      // personalEmail: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      //   ]),
      // ],
      // imageURL: ["", Validators.nullValidator],
      // isActive: [true, Validators.nullValidator],
    });

    // let country = UtilitiesServices.
  }
  // initRoleObj() {
  //   return this.formBuilder.group({
  //     roleID: [-1, Validators.required]
  // });
  // }
  ngOnInit(): void {
    this.initializeForm();
    this.getRoles();
    // this.getOrganizations();
    // this.getDesignations();
    this.getUsers();
    // this.getBranches();
    // this.formDropDowns.countries = this.global.getCountries();
  }

  // loggedInUser() {
  //   if (
  //     localStorage.getItem("userID") !== null ||
  //     localStorage.getItem("userID") !== undefined
  //   ) {
  //     var _logged_user_id = localStorage.getItem("userID");
  //     return parseInt(_logged_user_id);
  //   }
  // }

  
  // onelementchange(event: Event) {
  //   if (event.target['name'] === 'country') {
  //     if (event.target['value'] === 'null') {
  //       this.userRegisterFormStep2.controls.country.setValue(null);
  //       this.userRegisterFormStep2.controls.state.setValue(null);
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //     } else {
  //       this.userRegisterFormStep2.controls.state.setValue(null);
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //       this.UI.States = UtilitiesServices.GetStates(parseInt(event.target['value']));
  //     }
  //   } else if (event.target['name'] === 'state') {
  //     if (event.target['value'] === 'null') {
  //       this.userRegisterFormStep2.controls.state.setValue(null);
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //     } else {
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //       this.UI.Cities = UtilitiesServices.GetCities(parseInt(event.target['value']));
  //     }
  //   } else if (event.target['name'] === 'city') {
  //     if (event.target['value'] === 'null') {
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //     }
  //   }

  //
  // }
  // onelementchange(event: Event) {
  //   if (event.target['name'] === 'country') {
  //     if (event.target['value'] === 'null') {
  //       this.userRegisterFormStep2.controls.country.setValue(null);
  //       this.userRegisterFormStep2.controls.state.setValue(null);
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //       this.UI.States = [];
  //       this.UI.Cities = [];
  //     } else {
  //       this.userRegisterFormStep2.controls.state.setValue(null);
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //       this.UI.States = UtilitiesServices.GetStates(parseInt(event.target['value']));
  //     }
  //   } else if (event.target['name'] === 'state') {
  //     if (event.target['value'] === 'null') {
  //       this.userRegisterFormStep2.controls.state.setValue(null);
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //       this.UI.Cities = [];
  //     } else {
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //       this.UI.Cities = UtilitiesServices.GetCities(parseInt(event.target['value']));
  //     }
  //   } else if (event.target['name'] === 'city') {
  //     if (event.target['value'] === 'null') {
  //       this.userRegisterFormStep2.controls.city.setValue(null);
  //     }
  //   }
  //
  //
  // }
  
  insertAndShift(arr, from, to) {
    let cutOut = arr.splice(from, 1)[0];
    arr.splice(to, 0, cutOut);
  }
  getUsers() {
    let oId = 1;
    let uType = 1;
    // this.UI.loaderText = "Loading Users...";

    // this.service.getRequest(`User/GetAllUsers`).subscribe(
    //   (response) => {
    //     if (response !== null) {
    //       this.users = response;
    //       this.users.map((it) => {
    //         it.searchString =
    //           //it.employee.firstName + " " + it.employee.lastName;
    //           it.empName;

    //         if (it.createDate !== undefined) {
    //           it.createDate = this.global.utcDateToLocal(it.createDate);
    //         }
    //         // if (it.entryLog !== undefined) {
    //         //   it.entryLog.convertedDate = this.global.utcDateToLocal(
    //         //     it.entryLog.dateCreated
    //         //   );
    //         // }
    //         if (it.userID !== this.loggedInUser()) {
    //           it.isSameUser = false;
    //         } else {
    //           it.isSameUser = true;
    //         }
    //       });
    //       this.users.map((it, index) => {
    //         if (it.isSameUser === true) {
    //           this.insertAndShift(this.users, index, 0);
    //         }
    //       });
    //       this.UI.userTempString = JSON.stringify(this.users);
    //       this.UI.userTempStringForTiles = this.UI.userTempString;
    //       this.userStats();
    //       if (this.users.length === 0) {
    //         this.UI.loaderText = "No record added yet";
    //       }
    //     } else if (response.statusCode === "Usr-103") {
    //       this.UI.loaderText = response.data;
    //       this.global.showNotification("Success", "", response.data);
    //     }
    //   },
    //   (error) => {
    //     // this.UI.loaderText = "Something went wrong";
    //     // this.global.showNotification("Error", "", "Something went wrong");
    //   }
    // );
  }
  openModal(modal) {
    modal.show();
    this.initializeForm();
  }
  closeUserModel(modal) {
    this.initializeForm();
    // this.APILoader = "";
    modal.hide();
    this._user_variables._step = 1;
  }
  ClickPrevious() {
    this._user_variables._step--;
  }
  ClickNext() {
    this._user_variables._step++;
    this._user_variables._btn_previous = true;
    this.userRegisterFormStep2.controls.professionalEmail.setValue(
      this.userRegisterFormStep1.controls.userName.value
    );
  }
  editModal(modal, item) {
    item.password = this.userRegisterFormStep1.controls.password.value;
    item.password = "*******1@Ab";
    this.userRegisterFormStep1.controls.password.clearValidators();
    this.userRegisterFormStep1.get("password").setErrors(null);
    this.userRegisterFormStep1.updateValueAndValidity();
    this.userRegisterFormStep1.controls.password.setValidators(
      Validators.compose([
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\[\]"\';:_\-<>\., =\+\/\\]).{8,}$/
        ),
      ])
    );
    this.userRegisterFormStep1.patchValue(item);
    item.employee.country =
      item.employee.country === "" ||
      item.employee.country === null ||
      item.employee.country === undefined
        ? null
        : item.employee.country;
    item.employee.state =
      item.employee.state === "" ||
      item.employee.state === null ||
      item.employee.state === undefined
        ? null
        : item.employee.state;
    item.employee.city =
      item.employee.city === "" ||
      item.employee.city === null ||
      item.employee.city === undefined
        ? null
        : item.employee.city;
    let emp = item.employee;
    emp.isActive = item.isActive;
    this.userRegisterFormStep2.patchValue(emp);
    modal.show();
  }

  addEmployee(obj, modal) {
    // let objforadd = {
    //   // createDate: this.date.toJSON(),
    // };
    // this._user_variables._buttonState = "show-spinner";
    // this._user_variables._buttonDisabled = true;
    // this.service.postRequest(`Employee/AddEmployee`, obj).subscribe(
    //   (response) => {
    //     // this.loader.display(false);
    //     if (response.statusCode === "200") {
    //       //this.getUsers();
    //       this.closeUserModel(modal);
    //       this.global.showNotification(
    //         "Success",
    //         "",
    //         "Employee added successfully."
    //       );
    //     } else if (response.statusCode === "Emp-102") {
    //       this.global.showNotification("Error", " ", "Email already exist");
    //       this.APILoader = "Email already exist";
    //     } else {
    //       this.global.showNotification("Error", " ", "Something went wrong");
    //       this.APILoader = "Something went wrong";
    //     }
    //     this._user_variables._buttonDisabled = false;
    //   },
    //   (error) => {
    //     this.global.showNotification("Error", " ", "Something went wrong");
    //     this.APILoader = "Something went wrong";
    //     // this.loader.display(false);
    //     this._user_variables._buttonDisabled = false;
    //   }
    // );
  }

  updateEmployee(obj, modal) {
    // let objforadd = {
    //   //  createDate: this.date.toJSON()
    // };
    // this._user_variables._buttonState = "show-spinner";
    // this._user_variables._buttonDisabled = true;
    // this.service.postRequest(`Employee/UpdateEmployee`, obj).subscribe(
    //   (response) => {
    //     // this.loader.display(false);
    //     if (response.statusCode === "200") {
    //       //this.getUsers();

    //       this.closeUserModel(modal);

    //       this.global.showNotification(
    //         "Success",
    //         " ",
    //         "Employee updated successfully."
    //       );
    //     } else if (response.statusCode === "Emp-102") {
    //       this.global.showNotification("Error", " ", "Email already exist");
    //       this.APILoader = "Email already exist";
    //     } else {
    //       this.global.showNotification("Error", " ", "Something went wrong");
    //       this.APILoader = "Something went wrong";
    //     }
    //     // this._user_variables._buttonState = '';
    //     this._user_variables._buttonDisabled = false;
    //   },
    //   (error) => {
    //     // this.loader.display(false);
    //     this.global.showNotification("Error", " ", "Something went wrong");
    //     this.APILoader = "Something went wrong";
    //     // this._user_variables._buttonState = '';
    //     this._user_variables._buttonDisabled = false;
    //   }
    // );
  }

  addUser(obj, modal) {
    try {
      debugger;
      let objforadd = {
        // createDate: this.date.toJSON(),
      };
      this._user_variables._buttonState = "show-spinner";
      this._user_variables._buttonDisabled = true;
      // this.service.postRequest(`User/AddUser`, obj).subscribe(
      //   (response) => {
      //     // this.loader.display(false);
      //     if (response[0].UserID !== null) {
      //       this.closeUserModel(modal);
      //       this.global.showNotification(
      //         "Success",
      //         "",
      //         "User added successfully."
      //       );
      //       this.getUsers();
      //     } else if (response.StatusCode === "Emp-102") {
      //       this.global.showNotification("Error", " ", "Email already exist");
      //       this.APILoader = "Email already exist";
      //     } else {
      //       this.global.showNotification("Error", " ", "Something went wrong");
      //       this.APILoader = "Something went wrong";
      //     }
      //     this._user_variables._buttonDisabled = false;
      //     this.getUsers();
      //   },
      //   (error) => {
      //     this.global.showNotification("Error", " ", "Something went wrong");
      //     this.APILoader = "Something went wrong";
      //     // this.loader.display(false);
      //     this._user_variables._buttonDisabled = false;
      //   }
      // );
    } catch (error) {
      console.log(error);
    }
    this.getUsers();
  }
  updateUser(obj, modal) {
    this._user_variables._buttonState = "show-spinner";
    this._user_variables._buttonDisabled = true;
    // this.service.postRequest(`User/UpdateUser`, obj).subscribe(
    //   (response) => {
    //     // this.loader.display(false);
    //     if (response[0].Status === 1) {
    //       this.getUsers();

    //       this.closeUserModel(modal);

    //       this.global.showNotification(
    //         "Success",
    //         " ",
    //         "User updated successfully."
    //       );
    //     } else if (response.StatusCode === "Emp-102") {
    //       this.global.showNotification("Error", " ", "Email already exist");
    //       this.APILoader = "Email already exist";
    //     } else {
    //       this.global.showNotification("Error", " ", "Something went wrong");
    //       this.APILoader = "Something went wrong";
    //     }
    //     // this._user_variables._buttonState = '';
    //     this._user_variables._buttonDisabled = false;
    //   },
    //   (error) => {
    //     // this.loader.display(false);
    //     this.global.showNotification("Error", " ", "Something went wrong");
    //     this.APILoader = "Something went wrong";
    //     // this._user_variables._buttonState = '';
    //     this._user_variables._buttonDisabled = false;
    //   }
    // );
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }  
  getRoles() {
    let oId = 1;
    // this.service.getRequest(`Role/GetAllRoles?PageNo=-1`).subscribe(
    //   (response) => {
    //     this.formDropDowns.roles = response.data;
    //     // this.getDesignations();
    //   },

    //   (error) => {}
    // );
  }


  callFileUpload(val) {
    let fileUpload = document.getElementById(val);
    fileUpload.click();
  }
  imageConvert(evt) {
    let fileList: FileList = evt.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      // this.sellersPermitFile = file;
      this.handleInputChange(file);
    }
  }
  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    if (files.size > 50000) {
      alert("Image size can not exceed 50KB.");
      return;
    }
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    this.formDropDowns.fileName = files.name;

    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    var base64result = "";
    let reader = e.target;
    base64result = reader.result.substr(reader.result.indexOf(",") + 1);
    this.formDropDowns.imageSrc = base64result;
    this.formDropDowns.imageSrc = "data:image/jpeg;base64," + base64result;
  }
  // userStats() {
  //   this._user_variables._tilesList[0].value = 0;
  //   this._user_variables._tilesList[1].value = 0;
  //   this._user_variables._tilesList[2].value = 0;
  //   if (this.users.length > 0) {
  //     this._user_variables._tilesList[0].value = this.users.length;
  //     this.users.map((it) => {
  //       !it.isActive
  //         ? this._user_variables._tilesList[1].value++
  //         : this._user_variables._tilesList[2].value++;
  //     });
  //   }
  // }
  showList(obj) {
    this.UI.searchString = "";
    this.UI.tileClick = true;
    var arr = JSON.parse(this.UI.userTempString);
    switch (obj.name) {
      case "Inactive Users":
        this.users = arr.filter((it) => it.isActive === false);
        this.UI.userTempStringForTiles = JSON.stringify(this.users);
        break;
      case "Active Users":
        this.users = arr.filter((it) => it.isActive === true);
        this.UI.userTempStringForTiles = JSON.stringify(this.users);
        break;
      case "Total Users":
        this.users = JSON.parse(this.UI.userTempString);
        this.UI.userTempStringForTiles = JSON.stringify(this.users);
        break;
    }
    if (this.users.length === 0) {
      this.UI.loaderText = "No Record Found";
    }
  }

  searchUser() {
    if (this.UI.tileClick) {
      var arr = JSON.parse(this.UI.userTempStringForTiles);
      this.users = arr.filter((it) =>
        it.searchString
          .toLocaleLowerCase()
          .includes(this.UI.searchString.toLowerCase())
      );
    } else {
      var arr = JSON.parse(this.UI.userTempString);
      this.users = arr.filter((it) =>
        it.searchString
          .toLocaleLowerCase()
          .includes(this.UI.searchString.toLowerCase())
      );
    }
    if (this.users.length === 0) {
      this.UI.loaderText = "No Record Found";
    }
  }

  deleteUser(obj) {
    try {
      // this.users.splice(obj);
      // this.service
      //   .postRequest(`User/DeleteUser?UserID=${obj.userID}`, null)
      //   .subscribe(
      //     (response) => {
      //       if (response[0].Status === 1) {
              
      //         this.getUsers();
      //       } else {
      //         this.global.showNotification("Error", "", 'User Deleted Successfully');
      //         this.APILoader = response.data;
      //       }
      //     },
      //     (error) => {}
      //   );

      // 
      
    } catch (error) {

      this.global.showNotification("Error", "", 'Error Occured');
      console.log("Error at DeleteUser", error);
    }
    this.getUsers();
  }
  changeRole() {
    if (this.userRegisterFormStep1["controls"].roleIDs.value === "null") {
      this.userRegisterFormStep1["controls"].roleIDs.setValue(null);
    }
  }
  changeDesignation() {
    if (this.userRegisterFormStep2["controls"].desigID.value === "null") {
      this.userRegisterFormStep2["controls"].desigID.setValue(null);
    }
  }

  deleteAlert(object: any) {
    // try {
    //   swal
    //     .fire({
    //       title: "Warning",
    //       text: "Are you sure you want to delete Role?",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#d33",
    //       cancelButtonColor: "#3085d6",
    //       cancelButtonText: "CANCEL",
    //       confirmButtonText: "DELETE",
    //       allowOutsideClick: false,
    //     })
    //     .then((result) => {
    //       if (result.value) {
    //         this.deletePrd(object);
    //       }
    //     });
    // } catch (error) {
    //   console.log("Exception at deleteAdvertisement: ", error);
    // }
  }

  submitForm(modal) {
    // this.loader.display(true);
    this.userRegisterFormStep2.controls.isActive.setValue(
      this.userRegisterFormStep1.controls.isActive.value
    );

    var form = this.validator.formChecker(this.userRegisterFormStep1.controls);
    let form1 = this.validator.formChecker(this.userRegisterFormStep2.controls);
    // createDate: this.date.toJSON();
    // form1["designation"] = {
    //   desigID: parseInt(form1["designationID"]),
    // };
    form["employee"] = form1;

    // form["role"] = {
    //   roleID: parseInt(form["roleID"]),
    // };

    // if (form["employeeID"] > -1) {
    //   this.updateEmployee(form["employee"], modal);
    // } else {
    //   this.addEmployee(form["employee"], modal);
    // }

    if (form["userID"] > -1) {
      this.updateUser(form, modal);
    } else {
      this.addUser(form, modal);
    }
    this.closeUserModel(modal);
  }
  // async openModalForUpdate(iD: any, template: TemplateRef<any>) {
  //   try {
  //     this.btnForUpdate = true;
  //     let objForUpdate = this.usersList.filter((it) => it.roleID === iD);
  //     this.objUpdate = objForUpdate[0];
  //     this.formForEdit = true;
  //     this.formForAdd = false;
  //     this.userIDForUpdate = objForUpdate[0].roleID;
  //     // await this.getFeaturesAssignedToRole(this.userIDForUpdate);
  //     // console.log("response at openmodalforupdate: ", this.featureList);
  //     this.addRolesForm.controls.roleName.setValue(objForUpdate[0].name);
  //     this.addRolesForm.controls.roleDescription.setValue(
  //       objForUpdate[0].descp
  //     );
  //     this.addRolesForm.controls.roleRemarks.setValue(objForUpdate[0].remarks);
  //     this.addRolesForm.controls.roleIsActive.setValue(
  //       objForUpdate[0].isActive
  //     );
   
  //     this.modalRef = this.modalService.show(template, this.config);
  //   } catch (error) {
  //     console.log("Exception at openModalForUpdate: ", error);
  //   }
  // }
  
  changeBranch() {
    if (this.userRegisterFormStep1["controls"].branchID.value === "null") {
      this.userRegisterFormStep1["controls"].branchID.setValue(null);
    }
  }
}

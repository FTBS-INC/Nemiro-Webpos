export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to?: string;
  name?: string;
  subs?: IMenuItem[];
  bool: boolean;
}

const data: IMenuItem[] = [
  {
    icon: "iconsminds-user",
    label: "User Management",
    name: "User Management",
    to: "/user-management",
    bool: false,

    subs: [
      {
        icon: "iconsminds-administrator",
        label: "User Profiles",
        to: "/user-management/user-management",
        name: "Users",
        bool: false,
      },
      {
        icon: "iconsminds-conference",
        label: "Roles & Permission",
        name: "Roles",
        to: "/user-management/roles",
        bool: false,
      },
      // {
      //   icon: "iconsminds-profile",
      //   label: "Designation",
      //   to: "/user-management/designation",
      //   name: "Designation",
      //   bool: false,
      // },
    ],
  },
  {
    icon: "iconsminds-conference",
    label: "Compliance",
    name: "Compliance",
    to: "/compliance",
    bool: false,

    subs: [
      {
        icon: "iconsminds-conference",
        label: "KYC Review",
        name: "Kyc Review",
        to: "/compliance/kyc-review",
        bool: false,
      },
    ]
  },

  {
    icon: "iconsminds-check",
    label: "Inquiries",
    name: "Inquiries",
    to: "/inquiries",
    bool: false,
    
    subs: [
      {
        icon: "iconsminds-conference",
        label: "Transaction Inquiries",
        name: "Transaction Inquiries",
        to: "/inquiries/transaction-inquiries",
        bool: false,
      },
      {
        icon: "iconsminds-conference",
        label: "User Inquiries",
        name: "User Inquiries",
        to: "/inquiries/user-inquiries",
        bool: false,
      },
    ]

  },
  // {
  //   icon: "iconsminds-check",
  //   label: "Product Management",
  //   name: "Product Management",
  //   to: "/product-management",
  //   bool: false,

  //   subs: [
  //     {
  //       icon: "iconsminds-tag",
  //       label: "Product",
  //       name: "Product",
  //       to: "/product-management/product",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-tag",
  //       label: "Product Category",
  //       name: "Product Category",
  //       to: "/product-management/product-category",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-shop",
  //       label: "Product Groups",
  //       name: "Product Groups",
  //       to: "/product-management/product-groups",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-pause",
  //       label: "Line Item",
  //       name: "Line Item",
  //       to: "/product-management/product-line",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-shop-4",
  //       label: "Generics",
  //       name: "Generics",
  //       to: "/product-management/generics",
  //       bool: true,
  //     },
  //     {
  //       icon: "iconsminds-shop-4",
  //       label: "Distributors",
  //       name: "Distributors",
  //       to: "/product-management/distributers",
  //       bool: true,
  //     },
  //     {
  //       icon: "iconsminds-medicine-3",
  //       label: "Control Drugs",
  //       name: "Control Drugs",
  //       to: "/product-management/control-drugs",
  //       bool: true,
  //     },
  //     {
  //       icon: "iconsminds-shop-4",
  //       label: "Manufacturer",
  //       name: "Manufacturer",
  //       to: "/product-management/manufacturer",
  //       bool: true,
  //     },
  //   ],
  // },

  // {
  //   icon: "iconsminds-box-with-folders",
  //   label: "Batch",
  //   name: "Batch",
  //   to: "/batch",
  //   bool: false,
  // },

  // {
  //   icon: "iconsminds-shop-2",
  //   label: "Branch Management",
  //   name: "Branch Management",
  //   to: "/branch-management",
  //   bool: false,

  //   subs: [
  //     {
  //       icon: "iconsminds-shop-4",
  //       label: "Branches",
  //       name: "Branches",
  //       to: "/branch-management/branches",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-shop-4",
  //       label: "Shelves",
  //       name: "Shelves",
  //       to: "/branch-management/shelves",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-shop-4",
  //       label: "Racks",
  //       name: "Racks",
  //       to: "/branch-management/racks",
  //       bool: false,
  //     },
     
  //   ],
  // },
  // {
  //   icon: "iconsminds-first-aid",
  //   label: "Patient-Care",
  //   name: "Patient-Care",
  //   to: "/patient-care",
  //   bool: false,

  //   subs: [
  //     {
  //       icon: "iconsminds-stethoscope",
  //       label: "Consultant",
  //       name: "Consultant",
  //       to: "/patient-care/consultant",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-male",
  //       label: "Patient",
  //       name: "Patient",
  //       to: "/patient-care/patient",
  //       bool: false,
  //     },
  //   ],
  // },

  // {
  //   icon: "iconsminds-monitor-analytics",
  //   label: "Sales-Management",
  //   name: "sales-management",
  //   to: "/sales-management",
  //   bool: false,
  //   subs: [
  //     {
  //       icon: "iconsminds-coins",
  //       label: "Sales",
  //       name: "sales",
  //       to: "/sales-management/sales",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-coins",
  //       label: "Return",
  //       name: "sales",
  //       to: "/sales-management/return",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-coins",
  //       label: "Discount Card",
  //       name: "sales",
  //       to: "/sales-management/discount-card",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-tag",
  //       label: "Labels",
  //       name: "sales",
  //       to: "/sales-management/labels",
  //       bool: false,
  //     },
  //   ],
  // },
  // {
  //   icon: "iconsminds-box-with-folders",
  //   label: "Promotions",
  //   name: "promotions",
  //   to: "/promotions",
  //   bool: false,
  // },
  // {
  //   icon: "iconsminds-receipt-4",
  //   label: "Accounts",
  //   name: "accounts",
  //   to: "/accounts",
  //   bool: false,
  //   subs: [
  //     {
  //       icon: "iconsminds-coins",
  //       label: "Opening Balance",
  //       name: "opening-balance",
  //       to: "/accounts/opening-balance",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-coins",
  //       label: "Closing Balance",
  //       name: "closing-balance",
  //       to: "/accounts/closing-balance",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-coins",
  //       label: "Customer Recieve",
  //       name: "customer-recieve",
  //       to: "/accounts/customer-recieve",
  //       bool: false,
  //     },
  //     {
  //       icon: "iconsminds-coins",
  //       label: "Customer Payment",
  //       name: "customer-payment",
  //       to: "/accounts/customer-payment",
  //       bool: false,
  //     },
  //   ],
  // },
  // {
  //   icon: "iconsminds-box-with-folders",
  //   label: "Customer",
  //   name: "customer",
  //   to: "/customer",
  //   bool: false,
  // },
 
];
export default data;

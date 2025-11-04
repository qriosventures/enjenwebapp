import React, { JSX } from "react";
import {
  Globe,
  User,
  Users,
  ListChecks,
  ImageIcon,
  Palette,
  MapPin,
  Map,
  Clock,
  Package,
  Home,
  Phone,
  Calendar,
  CreditCard,
  Timer,
  ClipboardList,
  Wallet,
  Folder,
  Building2,
  Database,
  Ruler,
  BriefcaseBusiness,
  NotepadText,
  BrickWallIcon,
  Settings,
  Building,
  ShoppingCart,
  FileText,
  Truck,
  ShieldAlert,
  Boxes,
  UserLock,
  IdCard,
  Trash2,
  Car,
  Warehouse,
  MapPinHouse,
} from "lucide-react";

export interface SettingsItem {
  href?: string;
  label: string;
  icon: JSX.Element;
  className?: string;
  tag?: "global" | "regional";
  children?: SettingsItem[];
}

export const settingsItems: SettingsItem[] = [
  {
    label: "Settings",
    icon: <Settings className="w-4 h-4 mr-3 text-blue-600" />,
    children: [
      {
        href: "/settings/countries",
        label: "Country",
        icon: <Globe className="w-4 h-4 mr-3 text-green-600" />,
      },
      {
        href: "/settings/states",
        label: "States",
        icon: <Map className="w-4 h-4 mr-3 text-orange-500" />,
      },
      {       
        href: "/settings/cities",
        label: "City",
        icon: <MapPin className="w-4 h-4 mr-3 text-rose-500" />
      },
      {
        href: "/settings/brands",
        label: "Brands",
        icon: <BriefcaseBusiness className="w-4 h-4 mr-3 text-blue-600" />,
      },
      // {
      //   href: "/settings/categories",
      //   label: "Categories",
      //   icon: <Folder className="w-4 h-4 mr-3 text-orange-500" />,
      // },
      {
        href: "/settings/certification-types",
        label: "Certification Types",
        icon: <ListChecks className="w-4 h-4 mr-3 text-pink-600" />,
      },
      {
        href: "/settings/carriers",
        label: "Carriers",
        icon: <Truck className="w-4 h-4 mr-3 text-blue-600" />,
      },
      {
        href: "/settings/departments",
        label: "Departments",
        icon: <UserLock className="w-4 h-4 mr-3 text-green-600" />,
      },
      {
        href: "/settings/designations",
        label: "Designations",
        icon: <IdCard className="w-4 h-4 mr-3 text-orange-500" />,
      },
      {
        href: "/settings/defect-types",
        label: "Defect Types",
        icon: <ShieldAlert className="w-4 h-4 mr-3 text-red-600" />,
      },
      {
        href: "/settings/document-types",
        label: "Document Types",
        icon: <ListChecks className="w-4 h-4 mr-3 text-pink-600" />,
      },
      {
        href: "/settings/employees",
        label: "Employees",
        icon: <Users className="w-4 h-4 mr-3 text-blue-600" />,
      },
      {
        href: "/settings/item-types",
        label: "Item Types",
        icon: <Package className="w-4 h-4 mr-3 text-orange-500" />,
      },
      {
        href:"/settings/operations",
        label:"Operations",
        icon: <ClipboardList className="w-4 h-4 mr-3 text-pink-600" />
      },
      {
        href: "/settings/payment-terms",
        label: "Payment Terms",
        icon: <Wallet className="w-4 h-4 mr-3 text-green-500" />,
      },
      {
        href: "/settings/scrap-reasons", 
        label: "Scrap Reasons",
         icon: <Trash2 className="w-4 h-4 mr-3 text-orange-500" />,
      },
      {
        href: "/settings/unit-measures",
        label: "Units of Measurement",
        icon: <Ruler className="w-4 h-4 mr-3 text-emerald-500" />,
      },
      {
        href: "/settings/vehicle-makes",
        label: "Vehicle Makes",
        icon: <Car className="w-4 h-4 mr-3 text-rose-500" />,
      },
      {
        label: "Warehouse Settings",
        icon: <Warehouse className="w-4 h-4 mr-3 text-orange-500" />,
        children: [
          {
            href: "/settings/warehouses",
            label: "Warehouses",
            icon: <Building2 className="w-4 h-4 mr-3 text-blue-500" />,
          },
                    {
            href: "/settings/warehouse-zones",
            label: "Warehouse Zones",
            icon: <MapPinHouse className="w-4 h-4 mr-3 text-red-500" />,
          }
        ]
      },
    ],
  },
  // {
  //   label: "User Management",
  //   icon: <Building className="w-4 h-4 mr-3 text-teal-600" />,
  //   children: [
  //     {
  //       href: "/settings/user-management",
  //       label: "User Management",
  //       icon: <User className="w-4 h-4 mr-3 text-teal-600" />,
  //     },
  //     {
  //       href: "/settings/address",
  //       label: "Address",
  //       icon: <Home className="w-4 h-4 mr-3 text-rose-500" />,
  //     },
  //     {
  //       href: "/settings/contacts",
  //       label: "Contacts",
  //       icon: <Phone className="w-4 h-4 mr-3 text-violet-500" />,
  //     },
  //   ],
  // },
  // {
  //   label: "Payments & Shipping",
  //   icon: <ShoppingCart className="w-4 h-4 mr-3 text-emerald-600" />,
  //   children: [
  //     {
  //       href: "/settings/payment-terms",
  //       label: "Payment Terms",
  //       icon: <ClipboardList className="w-4 h-4 mr-3 text-orange-600" />,
  //     },
  //     {
  //       href: "/settings/destination",
  //       label: "Destinations",
  //       icon: <MapPin className="w-4 h-4 mr-3 text-red-600" />,
  //     },
  //   ],
  // },
  // {
  //   label: "Forms",
  //   icon: <FileText className="w-4 h-4 mr-3 text-indigo-600" />,
  //   children: [
  //     {
  //       href: "/settings/forms",
  //       label: "Forms",
  //       icon: <NotepadText className="w-4 h-4 mr-3 text-green-700" />,
  //     },
  //     {
  //       href: "/settings/bill-of-material",
  //       label: "Bill Of Materials",
  //       icon: <BrickWallIcon className="w-4 h-4 mr-3 text-blue-600" />,
  //     },

  //   ],
  // },
];
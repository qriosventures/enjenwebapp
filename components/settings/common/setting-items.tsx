import React, { JSX } from "react";
import {
  Globe,
  Languages,
  DollarSign,
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
        href: "/settings/state",
        label: "State",
        icon: <Map className="w-4 h-4 mr-3 text-green-500" />,
      },
      {
        href: "/settings/language",
        label: "Language",
        icon: <Languages className="w-4 h-4 mr-3 text-purple-600" />,
      },
      {
        href: "/settings/currency",
        label: "Currency",
        icon: <DollarSign className="w-4 h-4 mr-3 text-orange-600" />,
      },
      {
        href: "/settings/unit-measures",
        label: "Units of Measurement",
        icon: <Ruler className="w-4 h-4 mr-3 text-emerald-500" />,
      },
      {
        href: "/settings/brands",
        label: "Brands",
        icon: <Package className="w-4 h-4 mr-3 text-orange-500" />,
      },
      {
        href: "/settings/item-types",
        label: "Item Types",
        icon: <Package className="w-4 h-4 mr-3 text-orange-500" />,
      },
      {
        href: "/settings/payment-terms",
        label: "Payment Terms",
        icon: <Package className="w-4 h-4 mr-3 text-orange-500" />,
      }


    ],
  },
  {
    label: "User Management",
    icon: <Building className="w-4 h-4 mr-3 text-teal-600" />,
    children: [
      {
        href: "/settings/user-management",
        label: "User Management",
        icon: <User className="w-4 h-4 mr-3 text-teal-600" />,
      },
      {
        href: "/settings/address",
        label: "Address",
        icon: <Home className="w-4 h-4 mr-3 text-rose-500" />,
      },
      {
        href: "/settings/contacts",
        label: "Contacts",
        icon: <Phone className="w-4 h-4 mr-3 text-violet-500" />,
      },
    ],
  },
  {
    label: "Payments & Shipping",
    icon: <ShoppingCart className="w-4 h-4 mr-3 text-emerald-600" />,
    children: [
      {
        href: "/settings/payment-terms",
        label: "Payment Terms",
        icon: <ClipboardList className="w-4 h-4 mr-3 text-orange-600" />,
      },
      {
        href: "/settings/destination",
        label: "Destinations",
        icon: <MapPin className="w-4 h-4 mr-3 text-red-600" />,
      },
    ],
  },
  {
    label: "Forms",
    icon: <FileText className="w-4 h-4 mr-3 text-indigo-600" />,
    children: [
      {
        href: "/settings/forms",
        label: "Forms",
        icon: <NotepadText className="w-4 h-4 mr-3 text-green-700" />,
      },
      {
        href: "/settings/bill-of-material",
        label: "Bill Of Materials",
        icon: <BrickWallIcon className="w-4 h-4 mr-3 text-blue-600" />,
      },

    ],
  },
];
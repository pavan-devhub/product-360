import React from 'react';
import {
  Apple, ArrowLeft, ArrowRight, ArrowUpRight, Atom, Award, BadgeCheck, Banknote, Beef, BookOpen,
  Bug, Building2, Calculator, CalendarDays, ChartColumn, ChartPie, Check, ChevronRight, Circle,
  ClipboardList, CloudSun, Cog, Container, Copyright, DraftingCompass, Droplet, Droplets, Egg,
  Factory, FileText, Filter, Fish, Flame, FlaskConical, FlaskRound, FolderTree, Globe, GraduationCap,
  HandCoins, Handshake, HardHat, HeartHandshake, Hourglass, IdCard, IndianRupee, Landmark, Layers,
  LayoutGrid, Leaf, Lightbulb, ListTree, LockKeyhole, MapPin, Megaphone, MessageSquareWarning,
  Microscope, Milk, MonitorSmartphone, Package, PawPrint, Percent, Plane, Presentation, QrCode,
  Radar, Radiation, Recycle, Rocket, Rotate3d, Route, Scale, ScanBarcode, ScanSearch, Search,
  Share2, ShieldAlert, ShieldCheck, ShieldPlus, Ship, ShoppingBasket, ShoppingCart, Shovel,
  Snowflake, Sparkles, SprayCan, Sprout, Stamp, Store, Sun, Tag, Tent, Thermometer, Tractor,
  TrainFront, Trees, TrendingUp, TriangleAlert, Truck, Umbrella, UserPlus, Users, Warehouse,
  Waypoints, Wheat, Zap,
} from 'lucide-react';

// Only the icons the app uses are imported, keeping the bundle small.
// Names match those produced by utils/iconRules.js.
const ICONS = {
  Apple, ArrowLeft, ArrowRight, ArrowUpRight, Atom, Award, BadgeCheck, Banknote, Beef, BookOpen,
  Bug, Building2, Calculator, CalendarDays, ChartColumn, ChartPie, Check, ChevronRight, Circle,
  ClipboardList, CloudSun, Cog, Container, Copyright, DraftingCompass, Droplet, Droplets, Egg,
  Factory, FileText, Filter, Fish, Flame, FlaskConical, FlaskRound, FolderTree, Globe, GraduationCap,
  HandCoins, Handshake, HardHat, HeartHandshake, Hourglass, IdCard, IndianRupee, Landmark, Layers,
  LayoutGrid, Leaf, Lightbulb, ListTree, LockKeyhole, MapPin, Megaphone, MessageSquareWarning,
  Microscope, Milk, MonitorSmartphone, Package, PawPrint, Percent, Plane, Presentation, QrCode,
  Radar, Radiation, Recycle, Rocket, Rotate3d, Route, Scale, ScanBarcode, ScanSearch, Search,
  Share2, ShieldAlert, ShieldCheck, ShieldPlus, Ship, ShoppingBasket, ShoppingCart, Shovel,
  Snowflake, Sparkles, SprayCan, Sprout, Stamp, Store, Sun, Tag, Tent, Thermometer, Tractor,
  TrainFront, Trees, TrendingUp, TriangleAlert, Truck, Umbrella, UserPlus, Users, Warehouse,
  Waypoints, Wheat, Zap,
};

const Icon = ({ name, strokeWidth = 1.9, ...props }) => {
  const Glyph = ICONS[name] || Circle;
  return <Glyph aria-hidden="true" strokeWidth={strokeWidth} {...props} />;
};

export default Icon;

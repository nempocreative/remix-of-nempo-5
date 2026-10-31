import {
  Building2,
  Globe,
  Heart,
  Instagram,
  Lightbulb,
  Mail,
} from "lucide-react";
import {
  NavEventIcon,
  NavTalentIcon,
} from "@/components/navigation-glyphs";

export const mainNavItems = [
  { id: "event-organizer", href: "/event-organizer", label: "Event Organizer", icon: NavEventIcon, color: "#6366F1", bg: "#E0E7FF" },
  { id: "wedding-organizer", href: "/wedding-organizer", label: "Wedding Organizer", icon: Heart, color: "#DB2777", bg: "#FCE7F3" },
  { id: "sosmed-management", href: "/price-list#paket-promosi", label: "Sosmed Management", icon: Instagram, color: "#E11D48", bg: "#FFE4E6" },
  { id: "wedding-invitation", href: "/digital-services#harga-satuan", label: "Wedding Invitation", icon: Mail, color: "#7C3AED", bg: "#F3E8FF" },
  { id: "web-development", href: "/digital-services#platforms", label: "Web Development", icon: Globe, color: "#0EA5E9", bg: "#E0F2FE" },
  { id: "design-creative", href: "/digital-services/marketing", label: "Design Creative", icon: Lightbulb, color: "#D97706", bg: "#FEF3C7" },
  { id: "talent-management", href: "/talent", label: "Talent Management", icon: NavTalentIcon, color: "#8B5CF6", bg: "#EDE9FE" },
  { id: "business-system", href: "/digital-services/super-app", label: "Business System", icon: Building2, color: "#0F766E", bg: "#CCFBF1" },
] as const;

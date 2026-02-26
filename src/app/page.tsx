import Link from "next/link";
import { Shield, Sparkles, Package, Sword, Skull, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const navigationCards = [
  {
    title: "Armour Sets",
    description: "Browse all armour sets with stats, resistances, and set bonuses",
    icon: Shield,
    link: "/armour",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    borderColor: "hover:border-emerald-500/50",
    accentColor: "from-emerald-500/5 to-transparent",
  },
  {
    title: "Decorations",
    description: "Find decorations to enhance your build with powerful skills",
    icon: Sparkles,
    link: "/decorations",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    borderColor: "hover:border-violet-500/50",
    accentColor: "from-violet-500/5 to-transparent",
  },
  {
    title: "Items",
    description: "Complete item database with rarity, prices, and crafting info",
    icon: Package,
    link: "/items",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    borderColor: "hover:border-amber-500/50",
    accentColor: "from-amber-500/5 to-transparent",
  },
  {
    title: "Weapons",
    description: "Explore weapons with damage stats, sharpness, and skills",
    icon: Sword,
    link: "/weapons",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
    borderColor: "hover:border-rose-500/50",
    accentColor: "from-rose-500/5 to-transparent",
  },
  {
    title: "Monsters",
    description: "Monster database with weaknesses, drops, and hunt info",
    icon: Skull,
    link: "/monsters",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
    borderColor: "hover:border-sky-500/50",
    accentColor: "from-sky-500/5 to-transparent",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Monster Hunter Wilds Info
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive guide to armour, weapons, items, decorations, and monsters. Everything you need to master
            the hunt.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {navigationCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link href={card.link} key={card.title} className="group h-full">
                  <Card
                    className={`h-full transition-all duration-300 hover:-translate-y-1 ${card.borderColor} overflow-hidden border-border/50 flex flex-col`}
                  >
                    <CardHeader className={`pt-6 pb-4 bg-linear-to-br ${card.accentColor}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${card.iconBg} ${card.iconColor}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg leading-tight">{card.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-4">
                      <CardDescription className="text-sm leading-relaxed">{card.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="pt-4 pb-5 border-t border-border/50">
                      <div
                        className={`flex items-center justify-center text-sm font-medium w-full ${card.iconColor} group-hover:gap-2 gap-1 transition-all`}
                      >
                        Explore <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

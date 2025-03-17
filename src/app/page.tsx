import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TopBar } from "@/components/topBar";

// Navigation card data
const navigationCards = [
  {
    title: "Armour",
    description: "A list of all the armours in the game",
    icon: "/placeholder.svg?height=40&width=40",
    link: "/armour",
    color: "bg-blue-100 dark:bg-blue-950",
  },
  {
    title: "Armour Sets",
    description: "A list of all the armour sets in the game",
    icon: "/placeholder.svg?height=40&width=40",
    link: "/products",
    color: "bg-green-100 dark:bg-green-950",
  },
  {
    title: "Decorations",
    description: "A list of all the decorations in the game",
    icon: "/placeholder.svg?height=40&width=40",
    link: "/categories",
    color: "bg-purple-100 dark:bg-purple-950",
  },
  {
    title: "Items",
    description: "A list of all the items in the game",
    icon: "/placeholder.svg?height=40&width=40",
    link: "/deals",
    color: "bg-amber-100 dark:bg-amber-950",
  },
  {
    title: "Weapons",
    description: "A list of all the weapons in the game",
    icon: "/placeholder.svg?height=40&width=40",
    link: "/about",
    color: "bg-rose-100 dark:bg-rose-950",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Info on Monster Hunter Wilds Items</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Can look through the items and their stats, and also see the item's rarity and price.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card) => (
              <Link href={card.link} key={card.title} className="block h-full">
                <Card className="h-full transition-all hover:shadow-md hover:translate-y-[-4px]">
                  <CardHeader className={`rounded-t-lg ${card.color}`}>
                    <div className="flex items-center gap-3">
                      <Image
                        src={card.icon || "/placeholder.svg"}
                        alt={card.title}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <CardTitle>{card.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-base">{card.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Explore <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}

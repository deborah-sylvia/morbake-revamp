"use client"

import { useState } from "react"
import { ShoppingCart, Star, Plus, Minus, Search, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  isPopular: boolean
  preparationTime: string
}

interface CartItem extends MenuItem {
  quantity: number
}

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Nasi Goreng Special",
    description: "Fragrant fried rice with chicken, prawns, and vegetables",
    price: 25000,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Nasi_goreng_indonesia.jpg",
    category: "main",
    rating: 4.8,
    isPopular: true,
    preparationTime: "15-20 min",
  },
  {
    id: "2",
    name: "Ayam Bakar Madu",
    description: "Grilled chicken with honey glaze and sambal",
    price: 32000,
    image: "https://asset.kompas.com/crops/yooMS5qQjrRN6wKVe_FBp_jjZGE=/0x0:1000x667/750x500/data/photo/2021/01/22/600a6bbc1001c.jpg",
    category: "main",
    rating: 4.9,
    isPopular: true,
    preparationTime: "20-25 min",
  },
  {
    id: "3",
    name: "Gado-Gado",
    description: "Traditional Indonesian salad with peanut sauce",
    price: 18000,
    image: "https://asset.kompas.com/crops/MrdYDsxogO0J-jptk4cQKaFQEKs=/0x0:1000x667/750x500/data/photo/2021/03/27/605ed24c33816.jpg",
    category: "appetizer",
    rating: 4.6,
    isPopular: false,
    preparationTime: "10-15 min",
  },
  {
    id: "4",
    name: "Es Teh Manis",
    description: "Sweet iced tea - perfect refreshment",
    price: 8000,
    image: "https://asset.kompas.com/crops/FKY3LD8Nv9O6RWYEwFn4_zCIBTE=/0x0:1000x667/750x500/data/photo/2023/03/16/6412e4c2e6a6e.jpg",
    category: "beverage",
    rating: 4.5,
    isPopular: false,
    preparationTime: "5 min",
  },
  {
    id: "5",
    name: "Sate Ayam",
    description: "Grilled chicken skewers with peanut sauce",
    price: 28000,
    image: "https://asset.kompas.com/crops/6IOFcdHsXLhQHM-h7FbUqhQxJ28=/0x0:1000x667/750x500/data/photo/2021/03/27/605ef2bb7b7f3.jpg",
    category: "main",
    rating: 4.7,
    isPopular: true,
    preparationTime: "15-20 min",
  },
  {
    id: "6",
    name: "Es Campur",
    description: "Mixed ice dessert with fruits and jellies",
    price: 15000,
    image: "https://asset.kompas.com/crops/xYg_Ik1qg-zk0wl5HGU0E9iRFTo=/0x0:1000x667/750x500/data/photo/2020/11/05/5fa3c66d1e52f.jpg",
    category: "dessert",
    rating: 4.4,
    isPopular: false,
    preparationTime: "5-10 min",
  },
]

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { toast } = useToast()

  const categories = [
    { id: "all", name: "All Items" },
    { id: "main", name: "Main Course" },
    { id: "appetizer", name: "Appetizers" },
    { id: "beverage", name: "Beverages" },
    { id: "dessert", name: "Desserts" },
  ]

  const filteredItems = mockMenuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Warung Saji</h1>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Jakarta Selatan</span>
                <Clock className="h-4 w-4 ml-3 mr-1" />
                <span>30-45 min</span>
              </div>
            </div>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Order</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                            <div className="flex items-center mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Total:</span>
                          <span className="font-bold text-lg">{formatPrice(getTotalPrice())}</span>
                        </div>
                        <Link href="/checkout" className="w-full">
                          <Button className="w-full" onClick={() => setIsCartOpen(false)}>
                            Proceed to Checkout
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="px-4">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs py-2 px-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Popular Items Banner */}
      {selectedCategory === "all" && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 m-4 rounded-lg">
          <h2 className="text-lg font-bold mb-1">🔥 Popular Items</h2>
          <p className="text-sm opacity-90">Most ordered dishes this week</p>
        </div>
      )}

      {/* Menu Items */}
      <main className="px-4 pb-20">
        <div className="grid grid-cols-1 gap-4 mt-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex items-center">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-l-lg"
                  />
                </div>
                <div className="flex-1 p-4">
                  <CardHeader className="p-0 mb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-semibold leading-tight">
                        {item.name}
                        {item.isPopular && (
                          <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-800">
                            Popular
                          </Badge>
                        )}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{item.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{item.preparationTime}</span>
                    </div>
                  </CardHeader>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold">{formatPrice(item.price)}</span>
                    <Button
                      onClick={() => addToCart(item)}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found matching your search.</p>
          </div>
        )}
      </main>

      {/* Floating Cart Button (Mobile) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full shadow-lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            View Cart ({getTotalItems()}) • {formatPrice(getTotalPrice())}
          </Button>
        </div>
      )}
    </div>
  )
}

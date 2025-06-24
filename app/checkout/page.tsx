"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

// Mock cart data - in real app, this would come from state management
const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Nasi Goreng Special",
    price: 25000,
    quantity: 2,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "Ayam Bakar Madu",
    price: 32000,
    quantity: 1,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery")
  const [paymentMethod, setPaymentMethod] = useState("gopay")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const subtotal = mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = deliveryMethod === "delivery" ? 5000 : 0
  const serviceFee = 2000
  const total = subtotal + deliveryFee + serviceFee

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number",
        variant: "destructive",
      })
      return
    }

    if (deliveryMethod === "delivery" && !customerInfo.address) {
      toast({
        title: "Missing Address",
        description: "Please provide your delivery address",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation shortly",
      })
      router.push("/order-confirmation")
    }, 2000)
  }

  const paymentMethods = [
    { id: "gopay", name: "GoPay", icon: "💚", description: "Digital wallet" },
    { id: "ovo", name: "OVO", icon: "💜", description: "Digital wallet" },
    { id: "dana", name: "DANA", icon: "💙", description: "Digital wallet" },
    { id: "shopeepay", name: "ShopeePay", icon: "🧡", description: "Digital wallet" },
    { id: "bank", name: "Bank Transfer", icon: "🏦", description: "BCA, Mandiri, BNI" },
    { id: "cod", name: "Cash on Delivery", icon: "💵", description: "Pay when delivered" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center px-4 py-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-3">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Delivery Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Delivery Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="flex items-center flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-sm text-gray-600">30-45 minutes • {formatPrice(5000)}</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex items-center flex-1">
                  <Clock className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">Pickup</div>
                    <div className="text-sm text-gray-600">15-20 minutes • Free</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={customerInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            {deliveryMethod === "delivery" && (
              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your complete address"
                  rows={3}
                />
              </div>
            )}
            <div>
              <Label htmlFor="notes">Special Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={customerInfo.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any special requests or notes"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex items-center flex-1">
                    <span className="text-lg mr-3">{method.icon}</span>
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-600">{method.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                </div>
                <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {deliveryMethod === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>{formatPrice(serviceFee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
        >
          {isProcessing ? "Processing..." : `Place Order • ${formatPrice(total)}`}
        </Button>
      </div>
    </div>
  )
}

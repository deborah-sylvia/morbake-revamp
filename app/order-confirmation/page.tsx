"use client"

import { CheckCircle, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function OrderConfirmationPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedTime = "30-45 minutes"

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your order. We're preparing your food now.</p>
        </div>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Order #{orderNumber}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Confirmed
              </Badge>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Estimated delivery: {estimatedTime}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Delivering to your address</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>We'll call you when the driver arrives</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Order confirmed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Preparing your food</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Out for delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-500">Delivered</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" variant="outline">
            Track Order
          </Button>
          <Link href="/" className="block">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Continue Shopping</Button>
          </Link>
        </div>

        {/* Contact Info */}
        <div className="text-center text-sm text-gray-600">
          <p>Need help? Contact us at</p>
          <p className="font-medium">+62 812-3456-7890</p>
        </div>
      </div>
    </div>
  )
}

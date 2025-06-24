import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerInfo, cartItems, deliveryMethod, paymentMethod, subtotal, deliveryFee, serviceFee, total } = body

    // Generate order number
    const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

    // Insert customer if not exists
    let customerId = null
    if (customerInfo.email) {
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id")
        .eq("email", customerInfo.email)
        .single()

      if (existingCustomer) {
        customerId = existingCustomer.id
      } else {
        const { data: newCustomer, error: customerError } = await supabase
          .from("customers")
          .insert({
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: customerInfo.address,
          })
          .select("id")
          .single()

        if (customerError) throw customerError
        customerId = newCustomer.id
      }
    }

    // Calculate estimated delivery time
    const estimatedDeliveryTime = new Date()
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + (deliveryMethod === "delivery" ? 45 : 20))

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email,
        delivery_address: customerInfo.address,
        delivery_method: deliveryMethod,
        payment_method: paymentMethod,
        payment_status: "pending",
        order_status: "confirmed",
        subtotal,
        delivery_fee: deliveryFee,
        service_fee: serviceFee,
        total_amount: total,
        special_notes: customerInfo.notes,
        estimated_delivery_time: estimatedDeliveryTime.toISOString(),
      })
      .select("id")
      .single()

    if (orderError) throw orderError

    // Insert order items
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      menu_item_id: item.id,
      menu_item_name: item.name,
      menu_item_price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) throw itemsError

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order.id,
      estimatedDeliveryTime: estimatedDeliveryTime.toISOString(),
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderNumber = searchParams.get("orderNumber")
    const customerId = searchParams.get("customerId")

    let query = supabase.from("orders").select(`
        *,
        order_items (
          *
        )
      `)

    if (orderNumber) {
      query = query.eq("order_number", orderNumber)
    } else if (customerId) {
      query = query.eq("customer_id", customerId)
    } else {
      return NextResponse.json({ success: false, error: "Order number or customer ID required" }, { status: 400 })
    }

    const { data: orders, error } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      orders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string
  price: number
  image_url: string
  is_available: boolean
  is_popular: boolean
  preparation_time_minutes: number
  rating: number
  rating_count: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id?: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  delivery_address?: string
  delivery_method: "delivery" | "pickup"
  payment_method: string
  payment_status: "pending" | "paid" | "failed" | "refunded"
  order_status: "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled"
  subtotal: number
  delivery_fee: number
  service_fee: number
  total_amount: number
  special_notes?: string
  estimated_delivery_time?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id?: string
  menu_item_name: string
  menu_item_price: number
  quantity: number
  subtotal: number
  special_instructions?: string
  created_at: string
}

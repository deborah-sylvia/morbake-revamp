import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const popular = searchParams.get("popular")

    let query = supabase
      .from("menu_items")
      .select(`
        *,
        categories (
          name,
          description
        )
      `)
      .eq("is_available", true)

    if (category && category !== "all") {
      const { data: categoryData } = await supabase.from("categories").select("id").eq("name", category).single()

      if (categoryData) {
        query = query.eq("category_id", categoryData.id)
      }
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (popular === "true") {
      query = query.eq("is_popular", true)
    }

    const { data: menuItems, error } = await query.order("name")

    if (error) throw error

    return NextResponse.json({
      success: true,
      menuItems,
    })
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch menu items" }, { status: 500 })
  }
}

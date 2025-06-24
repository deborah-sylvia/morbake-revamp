-- Seed data for the food ordering system

-- Insert categories
INSERT INTO categories (name, description, image_url) VALUES
('Main Course', 'Hearty main dishes and rice meals', '/placeholder.svg?height=200&width=300'),
('Appetizers', 'Light starters and snacks', '/placeholder.svg?height=200&width=300'),
('Beverages', 'Refreshing drinks and traditional beverages', '/placeholder.svg?height=200&width=300'),
('Desserts', 'Sweet treats and traditional desserts', '/placeholder.svg?height=200&width=300');

-- Insert menu items
INSERT INTO menu_items (category_id, name, description, price, image_url, is_popular, preparation_time_minutes, rating, rating_count) VALUES
-- Main Course
((SELECT id FROM categories WHERE name = 'Main Course'), 'Nasi Goreng Special', 'Fragrant fried rice with chicken, prawns, and vegetables', 25000, '/placeholder.svg?height=200&width=300', true, 20, 4.8, 156),
((SELECT id FROM categories WHERE name = 'Main Course'), 'Ayam Bakar Madu', 'Grilled chicken with honey glaze and sambal', 32000, '/placeholder.svg?height=200&width=300', true, 25, 4.9, 203),
((SELECT id FROM categories WHERE name = 'Main Course'), 'Sate Ayam', 'Grilled chicken skewers with peanut sauce', 28000, '/placeholder.svg?height=200&width=300', true, 20, 4.7, 189),
((SELECT id FROM categories WHERE name = 'Main Course'), 'Rendang Daging', 'Slow-cooked beef in rich coconut curry', 45000, '/placeholder.svg?height=200&width=300', false, 30, 4.9, 98),
((SELECT id FROM categories WHERE name = 'Main Course'), 'Ikan Bakar', 'Grilled fish with spicy sambal', 35000, '/placeholder.svg?height=200&width=300', false, 25, 4.6, 87),

-- Appetizers
((SELECT id FROM categories WHERE name = 'Appetizers'), 'Gado-Gado', 'Traditional Indonesian salad with peanut sauce', 18000, '/placeholder.svg?height=200&width=300', false, 15, 4.6, 134),
((SELECT id FROM categories WHERE name = 'Appetizers'), 'Kerupuk Udang', 'Crispy prawn crackers', 8000, '/placeholder.svg?height=200&width=300', false, 5, 4.3, 67),
((SELECT id FROM categories WHERE name = 'Appetizers'), 'Tahu Isi', 'Stuffed tofu with vegetables', 12000, '/placeholder.svg?height=200&width=300', false, 10, 4.4, 89),
((SELECT id FROM categories WHERE name = 'Appetizers'), 'Lumpia Semarang', 'Fresh spring rolls with sweet sauce', 15000, '/placeholder.svg?height=200&width=300', false, 12, 4.5, 76),

-- Beverages
((SELECT id FROM categories WHERE name = 'Beverages'), 'Es Teh Manis', 'Sweet iced tea - perfect refreshment', 8000, '/placeholder.svg?height=200&width=300', false, 5, 4.5, 234),
((SELECT id FROM categories WHERE name = 'Beverages'), 'Es Jeruk', 'Fresh orange juice with ice', 12000, '/placeholder.svg?height=200&width=300', false, 5, 4.4, 156),
((SELECT id FROM categories WHERE name = 'Beverages'), 'Kopi Tubruk', 'Traditional Indonesian coffee', 10000, '/placeholder.svg?height=200&width=300', false, 8, 4.6, 123),
((SELECT id FROM categories WHERE name = 'Beverages'), 'Es Kelapa Muda', 'Fresh young coconut water', 15000, '/placeholder.svg?height=200&width=300', false, 5, 4.7, 98),

-- Desserts
((SELECT id FROM categories WHERE name = 'Desserts'), 'Es Campur', 'Mixed ice dessert with fruits and jellies', 15000, '/placeholder.svg?height=200&width=300', false, 10, 4.4, 167),
((SELECT id FROM categories WHERE name = 'Desserts'), 'Klepon', 'Sweet rice balls with palm sugar', 12000, '/placeholder.svg?height=200&width=300', false, 8, 4.5, 89),
((SELECT id FROM categories WHERE name = 'Desserts'), 'Es Cendol', 'Traditional dessert with coconut milk', 13000, '/placeholder.svg?height=200&width=300', false, 8, 4.6, 134),
((SELECT id FROM categories WHERE name = 'Desserts'), 'Pisang Goreng', 'Crispy fried bananas', 10000, '/placeholder.svg?height=200&width=300', false, 10, 4.3, 78);

-- Insert sample customers
INSERT INTO customers (name, email, phone, address) VALUES
('Ahmad Wijaya', 'ahmad.wijaya@email.com', '081234567890', 'Jl. Sudirman No. 123, Jakarta Selatan'),
('Siti Nurhaliza', 'siti.nurhaliza@email.com', '081234567891', 'Jl. Thamrin No. 456, Jakarta Pusat'),
('Budi Santoso', 'budi.santoso@email.com', '081234567892', 'Jl. Gatot Subroto No. 789, Jakarta Selatan');

-- Insert sample orders
INSERT INTO orders (order_number, customer_id, customer_name, customer_phone, customer_email, delivery_address, delivery_method, payment_method, payment_status, order_status, subtotal, delivery_fee, service_fee, total_amount, estimated_delivery_time) VALUES
('ORD-001', (SELECT id FROM customers WHERE name = 'Ahmad Wijaya'), 'Ahmad Wijaya', '081234567890', 'ahmad.wijaya@email.com', 'Jl. Sudirman No. 123, Jakarta Selatan', 'delivery', 'gopay', 'paid', 'delivered', 53000, 5000, 2000, 60000, NOW() - INTERVAL '2 hours'),
('ORD-002', (SELECT id FROM customers WHERE name = 'Siti Nurhaliza'), 'Siti Nurhaliza', '081234567891', 'siti.nurhaliza@email.com', 'Jl. Thamrin No. 456, Jakarta Pusat', 'delivery', 'ovo', 'paid', 'out_for_delivery', 43000, 5000, 2000, 50000, NOW() + INTERVAL '20 minutes'),
('ORD-003', (SELECT id FROM customers WHERE name = 'Budi Santoso'), 'Budi Santoso', '081234567892', 'budi.santoso@email.com', NULL, 'pickup', 'dana', 'paid', 'ready', 28000, 0, 2000, 30000, NOW() + INTERVAL '10 minutes');

-- Insert order items for sample orders
INSERT INTO order_items (order_id, menu_item_id, menu_item_name, menu_item_price, quantity, subtotal) VALUES
-- Order 1 items
((SELECT id FROM orders WHERE order_number = 'ORD-001'), (SELECT id FROM menu_items WHERE name = 'Nasi Goreng Special'), 'Nasi Goreng Special', 25000, 1, 25000),
((SELECT id FROM orders WHERE order_number = 'ORD-001'), (SELECT id FROM menu_items WHERE name = 'Sate Ayam'), 'Sate Ayam', 28000, 1, 28000),

-- Order 2 items
((SELECT id FROM orders WHERE order_number = 'ORD-002'), (SELECT id FROM menu_items WHERE name = 'Ayam Bakar Madu'), 'Ayam Bakar Madu', 32000, 1, 32000),
((SELECT id FROM orders WHERE order_number = 'ORD-002'), (SELECT id FROM menu_items WHERE name = 'Es Teh Manis'), 'Es Teh Manis', 8000, 1, 8000),
((SELECT id FROM orders WHERE order_number = 'ORD-002'), (SELECT id FROM menu_items WHERE name = 'Kerupuk Udang'), 'Kerupuk Udang', 8000, 1, 8000),

-- Order 3 items
((SELECT id FROM orders WHERE order_number = 'ORD-003'), (SELECT id FROM menu_items WHERE name = 'Sate Ayam'), 'Sate Ayam', 28000, 1, 28000);

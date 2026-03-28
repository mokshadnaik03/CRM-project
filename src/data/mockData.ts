export const customers = [
  { id: 1, name: "Alice Smith", email: "alice@example.com", phone: "+1 555-0100", status: "Active", totalSpent: 1250.00, lastOrder: "2023-11-02" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com", phone: "+1 555-0101", status: "Inactive", totalSpent: 340.50, lastOrder: "2023-08-22" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "+1 555-0102", status: "Active", totalSpent: 890.25, lastOrder: "2023-10-20" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", phone: "+1 555-0103", status: "Lead", totalSpent: 0, lastOrder: null },
  { id: 5, name: "Evan Wright", email: "evan@example.com", phone: "+1 555-0104", status: "Active", totalSpent: 2100.00, lastOrder: "2023-10-25" },
];

export const orders = [
  { id: "WC-1001", customerId: 1, customerName: "Alice Smith", date: "2023-10-15", total: 150.00, status: "Delivered", items: 3, category: "Electronics" },
  { id: "WC-1002", customerId: 3, customerName: "Charlie Brown", date: "2023-10-20", total: 89.99, status: "Processing", items: 1, category: "Books" },
  { id: "WC-1003", customerId: 5, customerName: "Evan Wright", date: "2023-10-25", total: 450.00, status: "Shipped", items: 5, category: "Home & Garden" },
  { id: "WC-1004", customerId: 1, customerName: "Alice Smith", date: "2023-10-26", total: 25.50, status: "Pending", items: 1, category: "Accessories" },
  { id: "WC-1005", customerId: 2, customerName: "Bob Johnson", date: "2023-08-22", total: 340.50, status: "Delivered", items: 2, category: "Electronics" },
  { id: "WC-1006", customerId: 1, customerName: "Alice Smith", date: "2023-11-02", total: 1074.50, status: "Delivered", items: 1, category: "Furniture" },
  { id: "WC-1007", customerId: 3, customerName: "Charlie Brown", date: "2023-09-15", total: 800.26, status: "Delivered", items: 2, category: "Electronics" },
  { id: "WC-1008", customerId: 5, customerName: "Evan Wright", date: "2023-09-10", total: 1650.00, status: "Delivered", items: 3, category: "Furniture" },
];

export const communications = [
  { id: 1, customerId: 1, customerName: "Alice Smith", type: "Email", subject: "Welcome to our store!", date: "2023-09-01", status: "Sent" },
  { id: 2, customerId: 4, customerName: "Diana Prince", type: "SMS", subject: "Special Offer", date: "2023-10-24", status: "Delivered" },
  { id: 3, customerId: 3, customerName: "Charlie Brown", type: "Email", subject: "Order WC-1002 Confirmation", date: "2023-10-20", status: "Sent" },
  { id: 4, customerId: 5, customerName: "Evan Wright", type: "Email", subject: "Shipping Update WC-1003", date: "2023-10-26", status: "Pending" },
];

export const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 2000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 1890 },
  { name: "Jun", sales: 2390 },
  { name: "Jul", sales: 3490 },
  { name: "Aug", sales: 4000 },
  { name: "Sep", sales: 3000 },
  { name: "Oct", sales: 2000 },
  { name: "Nov", sales: 2780 },
  { name: "Dec", sales: 1890 },
];

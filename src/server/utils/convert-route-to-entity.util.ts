const mapping: Record<string, string> = {
  orders: 'order',
  organizations: 'organization',
  products: 'product',
  'product-orders': 'product_order',
  users: 'user',
  'user-products': 'user_product',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

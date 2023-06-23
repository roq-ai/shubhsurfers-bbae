import { ProductOrderInterface } from 'interfaces/product-order';
import { UserProductInterface } from 'interfaces/user-product';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  product_order?: ProductOrderInterface[];
  user_product?: UserProductInterface[];
  organization?: OrganizationInterface;
  _count?: {
    product_order?: number;
    user_product?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  organization_id?: string;
}

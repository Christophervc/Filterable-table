
export interface Product {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
  }
  
 export interface FilterableProductTableProps {
    products: Product[];
  }
  
  export interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (text: string) => void;
    onInStockOnlyChange: (checked: boolean) => void;
  }
  
  export interface ProductTableProps {
    products: Product[];
    filterText: string;
    inStockOnly: boolean;
  }
  
  export interface ProductFormProps {
    onAddProduct: (product: Product) => void;
  }
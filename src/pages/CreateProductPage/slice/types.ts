/* --- STATE --- */
export interface CreateProductState {
    name: string;
    description: string;
    imageURI: string;
    price: number;
    brand: string;
    error: boolean;
    isFetching: boolean;
    productCreated: boolean;
  }
  
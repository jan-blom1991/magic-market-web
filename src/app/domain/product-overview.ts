import {FileData} from './file-data';

export interface ProductOverview {
  number: number;
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  file: FileData;
}

export interface CategoryDTO {
  _id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export type ICategory = Partial<CategoryDTO>;

import { TCategory } from "@/app/admin/category/_components/category-table";

export const generateDummyData = (count: number): TCategory[] => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `${i + 1}`,
    icon: `icon-${i + 1}`,
    name: `Category ${i + 1}`,
    description: `Category ${i + 1} Description`,
  }));
};

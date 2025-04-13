import { Metadata } from "next";

import CategoryTable from "@/app/admin/category/_components/category-table";

export const metadata: Metadata = {
  title: "Admin Category Area",
};

export default async function AdminCategoryPage() {
  return (
    <div className="space-y-4">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Category</h1>
        <p className="text-sm font-normal">
          List of all Categories, create new category, and manage existing
          categories.
        </p>
      </section>

      <section>
        <CategoryTable />
      </section>
    </div>
  );
}

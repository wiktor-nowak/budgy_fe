import type { Category } from "@/api/categories";
import AddCategoryForm from "../components/settings/AddCategoryForm";
import CategoriesList from "../components/settings/CategoriesList";
import { useState } from "react";

const Settings = () => {
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  return (
    <div>
      <AddCategoryForm
        categoryToEdit={categoryToEdit}
        setCategoryToEdit={setCategoryToEdit}
      />
      <CategoriesList
        setCategoryToEdit={setCategoryToEdit}
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
};

export default Settings;

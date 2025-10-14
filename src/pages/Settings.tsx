import AddCategoryForm from "../components/settings/AddCategoryForm";
import CategoriesList from "../components/settings/CategoriesList";
import { useState } from "react";

export interface Category {
  name: string;
  shortcut: string;
}

const Settings = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  return (
    <div>
      <AddCategoryForm onAddCategory={handleAddCategory} />
      <CategoriesList categories={categories} />
    </div>
  );
};

export default Settings;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import {
  deleteCategory,
  getCategories,
  getCategory,
  type Category,
} from "@/lib/api/categories";

interface CategoriesListProps {
  categoryToEdit: Category | null;
  setCategoryToEdit: (category: Category) => void;
}

const CategoriesList = ({
  setCategoryToEdit,
  categoryToEdit,
}: CategoriesListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categoryToEdit === null) {
      fetchCategories();
    }
  }, [categoryToEdit]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  const removeCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const category = await getCategory(id);
      setCategoryToEdit(category);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <Button onClick={fetchCategories}>REFRESH</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
            <TableHead className="w-[100px]">Shortcut</TableHead>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.name}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.shortcut}</TableCell>
              <TableCell>{category.id}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(category.id)}
                  >
                    <FilePenLine className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesList;

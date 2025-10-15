import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";

export interface Category {
  name: string;
  shortcut: string;
}

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/categories");

      if (!response.ok) {
        throw new Error("Response not okay!");
      }

      const categoriesReceived = await response.json();
      setCategories(() => {
        return categoriesReceived.response.map(
          (category: { name: string; shortcut: string }) => {
            const { name, shortcut } = category;
            return {
              name,
              shortcut,
            };
          }
        );
      });
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
            <TableHead>Name</TableHead>
            <TableHead>Shortcut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.name}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.shortcut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesList;

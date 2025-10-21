import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { updateCategory, type Category } from "@/api/categories";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  shortcut: z
    .string()
    .regex(/^[A-Z]{1,6}$/, "Shortcut must be 1-6 capital letters"),
  changeShortcut: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

interface AddCategoryFormProps {
  categoryToEdit: Category | null;
  setCategoryToEdit: (category: Category | null) => void;
}

const AddCategoryForm = ({
  categoryToEdit,
  setCategoryToEdit,
}: AddCategoryFormProps) => {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      shortcut: "",
      changeShortcut: false,
    },
  });

  const [isShortcutManuallyChanged, setIsShortcutManuallyChanged] =
    useState(false);

  const name = form.watch("name");

  useEffect(() => {
    if (categoryToEdit) {
      form.setValue("name", categoryToEdit.name);
      form.setValue("shortcut", categoryToEdit.shortcut);
    }
  }, [categoryToEdit, form]);

  useEffect(() => {
    if (!isShortcutManuallyChanged && name) {
      if (name.length > 6) {
        form.setValue("shortcut", name.slice(0, 6).toUpperCase());
      } else {
        form.setValue("shortcut", name.toUpperCase());
      }
    }
  }, [name, isShortcutManuallyChanged, form]);

  const onSubmit = async (data: FormFields) => {
    try {
      const { name, shortcut } = data;
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.id, { name, shortcut });
        setCategoryToEdit(null);
        toast.success("Category updated successfully!");
      } else {
        const response = await fetch("http://localhost:3003/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            shortcut,
          }),
        });

        if (!response.ok) {
          throw new Error("Response not okay!");
        }

        toast.success("Category added successfully!");
      }
      form.reset();
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          {categoryToEdit ? "Update Category" : "Add Category"}
        </CardTitle>
        <CardDescription>
          {categoryToEdit
            ? "Enter the new details of the category"
            : "Enter the details of the new category"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortcut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shortcut</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isShortcutManuallyChanged} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="changeShortcut"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setIsShortcutManuallyChanged(!!checked);
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Change shortcut</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {categoryToEdit ? "Update Category" : "Add Category"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;

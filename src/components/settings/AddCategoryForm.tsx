import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { type Category } from "@/pages/Settings";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  shortcut: z
    .string()
    .regex(/^[A-Z]{1,6}$/, "Shortcut must be 1-6 capital letters"),
  changeShortcut: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

const AddCategoryForm = ({
  onAddCategory,
}: {
  onAddCategory: (category: Category) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      shortcut: "",
      changeShortcut: false,
    },
  });

  const [isShortcutManuallyChanged, setIsShortcutManuallyChanged] =
    useState(false);

  const name = watch("name");

  useEffect(() => {
    if (!isShortcutManuallyChanged && name) {
      if (name.length > 6) {
        setValue("shortcut", name.slice(0, 6).toUpperCase());
      } else {
        setValue("shortcut", name.toUpperCase());
      }
    }
  }, [name, isShortcutManuallyChanged, setValue]);

  const onSubmit = (data: FormFields) => {
    onAddCategory({ name: data.name, shortcut: data.shortcut });
    reset();
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Add Category</CardTitle>
        <CardDescription>Enter the details of the new category</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shortcut">Shortcut</Label>
            <Input
              id="shortcut"
              {...register("shortcut")}
              disabled={!isShortcutManuallyChanged}
            />
            {errors.shortcut && (
              <p className="text-red-500 text-xs">{errors.shortcut.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="changeShortcut"
              {...register("changeShortcut")}
              onCheckedChange={(checked) => {
                setIsShortcutManuallyChanged(!!checked);
              }}
            />
            <label
              htmlFor="changeShortcut"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Change shortcut
            </label>
          </div>
          <Button type="submit" className="w-full">
            Add Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;

const API_CATEGORIES = "http://localhost:3003/api/categories";

export interface Category {
  id: number;
  name: string;
  shortcut: string;
}

export const getCategories = async () => {
  const response = await fetch(API_CATEGORIES);

  if (!response.ok) {
    throw new Error("Response not okay!");
  }

  const categoriesReceived = await response.json();
  return categoriesReceived.response.map(
    (category: { name: string; shortcut: string; id: number }) => {
      const { name, shortcut, id } = category;
      return {
        id,
        name,
        shortcut,
      };
    }
  );
};

export const getCategory = async (id: number) => {
  const response = await fetch(`${API_CATEGORIES}/${id}`);

  if (!response.ok) {
    throw new Error("Response not okay!");
  }

  const categoryReceived = await response.json();
  return categoryReceived.response;
};

export const updateCategory = async (
  id: number,
  data: { name: string; shortcut: string }
) => {
  const response = await fetch(`${API_CATEGORIES}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update data!");
  }
  const responseData = await response.json();
  console.log(responseData);
};

export const deleteCategory = async (id: number) => {
  const response = await fetch(`${API_CATEGORIES}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove data!");
  }
  const data = await response.json();
  console.log(data.message);
};

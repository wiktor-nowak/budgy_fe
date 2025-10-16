const API_CATEGORIES = "http://localhost:3003/api/categories";

export const getCategories = async () => {
  const response = await fetch(API_CATEGORIES);

  if (!response.ok) {
    throw new Error("Response not okay!");
  }

  const categoriesReceived = await response.json();
  return () => {
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

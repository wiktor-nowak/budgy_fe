import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount } from "@/lib/hooks/accounts";

const Account = () => {
  const { id } = useParams<{ id: string }>();
  const { data: account, isLoading, error } = useAccount(id);

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(account);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{account.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h3 className="font-semibold">Type</h3>
          <p>{account.type}</p>
        </div>
        <div>
          <h3 className="font-semibold">Balance</h3>
          <p>{Number(account.balance).toFixed(2)} PLN</p>
        </div>
        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{account.description || "N/A"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Owner</h3>
          <p>{account.owner?.username || "N/A"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Co-owners</h3>
          {account.coOwners && account.coOwners.length > 0 ? (
            <ul>
              {account.coOwners.map(
                (coOwner: { user: { username: string } }) => (
                  <li key={coOwner.user.username}>
                    {coOwner.user.username as string}
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>
        <div>
          <h3 className="font-semibold">Categories</h3>
          {account.categories && account.categories.length > 0 ? (
            <ul>
              {account.categories.map((category: { shortcut: string }) => (
                <li key={category.shortcut}>{category.shortcut as string}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Account;

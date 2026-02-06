// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getAccount, type Account as AccountType } from "@/lib/api/accounts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const Account = () => {
//   const { id } = useParams<{ id: string }>();
//   const [account, setAccount] = useState<AccountType | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAccountDetails = async () => {
//       if (!id) return;
//       try {
//         const data = await getAccount(id);
//         setAccount(data);
//       } catch (err) {
//         setError("Failed to fetch account details.");
//         console.error(err);
//       }
//     };

//     fetchAccountDetails();
//   }, [id]);

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   if (!account) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-2xl">{account.name}</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <div>
//           <h3 className="font-semibold">Type</h3>
//           <p>{account.type}</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Balance</h3>
//           <p>{Number(account.balance).toFixed(2)} PLN</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Description</h3>
//           <p>{account.description || "N/A"}</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Owner</h3>
//           <p>{account.owner?.username || "N/A"}</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Co-owners</h3>
//           {account.coOwners && account.coOwners.length > 0 ? (
//             <ul>
//               {account.coOwners.map((coOwner, index) => (
//                 <li key={index}>{coOwner.user.username}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>None</p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Account;

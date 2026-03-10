import { useEffect, useState } from "react";
import { tryRestoreSession } from "@/lib/services/authService";
import Loading from "./Loading";

export default function AuthBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function restore() {
      await tryRestoreSession();
      setReady(true);
    }

    restore();
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return children;
}

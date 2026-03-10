import { Spinner } from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center self-center">
      <Spinner className="size-20 text-green-600 mx-auto" />
    </div>
  );
}

export default Loading;

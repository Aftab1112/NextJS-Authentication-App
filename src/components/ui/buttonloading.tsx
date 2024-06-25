import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button variant="outline" size="lg" className="px-5" disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Logging In
    </Button>
  );
}

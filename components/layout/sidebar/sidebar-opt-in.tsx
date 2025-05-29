import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { SparklesIcon } from "lucide-react";

export function SidebarOptInForm() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  if (collapsed) {
    return null;
  }

  return (
    <Card className="shadow-none border-none overflow-hidden bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/40">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-5 text-red-500" />
          <CardTitle className="text-sm">Upgrade to Premium</CardTitle>
        </div>
        <CardDescription>
          Get unlimited access to all premium features and advanced
          capabilities.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Button
          className="w-full bg-gradient-to-r from-red-400 to-red-600 text-white shadow-none hover:from-red-500 hover:to-red-700"
          size="sm"
        >
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  );
}

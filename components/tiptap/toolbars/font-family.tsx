import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolbar } from "./toolbar-provider";
import { useMediaQuery } from "@/hooks/use-media-querry";
import { MobileToolbarGroup, MobileToolbarItem } from "./mobile-toolbar-group";

const FONT_FAMILIES = [
  { name: "Default", family: "" },
  { name: "Inter", family: "Inter, sans-serif" },
  { name: "Comic Sans", family: '"Comic Sans MS", "Comic Sans", cursive' },
  { name: "Serif", family: "serif" },
  { name: "Monospace", family: "monospace" },
  { name: "Cursive", family: "cursive" },
  { name: "Exo 2", family: '"Exo 2", sans-serif' },
  { name: "CSS Variable", family: "var(--title-font-family)" },
];

export const FontFamilyToolbar = () => {
  const { editor } = useToolbar();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const currentFont = editor?.getAttributes("textStyle").fontFamily || "";

  const handleSetFont = (family: string) => {
    if (family) {
      editor?.chain().focus().setFontFamily(family).run();
    } else {
      editor?.chain().focus().unsetFontFamily().run();
    }
  };

  if (isMobile) {
    return (
      <MobileToolbarGroup label="Font">
        {FONT_FAMILIES.map(({ name, family }) => (
          <MobileToolbarItem
            key={name}
            onClick={() => handleSetFont(family)}
            active={currentFont === family}
          >
            <span style={{ fontFamily: family }}>{name}</span>
          </MobileToolbarItem>
        ))}
      </MobileToolbarGroup>
    );
  }

  return (
    <Popover>
      <div className="relative h-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-max px-2 font-normal min-w-[90px] flex items-center justify-between",
                  currentFont && "bg-accent",
                )}
                style={{ fontFamily: currentFont }}
              >
                <span className="truncate max-w-[60px]">
                  {FONT_FAMILIES.find((f) => f.family === currentFont)?.name ||
                    "Font"}
                </span>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Font Family</TooltipContent>
        </Tooltip>
        <PopoverContent align="start" className="w-48 p-1 dark:bg-gray-2">
          {FONT_FAMILIES.map(({ name, family }) => (
            <button
              key={name}
              onClick={() => handleSetFont(family)}
              className={cn(
                "flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-gray-3",
                currentFont === family && "bg-accent",
              )}
              type="button"
              style={{ fontFamily: family }}
            >
              <span>{name}</span>
              {currentFont === family && <CheckIcon className="h-4 w-4" />}
            </button>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
};

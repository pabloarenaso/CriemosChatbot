import { Button } from "@/components/ui/button";
import { quickReplyOptions } from "@shared/schema";
import { Package, Truck, MessageCircle } from "lucide-react";

interface QuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const icons = {
  "Ver mochilas": Package,
  "Consultar envíos": Truck,
  "Hablar con asesor": MessageCircle,
} as const;

export function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
  return (
    <div 
      className="flex flex-wrap gap-2 justify-center py-3"
      data-testid="quick-replies-container"
    >
      {quickReplyOptions.map((option) => {
        const Icon = icons[option];
        return (
          <Button
            key={option}
            variant="outline"
            onClick={() => onSelect(option)}
            disabled={disabled}
            className="bg-card border-primary/30 text-primary gap-2 rounded-full px-5 min-h-[44px]"
            data-testid={`button-quick-reply-${option.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <Icon className="w-4 h-4" />
            {option}
          </Button>
        );
      })}
    </div>
  );
}

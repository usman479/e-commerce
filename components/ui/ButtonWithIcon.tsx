import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
  return (
    <Button>
      <ShoppingCart className="mr-2 h-4 w-4" /> Start Shopping
    </Button>
  )
}
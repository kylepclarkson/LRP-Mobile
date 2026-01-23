import { parseBadgePayload, UserBadgePayload } from "@/lib/badges/customerBadge";
import { AandegQRCodeScanner } from "./AandegQRCodeScanner";

export function CustomerBadgeScanner({ onScanned }: {
  onScanned: (payload: UserBadgePayload) => void
}) {
  return (
    <AandegQRCodeScanner
      parse={parseBadgePayload}
      invalidMessage="This QR code is not a valid Aandeg customer badge."
      onValid={onScanned}
    />
  )
}
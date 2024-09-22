import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"

interface AirdropPopupProps {
  airdrop: { name: string; amount: string } | null;
  onClose: () => void;
}

export default function AirdropPopup({ airdrop, onClose }: AirdropPopupProps) {
  if (!airdrop) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Airdrop Found!</DialogTitle>
          <DialogDescription>
            You've discovered an airdrop on the local network.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p><strong>Name:</strong> {airdrop.name}</p>
          <p><strong>Amount:</strong> {airdrop.amount}</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
          <Button variant="default">Claim Airdrop</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
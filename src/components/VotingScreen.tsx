import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Vote, Check } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Party {
  id: string;
  name: string;
  symbol: string;
}

const parties: Party[] = [
  { id: "1", name: "Party A", symbol: "🌟" },
  { id: "2", name: "Party B", symbol: "🌺" },
  { id: "3", name: "Party C", symbol: "🌿" },
  { id: "4", name: "Party D", symbol: "🌸" },
];

const VotingScreen = () => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVoteSubmit = () => {
    if (!selectedParty) {
      toast.error("Please select a party before voting");
      return;
    }
    console.log("Vote cast for party:", selectedParty.name);
    setHasVoted(true);
    toast.success("Your vote has been cast successfully!");
  };

  if (hasVoted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 text-center space-y-4">
          <div className="flex justify-center">
            <Check className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-green-600">Vote Cast Successfully!</h2>
          <p className="text-gray-600">
            Thank you for participating in the democratic process. Your vote has been recorded securely.
          </p>
          <div className="mt-6">
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Exit
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">Cast Your Vote</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parties.map((party) => (
          <Card
            key={party.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedParty?.id === party.id
                ? "border-2 border-primary"
                : "hover:border-gray-300"
            }`}
            onClick={() => setSelectedParty(party)}
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{party.symbol}</div>
              <div>
                <h3 className="font-semibold">{party.name}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="w-full max-w-md"
              disabled={!selectedParty}
            >
              <Vote className="mr-2" />
              Cast Vote
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Your Vote</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to cast your vote for {selectedParty?.name}. This action cannot be undone.
                Are you sure you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleVoteSubmit}>
                Confirm Vote
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VotingScreen;
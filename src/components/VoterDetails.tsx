import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IdCard, User, Home } from "lucide-react";
import { toast } from "sonner";

const VoterDetails = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [name, setName] = useState("");
  const [wardNumber, setWardNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uniqueId || !name || !wardNumber) {
      toast.error("Please fill in all fields");
      return;
    }
    // Here we would typically submit the data to a backend
    console.log("Voter details submitted:", { uniqueId, name, wardNumber });
    toast.success("Voter details submitted successfully!");
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Enter Voter Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="uniqueId" className="flex items-center gap-2">
            <IdCard className="h-4 w-4" />
            Unique ID
          </Label>
          <Input
            id="uniqueId"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="Enter your unique voter ID"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wardNumber" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Ward Number
          </Label>
          <Input
            id="wardNumber"
            value={wardNumber}
            onChange={(e) => setWardNumber(e.target.value)}
            placeholder="Enter your ward number"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Details
        </Button>
      </form>
    </Card>
  );
};

export default VoterDetails;
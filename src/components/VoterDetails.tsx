import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import VotingScreen from "./VotingScreen";

const VoterDetails = () => {
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    uniqueId: "",
    name: "",
    wardNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.uniqueId || !formData.name || !formData.wardNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    console.log("Voter details submitted:", formData);
    setDetailsSubmitted(true);
    toast.success("Details submitted successfully!");
  };

  if (detailsSubmitted) {
    return <VotingScreen />;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="uniqueId">Unique ID</Label>
          <Input
            id="uniqueId"
            value={formData.uniqueId}
            onChange={(e) =>
              setFormData({ ...formData, uniqueId: e.target.value })
            }
            placeholder="Enter your unique ID"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wardNumber">Ward Number</Label>
          <Input
            id="wardNumber"
            value={formData.wardNumber}
            onChange={(e) =>
              setFormData({ ...formData, wardNumber: e.target.value })
            }
            placeholder="Enter your ward number"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Details
        </Button>
      </form>
    </div>
  );
};

export default VoterDetails;
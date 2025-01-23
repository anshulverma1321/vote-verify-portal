import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Camera, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [idVerified, setIdVerified] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      // Simulate ID verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("ID uploaded:", file.name);
      setIdVerified(true);
      setIsProcessing(false);
      toast.success("ID uploaded successfully!");
    }
  };

  const handleFaceCapture = async () => {
    setIsProcessing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera access granted");
      // Simulate face verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      stream.getTracks().forEach(track => track.stop());
      setFaceVerified(true);
      toast.success("Face verification successful!");
    } catch (error) {
      console.error("Camera access error:", error);
      toast.error("Could not access camera. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Voter Verification Dashboard</h1>
          <p className="mt-2 text-gray-600">Complete these steps to verify your voting eligibility</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">ID Verification</h2>
                {idVerified ? (
                  <CheckCircle className="text-green-500 h-6 w-6" />
                ) : (
                  <AlertCircle className="text-yellow-500 h-6 w-6" />
                )}
              </div>
              <p className="text-gray-600 text-sm">Upload a valid government-issued ID</p>
              <div className="mt-4">
                <input
                  type="file"
                  id="id-upload"
                  className="hidden"
                  onChange={handleIdUpload}
                  accept="image/*"
                />
                <Button
                  onClick={() => document.getElementById("id-upload")?.click()}
                  disabled={isProcessing || idVerified}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {idVerified ? "ID Verified" : "Upload ID"}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Face Verification</h2>
                {faceVerified ? (
                  <CheckCircle className="text-green-500 h-6 w-6" />
                ) : (
                  <AlertCircle className="text-yellow-500 h-6 w-6" />
                )}
              </div>
              <p className="text-gray-600 text-sm">Complete a face verification check</p>
              <div className="mt-4">
                <Button
                  onClick={handleFaceCapture}
                  disabled={isProcessing || faceVerified || !idVerified}
                  className="w-full"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {faceVerified ? "Face Verified" : "Start Face Verification"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {idVerified && faceVerified && (
          <div className="mt-8 text-center">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-medium">
                Verification complete! You are now eligible to vote.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TrialStatus = ({ userId }) => {
  const [trialStatus, setTrialStatus] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    fetchTrialStatus();
  }, [userId]);

  const fetchTrialStatus = async () => {
    try {
      const response = await fetch(`/api/trial-status/${userId}`);
      const data = await response.json();
      setTrialStatus(data.isInTrial);
      setDaysRemaining(data.daysRemaining);
    } catch (error) {
      console.error("Error fetching trial status:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle>Trial Status</CardTitle>
      </CardHeader>
      <CardContent>
        {trialStatus ? (
          <div className="text-green-600">
            <p className="font-semibold">Trial Active</p>
            <p>{daysRemaining} days remaining</p>
            <p className="text-sm mt-2">
              Enjoy unlimited access to options data during your trial period!
            </p>
          </div>
        ) : (
          <div className="text-gray-600">
            <p className="font-semibold">Trial Expired</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => (window.location.href = "/subscription")}
            >
              Upgrade to Premium
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrialStatus;

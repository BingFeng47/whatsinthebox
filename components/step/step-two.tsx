import { Lightbulb } from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";

interface StepTwoProps {
  targetFigurine: string;
  handleSetTarget: (targetFigurine: string) => void;
  figurines: string[];
}

function StepTwo({ targetFigurine, handleSetTarget, figurines }: StepTwoProps) {
  return (
    <div className="space-y-6 pt-3">
      <div className="bg-transparent border p-3 rounded-lg ">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-black">
            Select the item you're trying to find. We'll help you determine
            which box it's most likely to be in.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4 ">
        {figurines.map((figurine) => (
          <Badge
            key={figurine}
            variant={targetFigurine === figurine ? "default" : "outline"}
            className="cursor-pointer py-2 justify-center text-md"
            onClick={() => handleSetTarget(figurine)}
          >
            {figurine}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default StepTwo;

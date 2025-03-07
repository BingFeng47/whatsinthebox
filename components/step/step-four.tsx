import { Ban, CheckCircle, Lightbulb, PieChart, Target } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";

interface StepFourProps {
  numBoxes: number;
  figurines: string[];
  targetFigurine: string;
  boxConstraints: Record<number, string[]>;
  knownBoxes: Record<number, string>;
  probabilities: Record<string, number[]>;
}

function StepFour({
  numBoxes,
  figurines,
  targetFigurine,
  boxConstraints,
  knownBoxes,
  probabilities,
}: StepFourProps) {
  return (
    <div className="space-y-6 pt-3">
      <div className="bg-transparent border p-3 rounded-lg ">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-black">
            Based on your constraints, here are the probabilities of each item
            being in each box.
          </p>
        </div>
      </div>

      <Tabs defaultValue={targetFigurine || figurines[0]}>
        <TabsList className="mb-4 flex flex-wrap">
          {figurines.map((figurine) => (
            <TabsTrigger
              key={figurine}
              value={figurine}
              className="flex-shrink-0"
            >
              {figurine}
              {figurine === targetFigurine && (
                <Target className="h-3 w-3 ml-1" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {figurines.map((figurine) => (
          <TabsContent key={figurine} value={figurine}>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Probability for {figurine}
              {figurine === targetFigurine && (
                <Badge variant="default" className="ml-2">
                  Wished
                </Badge>
              )}
            </h3>

            <ScrollArea className=" pr-4">
              <div className="space-y-4">
                {Array.from({ length: numBoxes }, (_, i) => {
                  const box = i + 1;
                  const probability = probabilities[figurine]?.[i] || 0;

                  return (
                    <div key={box} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Box {box}</span>
                        <span className="text-sm font-medium">
                          {probability.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={probability}
                          className="h-2 flex-grow"
                        />
                        {knownBoxes[box] === figurine && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {boxConstraints[box]?.includes(figurine) && (
                          <Ban className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      {knownBoxes[box] && (
                        <p className="text-xs text-muted-foreground">
                          {knownBoxes[box] === figurine
                            ? "Confirmed to be in this box"
                            : `Box contains ${knownBoxes[box]}`}
                        </p>
                      )}
                      {boxConstraints[box]?.includes(figurine) && (
                        <p className="text-xs text-muted-foreground">
                          Known to not be in this box
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default StepFour;

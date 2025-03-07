import { ChevronRight, Target } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

interface stepFiveProps {
  targetFigurine: string;
  focusBoxes: { box: number; prob: number }[];
}

function StepFive({ targetFigurine, focusBoxes }: stepFiveProps) {
  return (
    <div className="space-y-6">
      <div className="bg-primary/10 p-4 rounded-lg mb-4 border border-primary/20">
        <div className="flex items-start gap-2">
          <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Focus Boxes for {targetFigurine}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              These are the boxes most likely to contain your target figurine,
              in order of probability. There might me more than 1 with the same
              probabilies, you can choose randomly with your luck.
            </p>
          </div>
        </div>
      </div>

      {focusBoxes.length > 0 ? (
        <div className="space-y-4">
          {focusBoxes.map((item, index) => (
            <Card
              key={item.box}
              className={index === 0 ? "border-primary" : ""}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-medium">Box {item.box}</h3>
                    {index === 0 && (
                      <Badge variant="outline" className="ml-2">
                        Best Choice
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">
                      {item.prob.toFixed(1)}%
                    </span>
                    <p className="text-xs text-muted-foreground">Probability</p>
                  </div>
                </div>

                <Progress value={item.prob} className="h-2 mt-4" />

                <div className="mt-4 text-sm">
                  {item.prob === 100 ? (
                    <p className="text-green-600 dark:text-green-400">
                      This box definitely contains {targetFigurine}!
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      {item.prob > 50
                        ? `There's a good chance ${targetFigurine} is in this box.`
                        : `${targetFigurine} might be in this box, but it's not certain.`}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
          <p className="text-center text-muted-foreground">
            No possible boxes found for {targetFigurine}. Please check your
            constraints.
          </p>
        </div>
      )}

      <div className="mt-6">
        <Separator className="my-4" />
        <h3 className="font-medium mb-2">What to do next?</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <ChevronRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <span>Open the box with the highest probability first</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <span>
              After checking a box, come back and update the constraints or mark
              the box as known
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <span>
              The probabilities will update automatically to help you find your
              target figurine efficiently
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StepFive;

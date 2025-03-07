import { Box, CheckCircle, Lightbulb } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface StepThreeProps {
  numBoxes: number;
  figurines: string[];
  knownBoxes: Record<number, string>;
  boxConstraints: Record<number, string[]>;
  toggleConstraint: (box: number, figurine: string) => void;
  handleRevealBox: (box: number, figurine: string) => void;
  clearKnownBox: (box: number) => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  numBoxes,
  figurines,
  knownBoxes,
  boxConstraints,
  toggleConstraint,
  handleRevealBox,
  clearKnownBox,
}) => {
  return (
    <div className="space-y-6 pt-3">
      <div className="bg-transparent border p-3 rounded-lg ">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-black">
            For each box, check the items you know are NOT in the box. This
            helps narrow down the possibilities.
          </p>
        </div>
      </div>

      <Tabs defaultValue="1">
        <TabsList className="">
          {Array.from({ length: numBoxes }, (_, i) => (
            <TabsTrigger key={i + 1} value={(i + 1).toString()}>
              Box {i + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {Array.from({ length: numBoxes }, (_, i) => {
          const box = i + 1;
          return (
            <TabsContent
              key={box}
              value={box.toString()}
              className="space-y-4 pt-4"
            >
              <div className="flex items-center gap-2">
                <Box className="h-5 w-5" />
                <h3 className="text-lg font-medium">Box {box}</h3>
              </div>

              {knownBoxes[box] ? (
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>
                      This box contains <strong>{knownBoxes[box]}</strong>
                    </span>
                    <Button
                      variant={"default"}
                      onClick={() => clearKnownBox(box)}
                      className="ml-auto bg-red-500 hover:bg-red-600"
                    >
                      Undo
                    </Button>
                  </p>
                </div>
              ) : (
                <div>
                  <Label>Select the items that are NOT in this box:</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {figurines.map((figurine) => (
                      <div
                        key={figurine}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`box-${box}-${figurine}`}
                          checked={boxConstraints[box]?.includes(figurine)}
                          onCheckedChange={() =>
                            toggleConstraint(box, figurine)
                          }
                        />
                        <Label
                          htmlFor={`box-${box}-${figurine}`}
                          className="cursor-pointer"
                        >
                          {figurine}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!knownBoxes[box] && (
                <div className="mt-4">
                  <Label className="mb-2">
                    Or confirm the item in this box (IF KNOWN):
                  </Label>
                  <Select
                    value={knownBoxes[box] || ""}
                    onValueChange={(value) =>
                      value && handleRevealBox(box, value)
                    }
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select if known" />
                    </SelectTrigger>
                    <SelectContent>
                      {figurines.map((figurine) => (
                        <SelectItem key={figurine} value={figurine}>
                          {figurine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default StepThree;

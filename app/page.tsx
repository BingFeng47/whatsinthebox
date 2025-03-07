"use client";
import HeaderSection from "@/components/section/header";
import StepFive from "@/components/step/step-five";
import StepFour from "@/components/step/step-four";
import StepOne from "@/components/step/step-one";
import StepThree from "@/components/step/step-three";
import StepTwo from "@/components/step/step-two";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [numBoxes, setNumBoxes] = useState<number>(0);
  const [figurineInput, setFigurineInput] = useState<string>("");
  const [figurines, setFigurines] = useState<string[]>([]);
  const [targetFigurine, setTargetFigurine] = useState<string>("");
  const [boxConstraints, setBoxConstraints] = useState<
    Record<number, string[]>
  >({});
  const [knownBoxes, setKnownBoxes] = useState<Record<number, string>>({});

  const clearKnownBox = (box: number) => {
    const updatedKnownBoxes = { ...knownBoxes };
    delete updatedKnownBoxes[box];
    setKnownBoxes(updatedKnownBoxes);
    toast.success(`Box ${box} has been cleared`, {
      description: "The probabilities have been updated",
    });
  };

  // Step 1: Initialize boxes and figurines
  const handleInitialize = () => {
    if (numBoxes <= 0) {
      toast.error("Please enter a positive number of boxes");
      return;
    }

    if (!figurineInput.trim()) {
      toast.error("Please enter at least one figurine name");
      return;
    }

    const names = figurineInput
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    if (names.length === 0) {
      toast.error("Please enter valid figurine names");
      return;
    }

    if (names.length < numBoxes) {
      toast.warning(
        "You have fewer figurines than boxes. This is valid but unusual."
      );
      return;
    }

    setFigurines(names);
    setBoxConstraints(
      Array.from({ length: numBoxes }, (_, i) => i + 1).reduce(
        (acc, box) => ({ ...acc, [box]: [] }),
        {}
      )
    );
    setStep(2);
  };

  // Step 2: Select target figurine
  const handleSetTarget = (value: any) => {
    setTargetFigurine(value);
    setStep(3);
  };

  // Step 3: Update constraints for a box
  const toggleConstraint = (box: any, figurine: any) => {
    setBoxConstraints((prev) => {
      const currentConstraints = [...(prev[box] || [])];
      const index = currentConstraints.indexOf(figurine);

      if (index === -1) {
        currentConstraints.push(figurine);
      } else {
        currentConstraints.splice(index, 1);
      }

      return {
        ...prev,
        [box]: currentConstraints,
      };
    });
  };

  // Step 4: Calculate probabilities
  const calculateProbabilities = (): Record<string, number[]> => {
    const probabilities: Record<string, number[]> = {};

    figurines.forEach((figurine) => {
      probabilities[figurine] = Array.from({ length: numBoxes }, (_, i) => {
        const box = i + 1;
        if (knownBoxes[box]) {
          return knownBoxes[box] === figurine ? 100 : 0;
        }
        if (boxConstraints[box]?.includes(figurine)) {
          return 0;
        }

        // Count how many boxes this figurine could be in
        const possibleBoxes = Array.from(
          { length: numBoxes },
          (_, i) => i + 1
        ).filter(
          (b) => !boxConstraints[b]?.includes(figurine) && !knownBoxes[b]
        );

        return possibleBoxes.length ? (1 / possibleBoxes.length) * 100 : 0;
      });
    });

    return probabilities;
  };

  // Get focus boxes for target figurine
  const getFocusBoxes = (probabilities: Record<string, number[]>) => {
    if (!targetFigurine) return [];

    return probabilities[targetFigurine]
      .map((prob, index) => ({ box: index + 1, prob }))
      .filter((item) => item.prob > 0)
      .sort((a, b) => b.prob - a.prob);
  };

  // Update when a box's content is revealed
  const handleRevealBox = (box: any, figurine: any) => {
    setKnownBoxes((prev) => ({
      ...prev,
      [box]: figurine,
    }));

    toast.success(`Box ${box} contains ${figurine}`, {
      description: "The probabilities have been updated",
    });
  };

  // Calculate results
  const probabilities = calculateProbabilities();
  const focusBoxes = getFocusBoxes(probabilities);

  // Navigation functions
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen">
      <HeaderSection />
      <main className="container mx-auto py-2">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl flex text-primary items-center gap-2">
              <Search className="h-6 w-6" />
              Find for your wished box
            </CardTitle>
            <CardDescription>
              This does not guarantee that your desired box will be hit, but
              rather provides a probability-based calculation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-evenly mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`flex flex-col items-center ${
                      s <= step ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                        s < step
                          ? "bg-primary text-primary-foreground"
                          : s === step
                          ? "border-2 border-primary"
                          : "border-2 border-muted"
                      }`}
                    >
                      {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                    </div>
                    <span className="text-xs hidden sm:block">
                      {s === 1
                        ? "Setup"
                        : s === 2
                        ? "Target"
                        : s === 3
                        ? "Constraints"
                        : s === 4
                        ? "Probabilities"
                        : "Results"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Setup */}
              {step === 1 && (
                <StepOne
                  numBoxes={numBoxes}
                  setNumBoxes={setNumBoxes}
                  figurineInput={figurineInput}
                  setFigurineInput={setFigurineInput}
                />
              )}

              {/* Step 2: Target Selection */}
              {step === 2 && (
                <StepTwo
                  targetFigurine={targetFigurine}
                  handleSetTarget={handleSetTarget}
                  figurines={figurines}
                />
              )}

              {/* Step 3: Box Constraints */}
              {step === 3 && (
                <StepThree
                  numBoxes={numBoxes}
                  figurines={figurines}
                  knownBoxes={knownBoxes}
                  boxConstraints={boxConstraints}
                  toggleConstraint={toggleConstraint}
                  handleRevealBox={handleRevealBox}
                  clearKnownBox={clearKnownBox}
                />
              )}

              {/* Step 4: Probabilities */}
              {step === 4 && (
                <StepFour
                  knownBoxes={knownBoxes}
                  numBoxes={numBoxes}
                  targetFigurine={targetFigurine}
                  probabilities={probabilities}
                  boxConstraints={boxConstraints}
                  figurines={figurines}
                />
              )}

              {/* Step 5: Results */}
              {step === 5 && (
                <StepFive
                  targetFigurine={targetFigurine}
                  focusBoxes={focusBoxes}
                />
              )}
            </div>
          </CardContent>

          {/* Card Footer */}
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {step === 1 ? (
              <Button onClick={handleInitialize}>
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : step < 5 ? (
              <Button onClick={nextStep}>
                Continue
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setStep(3)}>
                Update Constraints
              </Button>
            )}
          </CardFooter>
        </Card>
        <Toaster />
      </main>
    </div>
  );
}

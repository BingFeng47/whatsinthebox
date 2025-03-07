import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Plus } from "lucide-react";

interface StepOneProps {
  numBoxes: number;
  setNumBoxes: (numBoxes: number) => void;
  figurineInput: string;
  setFigurineInput: (figurineInput: string) => void;
}

function StepOne({
  numBoxes,
  setNumBoxes,
  figurineInput,
  setFigurineInput,
}: StepOneProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newFigurineName, setNewFigurineName] = useState("");

  // Convert comma-separated string to array
  const figurines = figurineInput
    ? figurineInput.split(",").map((name) => name.trim())
    : [];

  const addFigurine = () => {
    if (newFigurineName.trim()) {
      const updatedFigurines = [...figurines, newFigurineName.trim()];
      setFigurineInput(updatedFigurines.join(","));
      setNewFigurineName("");
      setDialogOpen(false);
    }
  };

  const removeFigurine = (index: number) => {
    const updatedFigurines = [...figurines];
    updatedFigurines.splice(index, 1);
    setFigurineInput(updatedFigurines.join(","));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="numBoxes">Number of Boxes</Label>
        <Input
          id="numBoxes"
          type="number"
          min="1"
          value={numBoxes || ""}
          onChange={(e) => setNumBoxes(parseInt(e.target.value) || 0)}
          placeholder="Enter number of boxes"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="figurines">Item Names</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {figurines.map((figurine, index) => (
            <Badge
              key={index}
              variant="default"
              className="flex items-center gap-1 p-2"
            >
              {figurine}
              <button
                onClick={() => removeFigurine(index)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
                aria-label={`Remove ${figurine}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Item Name</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={newFigurineName}
                onChange={(e) => setNewFigurineName(e.target.value)}
                placeholder="Enter item name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFigurine();
                  }
                }}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addFigurine}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default StepOne;

"use client";

import { Check } from "lucide-react";
import { Card, CardContent } from "./shadcnui/card";

const STEPS = [
  { id: 1, label: "Personal Details" },
  { id: 2, label: "Documents Upload" },
  { id: 3, label: "Final Submit" },
];

type Props = {
  currentStep: number;
};

const ProgressTracker = ({ currentStep }: Props) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-3 place-items-center py-6">
        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${isDone ? "border-violet-500 bg-violet-500 text-white" : ""} ${isActive ? "border-violet-500 bg-white text-violet-500" : ""} ${!isDone && !isActive ? "border-gray-300 bg-white text-gray-400" : ""} `}>
                {isDone ?
                  <Check className="h-4 w-4" />
                : step.id}
              </div>

              <span
                className={`text-xs font-medium ${isDone ? "text-violet-500" : ""} ${isActive ? "text-violet-600" : ""} ${!isDone && !isActive ? "text-gray-400" : ""} `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;

"use client";

import { Stepper } from "@/components/common/stepper/Stepper";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

type Step = { label: string };

type DynamicStepperFormProps = {
  steps: Step[];
  stepContent: React.ReactNode[];
  stepFields: string[][] | any; 
};

const DynamicStepperForm = ({
  steps,
  stepContent,
  stepFields,
}: DynamicStepperFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { trigger } = useFormContext();

  const goNext = async () => {
    if (currentStep < steps.length - 1) {
      const isValid = await trigger(stepFields[currentStep]);
      if (isValid) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="mx-auto space-y-6">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="mt-6 rounded-md p-4 bg-white">{stepContent[currentStep]}</div>
      <div className="flex justify-between">
        <div className="text-sm font-semibold">
          <div className="text-[#1B1C1E]">
            <span className="mr-2.5">Step</span>
            {currentStep + 1} /<span className="text-[#A1A98A]"> {steps.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-[#F5F6F1] text-[#6C7059] text-sm font-semibold rounded disabled:opacity-50 cursor-pointer"
          >
            Back
          </button>
          <button
            type={currentStep === steps.length - 1 ? "submit" : "button"}
            onClick={currentStep === steps.length - 1 ? undefined : goNext}
            className="px-4 py-2 bg-black text-white rounded text-sm font-semibold disabled:opacity-50 cursor-pointer"
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicStepperForm;

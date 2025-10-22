'use client';

import { Stepper } from '@/components/common/stepper/Stepper';
import React, { useState } from 'react';

type Step = { label: string };

type DynamicStepperFormProps = {
  steps: Step[];
  stepContent: React.ReactNode[];
};

const DynamicStepperForm = ({ steps, stepContent }: DynamicStepperFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto p-6 space-y-6">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="mt-6 border rounded-md p-4 bg-white">
        {stepContent[currentStep]}
      </div>

      <div className="flex justify-between">
        <div className='text-sm font-semibold'>
          <span className='text-[#1B1C1E]'>Step  {currentStep + 1}/</span>
          <span className='text-[#A1A98A]'>{steps.length}</span>
        </div>
        <div className='flex items-center gap-4'>
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-[#F5F6F1] text-[#6C7059] text-sm font-semibold rounded disabled:opacity-50 cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={goNext}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-black text-white rounded text-sm font-semibold disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicStepperForm;

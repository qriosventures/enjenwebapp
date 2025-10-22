'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type Step = {
  label: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number; 
};

export const Stepper = ({ steps, currentStep }:StepperProps) => {
  return (
    <div className="flex space-x-8 bg-[#F5F6F1] py-4 px-6 rounded-md w-full justify-start">
      {steps.map((step, index) => {
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex gap-2 items-center text-sm font-semibold">
            <div
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-md mb-1 text-xl',
                isActive
                  ? 'bg-black text-[#98FF4F] font-bold'
                  : 'bg-[#EBEEDF] text-[#6C7059]'
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                isActive ? 'text-[#1B1C1E]' : 'text-[#6C7059]'
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

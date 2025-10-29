"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/form";
import {
  FormControl,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import CustomButton from "@/components/ui/custom/CustomButton";
import { FormDocumentUpload } from "@/components/ui/custom/DocumentUpload";

export function ContactBusinessInfoStep() {
  const { control } = useFormContext();

  const employeeRanges = [
    { label: "2 - 10", value: "2-10" },
    { label: "11 - 50", value: "11-50" },
    { label: "51 - 100", value: "51-100" },
    { label: "101 - 500", value: "101-500" },
    { label: "500+", value: "500+" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-10">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">Contact Information</h3>
          <p className="text-sm text-gray-500 mb-6">
            Please provide the contact information below
          </p>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              name="companyName"
              label="Company Name"
              placeholder="JSW Limited"
            />
            <FormField
              name="primaryContactName"
              label="Primary Contact Name"
              placeholder="Anil Singh"
            />
            <FormField
              name="legalName"
              label="Legal Name"
              placeholder="JSW Limited"
            />
            <FormField
              name="emailAddress"
              label="Email Address"
              type="email"
              placeholder="anil.singh@jsw.in"
            />
            <FormField
              name="phoneNumber"
              label="Phone"
              type="tel"
              placeholder="9112345678890"
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">Business Information</h3>
          <p className="text-sm text-gray-500 mb-6">
            Please provide the business information below
          </p>

          <div className="grid grid-cols-2 gap-6">
            <ShadcnFormField
              control={control}
              name="yearEstablished"
              render={({ field }) => {
                const [open, setOpen] = useState(false);

                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Year Established</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            onClick={() => setOpen(!open)}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>20-01-1990</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpen(false); 
                          }}
                          captionLayout="dropdown" 
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                );
              }}
            />

            <FormField
              name="annualRevenue"
              label="Annual Revenue"
              type="number"
              placeholder="₹ 500000000"
            />

            <FormField
              name="taxId"
              label="Tax ID"
              placeholder="TTUY18768987997"
            />

            <ShadcnFormField
              control={control}
              name="isoCertified"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISO Certified?</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={field.value === true ? "default" : "outline"}
                        className={cn(
                          "flex-1",
                          field.value === true &&
                            "bg-[#6C7059] hover:bg-[#6C7059]"
                        )}
                        onClick={() => field.onChange(true)}
                      >
                        YES
                      </Button>
                      <Button
                        type="button"
                        variant={field.value === false ? "default" : "outline"}
                        className={cn(
                          "flex-1",
                          field.value === false &&
                            "bg-[#6C7059] hover:bg-[#6C7059]"
                        )}
                        onClick={() => field.onChange(false)}
                      >
                        NO
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <ShadcnFormField
              control={control}
              name="numberOfEmployees"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>No. of employees</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {employeeRanges.map((range) => (
                        <Button
                          key={range.value}
                          type="button"
                          variant={
                            field.value === range.value
                              ? "default"
                              : "outline"
                          }
                          className={cn(
                            "flex-1",
                            field.value === range.value &&
                              "bg-[#6C7059] hover:bg-[#6C7059]"
                          )}
                          onClick={() => field.onChange(range.value)}
                        >
                          {range.label}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DocumentsStep() {
  return (
    <FormDocumentUpload
      name="documents"
      title="Upload Documents"
      description="Upload relevant files - supported .PDF .JPG - upto 5mb max"
      maxSize={5}
      acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
      maxFiles={10}
    />
  );
}

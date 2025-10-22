"use client"

import * as React from "react"
import { useForm, SubmitHandler, DefaultValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form as ShadcnForm } from "@/components/ui/form"

interface FormProps<TSchema extends z.ZodTypeAny> {
  schema: TSchema
  defaultValues: DefaultValues<z.input<TSchema>>
  onSubmit: SubmitHandler<z.output<TSchema>>
  children: React.ReactNode
  submitText?: string
  className?: string
  resetOnSuccess?: boolean
  disabled?: boolean
  showReset?: boolean
  resetText?: string
}

export function Form<TSchema extends z.ZodTypeAny>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitText = "Submit",
  className = "space-y-6",
  resetOnSuccess = false,
  disabled = false,
  showReset = false,
  resetText = "Reset",
}: FormProps<TSchema>) {
  const form = useForm<z.output<TSchema|any>, any, z.input<TSchema>>({
    resolver: zodResolver(schema as z.ZodType<any, any, any>),
    defaultValues,
    mode: "onBlur",
  })

  const handleSubmit: SubmitHandler<z.output<TSchema>>|any = async (data:any) => {
    try {
      await onSubmit(data)
      if (resetOnSuccess) {
        form.reset()
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const handleReset = () => {
    form.reset()
  }

  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {children}
        
        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1"
            disabled={disabled || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : submitText}
          </Button>
          
          {showReset && (
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={disabled || form.formState.isSubmitting}
            >
              {resetText}
            </Button>
          )}
        </div>
      </form>
    </ShadcnForm>
  )
}
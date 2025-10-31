"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z, ZodType } from "zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface CrudFormModalProps<TSchema extends ZodType<any, any>> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  schema?: TSchema;
  defaultValues: Partial<z.infer<TSchema>>;
  children: React.ReactNode;
  isSaving?: boolean;
  className?: string
  disableSave?: boolean
}

export function CrudFormModal<TSchema extends ZodType<any, any>>({
  isOpen,
  onClose,
  onSave,
  title,
  schema,
  defaultValues,
  children,
  isSaving,
  className,
  disableSave
}: CrudFormModalProps<TSchema>) {
  const methods = useForm<Partial<z.infer<TSchema>>>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    methods.handleSubmit(onSave)();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`${className || ''}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            {children}
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" className="cursor-pointer font-semibold hover:bg-red-600 hover:text-white rounded-[5px]" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={disableSave || isSaving}
                className="flex items-center gap-2 cursor-pointer rounded-[5px]"
                onClick={(e) => e.stopPropagation()}
              >
                {isSaving && (
                  <span className="w-4 h-4 border-2 font-semibold border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

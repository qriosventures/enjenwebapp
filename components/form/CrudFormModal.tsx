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
}: CrudFormModalProps<TSchema>) {
  const methods = useForm<Partial<z.infer<TSchema>>>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSave)}>
            {children}
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" className="cursor-pointer" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 cursor-pointer"
              >
                {isSaving && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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

// components/ui/document-upload.tsx
"use client";

import React, { useState, useRef } from "react";
import { X, Eye, Paperclip, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormSelect } from "@/components/form";
import { z } from "zod";
import CustomButton from "./CustomButton";
import { RowActions } from "./RowActions";

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  documentType?: string;
  size: number;
  file?: File;
  url?: string;
}

interface DocumentUploadProps {
  title?: string;
  description?: string;
  maxSize?: number;
  acceptedTypes?: string[];
  maxFiles?: number;
  documentTypeOptions?: { label: string; value: string }[];
  requireDocumentType?: boolean;
  onDocumentsChange?: (documents: UploadedDocument[]) => void;
  className?: string;
  defaultDocuments?: UploadedDocument[];
}

export function DocumentUpload({
  title = "Upload Documents",
  description = "Upload relevant files - supported .PDF .JPG - upto 5mb max",
  maxSize = 5,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png"],
  maxFiles = 10,
  documentTypeOptions = [
    { label: "GST Certificate", value: "gst_certificate" },
    { label: "COI Certificate", value: "coi_certificate" },
    { label: "Company Registration", value: "company_registration" },
    { label: "Tax Document", value: "tax_document" },
    { label: "Other", value: "other" },
  ],
  requireDocumentType = true,
  onDocumentsChange,
  className,
  defaultDocuments = [],
}: DocumentUploadProps) {
  const [documents, setDocuments] =
    useState<UploadedDocument[]>(defaultDocuments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentSchema = z.object({
    documentType: requireDocumentType
      ? z.string().min(1, "Document type is required")
      : z.string().optional(),
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i)) + " " + sizes[i].toLowerCase();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.size > maxSize * 1024 * 1024) {
      alert(`File ${file.name} exceeds ${maxSize}MB limit`);
      return;
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      alert(`File type ${fileExtension} is not supported`);
      return;
    }

    setSelectedFile(file);
    setIsModalOpen(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveDocument = (data: any) => {
    if (!selectedFile) return;

    const fileExtension =
      "." + selectedFile.name.split(".").pop()?.toLowerCase();
    const newDoc: UploadedDocument = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedFile.name,
      type: fileExtension.toUpperCase().replace(".", ""),
      documentType: data.documentType,
      size: selectedFile.size,
      file: selectedFile,
      url: URL.createObjectURL(selectedFile),
    };

    const updatedDocuments = [...documents, newDoc].slice(0, maxFiles);
    setDocuments(updatedDocuments);
    onDocumentsChange?.(updatedDocuments);

    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleDelete = (row: any) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== row?.id);
    setDocuments(updatedDocuments);
    onDocumentsChange?.(updatedDocuments);
  };

  const handleView = (doc: UploadedDocument) => {
    if (doc.url) {
      window.open(doc.url, "_blank");
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const columns: DataTableColumn<UploadedDocument>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-gray-400" />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "size",
      headerName: "Size",
      valueFormatter: (params: any) => formatFileSize(params.value),
    },
  ];

  const rowActions = (row: UploadedDocument) => (
    <RowActions
      row={row}
      actions={["view", "delete"]}
      onView={handleView}
      onDelete={() => handleDelete(row)}
    />
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {documents.length > 0 ? (
        <DataTable
          className=" bg-[#F5F6F1] px-6 py-4 rounded-md"
          data={documents}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel=""
          searchable={false}
          pagination={false}
          showCheckboxSelection={false}
          height="auto"
          gridOptions={{
            getRowStyle: () => ({
              marginTop: "4px",
              borderBottom: "1px solid rgba(230, 230, 230, 0.4)",
            }),
            getRowHeight: () => 48,
            defaultColDef: {
              cellStyle: {
                display: "flex",
                alignItems: "center",
                paddingBottom: "6px",
              },
            },
          }}
        />
      ) : (
        <div className="border rounded-lg p-8 text-center text-gray-400">
          No documents uploaded yet
        </div>
      )}

      {documents.length < maxFiles && (
        <CustomButton
          variant="outline"
          className="w-auto cursor-pointer"
          onClick={handleAddClick}
          children={"Add Documents"}
          icon={<Plus />}
        />
      )}


      {isModalOpen && (
        <CrudFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveDocument}
        title="Add document"
        schema={documentSchema}
        defaultValues={{ documentType: "" }}
      >
        <div className="space-y-4">
          <FormSelect
            name="documentType"
            label="Document type"
            placeholder="Select"
            options={documentTypeOptions}
          />

          <div className="border-2 border-dashed rounded-lg p-8 text-center" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-sm mb-1">
              <span className="text-green-600 font-medium cursor-pointer">
                Click to upload
              </span>
              <span className="text-gray-500"> or drag and drop</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or PDF</p>
            <p className="text-xs text-gray-500">max 5mb</p>
            {selectedFile && (
              <p className="mt-3 text-sm font-medium text-gray-700">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CrudFormModal>
      )}

    </div>
  );
}

export function FormDocumentUpload({
  name,
  ...props
}: DocumentUploadProps & { name: string }) {
  const { setValue, watch } = useFormContext();
  const documents = watch(name) || [];

  const handleChange = (docs: UploadedDocument[]) => {
    setValue(name, docs, { shouldValidate: true });
  };

  return (
    <DocumentUpload
      {...props}
      defaultDocuments={documents}
      onDocumentsChange={handleChange}
    />
  );
}

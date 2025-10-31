"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { documentTypeAPI } from "@/components/api/documentTypeApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";

type DocumentType = {
  id: number;
  name: string;
  dbId?: number;
};

type Props = {
  documentTypesListData?: DocumentType[];
};

const DocumentTypeSettings = ({ documentTypesListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DocumentType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const documentTypes = React.useMemo(
    () => documentTypesListData || [],
    [documentTypesListData]
  );

  const columns: DataTableColumn<DocumentType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Document Type", flex: 1 },
  ];

  const handleEdit = (row: DocumentType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: DocumentType) => {
    const payload = { id: row?.dbId || row?.id };
    await showToastMessage.promise(documentTypeAPI(payload, "DELETE"), {
      loading: "Deleting document type...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    });
  };

  const documentTypeSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "Document type name is required")
      .min(3, "Document type must be at least 3 characters")
      .default(""),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);
      const payload = documentTypeSchema.parse(data);

      const request = editingItem
        ? documentTypeAPI({ ...payload, id: editingItem?.dbId || editingItem?.id }, "PUT")
        : documentTypeAPI(payload, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating document type..." : "Adding document type...",
        success: (res: any) => res?.data?.message || "Document type saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save document type",
      });

      setIsModalOpen(false);
      setEditingItem(null);
      setIsSaving(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues[0].message);
      }
    }
  };

  const rowActions = (row: DocumentType) => (
    <RowActions
      row={row}
      actions={["edit", "delete"]}
      onEdit={handleEdit}
      onDelete={() => handleDelete(row)}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Document Types</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add Document Type
        </CustomButton>
      </div>

      {documentTypes?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No document types found. Click "Add Document Type" to create one.
        </div>
      ) : (
        <DataTable
          data={documentTypes}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search document types..."
          searchable={true}
          pagination={false}
          showCheckboxSelection={false}
          gridOptions={{
            getRowStyle: () => ({ marginTop: "4px", borderBottom: "none" }),
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
      )}

      {isModalOpen && (
        <CrudFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title={editingItem ? "Edit Document Type" : "Add Document Type"}
          defaultValues={editingItem || { name: "" }}
          schema={documentTypeSchema}
          isSaving={isSaving}
        >
          <FormField
            name="name"
            label="Document Type"
            placeholder="Enter document type name"
          />
        </CrudFormModal>
      )}
    </div>
  );
};

export default DocumentTypeSettings;

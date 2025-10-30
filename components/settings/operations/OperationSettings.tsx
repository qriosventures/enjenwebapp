"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField, FormCheckbox } from "@/components/form";
import { z } from "zod";
import { operationAPI } from "@/components/api/operationApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";

type OperationType = {
  id: number;
  code: string;
  name: string;
  description?: string;
  standardHours: number;
  skillLevelRequired?: string;
  requiresInspection: boolean;
  dbId?: number;
};

type Props = {
  operationListData?: OperationType[];
};

const OperationSettings = ({ operationListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OperationType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const operations = React.useMemo(() => operationListData || [], [operationListData]);

  const columns: DataTableColumn<OperationType>[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "code", headerName: "Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "standardHours", headerName: "Standard Hours", width: 150 },
    { field: "skillLevelRequired", headerName: "Skill Level", flex: 1 },
    {
      field: "requiresInspection",
      headerName: "Requires Inspection",
      cellRenderer: (params: any) =>
        params?.value ? (
          <span className="text-green-600 font-medium">Yes</span>
        ) : (
          <span className="text-gray-500">No</span>
        ),
    },
  ];

  const handleEdit = (row: OperationType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: OperationType) => {
    const payload = { id: row.dbId };
    await showToastMessage.promise(operationAPI(payload as any, "DELETE"), {
      loading: "Deleting Operation...",
      success: (res: any) => res?.data?.message || "Operation deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete Operation",
    });
  };

  const operationSchema = z.object({
    id: z.number().optional(),
    code: z.string().min(1, "Code is required").max(50),
    name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters").max(100),
    description: z.string().max(250).optional(),
    standardHours: z.coerce
      .number()
      .min(0, "Standard Hours must be greater than 0").optional(),
    skillLevelRequired: z.string().max(100).optional(),
    requiresInspection: z.boolean().default(false),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);

      if (typeof data?.standardHours === "string") {
        data.standardHours = parseFloat(data.standardHours);
      }

      const payload = operationSchema.parse(data);

      const request = editingItem
        ? operationAPI({ ...payload, id: editingItem?.dbId } as any, "PUT")
        : operationAPI(payload as any, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating Operation..." : "Adding Operation...",
        success: (res: any) => res?.data?.message || "Operation saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save Operation",
      });

      setIsModalOpen(false);
      setEditingItem(null);
      setIsSaving(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues[0].message);
      }
      setIsSaving(false);
    }
  };

  const rowActions = (row: OperationType) => (
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
        <h2 className="text-xl font-semibold">Operations</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
          children={"Add Operation"}
        />
      </div>

      {operations?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No Operations found. Click "Add Operation" to create one.
        </div>
      ) : (
        <DataTable
          data={operations}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search operations..."
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
          title={editingItem ? `Edit Operation` : `Add Operation`}
          defaultValues={
            editingItem || {
              code: "",
              name: "",
              description: "",
              standardHours: 0,
              skillLevelRequired: "",
              requiresInspection: false,
            }
          }
          schema={operationSchema}
          isSaving={isSaving}
        >
          <div className="grid grid-cols-1 gap-4">
            <FormField name="code" label="Code" placeholder="Enter Operation Code" />
            <FormField name="name" label="Name" placeholder="Enter Operation Name" />
            <FormField
              name="description"
              label="Description"
              placeholder="Enter Description (optional)"
            />
            <FormField
              name="standardHours"
              label="Standard Hours"
              type="number"
              placeholder="Enter Standard Hours (optional)"
            />
            <FormField
              name="skillLevelRequired"
              label="Skill Level Required"
              placeholder="Enter Skill Level (optional)"
            />
            <FormCheckbox name="requiresInspection" label="Requires Inspection" className="space-x-0 items-center" />
          </div>
        </CrudFormModal>
      )}
    </div>
  );
};

export default OperationSettings;

"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { designationAPI } from "@/components/api/designationApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

type DesignationType = {
  id: number;
  name: string;
  isActive?: boolean;
  dbId?: number;
};

type Props = {
  designationsListData?: DesignationType[];
};

const DesignationSettings = ({ designationsListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DesignationType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const designations = React.useMemo(
    () => designationsListData || [],
    [designationsListData]
  );

  const columns: DataTableColumn<DesignationType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Designation Name", flex: 1 },
    {
      field: "isActive",
      headerName: "Active",
      width: 150,
      cellRenderer: (params) => (
        <span
          className={`px-2 py-1 text-xs font-medium ${
            params.value
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleEdit = (row: DesignationType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: DesignationType) => {
    const payload = { id: row?.dbId || row?.id };
    await showToastMessage.promise(designationAPI(payload, "DELETE"), {
      loading: "Deleting designation...",
      success: (res: any) =>
        res?.data?.message || "Designation deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete designation",
    });
  };

  const designationSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "Designation name is required")
      .min(3, "Designation name must be at least 3 characters"),
    isActive: z.boolean().default(true),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);
      const payload = designationSchema.parse(data);

      const request = editingItem
        ? designationAPI(
            { ...payload, id: editingItem?.dbId || editingItem?.id },
            "PUT"
          )
        : designationAPI(payload, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem
          ? "Updating designation..."
          : "Adding designation...",
        success: (res: any) =>
          res?.data?.message || "Designation saved successfully!",
        error: (err: any) =>
          err?.data?.message || "Failed to save designation",
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

  const rowActions = (row: DesignationType) => (
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
        <h2 className="text-xl font-semibold">Designations</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add Designation
        </CustomButton>
      </div>

      {designations?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No designations found. Click "Add Designation" to create one.
        </div>
      ) : (
        <DataTable
          data={designations}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search designations..."
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
          title={editingItem ? "Edit Designation" : "Add Designation"}
          defaultValues={editingItem || { name: "", isActive: true }}
          schema={designationSchema}
          isSaving={isSaving}
        >
          <FormField
            name="name"
            label="Designation Name"
            placeholder="Enter designation name"
          />
          <Controller
            name="isActive"
            render={({ field }) => (
              <div className="flex items-center space-x-2 pt-3">
                <Checkbox
                  id="isActive"
                  checked={field.value}
                  className="cursor-pointer"
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            )}
          />
        </CrudFormModal>
      )}
    </div>
  );
};

export default DesignationSettings;

"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { departmentAPI } from "@/components/api/departmentApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import CustomIsActiveBadge from "@/components/ui/custom/CustomIsActiveBadge";

type DepartmentType = {
  id: number;
  name: string;
  isActive?: boolean;
  dbId?: number;
};

type Props = {
  departmentsListData?: DepartmentType[];
};

const DepartmentSettings = ({ departmentsListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DepartmentType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const departments = React.useMemo(
    () => departmentsListData || [],
    [departmentsListData]
  );

  const columns: DataTableColumn<DepartmentType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Department Name", flex: 1 },
    {
      field: "isActive",
      headerName: "Active",
      width: 150,
      cellRenderer: (params) => (
        <CustomIsActiveBadge params={params?.value} />
      ),
    },
  ];

  const handleEdit = (row: DepartmentType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: DepartmentType) => {
    const payload = { id: row?.dbId || row?.id };
    await showToastMessage.promise(departmentAPI(payload, "DELETE"), {
      loading: "Deleting department...",
      success: (res: any) => res?.data?.message || "Department deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete department",
    });
  };

  const departmentSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "Department name is required")
      .min(3, "Department name must be at least 3 characters"),
    isActive: z.boolean().default(true),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);

      const payload = departmentSchema.parse(data);

      const request = editingItem
        ? departmentAPI(
            { ...payload, id: editingItem?.dbId || editingItem?.id },
            "PUT"
          )
        : departmentAPI(payload, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem
          ? "Updating department..."
          : "Adding department...",
        success: (res: any) =>
          res?.data?.message || "Department saved successfully!",
        error: (err: any) =>
          err?.data?.message || "Failed to save department",
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

  const rowActions = (row: DepartmentType) => (
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
        <h2 className="text-xl font-semibold">Departments</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add Department
        </CustomButton>
      </div>

      {departments?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No departments found. Click "Add Department" to create one.
        </div>
      ) : (
        <DataTable
          data={departments}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search departments..."
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
          title={editingItem ? "Edit Department" : "Add Department"}
          defaultValues={editingItem || { name: "", isActive: true }}
          schema={departmentSchema}
          isSaving={isSaving}
        >
          <FormField
            name="name"
            label="Department Name"
            placeholder="Enter department name"
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

export default DepartmentSettings;

"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";
import { vehicleMakeAPI } from "@/components/api/vehicleMakeApi";

type VehicleType = {
  id: number;
  name: string;
  dbId?: number;
};

type Props = {
  vehicleListData?: VehicleType[];
};

const VehicleMakesSettings = ({ vehicleListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VehicleType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const vehicle = React.useMemo(() => vehicleListData ?? [], [vehicleListData]);

  const columns: DataTableColumn<VehicleType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Vehicle Make", flex: 1 },
  ];

  const handleEdit = (row: VehicleType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: VehicleType) => {
    const payload = { id: row?.dbId };
    await showToastMessage.promise(vehicleMakeAPI(payload as any, "DELETE"), {
      loading: "Deleting vehicle make...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    });
  };

  const vehicleSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "Vehicle make name is required")
      .min(3, "Name must be at least 3 characters"),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);

      const payload = vehicleSchema.parse(data);

      const request = editingItem
        ? vehicleMakeAPI({ ...payload, id: editingItem?.dbId } as any, "PUT")
        : vehicleMakeAPI(payload as any, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating..." : "Adding...",
        success: (res: any) => res?.data?.message || "Saved successfully!",
        error: (err: any) => err?.data?.message || "Save failed",
      });

      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues?.[0]?.message ?? "Validation error");
      } else {
        showToastMessage.error("An unexpected error occurred");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const rowActions = (row: VehicleType) => (
    <RowActions
      row={row}
      actions={["edit", "delete"]}
      onEdit={handleEdit}
      onDelete={() => handleDelete(row)}
    />
  );

  const defaultValues = editingItem
    ? { name: editingItem.name ?? "" }
    : { name: "" };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Vehicle Makes</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add Vehicle Make
        </CustomButton>
      </div>

      {vehicle.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No vehicle makes found. Click "Add Vehicle Make" to create one.
        </div>
      ) : (
        <DataTable
          data={vehicle}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search vehicle makes..."
          searchable
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
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSave}
          title={editingItem ? "Edit Vehicle Make" : "Add Vehicle Make"}
          defaultValues={defaultValues}
          schema={vehicleSchema}
          isSaving={isSaving}
        >
          <FormField
            name="name"
            label="Vehicle Make"
            placeholder="Enter vehicle make name"
          />
        </CrudFormModal>
      )}
    </div>
  );
};

export default VehicleMakesSettings;

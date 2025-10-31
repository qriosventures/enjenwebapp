"use client";

import React, { useState, useEffect } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField, FormSelect } from "@/components/form";
import { z } from "zod";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";
import { stateAPI } from "@/components/api/stateApi";
import { validateRequiredData } from "@/lib/utils/crudValidationUtils";

type CountryType = { id: number; name: string };

type StateType = {
  id?: number;
  name: string;
  code?: string;
  countryId?: number;
  dbId?: number;
};

type Props = {
  stateListData: {
    states: StateType[];
    countries: CountryType[];
  };
};

const StatesSettings = ({ stateListData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StateType | any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [states, setStates] = useState<StateType[]>();
  const { countries } = stateListData;

  useEffect(() => {
    setStates(stateListData.states);
  }, [stateListData]);

  const columns: DataTableColumn<StateType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "State Name", flex: 1 },
  ];

  const handleEdit = (row: StateType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    const isValid = validateRequiredData({ countries }, "state");
    if (!isValid) return;
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: StateType) => {
    try {
      await showToastMessage.promise(
        stateAPI({ id: row?.dbId } as any, "DELETE"),
        {
          loading: "Deleting state...",
          success: (res: any) => res?.data?.message || "Deleted successfully",
          error: (err: any) => err?.data?.message || "Failed to delete",
        }
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const stateSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "State name is required")
      .min(3, "State name must be at least 3 characters"),
    code: z.number().optional(),
    countryId: z.coerce.number().min(1, "Country is required"),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);

      const payload = stateSchema.parse(data);

      const request = editingItem
        ? stateAPI({ ...payload, id: editingItem?.dbId } as any, "PUT")
        : stateAPI(payload as any, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating state..." : "Adding state...",
        success: (res: any) =>
          res?.data?.message || "State saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save state",
      });

      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues[0].message);
      } else {
        console.error(err);
        showToastMessage.error("Unexpected error occurred");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const rowActions = (row: StateType) => (
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
        <h2 className="text-xl font-semibold">States</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add State
        </CustomButton>
      </div>

      {!states || states.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No states found. Click "Add State" to create one.
        </div>
      ) : (
        <DataTable
          data={states}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search states..."
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
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title={editingItem ? "Edit State" : "Add State"}
          defaultValues={
            editingItem
              ? {
                  id: editingItem?.dbId,
                  name: editingItem?.name,
                  countryId: Number(editingItem?.countryId),
                  code: Number(editingItem?.code),
                }
              : {
                  id: 0,
                  name: "",
                  countryId: 0,
                  code: 0,
                }
          }
          schema={stateSchema}
          isSaving={isSaving}
        >
          <FormSelect
            name="countryId"
            label="Country"
            options={countries.map((c) => ({
              label: c.name,
              value: String(c.id),
            }))}
            disabled={countries.length === 0}
            className="!w-full mb-2"
          />
          <FormField
            name="name"
            label="State Name"
            placeholder="Enter state name"
          />
        </CrudFormModal>
      )}
    </div>
  );
};

export default StatesSettings;

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
import { useRouter } from "next/navigation";
import { countryAPI } from "@/components/api/countryApi";

type StateType = {
  id?: number;
  name: string;
  code?: string;
  countryId?: number;
};

type Props = {
  stateListData?: StateType[];
};

type CountryType = { id: number; name: string };

const StatesSettings = ({ stateListData = [] }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StateType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [states, setStates] = useState<StateType[]>(stateListData);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  useEffect(() => {
    setStates(stateListData);
  }, [stateListData]);

  useEffect(() => {
    if (isModalOpen) {
      fetchCountries();
    }
  }, [isModalOpen]);

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const response = await countryAPI();
      if (response?.data?.result) {
        setCountries(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      showToastMessage.error("Failed to load countries");
    } finally {
      setLoadingCountries(false);
    }
  };

  const columns: DataTableColumn<StateType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "State Name", flex: 1 },
  ];

  const handleEdit = (row: StateType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: StateType) => {
    try {
      const payload = { id: row?.id } as any;

      await showToastMessage.promise(stateAPI(payload, "DELETE"), {
        loading: "Deleting state...",
        success: (res: any) => res?.data?.message || "Deleted successfully",
        error: (err: any) => err?.data?.message || "Failed to delete",
      });

      router.refresh();
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
    code: z.string().optional(),
    countryId: z.coerce.number().min(1, "Country is required").optional(),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);

      const payload = stateSchema.parse(data);

      const request = editingItem
        ? stateAPI({ ...payload, id: editingItem?.id } as any, "PUT")
        : stateAPI(payload as any, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating state..." : "Adding state...",
        success: (res: any) =>
          res?.data?.message || "State saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save state",
      });

      setIsModalOpen(false);
      setEditingItem(null);
      router.refresh();
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

      {states?.length === 0 ? (
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
          title={editingItem ? "Edit State" : "Add State"}
          defaultValues={
            editingItem || {
              name: "",
              countryId: countries?.[0]?.id ?? undefined,
            }
          }
          schema={stateSchema}
          isSaving={isSaving}
        >
          <FormSelect
            name="countryId"
            label="Country"
            options={countries.map((c: CountryType) => ({
              label: c.name,
              value: String(c.id),
            }))}
            placeholder="Select a country"
            disabled={loadingCountries}
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

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField, FormSelect } from "@/components/form";
import { z } from "zod";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";
import { cityAPI } from "@/components/api/cityApi";
import { validateRequiredData } from "@/lib/utils/crudValidationUtils";


type CountryType = { id: number; name: string };
type StateType = {
  id?: number;
  name: string;
  code?: string;
  countryId?: number;
  dbId?: number;
};
type CityType = {
  id?: number;
  name: string;
  code?: string;
  stateId?: number;
  dbId?: number;
};

type Props = {
  cityListData: {
    cities: CityType[];
    states: StateType[];
    countries: CountryType[];
  };
};

const CitiesSettings = ({ cityListData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CityType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [cities, setCities] = useState<CityType[]>(cityListData.cities);
  const { states, countries } = cityListData;


  useEffect(() => {
    setCities(cityListData.cities);
  }, [cityListData]);

  const columns: DataTableColumn<CityType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "City Name", flex: 1 },
  ];

  const handleEdit = (row: CityType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    const isValid = validateRequiredData(
      { countries, states },
       "city");
    if (!isValid) return
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: CityType) => {
    try {
      await showToastMessage.promise(
        cityAPI({ id: row?.dbId } as any, "DELETE"),
        {
          loading: "Deleting city...",
          success: (res: any) => res?.data?.message || "Deleted successfully",
          error: (err: any) => err?.data?.message || "Failed to delete",
        }
      );

      const response = await cityAPI();
      if (response?.status === 200 && response?.data?.result) {
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const citySchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "City name is required")
      .min(3, "City name must be at least 3 characters"),
    code: z.number().optional(),
    countryId: z.coerce.number().min(1, "Country is required"),
    stateId: z.coerce.number().min(1, "State is required"),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);
      const payload = citySchema.parse(data);
      const cityPayload = { ...payload };

      const request = editingItem
        ? cityAPI({ ...cityPayload, id: editingItem?.dbId } as any, "PUT")
        : cityAPI(cityPayload as any, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating city..." : "Adding city...",
        success: (res: any) => res?.data?.message || "City saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save city",
      });

      const response = await cityAPI();
      if (response?.status === 200 && response?.data?.result) {
        setCities(response.data.result);
      }

      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues?.[0]?.message || "Validation error");
      } else {
        console.error(err);
        showToastMessage.error("Unexpected error occurred");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const rowActions = (row: CityType) => (
    <RowActions
      row={row}
      actions={["edit", "delete"]}
      onEdit={handleEdit}
      onDelete={() => handleDelete(row)}
    />
  );

  const defaultValues = useMemo(() => {
    if (!editingItem) {
      return { id: 0, name: "", countryId: 0, stateId: 0, code: 0 };
    }

    const state = states.find((s) => s?.id === editingItem?.stateId);
    const countryId = state?.countryId ?? 0;

    return {
      id: editingItem.dbId ?? 0,
      name: editingItem.name ?? "",
      stateId: Number(editingItem?.stateId ?? 0),
      countryId,
      code: Number(editingItem?.code ?? 0),
    };
  }, [editingItem, states]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Cities</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add City
        </CustomButton>
      </div>

      {cities.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No cities found. Click "Add City" to create one.
        </div>
      ) : (
        <DataTable
          data={cities}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search cities..."
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
          title={editingItem ? "Edit City" : "Add City"}
          defaultValues={defaultValues}
          schema={citySchema}
          isSaving={isSaving}
        >
          <FormSelect
            name="countryId"
            label="Country"
            options={countries?.map((c) => ({
              label: c?.name,
              value: String(c?.id),
            }))}
            disabled={countries?.length === 0}
            className="!w-full mb-2"
          />
          <FormSelect
            name="stateId"
            label="State"
            options={states.map((s) => ({
              label: s.name,
              value: String(s.id),
            }))}
            disabled={states?.length === 0}
            className="!w-full mb-2"
          />
          <FormField
            name="name"
            label="City Name"
            placeholder="Enter city name"
          />
        </CrudFormModal>
      )}
    </div>
  );
};

export default CitiesSettings;

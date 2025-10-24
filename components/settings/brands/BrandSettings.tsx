"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { brandsAPI } from "@/components/api/brands";

type BrandsType = {
  id: number;
  name: string;
};

type Props = {
  brandsListData?: BrandsType[];
};

const BrandSettings = ({ brandsListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BrandsType | null>(null);

  const brands = React.useMemo(() => brandsListData || [], [brandsListData]);

  const columns: DataTableColumn<BrandsType>[] = [
    { field: "id", headerName: "ID",width: 100 },
    { field: "name", headerName: "Brand Name",flex: 1 },
  ];

  const handleEdit = (row: BrandsType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: BrandsType) => {
    try {
      const payload = { id: row.id };
      const result = await brandsAPI(payload, "DELETE");
      console.log(result, "Brand deleted successfully");
    } catch (err) {
      console.error("Failed to delete brand", err);
    }
  };

const brandSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Brand name is required")
    .min(3, "Brand name must be at least 3 characters")
    .default(""),
});

  const handleSave = async (data: any) => {
    try {
      const payload = brandSchema.parse(data);

      if (editingItem) {
        payload.id = editingItem.id;
        const result = await brandsAPI(payload, "PUT");
        console.log(result, "Brand updated successfully");
      } else {
        const res = await brandsAPI(payload, "POST");
        console.log(res, "Brand added successfully");
      }

      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error("Validation error:", err.issues);
      } else {
        console.error(err);
      }
    }
  };

  const rowActions = (row: BrandsType) => (
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
        <h2 className="text-xl font-semibold">Brands</h2>
        <Button onClick={handleAdd} className="cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </Button>
      </div>

      {brands.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No brands found. Click "Add Brand" to create one.
        </div>
      ) : (
        <DataTable
          data={brands}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search brands..."
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
          title={editingItem ? `Edit Brand` : `Add Brand`}
          defaultValues={editingItem || { name: "" }}
          schema={brandSchema}
        >
          <FormField name="name" label="Brand Name" placeholder="Brand Name" />
        </CrudFormModal>
      )}
    </div>
  );
};

export default BrandSettings;

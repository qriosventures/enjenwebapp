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
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";

type BrandsType = {
  id: number;
  name: string;
  dbId?: number;
};

type Props = {
  brandsListData?: BrandsType[];
};

const BrandSettings = ({ brandsListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BrandsType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const brands = React.useMemo(() => brandsListData || [], [brandsListData]);

  const columns: DataTableColumn<BrandsType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Brand Name", flex: 1 },
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
    const payload = { id: row.dbId };
    await showToastMessage.promise(brandsAPI(payload, "DELETE"), {
      loading: "Deleting brand...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    });
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
      setIsSaving(true);

      const payload = brandSchema.parse(data);

      const request = editingItem
        ? brandsAPI({ ...payload, id: editingItem.dbId }, "PUT")
        : brandsAPI(payload, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating brand..." : "Adding brand...",
        success: (res: any) =>
          res?.data?.message || "Brand Added Successfully!",
        error: (err: any) => err?.data?.message || "Failed To Add Brand",
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
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2"/>}
          className="cursor-pointer"
          children={"Add Brand"}
        />
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
          resizable={false}
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
          isSaving={isSaving}
        >
          <FormField name="name" label="Brand Name" placeholder="Brand Name" />
        </CrudFormModal>
      )}
    </div>
  );
};

export default BrandSettings;

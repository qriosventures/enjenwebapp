"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { showToastMessage } from "@/components/common/ToastMessage";
import { itemTypeAPI } from "@/components/api/itemTypeApi";

type ItemTypeType = {
  id: number;
  name: string;
};

type Props = {
  itemTypeListData?: ItemTypeType[];
};

const ItemTypeSettings = ({ itemTypeListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemTypeType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const itemType = React.useMemo(() => itemTypeListData || [], [itemTypeListData]);

  const columns: DataTableColumn<ItemTypeType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "ItemType Name", flex: 1 },
  ];

  const handleEdit = (row: ItemTypeType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: ItemTypeType) => {
    const payload = { id: row.id };
    await showToastMessage.promise(itemTypeAPI(payload, "DELETE"), {
      loading: "Deleting itemType...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    });
  };

  const itemTypeSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "ItemType name is required")
      .min(3, "ItemType name must be at least 3 characters")
      .default(""),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true)

      const payload = itemTypeSchema.parse(data);

      const request = editingItem
        ? itemTypeAPI({ ...payload, id: editingItem.id }, "PUT")
        : itemTypeAPI(payload, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating itemType..." : "Adding itemType...",
        success: (res: any) => res?.data?.message || "ItemType Added Successfully!",
        error: (err: any) => err?.data?.message || "Failed To Add ItemType",
      });

      setIsModalOpen(false);
      setEditingItem(null);
      setIsSaving(false)

    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues[0].message);
      }
    }
  };

  const rowActions = (row: ItemTypeType) => (
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
        <h2 className="text-xl font-semibold">ItemTypes</h2>
        <Button onClick={handleAdd} className="cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add ItemType
        </Button>
      </div>

      {itemType.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No itemType found. Click "Add ItemType" to create one.
        </div>
      ) : (
        <DataTable
          data={itemType}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search itemType..."
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
          title={editingItem ? `Edit ItemType` : `Add ItemType`}
          defaultValues={editingItem || { name: "" }}
          schema={itemTypeSchema}
          isSaving={isSaving}
        >
          <FormField name="name" label="ItemType Name" placeholder="ItemType Name" />
        </CrudFormModal>
      )}
    </div>
  );
};

export default ItemTypeSettings;

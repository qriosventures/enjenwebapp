"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
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

  const itemType = React.useMemo(() => itemTypeListData || [], [itemTypeListData]);

  const columns: DataTableColumn<ItemTypeType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Brand Name", flex: 1 },
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
    try {
      const payload = { id: row.id };
      const result = await itemTypeAPI(payload, "DELETE");
      console.log(result, "ItemType deleted successfully");
    } catch (err) {
      console.error("Failed to delete itemType", err);
    }
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
      const payload = itemTypeSchema.parse(data);

      if (editingItem) {
        payload.id = editingItem.id;
        const result = await itemTypeAPI(payload, "PUT");
        console.log(result, "ItemType updated successfully");
      } else {
        const res = await itemTypeAPI(payload, "POST");
        console.log(res, "ItemType added successfully");
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
        <h2 className="text-xl font-semibold">ItemType</h2>
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
        >
          <FormField name="name" label="ItemType Name" placeholder="ItemType Name" />
        </CrudFormModal>
      )}
    </div>
  );
};

export default ItemTypeSettings;

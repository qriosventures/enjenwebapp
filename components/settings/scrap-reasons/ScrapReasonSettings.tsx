"use client";

import React, { useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField, FormCheckbox } from "@/components/form";
import { z } from "zod";
import { scrapReasonAPI } from "@/components/api/scrapReasonApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";

type ScrapReasonType = {
  id: number;
  code: string;
  description: string;
  requiresApproval: boolean;
  dbId?: number;
};

type Props = {
  ScrapReasonListData?: ScrapReasonType[];
};

const ScrapReasonSettings = ({ ScrapReasonListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScrapReasonType | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const scrapReasons = React.useMemo(() => ScrapReasonListData || [], [ScrapReasonListData]);

  const columns: DataTableColumn<ScrapReasonType>[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "code", headerName: "Code", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "requiresApproval",
      headerName: "Requires Approval",
      cellRenderer: (params: any) =>
        params?.value ? (
          <span className="text-green-600 font-medium">Yes</span>
        ) : (
          <span className="text-gray-500">No</span>
        ),
    },
  ];

  const handleEdit = (row: ScrapReasonType) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: ScrapReasonType) => {
    const payload = { id: row.dbId };
    await showToastMessage.promise(scrapReasonAPI(payload as any, "DELETE"), {
      loading: "Deleting Scrap Reason...",
      success: (res: any) => res?.data?.message || "Scrap Reason deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete Scrap Reason",
    });
  };

  const scrapReasonSchema = z.object({
    id: z.number().optional(),
    code: z
      .string()
      .min(1, "Code is required")
      .min(2, "Code must be at least 2 characters")
      .max(50),
    description: z
      .string()
      .min(1, "Description is required")
      .min(3, "Description must be at least 3 characters")
      .max(200),
    requiresApproval: z.boolean().default(false),
  });

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true);

      const payload = scrapReasonSchema.parse(data);

      const request = editingItem
        ? scrapReasonAPI({ ...payload, id: editingItem?.dbId }, "PUT")
        : scrapReasonAPI(payload, "POST");

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating Scrap Reason..." : "Adding Scrap Reason...",
        success: (res: any) =>
          res?.data?.message || "Scrap Reason saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save Scrap Reason",
      });

      setIsModalOpen(false);
      setEditingItem(null);
      setIsSaving(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues[0].message);
      }
      setIsSaving(false);
    }
  };

  const rowActions = (row: ScrapReasonType) => (
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
        <h2 className="text-xl font-semibold">Scrap Reasons</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
          children={"Add Scrap Reason"}
        />
      </div>

      {scrapReasons?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No Scrap Reasons found. Click "Add Scrap Reason" to create one.
        </div>
      ) : (
        <DataTable
          data={scrapReasons}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search scrap reasons..."
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
          title={editingItem ? `Edit Scrap Reason` : `Add Scrap Reason`}
          defaultValues={
            editingItem || {
              code: "",
              description: "",
              requiresApproval: false,
            }
          }
          schema={scrapReasonSchema}
          isSaving={isSaving}
        >
          <div className="grid grid-cols-1 gap-4">
            <FormField name="code" label="Code" placeholder="Enter Scrap Code" />
            <FormField
              name="description"
              label="Description"
              placeholder="Enter Description"
            />
            <FormCheckbox
              name="requiresApproval"
              label="Requires Approval"
            />
          </div>
        </CrudFormModal>
      )}
    </div>
  );
};

export default ScrapReasonSettings;

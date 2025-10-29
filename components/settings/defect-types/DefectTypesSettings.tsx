"use client"

import React, { useState } from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { RowActions } from "@/components/ui/custom/RowActions"
import { Plus } from "lucide-react"
import { CrudFormModal } from "@/components/form/CrudFormModal"
import { FormField } from "@/components/form"
import { z } from "zod"
import { defectTypeAPI } from "@/components/api/defectTypeApi"
import { showToastMessage } from "@/components/common/ToastMessage"
import CustomButton from "@/components/ui/custom/CustomButton"

type DefectType = {
  id: number
  name: string
  dbId?: number
}

type Props = {
  defectsListData?: DefectType[]
}

const DefectTypesSettings = ({ defectsListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<DefectType | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const defectTypes = React.useMemo(() => defectsListData || [], [defectsListData])

  const columns: DataTableColumn<DefectType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Defect Type", flex: 1 },
  ]

  const handleEdit = (row: DefectType) => {
    setEditingItem(row)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (row: DefectType) => {
    const payload = { id: row?.dbId }
    await showToastMessage.promise(defectTypeAPI(payload, "DELETE"), {
      loading: "Deleting defect type...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    })
  }

  const defectTypeSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "Defect type name is required")
      .min(3, "Defect type must be at least 3 characters")
      .default(""),
  })

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true)
      const payload = defectTypeSchema.parse(data)

      const request = editingItem
        ? defectTypeAPI({ ...payload, id: editingItem?.dbId }, "PUT")
        : defectTypeAPI(payload, "POST")

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating defect type..." : "Adding defect type...",
        success: (res: any) => res?.data?.message || "Defect Type saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save defect type",
      })

      setIsModalOpen(false)
      setEditingItem(null)
      setIsSaving(false)
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues[0].message)
      }
    }
  }

  const rowActions = (row: DefectType) => (
    <RowActions
      row={row}
      actions={["edit", "delete"]}
      onEdit={handleEdit}
      onDelete={() => handleDelete(row)}
    />
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Defect Types</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add Defect Type
        </CustomButton>
      </div>

      {defectTypes?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No defect types found. Click “Add Defect Type” to create one.
        </div>
      ) : (
        <DataTable
          data={defectTypes}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search defect types..."
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
          title={editingItem ? "Edit Defect Type" : "Add Defect Type"}
          defaultValues={editingItem || { name: "" }}
          schema={defectTypeSchema}
          isSaving={isSaving}
        >
          <FormField
            name="name"
            label="Defect Type"
            placeholder="Enter defect type name"
          />
        </CrudFormModal>
      )}
    </div>
  )
}

export default DefectTypesSettings

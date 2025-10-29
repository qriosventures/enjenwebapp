"use client"

import React, { useState } from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { RowActions } from "@/components/ui/custom/RowActions"
import { Plus } from "lucide-react"
import { CrudFormModal } from "@/components/form/CrudFormModal"
import { FormField } from "@/components/form"
import { z } from "zod"
import { carriersAPI } from "@/components/api/carriersApi"
import { showToastMessage } from "@/components/common/ToastMessage"
import CustomButton from "@/components/ui/custom/CustomButton"

type CarrierType = {
  id: number
  name: string
  dbId?: number
}

type Props = {
  carrierListData?: CarrierType[]
}

const CarrierSettings = ({ carrierListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CarrierType | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const carriers = React.useMemo(() => carrierListData || [], [carrierListData])

  const columns: DataTableColumn<CarrierType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Carrier Name", flex: 1 },
  ]

  const handleEdit = (row: CarrierType) => {
    setEditingItem(row)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (row: CarrierType) => {
    const payload = { id: row?.dbId }
    await showToastMessage.promise(carriersAPI(payload, "DELETE"), {
      loading: "Deleting carrier...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    })
  }

  const carrierSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "Carrier name is required")
      .min(3, "Carrier name must be at least 3 characters")
      .default(""),
  })

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true)
      const payload = carrierSchema.parse(data)

      const request = editingItem
        ? carriersAPI({ ...payload, id: editingItem?.dbId }, "PUT")
        : carriersAPI(payload, "POST")

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating carrier..." : "Adding carrier...",
        success: (res: any) =>
          res?.data?.message || "Carrier Added Successfully!",
        error: (err: any) => err?.data?.message || "Failed To Add Carrier",
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

  const rowActions = (row: CarrierType) => (
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
        <h2 className="text-xl font-semibold">Carriers</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
          children={"Add Carrier"}
        />
      </div>

      {carriers?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No carriers found. Click "Add Carrier" to create one.
        </div>
      ) : (
        <DataTable
          data={carriers}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search carriers..."
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
          title={editingItem ? `Edit Carrier` : `Add Carrier`}
          defaultValues={editingItem || { name: "" }}
          schema={carrierSchema}
          isSaving={isSaving}
        >
          <FormField name="name" label="Carrier Name" placeholder="Carrier Name" />
        </CrudFormModal>
      )}
    </div>
  )
}

export default CarrierSettings;
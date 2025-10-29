"use client"

import React, { useState } from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { RowActions } from "@/components/ui/custom/RowActions"
import { Plus } from "lucide-react"
import { CrudFormModal } from "@/components/form/CrudFormModal"
import { FormField } from "@/components/form"
import { z } from "zod"
import { certificationTypesAPI } from "@/components/api/certificationTypesApi"
import { showToastMessage } from "@/components/common/ToastMessage"
import CustomButton from "@/components/ui/custom/CustomButton"

type CertificationTypeType = {
  id: number
  name: string
  dbId?: number
}

type Props = {
  certificationTypesListData?: CertificationTypeType[]
}

const CertificationTypesSettings = ({ certificationTypesListData = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CertificationTypeType | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const certificationTypes = React.useMemo(
    () => certificationTypesListData || [],
    [certificationTypesListData]
  )

  const columns: DataTableColumn<CertificationTypeType>[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Certification Type", flex: 1 },
  ]

  const handleEdit = (row: CertificationTypeType) => {
    setEditingItem(row)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (row: CertificationTypeType) => {
    const payload = { id: row?.dbId }
    await showToastMessage.promise(certificationTypesAPI(payload, "DELETE"), {
      loading: "Deleting certification type...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    })
  }

  const certificationTypeSchema = z.object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, "Certification type is required")
      .min(3, "Certification type must be at least 3 characters")
      .default(""),
  })

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true)

      const payload = certificationTypeSchema.parse(data)

      const request = editingItem
        ? certificationTypesAPI({ ...payload, id: editingItem?.dbId }, "PUT")
        : certificationTypesAPI(payload, "POST")

      await showToastMessage.promise(request, {
        loading: editingItem
          ? "Updating certification type..."
          : "Adding certification type...",
        success: (res: any) =>
          res?.data?.message || "Certification Type Added Successfully!",
        error: (err: any) =>
          err?.data?.message || "Failed To Add Certification Type",
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

  const rowActions = (row: CertificationTypeType) => (
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
        <h2 className="text-xl font-semibold">Certification Types</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
          children={"Add Certification Type"}
        />
      </div>

      {certificationTypes?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No certification types found. Click "Add Certification Type" to create one.
        </div>
      ) : (
        <DataTable
          data={certificationTypes}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search certification types..."
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
          title={editingItem ? `Edit Certification Type` : `Add Certification Type`}
          defaultValues={editingItem || { name: "" }}
          schema={certificationTypeSchema}
          isSaving={isSaving}
        >
          <FormField
            name="name"
            label="Certification Type"
            placeholder="Certification Type Name"
          />
        </CrudFormModal>
      )}
    </div>
  )
}

export default CertificationTypesSettings
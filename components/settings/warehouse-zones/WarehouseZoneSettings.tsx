"use client"

import React, { useState } from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { RowActions } from "@/components/ui/custom/RowActions"
import { Plus } from "lucide-react"
import { CrudFormModal } from "@/components/form/CrudFormModal"
import { FormField, FormSelect, FormCheckbox, FormTextarea } from "@/components/form"
import { z } from "zod"
import { warehouseZoneAPI } from "@/components/api/warehouseZoneApi"
import { showToastMessage } from "@/components/common/ToastMessage"
import CustomButton from "@/components/ui/custom/CustomButton"
import { validateRequiredData } from "@/lib/utils/crudValidationUtils"

type WarehouseZoneType = {
  id: number
  warehouseId: number
  name: string
  code: string
  type: number
  description?: string
  sequence: number
  isPickingZone: boolean
  isStorageZone: boolean
  isReceivingZone: boolean
  dbId?: number
}

type WarehouseType = {
  id: number
  name: string
}

type Props = {
  warehouseZoneListData: {
    warehouse: WarehouseType[]
    warehouseZones: WarehouseZoneType[]
  }
}

export const ZONE_TYPES = [
  { label: "Bulk Storage", value: "0" },
  { label: "Rack Storage", value: "1" },
  { label: "Pallet Rack", value: "2" },
  { label: "Shelf", value: "3" },
  { label: "Cold Storage", value: "4" },
  { label: "Hazardous", value: "5" },
]

const WarehouseZoneSettings = ({ warehouseZoneListData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<WarehouseZoneType | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const { warehouse, warehouseZones } = warehouseZoneListData
  const zones = React.useMemo(() => warehouseZones || [], [warehouseZones])

  const getWarehouseName = (warehouseId: number) =>
    warehouse.find((w) => w?.id === warehouseId)?.name || "N/A"

  const getZoneTypeName = (type: number) =>
    ZONE_TYPES.find((t) => t?.value === String(type))?.label || "Unknown"

  const columns: DataTableColumn<WarehouseZoneType>[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "code", headerName: "Code", width: 100 },
    { field: "name", headerName: "Zone Name", flex: 1 },
    {
      field: "warehouseId",
      headerName: "Warehouse",
      flex: 1,
      valueFormatter: (params: any) => getWarehouseName(params.value),
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      valueFormatter: (params: any) => getZoneTypeName(params.value),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      valueFormatter: (params: any) => params.value || "N/A",
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      valueFormatter: (params: any) => getZoneTypeName(params.value),
    },
    {
      field: "sequence",
      headerName: "Sequence",
      width: 100,
    },
    {
      field: "isPickingZone",
      headerName: "Picking",
      width: 100,
      cellRenderer: (params: any) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            params.value
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {params.value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      field: "isStorageZone",
      headerName: "Storage",
      width: 100,
      cellRenderer: (params: any) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            params.value
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {params.value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      field: "isReceivingZone",
      headerName: "Receiving",
      width: 100,
      cellRenderer: (params: any) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            params.value
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {params.value ? "Yes" : "No"}
        </span>
      ),
    },
  ]

  const handleEdit = (row: WarehouseZoneType) => {
    setEditingItem(row)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    const isValid = validateRequiredData(
        {
          warehouse
        },
        "warehouse zone"
      )
    
      if(!isValid) return
    
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (row: WarehouseZoneType) => {
    const payload = { id: row?.dbId }
    await showToastMessage.promise(warehouseZoneAPI(payload as any, "DELETE"), {
      loading: "Deleting warehouse zone...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    })
  }

  const warehouseZoneSchema = z.object({
    id: z.number().optional(),
    warehouseId: z.coerce.number().min(1, "Warehouse is required"),
    name: z
      .string()
      .min(1, "Zone name is required")
      .min(3, "Zone name must be at least 3 characters"),
    code: z.string().min(1, "Code is required"),
    type: z.coerce.number().min(1, "Type is required"),
    description: z.string().optional(),
    sequence: z.coerce.number().min(1, "Sequence is required"),
    isPickingZone: z.boolean().default(false),
    isStorageZone: z.boolean().default(false),
    isReceivingZone: z.boolean().default(false),
  })

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true)
      const payload = warehouseZoneSchema.parse(data)
      const request = editingItem
        ? warehouseZoneAPI({ ...payload, id: editingItem?.dbId } as any, "PUT")
        : warehouseZoneAPI(payload as any, "POST")

      await showToastMessage.promise(request, {
        loading: editingItem
          ? "Updating warehouse zone..."
          : "Adding warehouse zone...",
        success: (res: any) =>
          res?.data?.message || "Warehouse Zone saved successfully!",
        error: (err: any) =>
          err?.data?.message || "Failed to save warehouse zone",
      })

      setIsModalOpen(false)
      setEditingItem(null)
      setIsSaving(false)
    } catch (err) {
      if (err instanceof z.ZodError) {
        showToastMessage.error(err.issues[0].message)
      }
      setIsSaving(false)
    }
  }

  const rowActions = (row: WarehouseZoneType) => (
    <RowActions
      row={row}
      actions={["edit", "delete"]}
      onEdit={handleEdit}
      onDelete={() => handleDelete(row)}
    />
  )

  const warehouseOptions = warehouse.map((w) => ({
    label: w.name,
    value: String(w.id),
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Warehouse Zones</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add Warehouse Zone
        </CustomButton>
      </div>

      {zones?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No warehouse zones found. Click "Add Warehouse Zone" to create one.
        </div>
      ) : (
        <DataTable
          data={zones}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search warehouse zones..."
          pagination = {false}
          paginationPageSize={20}
          showCheckboxSelection={false}
          gridOptions={{ rowHeight: 56, headerHeight: 48 }}
        />
      )}

      {isModalOpen && (
        <CrudFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title={editingItem ? "Edit Warehouse Zone" : "Add Warehouse Zone"}
          defaultValues={
            editingItem || {
              warehouseId: 0,
              name: "",
              code: "",
              type: 1,
              description: "",
              sequence: 1,
              isPickingZone: false,
              isStorageZone: false,
              isReceivingZone: false,
            }
          }
          schema={warehouseZoneSchema}
          isSaving={isSaving}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              name="warehouseId"
              label="Warehouse"
              placeholder="Select Warehouse"
              options={warehouseOptions}
            />
            <FormField name="code" label="Code" placeholder="WZ001" />
            <FormField
              name="name"
              label="Zone Name"
              placeholder="Storage Zone A"
            />
            <FormSelect
              name="type"
              label="Zone Type"
              placeholder="Select Type"
              options={ZONE_TYPES}
            />
            <FormField
              name="sequence"
              label="Sequence"
              type="number"
              placeholder="1"
            />
            <div className="col-span-2">
              <FormTextarea
                name="description"
                label="Description"
                placeholder="Zone description..."
              />
            </div>

            <div className="col-span-2 space-y-3">
              <p className="text-sm font-medium">Zone Characteristics</p>
              <div className="grid grid-cols-3 gap-4">
                <FormCheckbox name="isPickingZone" label="Picking Zone" className="space-x-0.5" />
                <FormCheckbox name="isStorageZone" label="Storage Zone" className="space-x-0.5" />
                <FormCheckbox name="isReceivingZone" label="Receiving Zone" className="space-x-0.5" />
              </div>
            </div>
          </div>
        </CrudFormModal>
      )}
    </div>
  )
}

export default WarehouseZoneSettings
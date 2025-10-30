"use client"

import React, { useEffect, useState } from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { RowActions } from "@/components/ui/custom/RowActions"
import { Plus } from "lucide-react"
import { CrudFormModal } from "@/components/form/CrudFormModal"
import { FormField, FormSelect, FormCheckbox } from "@/components/form"
import { z } from "zod"
import { warehouseAPI } from "@/components/api/warehouseApi"
import { showToastMessage } from "@/components/common/ToastMessage"
import CustomButton from "@/components/ui/custom/CustomButton"
import CustomIsActiveBadge from "@/components/ui/custom/CustomIsActiveBadge"
import { format } from "date-fns"

type WarehouseType = {
  id: number
  name: string
  code: string
  address: string
  cityId: number
  stateId: number
  countryId: number
  zipCode?: string
  phone?: string
  email?: string
  contactPerson: string
  type: number
  latitude: number
  longitude: number
  isActive: boolean
  operationalSince: string
  totalArea: number
  usableCapacity: number
  dbId?: number
}

type LocationType = {
  id: number
  name: string
}

type Props = {
  warehouseListData: {
    country: LocationType[]
    state: LocationType[]
    city: LocationType[]
    warehouse: WarehouseType[]
  }
}

const WarehouseSettings = ({ warehouseListData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<WarehouseType | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const { country, state, city, warehouse } = warehouseListData
  const warehouses = React.useMemo(() => warehouse || [], [warehouse])

  const getCountryName = (countryId: number) =>
    country.find((c) => c?.id === countryId)?.name || "N/A"

  const getStateName = (stateId: number) =>
    state.find((s) => s?.id === stateId)?.name || "N/A"

  const getCityName = (cityId: number) =>
    city.find((c) => c?.id === cityId)?.name || "N/A"

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A"
    try {
      return format(new Date(date), "dd-MM-yyyy")
    } catch {
      return "N/A"
    }
  }


  const columns: DataTableColumn<WarehouseType>[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "code", headerName: "Code", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "contactPerson", headerName: "Contact Person", flex: 1 },
    {
      field: "cityId",
      headerName: "City",
      valueFormatter: (params: any) => getCityName(params.value),
    },
    {
      field: "stateId",
      headerName: "State",
      valueFormatter: (params: any) => getStateName(params.value),
    },
    {
      field: "countryId",
      headerName: "Country",
      valueFormatter: (params: any) => getCountryName(params.value),
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      valueFormatter: (params: any) => params?.value || "N/A",
    },
    {
      field: "operationalSince",
      headerName: "Operational Since",
      valueFormatter: (params: any) => formatDate(params.value),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      valueFormatter: (params: any) => params?.value || "N/A",
    },
    {
      field: "isActive",
      headerName: "Status",
      cellRenderer: (params: any) => (
        <CustomIsActiveBadge params={params?.value} />
      ),
    },
  ]

  const handleEdit = (row: WarehouseType) => {
    setEditingItem(row)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (row: WarehouseType) => {
    const payload = { id: row?.dbId }
    await showToastMessage.promise(warehouseAPI(payload as any, "DELETE"), {
      loading: "Deleting warehouse...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    })
  }

  const warehouseSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Warehouse name is required").min(3,"Warehouse name must be at least 3 characters"),
    code: z.string().min(1, "Code is required"),
    address: z.string().min(1, "Address is required"),
    cityId: z.coerce.number().min(1, "City is required"),
    stateId: z.coerce.number().min(1, "State is required"),
    countryId: z.coerce.number().min(1, "Country is required"),
    contactPerson: z.string().min(1, "Contact person is required").min(3,"Contact person must be at least 3 characters"),
    type: z.coerce.number().optional(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    operationalSince: z.string().min(1, "Operational since is required"),
    totalArea: z.coerce.number(),
    usableCapacity: z.coerce.number().min(.0, "Usable capacity is required"),
    isActive: z.boolean().default(true),
    zipCode: z.string().min(3, "Zip code is required"),
    phone: z.string().optional(),
    email: z.email(),
  })

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true)
      const payload = warehouseSchema.parse(data)
      const request = editingItem
        ? warehouseAPI({ ...payload, id: editingItem?.dbId } as any, "PUT")
        : warehouseAPI(payload as any, "POST")

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating warehouse..." : "Adding warehouse...",
        success: (res: any) =>
          res?.data?.message || "Warehouse saved successfully!",
        error: (err: any) => err?.data?.message || "Failed to save warehouse",
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

  const rowActions = (row: WarehouseType) => (
    <RowActions
      row={row}
      actions={["edit", "delete"]}
      onEdit={handleEdit}
      onDelete={() => handleDelete(row)}
    />
  )

  const countryOptions = country.map((c) => ({ label: c.name, value: String(c.id) }))
  const stateOptions = state.map((s) => ({ label: s.name, value: String(s.id) }))
  const cityOptions = city.map((c) => ({ label: c.name, value: String(c.id) }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Warehouses</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
        >
          Add Warehouse
        </CustomButton>
      </div>

      {warehouses?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No warehouses found. Click "Add Warehouse" to create one.
        </div>
      ) : (
        <DataTable
          data={warehouses}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search warehouses..."
          searchable
          pagination
          paginationPageSize={20}
          showCheckboxSelection={false}
          height="600px"
          gridOptions={{ rowHeight: 56, headerHeight: 48 }}
          
        />
      )}

      {isModalOpen && (
        <CrudFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title={editingItem ? "Edit Warehouse" : "Add Warehouse"}
          defaultValues={
            editingItem || {
              name: "",
              code: "",
              address: "",
              cityId: 0,
              stateId: 0,
              countryId: 0,
              contactPerson: "",
              type: 1,
              latitude: 0,
              longitude: 0,
              operationalSince: "",
              totalArea: 0,
              usableCapacity: 0,
              isActive: true,
              zipCode: "",
              phone: "",
              email: "",
            }
          }
          schema={warehouseSchema}
          isSaving={isSaving}
          className="!max-w-5xl !w-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField name="code" label="Code" placeholder="WH001" />
            <FormField name="name" label="Name" placeholder="Main Warehouse" />
            <FormField name="address" label="Address" placeholder="123 Street" />
            <FormSelect
              name="countryId"
              label="Country"
              placeholder="Select Country"
              options={countryOptions}
              className="w-full"
            />
            <FormSelect
              name="stateId"
              label="State"
              placeholder="Select State"
              options={stateOptions}
              className="w-full"
            />
            <FormSelect
              name="cityId"
              label="City"
              placeholder="Select City"
              options={cityOptions}
              className="w-full"
            />
            <FormField name="zipCode" label="Zip Code" placeholder="400001" />
            <FormField name="phone" label="Phone" placeholder="+91 9876543210" />
            <FormField name="email" label="Email" placeholder="warehouse@email.com" />
            <FormField name="contactPerson" label="Contact Person" placeholder="John Doe" />
            <FormField name="type" label="Type" type="number" placeholder="1" />
            <FormField name="latitude" label="Latitude" type="number" placeholder="12.34" />
            <FormField name="longitude" label="Longitude" type="number" placeholder="56.78" />
            <FormField
              name="operationalSince"
              label="Operational Since"
              type="date"
              placeholder="Select Date"
            />
            <FormField name="totalArea" label="Total Area" type="number" placeholder="10000.00" />
            <FormField name="usableCapacity" label="Usable Capacity" type="number" placeholder="100.00" />
            <div className="col-span-2">
              <FormCheckbox name="isActive" label="Is Active" className="space-x-0.5 items-center" />
            </div>
          </div>
        </CrudFormModal>
      )}
    </div>
  )
}

export default WarehouseSettings

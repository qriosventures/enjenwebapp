"use client"

import React, { useEffect, useState } from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { RowActions } from "@/components/ui/custom/RowActions"
import { Plus } from "lucide-react"
import { CrudFormModal } from "@/components/form/CrudFormModal"
import { FormField, FormSelect, FormCheckbox } from "@/components/form"
import { z } from "zod"
import { employeeAPI } from "@/components/api/employeeApi"
import { showToastMessage } from "@/components/common/ToastMessage"
import CustomButton from "@/components/ui/custom/CustomButton"
import { format } from "date-fns"
import CustomIsActiveBadge from "@/components/ui/custom/CustomIsActiveBadge"
import { validateRequiredData } from "@/lib/utils/crudValidationUtils"

type EmployeeType = {
  id: number
  employeeId: string
  name: string
  departmentId: number
  designationId: number
  hireDate:string
  isActive: boolean
  skills?: string
  profileImageUrl?: string
  dbId?: number
}

type DepartmentType = {
  id: number
  name: string
}

type DesignationType = {
  id: number
  name: string
}

type Props = {
  employeeListData: {
    departments: DepartmentType[]
    designations: DesignationType[]
    employee: EmployeeType[]
  }
}

const EmployeeSettings = ({ employeeListData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<EmployeeType | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const { departments, designations, employee } = employeeListData

  const employees = React.useMemo(() => employee || [] , [employee])
  const getDepartmentName = (departmentId: number) => {
    const dept = departments.find((d) => d.id === departmentId)
    return dept?.name || "N/A"
  }

  const getDesignationName = (designationId: number) => {
    const desig = designations.find((d) => d.id === designationId)
    return desig?.name || "N/A"
  }

  const formatDate = (date: Date | string) => {
    if (!date) return "N/A"
    try {
      return format(new Date(date), "dd-MM-yyyy")
    } catch {
      return "N/A"
    }
  }

  const columns: DataTableColumn<EmployeeType>[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "employeeId", headerName: "Employee ID"},
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "departmentId",
      headerName: "Department",
      valueFormatter: (params: any) => getDepartmentName(params.value),
    },
    {
      field: "designationId",
      headerName: "Designation",
      valueFormatter: (params: any) => getDesignationName(params.value),
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      valueFormatter: (params: any) => formatDate(params.value),
    },
    {
      field: "isActive",
      headerName: "Status",
      cellRenderer: (params: any) => (
        <CustomIsActiveBadge params={params?.value} />
      )
    },
  ]

  const handleEdit = (row: EmployeeType) => {
    setEditingItem(row)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
     const isValid = validateRequiredData(
        {
          departments,
          designations
        },
        "employee"
      )
    
    if(!isValid) return
    
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (row: EmployeeType) => {
    const payload = { id: row?.dbId }
    await showToastMessage.promise(employeeAPI(payload as any, "DELETE"), {
      loading: "Deleting employee...",
      success: (res: any) => res?.data?.message || "Deleted successfully",
      error: (err: any) => err?.data?.message || "Failed to delete",
    })
  }

  const employeeSchema = z.object({
    id: z.number().optional(),
    employeeId: z.string().min(1, "Employee ID is required"),
    name: z
      .string()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters"),
    departmentId: z.coerce.number().min(1, "Department is required"),
    designationId: z.coerce.number().min(1, "Designation is required"),
    hireDate: z.string().min(1, "Hire date is required"),
    isActive: z.boolean().default(true),
    skills: z.string().optional(),
    profileImageUrl: z.string().optional(),
  })

  const handleSave = async (data: any) => {
    try {
      setIsSaving(true)

      const payload = {
        ...employeeSchema.parse(data),
        departmentId: Number(data?.departmentId),
        designationId: Number(data?.designationId),
      }

      const request = editingItem
        ? employeeAPI({ ...payload, id: editingItem?.dbId } as any, "PUT")
        : employeeAPI(payload as any, "POST")

      await showToastMessage.promise(request, {
        loading: editingItem ? "Updating employee..." : "Adding employee...",
        success: (res: any) =>
          res?.data?.message || "Employee Added Successfully!",
        error: (err: any) => err?.data?.message || "Failed To Add Employee",
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

  const rowActions = (row: EmployeeType) => (
    <RowActions
      row={row}
      actions={["edit", "delete"]}
      onEdit={handleEdit}
      onDelete={() => handleDelete(row)}
    />
  )

  const departmentOptions = departments.map((dept) => ({
    label: dept.name,
    value: String(dept.id),
  }))

  const designationOptions = designations.map((desig) => ({
    label: desig.name,
    value: String(desig.id),
  }))
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Employees</h2>
        <CustomButton
          onClick={handleAdd}
          icon={<Plus strokeWidth={2.2} className="mr-2" />}
          className="cursor-pointer"
          children={"Add Employee"}
        />
      </div>

      {employees?.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No employees found. Click "Add Employee" to create one.
        </div>
      ) : (
        <DataTable
          data={employees}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          searchPlaceholder="Search employees..."
          searchable={true}
          pagination={true}
          paginationPageSize={20}
          showCheckboxSelection={false}
          height="600px"
          gridOptions={{
            rowHeight: 56,
            headerHeight: 48,
          }}
        />
      )}

      {isModalOpen && (
        <CrudFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          title={editingItem ? `Edit Employee` : `Add Employee`}
          defaultValues={
            editingItem || {
              employeeId: "",
              name: "",
              departmentId: 0,
              designationId: 0,
              hireDate: "",
              isActive: true,
              skills: "",
              profileImageUrl: "",
            }
          }
          schema={employeeSchema}
          isSaving={isSaving}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="employeeId"
              label="Employee ID"
              placeholder="EMP001"
            />
            <FormField name="name" label="Name" placeholder="John Doe" />

            <FormSelect
              name="departmentId"
              label="Department"
              placeholder="Select Department"
              options={departmentOptions}
              className="w-full"
            />

            <FormSelect
              name="designationId"
              label="Designation"
              placeholder="Select Designation"
              options={designationOptions}
              className="w-full"
            />

            <FormField
              name="hireDate"
              label="Hire Date"
              type="date"
              placeholder="Select date"
            />

            <FormField
              name="profileImageUrl"
              label="Profile Image URL"
              placeholder="https://example.com/image.jpg"
            />

            <div className="col-span-2">
              <FormField
                name="skills"
                label="Skills"
                placeholder="JavaScript, React, Node.js"
              />
            </div>

            <div className="col-span-2">
              <FormCheckbox name="isActive" label="Is Active" />
            </div>
          </div>
        </CrudFormModal>
      )}
    </div>
  )
}

export default EmployeeSettings;
"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { unitMeasureAPI } from "@/components/api/unitMeasureApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";

type UnitMeasureType = {
    id: number;
    unitName: string;
    dbId?: number;
};

type Props = {
    unitMeasureListData?: UnitMeasureType[];
};

const UnitMeasureSettings = ({ unitMeasureListData = [] }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<UnitMeasureType | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const unitMeasure = React.useMemo(() => unitMeasureListData || [], [unitMeasureListData]);
    console.log(unitMeasure, "unitMeasureListData in UnitMeasureSettings component");
    const transformedUnitMeasure = unitMeasure?.map((item) => ({
        ...item,
        name: item.unitName,
    }));

    const columns: DataTableColumn<UnitMeasureType>[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "unitName", headerName: "UnitMeasure Name", flex: 1 },
    ];

    const handleEdit = (row: UnitMeasureType) => {
        setEditingItem(row);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (row: UnitMeasureType) => {
        const payload = { id: row.dbId };
        await showToastMessage.promise(unitMeasureAPI(payload, "DELETE"), {
            loading: "Deleting Unit Measure...",
            success: (res: any) => res?.data?.message || "Unit Measure Deleted Successfully",
            error: (err: any) => err?.data?.message || "Failed To Delete Unit Measure",
        });
    };

    const unitMeasureSchema = z.object({
        id: z.number().optional(),
        name: z
            .string()
            .min(1, "UnitMeasure name is required")
            .min(3, "UnitMeasure name must be at least 3 characters")
            .default(""),
    });

    const handleSave = async (data: any) => {
        try {
            setIsSaving(true);
            const payload = unitMeasureSchema?.parse(data);
            const transformedPayload = {
            unitName: payload.name,
            };

            const request = editingItem
                ? unitMeasureAPI({ ...transformedPayload, id: editingItem?.dbId }, "PUT")
                : unitMeasureAPI(transformedPayload, "POST");

            await showToastMessage.promise(request, {
                loading: editingItem ? "Updating Unit Measure..." : "Adding Unit Measure...",
                success: (res: any) =>
                   res?.data?.message || "Unit Measure Added Successfully!",
                error: (err: any) => err?.data?.message || "Failed To Add Unit Measure",
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

    const rowActions = (row: UnitMeasureType) => (
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
                <h2 className="text-xl font-semibold">UnitMeasure</h2>
                <CustomButton
                    onClick={handleAdd}
                    icon={<Plus strokeWidth={2.2} className="mr-2" />}
                    className="cursor-pointer"
                    children={"Add UnitMeasure"}
                />
            </div>

            {transformedUnitMeasure?.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No unitMeasure found. Click "Add UnitMeasure" to create one.
                </div>
            ) : (
                <DataTable
                    data={transformedUnitMeasure}
                    columns={columns}
                    rowActions={rowActions}
                    rowActionsColumnLabel="Actions"
                    searchPlaceholder="Search unitMeasure..."
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
                    title={editingItem ? `Edit UnitMeasure` : `Add UnitMeasure`}
                    defaultValues={editingItem || { name: "" }}
                    schema={unitMeasureSchema}
                    isSaving={isSaving}
                >
                    <FormField name="name" label="Unit Measure Name" placeholder="Unit Measure Name" />
                </CrudFormModal>
            )}
        </div>
    );
};

export default UnitMeasureSettings;

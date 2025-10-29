"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { countryAPI } from "@/components/api/countryApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";

type CountryType = {
    id: number;
    name: string;
    dbId?: number;
};

type Props = {
    countryListData?: CountryType[];
};

const CountrySettings = ({ countryListData = [] }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CountryType | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const country = React.useMemo(() => countryListData || [], [countryListData]);

    const columns: DataTableColumn<CountryType>[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Country Name", flex: 1 },
    ];

    const handleEdit = (row: CountryType) => {
        setEditingItem(row);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (row: CountryType) => {
        const payload = { id: row?.dbId };
        await showToastMessage.promise(countryAPI(payload, "DELETE"), {
            loading: "Deleting country...",
            success: (res: any) => res?.data?.message || "Deleted successfully",
            error: (err: any) => err?.data?.message || "Failed to delete",
        });
    };

    const countrySchema = z.object({
        id: z.number().optional(),
        name: z
            .string()
            .min(1, "Country name is required")
            .min(3, "Country name must be at least 3 characters")
            .default(""),
    });

    const handleSave = async (data: any) => {
        try {
            setIsSaving(true);

            const payload = countrySchema.parse(data);

            const request = editingItem
                ? countryAPI({ ...payload, id: editingItem?.dbId }, "PUT")
                : countryAPI(payload, "POST");

            await showToastMessage.promise(request, {
                loading: editingItem ? "Updating country..." : "Adding country...",
                success: (res: any) =>
                    res?.data?.message || "Country Added Successfully!",
                error: (err: any) => err?.data?.message || "Failed To Add Country",
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

    const rowActions = (row: CountryType) => (
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
                <h2 className="text-xl font-semibold">Country</h2>
                <CustomButton
                    onClick={handleAdd}
                    icon={<Plus strokeWidth={2.2} className="mr-2" />}
                    className="cursor-pointer"
                    children={"Add Country"}
                />
            </div>

            {country?.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No country found. Click "Add Country" to create one.
                </div>
            ) : (
                <DataTable
                    data={country}
                    columns={columns}
                    rowActions={rowActions}
                    rowActionsColumnLabel="Actions"
                    searchPlaceholder="Search country..."
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
                    title={editingItem ? `Edit Country` : `Add Country`}
                    defaultValues={editingItem || { name: "" }}
                    schema={countrySchema}
                    isSaving={isSaving}
                >
                    <FormField name="name" label="Country Name" placeholder="Country Name" />
                </CrudFormModal>
            )}
        </div>
    );
};

export default CountrySettings;

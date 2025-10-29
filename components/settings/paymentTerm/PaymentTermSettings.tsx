"use client";

import React, { useEffect, useState } from "react";
import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { RowActions } from "@/components/ui/custom/RowActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CrudFormModal } from "@/components/form/CrudFormModal";
import { FormField } from "@/components/form";
import { z } from "zod";
import { paymentTermAPI } from "@/components/api/paymentTermApi";
import { showToastMessage } from "@/components/common/ToastMessage";
import CustomButton from "@/components/ui/custom/CustomButton";

type PaymentTermType = {
    id: number;
    name: string;
    dbId?: number;
};

type Props = {
    paymentTermListData?: PaymentTermType[];
};

const PaymentTermSettings = ({ paymentTermListData = [] }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PaymentTermType | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const paymentTerm = React.useMemo(() => paymentTermListData || [], [paymentTermListData]);

    const columns: DataTableColumn<PaymentTermType>[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Payment Term", flex: 1 },
    ];

    const handleEdit = (row: PaymentTermType) => {
        setEditingItem(row);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (row: PaymentTermType) => {
        const payload = { id: row.dbId };
        await showToastMessage.promise(paymentTermAPI(payload, "DELETE"), {
            loading: "Deleting Payment Term...",
            success: (res: any) => res?.data?.message || "Payment Term Deleted successfully",
            error: (err: any) => err?.data?.message || "Payment Term Failed to delete",
        });
    };

    const paymentTermSchema = z.object({
        id: z.number().optional(),
        name: z
            .string()
            .min(1, "PaymentTerm name is required")
            .min(3, "PaymentTerm name must be at least 3 characters")
            .default(""),
    });

    const handleSave = async (data: any) => {
        try {
            setIsSaving(true);

            const payload = paymentTermSchema.parse(data);

            const request = editingItem
                ? paymentTermAPI({ ...payload, id: editingItem?.dbId }, "PUT")
                : paymentTermAPI(payload, "POST");

            await showToastMessage.promise(request, {
                loading: editingItem ? "Updating paymentTerm..." : "Adding paymentTerm...",
                success: (res: any) =>
                    res?.data?.message || "PaymentTerm Added Successfully!",
                error: (err: any) => err?.data?.message || "Failed To Add PaymentTerm",
            });

            setIsModalOpen(false);
            setEditingItem(null);
            setIsSaving(false);
        } catch (err) {
            if (err instanceof z.ZodError) {
                showToastMessage.error(err?.issues[0]?.message);
            }
        }
    };

    const rowActions = (row: PaymentTermType) => (
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
                <h2 className="text-xl font-semibold">PaymentTerm</h2>
                <CustomButton
                    onClick={handleAdd}
                    icon={<Plus strokeWidth={2.2} className="mr-2" />}
                    className="cursor-pointer"
                    children={"Add PaymentTerm"}
                />
            </div>

            {paymentTerm?.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No paymentTerm found. Click "Add PaymentTerm" to create one.
                </div>
            ) : (
                <DataTable
                    data={paymentTerm}
                    columns={columns}
                    rowActions={rowActions}
                    rowActionsColumnLabel="Actions"
                    searchPlaceholder="Search paymentTerm..."
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
                    title={editingItem ? `Edit PaymentTerm` : `Add PaymentTerm`}
                    defaultValues={editingItem || { name: "" }}
                    schema={paymentTermSchema}
                    isSaving={isSaving}
                >
                    <FormField name="name" label="PaymentTerm Name" placeholder="PaymentTerm Name" />
                </CrudFormModal>
            )}
        </div>
    );
};

export default PaymentTermSettings;

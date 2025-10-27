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

type PaymentTermType = {
    id: number;
    name: string;
};

type Props = {
    paymentTermListData?: PaymentTermType[];
};

const PaymentTermSettings = ({ paymentTermListData = [] }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PaymentTermType | null>(null);

    const paymentTerm = React.useMemo(() => paymentTermListData || [], [paymentTermListData]);

    const columns: DataTableColumn<PaymentTermType>[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "PaymentTerm Name", flex: 1 },
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
        try {
            const payload = { id: row.id };
            const result = await paymentTermAPI(payload, "DELETE");
            console.log(result, "PaymentTerm deleted successfully");
        } catch (err) {
            console.error("Failed to delete paymentTerm", err);
        }
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
            const payload = paymentTermSchema.parse(data);

            if (editingItem) {
                payload.id = editingItem.id;
                const result = await paymentTermAPI(payload, "PUT");
                console.log(result, "PaymentTerm updated successfully");
            } else {
                const res = await paymentTermAPI(payload, "POST");
                console.log(res, "PaymentTerm added successfully");
            }

            setIsModalOpen(false);
            setEditingItem(null);
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.error("Validation error:", err.issues);
            } else {
                console.error(err);
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
                <Button onClick={handleAdd} className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add PaymentTerm
                </Button>
            </div>

            {paymentTerm.length === 0 ? (
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
                >
                    <FormField name="name" label="PaymentTerm Name" placeholder="PaymentTerm Name" />
                </CrudFormModal>
            )}
        </div>
    );
};

export default PaymentTermSettings;

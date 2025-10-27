'use server'
import PaymentTermSettings from "@/components/settings/paymentTerm/PaymentTermSettings";
import { paymentTermAPI } from "@/components/api/paymentTermApi";

const PaymentTermPage = async () => {
    const paymentTermResponse = await paymentTermAPI();
    const paymentTerm = paymentTermResponse?.data?.result || [];
    console.log("PaymentTerm data received:", paymentTermResponse?.data?.result)
    return (
        <>
            <PaymentTermSettings paymentTermListData={paymentTerm} />
        </>
    );
};

export default PaymentTermPage;

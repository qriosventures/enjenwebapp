import { supplierSchema } from "@/components/form/validations/supplierSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import DynamicStepperForm from "@/components/common/stepper/DynamicStepperForm";
import {
  ContactBusinessInfoStep,
  DocumentsStep,
} from "./SupplierRegistrationForm";
import { useState } from "react";
import { supplierAPI } from "@/components/api/supplierApi";
import { showToastMessage } from "@/components/common/ToastMessage";

export const steps = [{ label: "Primary Details" }, { label: "Documents" }];

export const stepContent = [
    <ContactBusinessInfoStep key="step-1"/>,
    <DocumentsStep key="step-2"/>
];
const SupplierRegistrationOnBoardingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      companyName: "",
      primaryContactName: "",
      legalName: "",
      emailAddress: "",
      phoneNumber: "",
      yearEstablished: "",
      annualRevenue: "",
      taxId: "",
      isoCertified: false,
      numberOfEmployees: "",
      documents: [],
    },
  });

  const prepareSupplierPayload = (formData: any) => {
  const {
    companyName,
    primaryContactName,
    legalName,
    emailAddress,
    phoneNumber,
    yearEstablished,
    annualRevenue,
    taxId,
    numberOfEmployees,
  } = formData;

  const parseEmployeeCount = (value:any) => {
  if (!value) return null;

  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

  return {
    companyName: companyName || "",
    legalName: legalName || "",
    taxId: taxId || "",
    primaryContactName: primaryContactName || "",
    email: emailAddress || "",
    phone: phoneNumber ? String(phoneNumber) : null,
    yearsInBusiness: yearEstablished
      ? new Date().getFullYear() - new Date(yearEstablished).getFullYear()
      : null,
    annualRevenue: annualRevenue ? Number(annualRevenue) : null,
    employeeCount: numberOfEmployees ? parseEmployeeCount(numberOfEmployees) : null,
    status: 1,
    registrationDate: new Date().toISOString(),
    lastEvaluationDate: null,
    averageRating: 1,
  };
};


  const onSubmit = async() => {
    const data = methods.getValues();
    const payload = prepareSupplierPayload(data);
      try {
          setIsSubmitting(true);    
          const request = supplierAPI(payload, "POST");   
          await showToastMessage.promise(request, {
            loading: "Submitting Supplier Application...",
            success: (res: any) =>
              res?.data?.message || "Supplier Application Submitted Successfully!",
            error: (err: any) => err?.data?.message || "Failed To Submit Supplier Application",
          });
    
          setIsSubmitting(false); 
        } catch (err) {
          if (err) {
            showToastMessage.error((err as any)?.message || "Failed To Submit Supplier Application");
          }
        }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DynamicStepperForm
          steps={steps}
          stepContent={stepContent}
          buttonText={"Submit Application"}
          stepFields={[
            [
              "companyName",
              "primaryContactName",
              "legalName",
              "emailAddress",
              "phoneNumber",
              "yearEstablished",
              "annualRevenue",
              "taxId",
              "isoCertified",
              "numberOfEmployees",
            ]
          ]}
          onFinalSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </form>
    </FormProvider>
  );
};

export default SupplierRegistrationOnBoardingPage;

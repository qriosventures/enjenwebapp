import { supplierSchema } from "@/components/form/validations/supplierSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import DynamicStepperForm from "@/components/common/stepper/DynamicStepperForm";
import {
  ContactBusinessInfoStep,
  DocumentsStep,
} from "./SupplierRegistrationForm";

export const steps = [{ label: "Primary Details" }, { label: "Documents" }];

export const stepContent = [
  <div key="step-1">
    <ContactBusinessInfoStep />
  </div>,
  <div key="step-2">
    <DocumentsStep />
  </div>,
];
const SupplierRegistrationOnBoardingPage = () => {
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
    },
  });

  const onSubmit = (data: any) => console.log(data);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DynamicStepperForm
          steps={steps}
          stepContent={stepContent}
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
            ],
            [
              // Document step fields (e.g., "document1", "document2")
            ],
          ]}
        />
      </form>
    </FormProvider>
  );
};

export default SupplierRegistrationOnBoardingPage;

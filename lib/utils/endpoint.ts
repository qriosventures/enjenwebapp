// Base API URL
const apiUrl = process.env.BASE_URL!;

//Brands API
export const getAllBrandsUrl = `${apiUrl}/brand/GetAllBrands`;
export const getBrandByIdUrl = (id: number) => `${apiUrl}/brand/${id}`;
export const createBrandUrl = `${apiUrl}/brand`;
export const updateBrandUrl = (id: number) => `${apiUrl}/brand/${id}`;
export const deleteBrandUrl = (id: number) => `${apiUrl}/brand/${id}`;


// Accident Image endpoints
export const getAllAccidentImagesUrl = `${apiUrl}/accidentImage/GetAllAccidentImages`;
export const getAccidentImageByIdUrl = (id: number) => `${apiUrl}/accidentImage/${id}`;
export const createAccidentImageUrl = `${apiUrl}/accidentImage`;
export const updateAccidentImageUrl = (id: number) => `${apiUrl}/accidentImage/${id}`;
export const deleteAccidentImageUrl = (id: number) => `${apiUrl}/accidentImage/${id}`;

// Accident Record endpoints
export const getAllAccidentRecordsUrl = `${apiUrl}/accidentRecord/GetAllAccidentRecords`;
export const getAccidentRecordByIdUrl = (id: number) => `${apiUrl}/accidentRecord/${id}`;
export const createAccidentRecordUrl = `${apiUrl}/accidentRecord`;
export const updateAccidentRecordUrl = (id: number) => `${apiUrl}/accidentRecord/${id}`;
export const deleteAccidentRecordUrl = (id: number) => `${apiUrl}/accidentRecord/${id}`;

// Assignment Trip endpoints
export const getAllAssignmentTripsUrl = `${apiUrl}/assignmentTrip/GetAllAssignmentTrips`;
export const getAssignmentTripByIdUrl = (id: number) => `${apiUrl}/assignmentTrip/${id}`;
export const createAssignmentTripUrl = `${apiUrl}/assignmentTrip`;
export const updateAssignmentTripUrl = (id: number) => `${apiUrl}/assignmentTrip/${id}`;
export const deleteAssignmentTripUrl = (id: number) => `${apiUrl}/assignmentTrip/${id}`;

// Bill of Material endpoints
export const getAllBillOfMaterialsUrl = `${apiUrl}/billOfMaterial/GetAllBillOfMaterials`;
export const getBillOfMaterialByIdUrl = (id: number) => `${apiUrl}/billOfMaterial/${id}`;
export const createBillOfMaterialUrl = `${apiUrl}/billOfMaterial`;
export const updateBillOfMaterialUrl = (id: number) => `${apiUrl}/billOfMaterial/${id}`;
export const deleteBillOfMaterialUrl = (id: number) => `${apiUrl}/billOfMaterial/${id}`;

// Bin Location endpoints
export const getAllBinLocationsUrl = `${apiUrl}/binLocation/GetAllBinLocations`;
export const getBinLocationByIdUrl = (id: number) => `${apiUrl}/binLocation/${id}`;
export const createBinLocationUrl = `${apiUrl}/binLocation`;
export const updateBinLocationUrl = (id: number) => `${apiUrl}/binLocation/${id}`;
export const deleteBinLocationUrl = (id: number) => `${apiUrl}/binLocation/${id}`;

// BOM Component API endpoints
export const getAllBomComponentsUrl = `${apiUrl}/bomComponent/GetAllBomComponents`;
export const getBomComponentByIdUrl = (id: number) => `${apiUrl}/bomComponent/${id}`;
export const createBomComponentUrl = `${apiUrl}/bomComponent`;
export const updateBomComponentUrl = (id: number) => `${apiUrl}/bomComponent/${id}`;
export const deleteBomComponentUrl = (id: number) => `${apiUrl}/bomComponent/${id}`;

// BOM Routing API endpoints
export const getAllBomRoutingsUrl = `${apiUrl}/bomRouting/GetAllBomRoutings`;
export const getBomRoutingByIdUrl = (id: number) => `${apiUrl}/bomRouting/${id}`;
export const createBomRoutingUrl = `${apiUrl}/bomRouting`;
export const updateBomRoutingUrl = (id: number) => `${apiUrl}/bomRouting/${id}`;
export const deleteBomRoutingUrl = (id: number) => `${apiUrl}/bomRouting/${id}`;

// Carrier API endpoints
export const getAllCarriersUrl = `${apiUrl}/carrier/GetAllCarriers`;
export const getCarrierByIdUrl = (id: number) => `${apiUrl}/carrier/${id}`;
export const createCarrierUrl = `${apiUrl}/carrier`;
export const updateCarrierUrl = (id: number) => `${apiUrl}/carrier/${id}`;
export const deleteCarrierUrl = (id: number) => `${apiUrl}/carrier/${id}`;

// Category API endpoints
export const getAllCategoriesUrl = `${apiUrl}/category/GetAllCategories`;
export const getCategoryByIdUrl = (id: number) => `${apiUrl}/category/${id}`;
export const createCategoryUrl = `${apiUrl}/category`;
export const updateCategoryUrl = (id: number) => `${apiUrl}/category/${id}`;
export const deleteCategoryUrl = (id: number) => `${apiUrl}/category/${id}`;

// Certification Type API endpoints
export const getAllCertificationTypesUrl = `${apiUrl}/certificationType/GetAllCertificationTypes`;
export const getCertificationTypeByIdUrl = (id: number) => `${apiUrl}/certificationType/${id}`;
export const createCertificationTypeUrl = `${apiUrl}/certificationType`;
export const updateCertificationTypeUrl = (id: number) => `${apiUrl}/certificationType/${id}`;
export const deleteCertificationTypeUrl = (id: number) => `${apiUrl}/certificationType/${id}`;

// City API endpoints
export const getAllCitiesUrl = `${apiUrl}/city/GetAllCities`;
export const getCitiesByStateUrl = (stateId: number) => `${apiUrl}/city/state/${stateId}`;
export const getCityByIdUrl = (id: number) => `${apiUrl}/city/${id}`;
export const createCityUrl = `${apiUrl}/city`;
export const updateCityUrl = (id: number) => `${apiUrl}/city/${id}`;
export const deleteCityUrl = (id: number) => `${apiUrl}/city/${id}`;

// Company Address API endpoints
export const getAllCompanyAddressesUrl = `${apiUrl}/companyAddress/GetAllCompanyAddresses`;
export const getCompanyAddressByIdUrl = (id: number) => `${apiUrl}/companyAddress/${id}`;
export const createCompanyAddressUrl = `${apiUrl}/companyAddress`;
export const updateCompanyAddressUrl = (id: number) => `${apiUrl}/companyAddress/${id}`;
export const deleteCompanyAddressUrl = (id: number) => `${apiUrl}/companyAddress/${id}`;

// Company API endpoints
export const getAllCompaniesUrl = `${apiUrl}/company/GetAllCompanies`;
export const getCompanyByIdUrl = (id: number) => `${apiUrl}/company/${id}`;
export const createCompanyUrl = `${apiUrl}/company`;
export const updateCompanyUrl = (id: number) => `${apiUrl}/company/${id}`;
export const deleteCompanyUrl = (id: number) => `${apiUrl}/company/${id}`;

// Company Bank Account API
export const getAllCompanyBankAccountsUrl = `${apiUrl}/companyBankAccount/GetAllCompanyBankAccounts`;
export const getCompanyBankAccountByIdUrl = (id: number) => `${apiUrl}/companyBankAccount/${id}`;
export const createCompanyBankAccountUrl = `${apiUrl}/companyBankAccount`;
export const updateCompanyBankAccountUrl = (id: number) => `${apiUrl}/companyBankAccount/${id}`;
export const deleteCompanyBankAccountUrl = (id: number) => `${apiUrl}/companyBankAccount/${id}`;

// Company Contact API
export const getAllCompanyContactsUrl = `${apiUrl}/companyContact/GetAllCompanyContacts`;
export const getCompanyContactByIdUrl = (id: number) => `${apiUrl}/companyContact/${id}`;
export const createCompanyContactUrl = `${apiUrl}/companyContact`;
export const updateCompanyContactUrl = (id: number) => `${apiUrl}/companyContact/${id}`;
export const deleteCompanyContactUrl = (id: number) => `${apiUrl}/companyContact/${id}`;

// Country API endpoints
export const getAllCountriesUrl = `${apiUrl}/country/GetAllCountries`;
export const getCountryByIdUrl = (id: number) => `${apiUrl}/country/${id}`;
export const createCountryUrl = `${apiUrl}/country`;
export const updateCountryUrl = (id: number) => `${apiUrl}/country/${id}`;
export const deleteCountryUrl = (id: number) => `${apiUrl}/country/${id}`;

// Customer Address API endpoints
export const getAllCustomerAddressesUrl = `${apiUrl}/customerAddress/GetAllCustomerAddresses`;
export const getCustomerAddressByIdUrl = (id: number) => `${apiUrl}/customerAddress/${id}`;
export const createCustomerAddressUrl = `${apiUrl}/customerAddress`;
export const updateCustomerAddressUrl = (id: number) => `${apiUrl}/customerAddress/${id}`;
export const deleteCustomerAddressUrl = (id: number) => `${apiUrl}/customerAddress/${id}`;

// Customer API endpoints
export const getAllCustomersUrl = `${apiUrl}/customer/GetAllCustomers`;
export const getCustomerByIdUrl = (id: number) => `${apiUrl}/customer/${id}`;
export const createCustomerUrl = `${apiUrl}/customer`;
export const updateCustomerUrl = (id: number) => `${apiUrl}/customer/${id}`;
export const deleteCustomerUrl = (id: number) => `${apiUrl}/customer/${id}`;

// Customer Bank Detail API endpoints
export const getAllCustomerBankDetailsUrl = `${apiUrl}/customerBankDetail/GetAllCustomerBankDetails`;
export const getCustomerBankDetailByIdUrl = (id: number) => `${apiUrl}/customerBankDetail/${id}`;
export const createCustomerBankDetailUrl = `${apiUrl}/customerBankDetail`;
export const updateCustomerBankDetailUrl = (id: number) => `${apiUrl}/customerBankDetail/${id}`;
export const deleteCustomerBankDetailUrl = (id: number) => `${apiUrl}/customerBankDetail/${id}`;

// Customer Contact API endpoints
export const getAllCustomerContactsUrl = `${apiUrl}/customerContact/GetAllCustomerContacts`;
export const getCustomerContactByIdUrl = (id: number) => `${apiUrl}/customerContact/${id}`;
export const createCustomerContactUrl = `${apiUrl}/customerContact`;
export const updateCustomerContactUrl = (id: number) => `${apiUrl}/customerContact/${id}`;
export const deleteCustomerContactUrl = (id: number) => `${apiUrl}/customerContact/${id}`;

// Defect Type API Endpoints
export const getAllDefectTypesUrl = `${apiUrl}/defectType/GetAllDefectTypes`;
export const getDefectTypeByIdUrl = (id: number) => `${apiUrl}/defectType/${id}`;
export const createDefectTypeUrl = `${apiUrl}/defectType`;
export const updateDefectTypeUrl = (id: number) => `${apiUrl}/defectType/${id}`;
export const deleteDefectTypeUrl = (id: number) => `${apiUrl}/defectType/${id}`;

// Delivery Evidence API endpoints
export const getAllDeliveryEvidencesUrl = `${apiUrl}/deliveryEvidence/GetAllDeliveryEvidences`;
export const getDeliveryEvidenceByIdUrl = (id: number) => `${apiUrl}/deliveryEvidence/${id}`;
export const createDeliveryEvidenceUrl = `${apiUrl}/deliveryEvidence`;
export const updateDeliveryEvidenceUrl = (id: number) => `${apiUrl}/deliveryEvidence/${id}`;
export const deleteDeliveryEvidenceUrl = (id: number) => `${apiUrl}/deliveryEvidence/${id}`;

// Demand Forecast API endpoints
export const getAllDemandForecastsUrl = `${apiUrl}/demandForecast/GetAllDemandForecasts`;
export const getDemandForecastByIdUrl = (id: number) => `${apiUrl}/demandForecast/${id}`;
export const createDemandForecastUrl = `${apiUrl}/demandForecast`;
export const updateDemandForecastUrl = (id: number) => `${apiUrl}/demandForecast/${id}`;
export const deleteDemandForecastUrl = (id: number) => `${apiUrl}/demandForecast/${id}`;

// Department API
export const getAllDepartmentsUrl = `${apiUrl}/department/GetAllDepartments`;
export const getDepartmentByIdUrl = (id: number) => `${apiUrl}/department/${id}`;
export const createDepartmentUrl = `${apiUrl}/department`;
export const updateDepartmentUrl = (id: number) => `${apiUrl}/department/${id}`;
export const deleteDepartmentUrl = (id: number) => `${apiUrl}/department/${id}`;

// Designation API
export const getAllDesignationsUrl = `${apiUrl}/designation/GetAllDesignations`;
export const getDesignationByIdUrl = (id: number) => `${apiUrl}/designation/${id}`;
export const createDesignationUrl = `${apiUrl}/designation`;
export const updateDesignationUrl = (id: number) => `${apiUrl}/designation/${id}`;
export const deleteDesignationUrl = (id: number) => `${apiUrl}/designation/${id}`;

// DispatchNote API
export const getAllDispatchNotesUrl = `${apiUrl}/dispatchNote/GetAllDispatchNotes`;
export const getDispatchNoteByIdUrl = (id: number) => `${apiUrl}/dispatchNote/${id}`;
export const createDispatchNoteUrl = `${apiUrl}/dispatchNote`;
export const updateDispatchNoteUrl = (id: number) => `${apiUrl}/dispatchNote/${id}`;
export const deleteDispatchNoteUrl = (id: number) => `${apiUrl}/dispatchNote/${id}`;

// Document API
export const getAllDocumentsUrl = `${apiUrl}/document/GetAllDocuments`;
export const getDocumentByIdUrl = (id: number) => `${apiUrl}/document/${id}`;
export const createDocumentUrl = `${apiUrl}/document`;
export const updateDocumentUrl = (id: number) => `${apiUrl}/document/${id}`;
export const deleteDocumentUrl = (id: number) => `${apiUrl}/document/${id}`;

// DocumentType API
export const getAllDocumentTypesUrl = `${apiUrl}/documentType/GetAllDocumentTypes`;
export const getDocumentTypeByIdUrl = (id: number) => `${apiUrl}/documentType/${id}`;
export const createDocumentTypeUrl = `${apiUrl}/documentType`;
export const updateDocumentTypeUrl = (id: number) => `${apiUrl}/documentType/${id}`;
export const deleteDocumentTypeUrl = (id: number) => `${apiUrl}/documentType/${id}`;

// Driver API
export const getAllDriversUrl = `${apiUrl}/driver/GetAllDrivers`;
export const getDriverByIdUrl = (id: number) => `${apiUrl}/driver/${id}`;
export const createDriverUrl = `${apiUrl}/driver`;
export const updateDriverUrl = (id: number) => `${apiUrl}/driver/${id}`;
export const deleteDriverUrl = (id: number) => `${apiUrl}/driver/${id}`;

// Driver License API
export const getAllDriverLicensesUrl = `${apiUrl}/driverLicense/GetAllDriverLicenses`;
export const getLicensesByDriverUrl = (driverId: number) => `${apiUrl}/driverLicense/GetLicensesByDriver/${driverId}`;
export const getDriverLicenseByIdUrl = (id: number) => `${apiUrl}/driverLicense/${id}`;
export const createDriverLicenseUrl = `${apiUrl}/driverLicense`;
export const updateDriverLicenseUrl = (id: number) => `${apiUrl}/driverLicense/${id}`;
export const deleteDriverLicenseUrl = (id: number) => `${apiUrl}/driverLicense/${id}`;

// Driver Training API
export const getAllDriverTrainingsUrl = `${apiUrl}/driverTraining/GetAllDriverTrainings`;
export const getTrainingsByDriverUrl = (driverId: number) => `${apiUrl}/driverTraining/GetTrainingsByDriver/${driverId}`;
export const getDriverTrainingByIdUrl = (id: number) => `${apiUrl}/driverTraining/${id}`;
export const createDriverTrainingUrl = `${apiUrl}/driverTraining`;
export const updateDriverTrainingUrl = (id: number) => `${apiUrl}/driverTraining/${id}`;
export const deleteDriverTrainingUrl = (id: number) => `${apiUrl}/driverTraining/${id}`;


// Driver Violation API
export const getAllDriverViolationsUrl = `${apiUrl}/driverViolation/GetAllDriverViolations`;
export const getViolationsByDriverUrl = (driverId: number) => `${apiUrl}/driverViolation/GetViolationsByDriver/${driverId}`;
export const getDriverViolationByIdUrl = (id: number) => `${apiUrl}/driverViolation/${id}`;
export const createDriverViolationUrl = `${apiUrl}/driverViolation`;
export const updateDriverViolationUrl = (id: number) => `${apiUrl}/driverViolation/${id}`;
export const deleteDriverViolationUrl = (id: number) => `${apiUrl}/driverViolation/${id}`;

// Employee API
export const getAllEmployeesUrl = `${apiUrl}/employee/GetAllEmployees`;
export const getEmployeeByIdUrl = (id: number) => `${apiUrl}/employee/${id}`;
export const createEmployeeUrl = `${apiUrl}/employee`;
export const updateEmployeeUrl = (id: number) => `${apiUrl}/employee/${id}`;
export const deleteEmployeeUrl = (id: number) => `${apiUrl}/employee/${id}`;

// Equipment API
export const getAllEquipmentsUrl = `${apiUrl}/equipment/GetAllEquipments`;
export const getEquipmentByIdUrl = (id: number) => `${apiUrl}/equipment/${id}`;
export const createEquipmentUrl = `${apiUrl}/equipment`;
export const updateEquipmentUrl = (id: number) => `${apiUrl}/equipment/${id}`;
export const deleteEquipmentUrl = (id: number) => `${apiUrl}/equipment/${id}`;

// Equipment Downtime API
export const getAllEquipmentDowntimesUrl = `${apiUrl}/equipmentDowntime/GetAllEquipmentDowntimes`;
export const getEquipmentDowntimeByIdUrl = (id: number) => `${apiUrl}/equipmentDowntime/${id}`;
export const createEquipmentDowntimeUrl = `${apiUrl}/equipmentDowntime`;
export const updateEquipmentDowntimeUrl = (id: number) => `${apiUrl}/equipmentDowntime/${id}`;
export const deleteEquipmentDowntimeUrl = (id: number) => `${apiUrl}/equipmentDowntime/${id}`;

// Equipment Maintenance API
export const getAllEquipmentMaintenancesUrl = `${apiUrl}/equipmentMaintenance/GetAllEquipmentMaintenances`;
export const getEquipmentMaintenanceByIdUrl = (id: number) => `${apiUrl}/equipmentMaintenance/${id}`;
export const createEquipmentMaintenanceUrl = `${apiUrl}/equipmentMaintenance`;
export const updateEquipmentMaintenanceUrl = (id: number) => `${apiUrl}/equipmentMaintenance/${id}`;
export const deleteEquipmentMaintenanceUrl = (id: number) => `${apiUrl}/equipmentMaintenance/${id}`;

// Equipment Maintenance Plan API
export const getAllEquipmentMaintenancePlansUrl = `${apiUrl}/equipmentMaintenancePlan/GetAllEquipmentMaintenancePlan`;
export const getEquipmentMaintenancePlanByIdUrl = (id: number) => `${apiUrl}/equipmentMaintenancePlan/${id}`;
export const createEquipmentMaintenancePlanUrl = `${apiUrl}/equipmentMaintenancePlan`;
export const updateEquipmentMaintenancePlanUrl = (id: number) => `${apiUrl}/equipmentMaintenancePlan/${id}`;
export const deleteEquipmentMaintenancePlanUrl = (id: number) => `${apiUrl}/equipmentMaintenancePlan/${id}`;

// Fiscal Year API
export const getAllFiscalYearsUrl = `${apiUrl}/fiscalYear/GetAllFiscalYears`;
export const getFiscalYearByIdUrl = (id: number) => `${apiUrl}/fiscalYear/${id}`;
export const createFiscalYearUrl = `${apiUrl}/fiscalYear`;
export const updateFiscalYearUrl = (id: number) => `${apiUrl}/fiscalYear/${id}`;
export const deleteFiscalYearUrl = (id: number) => `${apiUrl}/fiscalYear/${id}`;

// Forecast Adjustment API
export const getAllForecastAdjustmentsUrl = `${apiUrl}/forecastAdjustment/GetAllForecastAdjustments`;
export const getForecastAdjustmentByIdUrl = (id: number) => `${apiUrl}/forecastAdjustment/${id}`;
export const createForecastAdjustmentUrl = `${apiUrl}/forecastAdjustment`;
export const updateForecastAdjustmentUrl = (id: number) => `${apiUrl}/forecastAdjustment/${id}`;
export const deleteForecastAdjustmentUrl = (id: number) => `${apiUrl}/forecastAdjustment/${id}`;

// Goods Receipt API
export const getAllGoodsReceiptsUrl = `${apiUrl}/goodsReceipt/GetAllGoodsReceipts`;
export const getGoodsReceiptByIdUrl = (id: number) => `${apiUrl}/goodsReceipt/${id}`;
export const createGoodsReceiptUrl = `${apiUrl}/goodsReceipt`;
export const updateGoodsReceiptUrl = (id: number) => `${apiUrl}/goodsReceipt/${id}`;
export const deleteGoodsReceiptUrl = (id: number) => `${apiUrl}/goodsReceipt/${id}`;

// Goods Receipt Line API
export const getAllGoodsReceiptLinesUrl = `${apiUrl}/goodsReceiptLine/GetAllGoodsReceiptLines`;
export const getGoodsReceiptLineByIdUrl = (id: number) => `${apiUrl}/goodsReceiptLine/${id}`;
export const createGoodsReceiptLineUrl = `${apiUrl}/goodsReceiptLine`;
export const updateGoodsReceiptLineUrl = (id: number) => `${apiUrl}/goodsReceiptLine/${id}`;
export const deleteGoodsReceiptLineUrl = (id: number) => `${apiUrl}/goodsReceiptLine/${id}`;

// Insurance Claim API
export const getAllInsuranceClaimsUrl = `${apiUrl}/insuranceClaim/GetAllInsuranceClaims`;
export const getInsuranceClaimByIdUrl = (id: number) => `${apiUrl}/insuranceClaim/${id}`;
export const createInsuranceClaimUrl = `${apiUrl}/insuranceClaim`;
export const updateInsuranceClaimUrl = (id: number) => `${apiUrl}/insuranceClaim/${id}`;
export const deleteInsuranceClaimUrl = (id: number) => `${apiUrl}/insuranceClaim/${id}`;


// Insurance Record API
export const getAllInsuranceRecordsUrl = `${apiUrl}/insuranceRecord/GetAllInsuranceRecords`;
export const getInsuranceRecordByIdUrl = (id: number) => `${apiUrl}/insuranceRecord/${id}`;
export const createInsuranceRecordUrl = `${apiUrl}/insuranceRecord`;
export const updateInsuranceRecordUrl = (id: number) => `${apiUrl}/insuranceRecord/${id}`;
export const deleteInsuranceRecordUrl = (id: number) => `${apiUrl}/insuranceRecord/${id}`;

// Inventory API
export const getAllInventoriesUrl = `${apiUrl}/inventory/GetAllInventorys`;
export const getInventoryByIdUrl = (id: number) => `${apiUrl}/inventory/${id}`;
export const createInventoryUrl = `${apiUrl}/inventory`;
export const updateInventoryUrl = (id: number) => `${apiUrl}/inventory/${id}`;
export const deleteInventoryUrl = (id: number) => `${apiUrl}/inventory/${id}`;

// Invoice API
export const getAllInvoicesUrl = `${apiUrl}/invoice/GetAllInvoices`;
export const getInvoiceByIdUrl = (id: number) => `${apiUrl}/invoice/${id}`;
export const createInvoiceUrl = `${apiUrl}/invoice`;
export const updateInvoiceUrl = (id: number) => `${apiUrl}/invoice/${id}`;
export const deleteInvoiceUrl = (id: number) => `${apiUrl}/invoice/${id}`;


// Item API
export const getAllItemsUrl = `${apiUrl}/item/GetAllItems`;
export const getItemByIdUrl = (id: number) => `${apiUrl}/item/${id}`;
export const createItemUrl = `${apiUrl}/item`;
export const updateItemUrl = (id: number) => `${apiUrl}/item/${id}`;
export const deleteItemUrl = (id: number) => `${apiUrl}/item/${id}`;


// Item Document API
export const getAllItemDocumentsUrl = `${apiUrl}/itemDocument/GetAllItemDocuments`;
export const getItemDocumentByIdUrl = (id: number) => `${apiUrl}/itemDocument/${id}`;
export const createItemDocumentUrl = `${apiUrl}/itemDocument`;
export const updateItemDocumentUrl = (id: number) => `${apiUrl}/itemDocument/${id}`;
export const deleteItemDocumentUrl = (id: number) => `${apiUrl}/itemDocument/${id}`;

// Item Image API
export const getAllItemImagesUrl = `${apiUrl}/itemImage/GetAllItemImages`;
export const getItemImageByIdUrl = (id: number) => `${apiUrl}/itemImage/${id}`;
export const createItemImageUrl = `${apiUrl}/itemImage`;
export const updateItemImageUrl = (id: number) => `${apiUrl}/itemImage/${id}`;
export const deleteItemImageUrl = (id: number) => `${apiUrl}/itemImage/${id}`;

// Item Price API
export const getAllItemPricesUrl = `${apiUrl}/itemPrice/GetAllItemPrices`;
export const getItemPriceByIdUrl = (id: number) => `${apiUrl}/itemPrice/${id}`;
export const createItemPriceUrl = `${apiUrl}/itemPrice`;
export const updateItemPriceUrl = (id: number) => `${apiUrl}/itemPrice/${id}`;
export const deleteItemPriceUrl = (id: number) => `${apiUrl}/itemPrice/${id}`;

// Item Supplier API
export const getAllItemSuppliersUrl = `${apiUrl}/itemSupplier/GetAllItemSuppliers`;
export const getItemSupplierByIdUrl = (id: number) => `${apiUrl}/itemSupplier/${id}`;
export const createItemSupplierUrl = `${apiUrl}/itemSupplier`;
export const updateItemSupplierUrl = (id: number) => `${apiUrl}/itemSupplier/${id}`;
export const deleteItemSupplierUrl = (id: number) => `${apiUrl}/itemSupplier/${id}`;

// Item Type API
export const getAllItemTypesUrl = `${apiUrl}/itemType/GetAllItemTypes`;
export const getItemTypeByIdUrl = (id: number) => `${apiUrl}/itemType/${id}`;
export const createItemTypeUrl = `${apiUrl}/itemType`;
export const updateItemTypeUrl = (id: number) => `${apiUrl}/itemType/${id}`;
export const deleteItemTypeUrl = (id: number) => `${apiUrl}/itemType/${id}`;

// Labor Tracking API
export const getAllLaborTrackingsUrl = `${apiUrl}/laborTracking/GetAllLaborTrackings`;
export const getLaborTrackingByIdUrl = (id: number) => `${apiUrl}/laborTracking/${id}`;
export const createLaborTrackingUrl = `${apiUrl}/laborTracking`;
export const updateLaborTrackingUrl = (id: number) => `${apiUrl}/laborTracking/${id}`;
export const deleteLaborTrackingUrl = (id: number) => `${apiUrl}/laborTracking/${id}`;

// MRP Exception API
export const getAllMrpExceptionsUrl = `${apiUrl}/mrpException/GetAllMrpExceptions`;
export const getMrpExceptionByIdUrl = (id: number) => `${apiUrl}/mrpException/${id}`;
export const createMrpExceptionUrl = `${apiUrl}/mrpException`;
export const updateMrpExceptionUrl = (id: number) => `${apiUrl}/mrpException/${id}`;
export const deleteMrpExceptionUrl = (id: number) => `${apiUrl}/mrpException/${id}`;

// MRP Exception Resolution API
export const getAllMrpExceptionResolutionsUrl = `${apiUrl}/mrpExceptionResolution/GetAllMrpExceptionResolutions`;
export const getMrpExceptionResolutionByIdUrl = (id: number) => `${apiUrl}/mrpExceptionResolution/${id}`;
export const createMrpExceptionResolutionUrl = `${apiUrl}/mrpExceptionResolution`;
export const updateMrpExceptionResolutionUrl = (id: number) => `${apiUrl}/mrpExceptionResolution/${id}`;
export const deleteMrpExceptionResolutionUrl = (id: number) => `${apiUrl}/mrpExceptionResolution/${id}`;

// MRP Record API
export const getAllMrpRecordsUrl = `${apiUrl}/mrpRecord/GetAllMrpRecords`;
export const getMrpRecordByIdUrl = (id: number) => `${apiUrl}/mrpRecord/${id}`;
export const createMrpRecordUrl = `${apiUrl}/mrpRecord`;
export const updateMrpRecordUrl = (id: number) => `${apiUrl}/mrpRecord/${id}`;
export const deleteMrpRecordUrl = (id: number) => `${apiUrl}/mrpRecord/${id}`;

// MRP Run API
export const getAllMrpRunsUrl = `${apiUrl}/mrpRun/GetAllMrpRuns`;
export const getMrpRunByIdUrl = (id: number) => `${apiUrl}/mrpRun/${id}`;
export const createMrpRunUrl = `${apiUrl}/mrpRun`;
export const updateMrpRunUrl = (id: number) => `${apiUrl}/mrpRun/${id}`;
export const deleteMrpRunUrl = (id: number) => `${apiUrl}/mrpRun/${id}`;

// Operation API
export const getAllOperationsUrl = `${apiUrl}/operation/GetAllOperations`;
export const getOperationByIdUrl = (id: number) => `${apiUrl}/operation/${id}`;
export const createOperationUrl = `${apiUrl}/operation`;
export const updateOperationUrl = (id: number) => `${apiUrl}/operation/${id}`;
export const deleteOperationUrl = (id: number) => `${apiUrl}/operation/${id}`;

// Payment Term API
export const getAllPaymentTermsUrl = `${apiUrl}/paymentTerm/GetAllPaymentTerms`;
export const getPaymentTermByIdUrl = (id: number) => `${apiUrl}/paymentTerm/${id}`;
export const createPaymentTermUrl = `${apiUrl}/paymentTerm`;
export const updatePaymentTermUrl = (id: number) => `${apiUrl}/paymentTerm/${id}`;
export const deletePaymentTermUrl = (id: number) => `${apiUrl}/paymentTerm/${id}`;


// PO Acknowledgement API
export const getAllPoAcknowledgementsUrl = `${apiUrl}/poAcknowledgement/GetAllPoAcknowledgements`;
export const getPoAcknowledgementByIdUrl = (id: number) => `${apiUrl}/poAcknowledgement/${id}`;
export const createPoAcknowledgementUrl = `${apiUrl}/poAcknowledgement`;
export const updatePoAcknowledgementUrl = (id: number) => `${apiUrl}/poAcknowledgement/${id}`;
export const deletePoAcknowledgementUrl = (id: number) => `${apiUrl}/poAcknowledgement/${id}`;

// Production Line API
export const getAllProductionLinesUrl = `${apiUrl}/productionLine/GetAllProductionLines`;
export const getProductionLineByIdUrl = (id: number) => `${apiUrl}/productionLine/${id}`;
export const createProductionLineUrl = `${apiUrl}/productionLine`;
export const updateProductionLineUrl = (id: number) => `${apiUrl}/productionLine/${id}`;
export const deleteProductionLineUrl = (id: number) => `${apiUrl}/productionLine/${id}`;

// Production Log API
export const getAllProductionLogsUrl = `${apiUrl}/productionLog/GetAllProductionLogs`;
export const getProductionLogByIdUrl = (id: number) => `${apiUrl}/productionLog/${id}`;
export const createProductionLogUrl = `${apiUrl}/productionLog`;
export const updateProductionLogUrl = (id: number) => `${apiUrl}/productionLog/${id}`;
export const deleteProductionLogUrl = (id: number) => `${apiUrl}/productionLog/${id}`;

// Production Shift API
export const getAllProductionShiftsUrl = `${apiUrl}/productionShift/GetAllProductionShifts`;
export const getProductionShiftByIdUrl = (id: number) => `${apiUrl}/productionShift/${id}`;
export const createProductionShiftUrl = `${apiUrl}/productionShift`;
export const updateProductionShiftUrl = (id: number) => `${apiUrl}/productionShift/${id}`;
export const deleteProductionShiftUrl = (id: number) => `${apiUrl}/productionShift/${id}`;

// Purchase Order API
export const getAllPurchaseOrdersUrl = `${apiUrl}/purchaseOrder/GetAllPurchaseOrders`;
export const getPurchaseOrderByIdUrl = (id: number) => `${apiUrl}/purchaseOrder/${id}`;
export const createPurchaseOrderUrl = `${apiUrl}/purchaseOrder`;
export const updatePurchaseOrderUrl = (id: number) => `${apiUrl}/purchaseOrder/${id}`;
export const deletePurchaseOrderUrl = (id: number) => `${apiUrl}/purchaseOrder/${id}`;

// Purchase Order Item API
export const getAllPurchaseOrderItemsUrl = `${apiUrl}/purchaseOrderItem/GetAllPurchaseOrderItems`;
export const getPurchaseOrderItemByIdUrl = (id: number) => `${apiUrl}/purchaseOrderItem/${id}`;
export const createPurchaseOrderItemUrl = `${apiUrl}/purchaseOrderItem`;
export const updatePurchaseOrderItemUrl = (id: number) => `${apiUrl}/purchaseOrderItem/${id}`;
export const deletePurchaseOrderItemUrl = (id: number) => `${apiUrl}/purchaseOrderItem/${id}`;

// Purchase Requisition API
export const getAllPurchaseRequisitionsUrl = `${apiUrl}/purchaseRequisition/GetAllPurchaseRequisitions`;
export const getPurchaseRequisitionByIdUrl = (id: number) => `${apiUrl}/purchaseRequisition/${id}`;
export const createPurchaseRequisitionUrl = `${apiUrl}/purchaseRequisition`;
export const updatePurchaseRequisitionUrl = (id: number) => `${apiUrl}/purchaseRequisition/${id}`;
export const deletePurchaseRequisitionUrl = (id: number) => `${apiUrl}/purchaseRequisition/${id}`;

// Purchase Requisition Item API
export const getAllPurchaseRequisitionItemsUrl = `${apiUrl}/purchaseRequisitionItem/GetAllPurchaseRequisitionItems`;
export const getPurchaseRequisitionItemByIdUrl = (id: number) => `${apiUrl}/purchaseRequisitionItem/${id}`;
export const createPurchaseRequisitionItemUrl = `${apiUrl}/purchaseRequisitionItem`;
export const updatePurchaseRequisitionItemUrl = (id: number) => `${apiUrl}/purchaseRequisitionItem/${id}`;
export const deletePurchaseRequisitionItemUrl = (id: number) => `${apiUrl}/purchaseRequisitionItem/${id}`;

// Quality Check API
export const getAllQualityChecksUrl = `${apiUrl}/qualityCheck/GetAllQualityChecks`;
export const getQualityCheckByIdUrl = (id: number) => `${apiUrl}/qualityCheck/${id}`;
export const createQualityCheckUrl = `${apiUrl}/qualityCheck`;
export const updateQualityCheckUrl = (id: number) => `${apiUrl}/qualityCheck/${id}`;
export const deleteQualityCheckUrl = (id: number) => `${apiUrl}/qualityCheck/${id}`;

// Quality Defect API
export const getAllQualityDefectsUrl = `${apiUrl}/qualityDefect/GetAllQualityDefects`;
export const getQualityDefectByIdUrl = (id: number) => `${apiUrl}/qualityDefect/${id}`;
export const createQualityDefectUrl = `${apiUrl}/qualityDefect`;
export const updateQualityDefectUrl = (id: number) => `${apiUrl}/qualityDefect/${id}`;
export const deleteQualityDefectUrl = (id: number) => `${apiUrl}/qualityDefect/${id}`;

// Quote Line Item API
export const getAllQuoteLineItemsUrl = `${apiUrl}/quoteLineItem/GetAllQuoteLineItems`;
export const getQuoteLineItemByIdUrl = (id: number) => `${apiUrl}/quoteLineItem/${id}`;
export const createQuoteLineItemUrl = `${apiUrl}/quoteLineItem`;
export const updateQuoteLineItemUrl = (id: number) => `${apiUrl}/quoteLineItem/${id}`;
export const deleteQuoteLineItemUrl = (id: number) => `${apiUrl}/quoteLineItem/${id}`;

// Request For Quotation API
export const getAllRequestForQuotationsUrl = `${apiUrl}/requestForQuotation/GetAllRequestForQuotations`;
export const getRequestForQuotationByIdUrl = (id: number) => `${apiUrl}/requestForQuotation/${id}`;
export const createRequestForQuotationUrl = `${apiUrl}/requestForQuotation`;
export const updateRequestForQuotationUrl = (id: number) => `${apiUrl}/requestForQuotation/${id}`;
export const deleteRequestForQuotationUrl = (id: number) => `${apiUrl}/requestForQuotation/${id}`;


// Return Item API
export const getAllReturnItemsUrl = `${apiUrl}/returnItem/GetAllReturnItems`;
export const getReturnItemByIdUrl = (id: number) => `${apiUrl}/returnItem/${id}`;
export const createReturnItemUrl = `${apiUrl}/returnItem`;
export const updateReturnItemUrl = (id: number) => `${apiUrl}/returnItem/${id}`;
export const deleteReturnItemUrl = (id: number) => `${apiUrl}/returnItem/${id}`;


export const getEndpointsByMethod = (method: string, endpoints: any) => {
  switch (method) {
    case "GET":
      return endpoints.getUrl;
    case "GET_BY_ID":
      return endpoints.getByIdUrl;
    case "POST":
      return endpoints.addUrl;
    case "PUT":
      return endpoints.updateUrl;
    case "DELETE":
      return endpoints.deleteUrl;
    default:
      return endpoints.getUrl;
  }
};

export const header = {
  "Content-Type": "application/json"
};


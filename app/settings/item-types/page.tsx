'use server'
import ItemTypeSettings from "@/components/settings/itemType/ItemtypeSettings";
import { itemTypeAPI } from "@/components/api/itemTypeApi";

const ItemTypePage = async () => {
    const itemTypeResponse = await itemTypeAPI();
    const itemType = itemTypeResponse?.data?.result || [];
    return (
        <>
            <ItemTypeSettings itemTypeListData={itemType} />
        </>
    );
};

export default ItemTypePage;

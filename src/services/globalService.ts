import { ApiConstant } from "@/constants/apiConstant";
import { NetworkManager } from "@/utils/network/networkManager";

export class GlobalService {

    static async getTags() {
        try {
            let response = await NetworkManager.get(ApiConstant.getTagsUrl);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    static async getPromotions() {
        try {
            let response = await NetworkManager.get(ApiConstant.getPromotionsUrl);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    static async getPromotionDetail(id: number) {
        try {
            let url = ApiConstant.getPromotionDetailUrl + '?Id=' + id;
            let response = await NetworkManager.get(url);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }

    }

}   
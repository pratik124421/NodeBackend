import { BaseAdminDao } from "./BaseAdminDao";

export class AdminDao extends BaseAdminDao{

    public async action(req: any, res: any): Promise<any> {
        res.send({ "error": "error in your request" });
    }
}
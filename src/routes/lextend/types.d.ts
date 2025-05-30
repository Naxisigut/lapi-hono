/* db表示数据库中的类型 */
/* entity表示后端服务中的类型 */
/* view表示前端使用的类型 */

interface WebsiteTypedb {
  id: number;
  name: string;
  sort: number;
  created_at: string;
}
interface WebsiteTagdb {
  id: number;
  name: string;
  created_at: string;
}




/* Websites */
interface Websitedb {
  id: number;
  icon?: string;
  title: string;
  desc?: string;
  href?: string;
  sort: number;
  type_id: number;
  // type_name: string;  // 关联查询时获取
  status: 0 | 1;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  // tags?: string;  // 从数据库查询出来的标签字符串
}
interface WebsiteEntity extends Websitedb {
  type_name: string;
  tags?: string;
  created_at: string;
  updated_at: string;
}
interface WebsiteView {
  id: number;
  icon?: string;
  title: string;
  desc?: string;
  href?: string;
  sort: number;
  typeId: number;
  typeName: string;
  status: boolean;
  tags: string[];
} 
interface GetWebsitesParams extends PageParams {
  typeId?: number;
  status?: boolean;
  keyword?: string;
  tagId?: number;
}
interface AddWebsiteParams {
  icon?: string;
  title: string;
  desc?: string;
  href?: string;
  sort?: number;
  typeId: number;
  tags?: string[];
}
interface UpdateWebsiteParams extends AddWebsiteParams {
  id: number;
  title?: string;
  typeId?: number;
}
interface UpdateWebsiteStatusParams {
  id: number;
  status: boolean;
}
interface DeleteWebsiteParams {
  id: number;
}


/* db表示数据库中的类型 */
/* entity表示后端服务中的类型 */
/* view表示返回给前端使用的类型 */
/* params表示前端请求参数的类型 */

interface WebsiteTypedb {
  id: number; // 主键
  name: string; // 类型名称
  sort: number; // 排序
  created_at: string; // 创建时间
}
interface AddWebsiteTypeParams {
  name: string; // 类型名称
}
interface UpdateWebsiteTypeParams {
  id: number; // 主键
  name?: string; // 类型名称
  sort?: number; // 排序
}



interface WebsiteTagdb {
  id: number;
  name: string;
  created_at: string;
}




/* Websites */
interface Websitedb {
  id: number; // 主键
  icon?: string; // 图标
  title: string; // 标题
  desc?: string; // 描述
  href?: string; // 链接
  sort: number; // 排序
  type_id: number; // 类型id
  // type_name: string;  // 关联查询时获取
  status: 0 | 1; // 是否禁用
  created_at: string | null; // 创建时间
  updated_at: string | null; // 更新时间
  deleted_at: string | null; // 删除时间
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


import { Hono } from 'hono'
import { 
  getWebsiteTypes, 
  addWebsiteType,
  updateWebsiteType,
  deleteWebsiteType,
  getWebsites, 
  addWebsite, 
  updateWebsite, 
  updateWebsiteStatus, 
  deleteWebsite,
  getWebsiteTags
} from './websites.js'

const lextend = new Hono()

lextend.get('/', (c) => {
  return c.text('Welcome to Lextend!')
})

/* website */
lextend.post('/GetWebsites', async (c) => {
  const rawParams = await c.req.json<GetWebsitesParams>()
  const params = {
    isPaging: rawParams.isPaging,
    pageNumber: rawParams.pageNumber || 1,
    pageSize: rawParams.pageSize || 10,
    keyword: rawParams.keyword || '',
    status: rawParams.status,
    typeId: rawParams.typeId || 0,
    tagId: rawParams.tagId || 0
  }
  const searchResult = getWebsites(params)
  const result: LapiReturnT<PageResult<WebsiteView>> = {
    success: true,
    message: 'ok',
    data: searchResult,
  }
  return c.json(result)
})

lextend.post('/AddWebsite', async (c) => {
  const params = await c.req.json<AddWebsiteParams>()
  const websiteId = addWebsite(params)
  const result: LapiReturnT<IdType> = {
    success: true,
    data: websiteId,
    message: 'ok'
  }
  return c.json(result)
})

lextend.post('/UpdateWebsite', async (c) => {
  const params = await c.req.json<UpdateWebsiteParams>()
  const keyLength = Object.keys(params).length;
  if(keyLength === 1 && params.id) {
    return c.json<LapiFailReturn>({
      success: false,
      data: null,
      message: '请至少修改一个字段'
    })
  }

  const websiteId = updateWebsite(params)
  return c.json<LapiReturnT<IdType>>({
    success: true,
    data: websiteId,
    message: '修改成功'
  })
})

lextend.post('/UpdateWebsiteStatus', async (c) => {
  const params = await c.req.json<UpdateWebsiteStatusParams>()
  const websiteId = updateWebsiteStatus(params.id, params.status)
  return c.json<LapiReturnT<IdType>>({
    success: true,
    data: websiteId,
    message: '修改成功'
  })
})

lextend.post('/DeleteWebsite', async (c) => {
  const params = await c.req.json<IdParams>()
  const websiteId = deleteWebsite(params.id)
  return c.json<LapiReturnT<IdType>>({
    success: true,
    data: websiteId,
    message: '删除成功'
  })
})


/* website_type */
lextend.post('/GetWebsiteTypes', async (c) => {
  const typeOpts = getWebsiteTypes()
  return c.json<LapiReturnT<Options>>({
    success: true,
    data: typeOpts,
    message: 'ok'
  })
})

lextend.post('/AddWebsiteType', async (c) => {
  const params = await c.req.json<AddWebsiteTypeParams>()
  const websiteTypeId = addWebsiteType(params.name)
  return c.json<LapiReturnT<IdType>>({
    success: true,
    data: websiteTypeId,
    message: '添加成功'
  })
})

lextend.post('/UpdateWebsiteType', async (c) => {
  const params = await c.req.json<UpdateWebsiteTypeParams>()
  const websiteTypeId = updateWebsiteType(params)
  return c.json<LapiReturnT<IdType>>({
    success: true,
    data: websiteTypeId,
    message: '修改成功'
  })
})

lextend.post('/DeleteWebsiteType', async (c) => {
  const params = await c.req.json<IdParams>()
  const websiteTypeId = deleteWebsiteType(params.id)
  return c.json<LapiReturnT<IdType>>({
    success: true,
    data: websiteTypeId,
    message: '删除成功'
  })
})


/* website_tag */
lextend.post('/GetWebsiteTags', async (c) => {
  const tagOpts = getWebsiteTags()
  return c.json<LapiReturnT<Options>>({
    success: true,
    data: tagOpts,
    message: 'ok'
  })
})

export default lextend

import { Hono } from 'hono'
import { getWebsiteTypes, getWebsites, addWebsite, updateWebsite, updateWebsiteStatus, deleteWebsite } from './websites.js'

const lextend = new Hono()

lextend.get('/', (c) => {
  return c.text('Welcome to Lextend!')
})

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
  const params = await c.req.json<DeleteWebsiteParams>()
  const websiteId = deleteWebsite(params.id)
  return c.json<LapiReturnT<IdType>>({
    success: true,
    data: websiteId,
    message: '删除成功'
  })
})

export default lextend

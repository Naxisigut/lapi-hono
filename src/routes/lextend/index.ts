import { Hono } from 'hono'
import { getWebsiteTypes, getWebsites, addWebsite } from './websites.js'

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
  const params = await c.req.json()
  const websiteId = addWebsite(params)
  const result: LapiReturnT<number | bigint> = {
    success: true,
    data: websiteId,
    message: 'ok'
  }
  return c.json(result)
})

export default lextend

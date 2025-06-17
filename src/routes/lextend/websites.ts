import Database from 'better-sqlite3';

const db = new Database('db/lextend.db');

// 获取所有网站类型
export function getWebsiteTypes(): Options {
  const types = db.prepare(`
    SELECT * FROM website_types
    ORDER BY sort ASC
  `).all() as WebsiteTypedb[];

  const result = types.map(type => ({
    id: type.id,
    text: type.name
  }));
  
  return result;
}

// 添加网站类型
export function addWebsiteType(name: string) {
  const maxSort = db.prepare(`
    SELECT MAX(sort) as maxSort FROM website_types
  `).get() as { maxSort: number | null };
  const finalSort = (maxSort.maxSort ?? 0) + 1
  const result = db.prepare(`
    INSERT INTO website_types (name, sort)
    VALUES (?, ?)
  `).run(name, finalSort);

  return result.lastInsertRowid;
}

// 更新网站类型
export function updateWebsiteType(params: UpdateWebsiteTypeParams) {
  const { id, name, sort } = params;
  const fields: string[] = [];
  const values: any[] = [];

  if (name) {
    fields.push('name = ?');
    values.push(name);
  }
  if (typeof sort === 'number') {
    fields.push('sort = ?');
    values.push(sort);
  }
  if (fields.length === 0) {
    // 没有要更新的内容，直接返回
    return 0;
  }

  db.prepare(`
    UPDATE website_types
    SET ${fields.join(', ')}
    WHERE id = ?
  `).run(...values, id);

  return id;
}

// 删除网站类型
export function deleteWebsiteType(id: IdType) {
  db.prepare(`
    DELETE FROM website_types WHERE id = ?
  `).run(id);
  return id;
}

// 获取所有网站标签
export function getWebsiteTags(): Options {
  const tags = db.prepare(`
    SELECT * FROM tags
  `).all() as WebsiteTagdb[];

  const result = tags.map(tag => ({
    id: tag.id,
    text: tag.name
  }));

  return result;
}

// 查询网站列表
export function getWebsites(params: GetWebsitesParams): PageResult<WebsiteView> {
  const { typeId, keyword, tagId } = params;
  const isPaging = params.isPaging === false ? false : true;
  const status = params.status === false ? false : true;
  const pageNumber = params.pageNumber || 1;
  const limit = params.pageSize || 10;
  const offset = (pageNumber - 1) * limit;

  // 构建基础查询条件
  const conditions = [
    'w.deleted_at IS NULL',
    'w.status = ?',
    typeId ? 'w.type_id = ?' : null,
    tagId ? 'wtt.tag_id = ?' : null,
    keyword ? '(w.title LIKE ? OR w.desc LIKE ?)' : null,
  ].filter(Boolean).join(' AND ');

  // 构建查询参数
  const queryParams = [
    ...[status ? 1 : 0],
    ...(typeId ? [typeId] : []),
    ...(tagId ? [tagId] : []),
    ...(keyword ? [`%${keyword}%`, `%${keyword}%`] : [])
  ];

  // 计算总记录数
  const total = db.prepare(`
    SELECT COUNT(DISTINCT w.id) as total
    FROM websites w
    ${tagId ? 'JOIN website_tags wtt ON w.id = wtt.website_id' : 'LEFT JOIN website_tags wtt ON w.id = wtt.website_id'}
    WHERE ${conditions}
  `).get(queryParams) as { total: number };

  // 查询数据
  const sql = `
    SELECT 
      w.*,
      wt.name as type_name,
      GROUP_CONCAT(t.name) as tags
    FROM websites w
    JOIN website_types wt ON w.type_id = wt.id
    ${tagId ? 'JOIN website_tags wtt ON w.id = wtt.website_id' : 'LEFT JOIN website_tags wtt ON w.id = wtt.website_id'}
    LEFT JOIN tags t ON wtt.tag_id = t.id
    WHERE ${conditions}
    GROUP BY w.id
    ORDER BY w.sort ASC
    ${isPaging ? `LIMIT ? OFFSET ?` : ''}
  `;

  console.log('111',sql);

  // 执行查询
  const dbRes = db.prepare(sql).all(
    ...queryParams,
    ...(isPaging ? [limit, offset] : [])
  ) as WebsiteEntity[];

  console.log('222',dbRes);

  // 转换数据格式
  const results: WebsiteView[] = dbRes.map(website => ({
    id: website.id,
    icon: website.icon,
    title: website.title,
    desc: website.desc,
    href: website.href,
    sort: website.sort,
    typeId: website.type_id,
    typeName: website.type_name,
    status: Boolean(website.status),
    tags: website.tags ? website.tags.split(',') : []
  }));

  return {
    isPaging,
    pageNumber,
    pageSize: limit,
    total: total.total,
    list: results
  };
}

// 添加网站
export function addWebsite(params: AddWebsiteParams) {
  return db.transaction(() => {
    // 1. 获取最大排序值（只考虑未删除的记录）
    const maxSort = db.prepare(`
      SELECT MAX(sort) as maxSort FROM websites
      WHERE deleted_at IS NULL
    `).get() as { maxSort: number | null };

    // 2. 插入网站
    const websiteResult = db.prepare(`
      INSERT INTO websites (
        icon, title, desc, href, sort, type_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      params.icon,
      params.title,
      params.desc || null,
      params.href || null,
      params.sort ?? (maxSort.maxSort ?? 0) + 1,  // 如果没有传入sort，则使用最大值+1
      params.typeId,
      1  // status默认为1
    );

    const websiteId = websiteResult.lastInsertRowid;

    // 3. 处理标签
    if (params.tags && params.tags.length > 0) {
      // 3.1 确保所有标签都存在
      const tagStmt = db.prepare(`
        INSERT OR IGNORE INTO tags (name)
        VALUES (?)
      `);
      
      params.tags.forEach(tag => {
        tagStmt.run(tag);
      });

      // 3.2 获取标签ID
      const tagIds = db.prepare(`
        SELECT id FROM tags 
        WHERE name IN (${params.tags.map(() => '?').join(',')})
      `).all(...params.tags) as Array<{id: number}>;

      // 3.3 建立网站-标签关联
      const websiteTagStmt = db.prepare(`
        INSERT INTO website_tags (website_id, tag_id)
        VALUES (?, ?)
      `);
      
      tagIds.forEach(tag => {
        websiteTagStmt.run(websiteId, tag.id);
      });
    }

    return websiteId;
  })();
}

// 更新网站
export function updateWebsite(params: UpdateWebsiteParams) {
  return db.transaction(() => {
    // 1. 动态拼接需要更新的字段
    const fields: string[] = [];
    const values: any[] = [];

    if (params.icon) {
      fields.push('icon = ?');
      values.push(params.icon);
    }
    if (params.title) {
      fields.push('title = ?');
      values.push(params.title);
    }
    if (params.desc) {
      fields.push('desc = ?');
      values.push(params.desc);
    }
    if (params.href) {
      fields.push('href = ?');
      values.push(params.href);
    }
    if (typeof params.sort === 'number') {
      fields.push('sort = ?');
      values.push(params.sort);
    }
    if (params.typeId) {
      fields.push('type_id = ?');
      values.push(params.typeId);
    }

    if (fields.length > 0) {
      fields.push('updated_at = CURRENT_TIMESTAMP');
      db.prepare(`
        UPDATE websites
        SET ${fields.join(', ')}
        WHERE id = ?
      `).run(...values, params.id);
    }

    // 2. 处理标签
    if (params.tags) {
      // 2.1 删除原有标签关联
      db.prepare(`DELETE FROM website_tags WHERE website_id = ?`).run(params.id);

      if (params.tags.length > 0) {
        // 2.2 确保所有标签都存在
        const tagStmt = db.prepare(`INSERT OR IGNORE INTO tags (name) VALUES (?)`);
        params.tags.forEach(tag => tagStmt.run(tag));

        // 2.3 获取标签ID
        const tagIds = db.prepare(`
          SELECT id FROM tags WHERE name IN (${params.tags.map(() => '?').join(',')})
        `).all(...params.tags) as Array<{id: number}>;

        // 2.4 建立新关联
        const websiteTagStmt = db.prepare(`
          INSERT INTO website_tags (website_id, tag_id)
          VALUES (?, ?)
        `);
        tagIds.forEach(tag => {
          websiteTagStmt.run(params.id, tag.id);
        });
      }
    }
    return params.id;
  })();
}

// 更新网站状态
export function updateWebsiteStatus(id: number, status: boolean) {
  db.prepare(`
      UPDATE websites
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
  `).run(status ? 1 : 0, id);
  return id;
}

// 删除网站
export function deleteWebsite(id: IdType) {
  db.prepare(`
    UPDATE websites
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
  return id;
}

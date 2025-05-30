```
npm install
npm run dev
```

```
open http://localhost:3000
```

#### windows环境中安装better-sqlite3出错
如果提示You need to install the latest version of Visual Studio，说明需要安装vs中的c++桌面开发库。
可以访问https://visualstudio.microsoft.com/visual-cpp-build-tools下载build工具，不安装IDE直接安装库。
注意安装C++桌面开发库时把windowsSDK勾选上，一个就可以。

#### better-sqlite3无法找到数据库路径
不能使用执行new Database代码的文件所在的相对路径，应该使用项目根路径

#### 数据库创建与初始化
```bash
-- 网站类型表
CREATE TABLE website_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    sort INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 网站表
CREATE TABLE websites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    icon TEXT,
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    href TEXT NOT NULL,
    sort INTEGER NOT NULL DEFAULT 0,
    type_id INTEGER NOT NULL,
    status INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES website_types(id)
);

-- 标签表
CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 网站-标签关联表
CREATE TABLE website_tags (
    website_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (website_id, tag_id),
    FOREIGN KEY (website_id) REFERENCES websites(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- 创建索引
CREATE INDEX idx_websites_type_id ON websites(type_id);
CREATE INDEX idx_websites_title ON websites(title);
CREATE INDEX idx_websites_sort ON websites(sort);
CREATE INDEX idx_websites_status ON websites(status);
CREATE INDEX idx_websites_deleted_at ON websites(deleted_at);

-- 初始化网站类型
INSERT INTO website_types (name, sort) VALUES 
('general', 1),
('frontend', 2),
('resource', 3);
```


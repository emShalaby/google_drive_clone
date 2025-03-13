import { bigint, int, text, mysqlTable, index } from "drizzle-orm/mysql-core";
const PREFIX='google_drive_clone_'

export const filesTable = mysqlTable(`${PREFIX}files_table`, {
  id: bigint('id',{mode:'number',unsigned:true}).primaryKey().autoincrement(),
  name: text('name').notNull(),
  size: int('size').notNull(),
  url: text('url').notNull(),
  parent: bigint('parent',{mode:'number',unsigned:true}).notNull(),
  fileType: text('fileType'),
}, (t) => ({
  parentIndex: index('parent_index').on(t.parent),
}));

export const foldersTable = mysqlTable(`${PREFIX}folders_table`, {
  id: bigint('id',{mode:'number',unsigned:true}).primaryKey().autoincrement(),
  name: text('name').notNull(),
  parent: bigint('parent',{mode:'number',unsigned:true}),
}, (t) => ({
  parentIndex: index('parent_index').on(t.parent),
}));
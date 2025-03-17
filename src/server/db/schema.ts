import { bigint, int, text, mysqlTable, index, timestamp} from "drizzle-orm/mysql-core";
const PREFIX='google_drive_clone_'

export const filesTable = mysqlTable(`${PREFIX}files_table`, {
  id: bigint('id',{mode:'number',unsigned:true}).primaryKey().autoincrement(),
  ownerId:text('owner_id').notNull(),
  name: text('name').notNull(),
  size: int('size').notNull(),
  url: text('url').notNull(),
  parent: bigint('parent',{mode:'number',unsigned:true}).notNull(),
  fileType: text('fileType').notNull(),
  createdAt:timestamp('created_at',{mode:'date'}).notNull()
}, (t) => ({
  parentIndex: index('parent_index').on(t.parent),
  ownerIndex:index('owner_id_index').on(t.ownerId)

}));
export type DB_FileType=(typeof filesTable.$inferSelect)[]
export const foldersTable = mysqlTable(`${PREFIX}folders_table`, {
  id: bigint('id',{mode:'number',unsigned:true}).primaryKey().autoincrement(),
  ownerId:text('owner_id').notNull(),
  name: text('name').notNull(),
  parent: bigint('parent',{mode:'number',unsigned:true}),
}, (t) => ({
  parentIndex: index('parent_index').on(t.parent),
  ownerIndex:index('owner_id_index').on(t.ownerId)
}));
export type DB_FolderType=(typeof foldersTable.$inferSelect)[]

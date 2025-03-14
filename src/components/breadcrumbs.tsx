import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { foldersTable } from "~/server/db/schema";
interface BreadcrumbsProps {
  parents: (typeof foldersTable.$inferSelect)[];
}
const Breadcrumbs = ({ parents }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parents.map((folder, index) => (
          <BreadcrumbItem key={folder.id}>
            {index < parents.length - 1 ? (
              <>
                <BreadcrumbLink
                  href={`/f/${folder.id}`}
                  className="cursor-pointer"
                >
                  {folder.name}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbLink>{folder.name}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
interface BreadcrumbsProps {
  breadcrumbItems: { path: string[]; name: string }[];
  onClick: (path: string[]) => void;
}
const Breadcrumbs = ({ breadcrumbItems, onClick }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index < breadcrumbItems.length - 1 ? (
              <>
                <BreadcrumbLink
                  onClick={() => onClick(item.path)}
                  className="cursor-pointer"
                >
                  {item.name}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbLink>{item.name}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;

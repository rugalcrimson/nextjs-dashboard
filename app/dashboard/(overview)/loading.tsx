//当前（overview）目录是一个路由组，表示当前加载页只对同组页面生效，对子页面不生效
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}

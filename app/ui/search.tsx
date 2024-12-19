"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname(); //获取当前URL路径/dashboard/invoices
  const { replace } = useRouter();

  //1.捕获用户搜索框的输入
  // function handleSearch(term: string) { //未使用去抖动，用户每次输入一个字符都会触发URL变更导致触发SQL查询
  const handleSearch = useDebouncedCallback((term) => {
    //去抖动，当用户停止输入300毫秒后才会触发函数内容
    //2.将用户输入放到URL参数里，比如?page=1&query=a
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); //新搜索时页面重置为第一页
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    //3.跳转URL到/dashboard/invoices?query=lee
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        //这里用defaultValue参数而不是value参数因为没用State进行状态管理，组件自身会进行状态管理
        defaultValue={searchParams.get("query")?.toString()} //保证搜索框和URL路径参数一致，?是短路语法，get('query')返回null或undefined时不会继续调用toString，直接返回null或undefined
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

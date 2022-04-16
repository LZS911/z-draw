/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IMenuDataItem {
  path: string;
  name: string;
  component: React.LazyExoticComponent<any>;
  exact?: boolean;
}

export interface IRouterComponentProps {
  routers: IMenuDataItem[];
}

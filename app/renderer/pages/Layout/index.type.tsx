export interface ILayoutProps {
  Header: React.FC;
  Sider: React.FC;
  Content: React.FC;
  footerHeight?: number;
}

export interface ILayoutWrapper {
  footerHeight: number;
}

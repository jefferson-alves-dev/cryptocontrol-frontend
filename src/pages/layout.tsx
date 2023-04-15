import Main from '@/components/layout/Main';

type LayoutProps = { children?: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Main />
      {children}
      <Main />
    </>
  );
}

import { Header } from '@/component/header';

export const BASE_ROUTE =
  process.env.NODE_ENV === 'production' ? '/2022-election' : '';

function Root() {
  return (
    <div className="root">
      <div className="header">
        <Header />
        歡迎來到本網站
      </div>
      <style jsx>{``}</style>
    </div>
  );
}

export default Root;

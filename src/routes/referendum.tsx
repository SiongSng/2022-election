import { getReferendumData } from '@/api';
import { ErrorMessage } from '@/component/error';
import { Footer } from '@/component/footer';
import { Header } from '@/component/header';
import { Loading } from '@/component/loading';
import { ReferendumTable } from '@/component/referendum_table';
import { useAsync } from 'react-async-hook';

function ReferendumPage() {
  const asyncReturn = useAsync(getReferendumData, []);

  // setInterval(async () => {
  //   await asyncReturn.execute();
  //   console.log('Referendum data successfully refreshed');
  // }, 1000 * 60 * 5);

  return (
    <div className="referendum">
      <div className="header">
        <Header />
        <p className="title">憲法修正案公民複決第一案</p>
        <p className="subtitle">18歲公民權修憲案</p>
        {asyncReturn.loading && <Loading />}
        {asyncReturn.error && <ErrorMessage />}
        {asyncReturn.result && <ReferendumTable data={asyncReturn.result} />}
        <Footer />
      </div>
      <style jsx>{`
        .title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin: 0;
        }

        .subtitle {
          margin: 0;
          margin-top: 10px;
          font-size: 1.2rem;
          text-align: center;

          color: rgb(232, 232, 232);
        }

        @media (prefers-color-scheme: light) {
          .subtitle {
            color: rgb(47, 47, 47);
          }
        }
      `}</style>
    </div>
  );
}

export default ReferendumPage;

import { BASE_ROUTE } from '@/routes/root';

export function NavigationLink(
  pageName: string,
  pagePath: string
): React.ReactNode {
  return (
    <div>
      <li>
        <a
          href={`${BASE_ROUTE}${pagePath}`}
          style={
            window.location.pathname === pagePath
              ? { color: '#747bff', fontWeight: 'bold' }
              : {}
          }
        >
          {pageName}
        </a>
      </li>
      <style jsx>
        {`
          li {
            list-style-type: none;
            margin: 0 1rem;
          }

          a {
            font-size: 1.2rem;
            color: white;
            text-decoration: inherit;
          }

          @media (prefers-color-scheme: light) {
            a {
              color: black;
            }
          }
        `}
      </style>
    </div>
  );
}

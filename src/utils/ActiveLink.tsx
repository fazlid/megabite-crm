import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  activeClassName: string;
  className?: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, children, activeClassName, className }) => {
  const router = useRouter();

  // Проверяем, что маршрутизатор доступен
  if (!router) return null;

  const isActive = router.pathname === href;

  return (
    <li className={`${className} ${isActive ? activeClassName : ''}`.trim()}>
      <Link href={href}>
        {children}
      </Link>
    </li>
  );
};

export default ActiveLink;

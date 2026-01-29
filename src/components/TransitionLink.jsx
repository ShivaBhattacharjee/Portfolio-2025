"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const TransitionLink = ({ href, children, className, onClick, ...props }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
    
    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    document.startViewTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;

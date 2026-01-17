import Link from "next/link";
import React from "react";
import Button from "./Button";
interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}
type Variant = "primary" | "secondary";

interface HeaderProps {
  title: string;
  navItems?: NavItem[];
  rightButtonLabel?: string;
  rightButtonVariant?: Variant;
  onRightButtonClick?: () => void;
  rightButtonHref?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  navItems,
  rightButtonLabel,
  rightButtonVariant = "primary",
  onRightButtonClick,
  rightButtonHref,
  className,
}) => {
  const base = "sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-emerald-100";

  return (
    <header className={`${base} ${className ?? ""}`}> 
      <div className="mx-auto max-w-screen-lg px-4 h-16 flex items-center justify-between">
        <div className="text-emerald-800 font-semibold text-lg">{title}</div>

        {navItems && navItems.length > 0 && (
          <nav className="flex items-center gap-4">
            {navItems.map((item, idx) =>
              item.href ? (
                <Link key={`${item.label}-${idx}`} href={item.href} className="px-3 py-2 rounded-full hover:bg-emerald-50 text-emerald-700">
                  {item.label}
                </Link>
              ) : (
                <button key={`${item.label}-${idx}`} type="button" onClick={item.onClick} className="px-3 py-2 rounded-full hover:bg-emerald-50 text-emerald-700">
                  {item.label}
                </button>
              )
            )}
          </nav>
        )}

        <div className="flex items-center">
          {rightButtonLabel && (
            rightButtonHref ? (
              <Link href={rightButtonHref}>
                <Button label={rightButtonLabel} variant={rightButtonVariant} />
              </Link>
            ) : (
              <Button label={rightButtonLabel} variant={rightButtonVariant} onClick={onRightButtonClick} />
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

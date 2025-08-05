"use client";

import { useEffect, useState } from "react";

function Drawer({ open, onClose, children }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  useEffect(() => {
    if (shouldRender) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [shouldRender]);

  useEffect(() => {
    if (!open && shouldRender) {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open, shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 w-full h-screen backdrop-blur-sm bg-secondary-800 bg-opacity-30 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-[250px] h-full transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="bg-secondary-0 max-h-full overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </>
  );
}

export default Drawer;

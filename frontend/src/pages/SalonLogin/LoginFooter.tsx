import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
export function LoginFooter() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="flex-shrink-0 flex flex-col items-center gap-md border-t border-surface-variant pt-md pb-md bg-surface-container-lowest">
      <a className="font-body-cta text-body-cta text-on-surface" href="#">
        {t("login.newHere")} <span className="text-primary">{t("login.createAccount")}</span>
      </a>
      <div className="font-meta-label text-meta-label text-on-surface-variant flex gap-unit">
        <Button 
          variant="ghost" 
          className={`p-0 h-auto hover:bg-transparent ${(i18n.language || "en").startsWith("en") ? "text-on-surface font-medium" : "text-on-surface-variant hover:text-on-surface"}`}
          onClick={() => i18n.changeLanguage("en")}
        >
          English
        </Button>
        <span className="text-surface-variant">|</span>
        <Button 
          variant="ghost" 
          className={`p-0 h-auto hover:bg-transparent ${(i18n.language || "en").startsWith("hi") ? "text-on-surface font-medium" : "text-on-surface-variant hover:text-on-surface"}`}
          onClick={() => i18n.changeLanguage("hi")}
        >
          Hindi
        </Button>
        <span className="text-surface-variant">|</span>
        <Button 
          variant="ghost" 
          className={`p-0 h-auto hover:bg-transparent ${(i18n.language || "en").startsWith("bn") ? "text-on-surface font-medium" : "text-on-surface-variant hover:text-on-surface"}`}
          onClick={() => i18n.changeLanguage("bn")}
        >
          Bengali
        </Button>
      </div>
    </footer>
  );
}

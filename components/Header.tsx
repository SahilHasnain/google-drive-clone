"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = () => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <Button
          type="button"
          className="uploader-button"
          onClick={() =>
            document.getElementById("global-upload-button")?.click()
          }
          data-tap-safe
        >
          <Image
            src="/assets/icons/upload.svg"
            alt="Upload"
            width={24}
            height={24}
          />
          <span className="ml-2">Upload</span>
        </Button>

        <Button
          type="button"
          className="sign-out-button"
          onClick={async () => await signOutUser()}
          data-tap-safe
        >
          <Image
            src="/assets/icons/logout.svg"
            alt="logo"
            width={24}
            height={24}
            className="w-6"
          />
        </Button>
      </div>
    </header>
  );
};
export default Header;

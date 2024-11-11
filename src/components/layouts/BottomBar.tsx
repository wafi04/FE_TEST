import { Bell, Bookmark, Home, icons, Mail } from "lucide-react";
import { useAuth } from "../../hooks/auth/Auth-Provider";
import { Button } from "../ui/button";

interface MenubarProps {
  className?: string;
}

export function MenuBar({ className }: MenubarProps) {
  const { user } = useAuth();

  return (
    <div className={className}>
      <Button
        className="flex items-center gap-3 justify-start"
        title={"Home"}
        variant={"ghost"}
        asChild>
        <a href={"/"} className="">
          <span className="bg-secondary py-1 px-2 rounded-md">
            <Home />
          </span>
          <span className="hidden lg:inline ">Home</span>
        </a>
      </Button>
      {/* <NotificationButton
        initialState={{ unreadCount: unreadNotificationCount }}
      /> */}
      {/* <MessagesButton initialState={{ unreadCount: unreadMessagecount }} /> */}
      <Button
        className="flex items-center gap-3 justify-start"
        title={"Bookmarks"}
        variant={"ghost"}
        asChild>
        <a href={"/bookmarks"} className="">
          <span className="bg-secondary py-1 px-2 rounded-md">
            <Bookmark />
          </span>
          <span className="hidden lg:inline ">Bookmarks</span>
        </a>
      </Button>
    </div>
  );
}

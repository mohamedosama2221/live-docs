"use client";

import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import * as Popover from "@radix-ui/react-popover";
import {
  useDeleteAllInboxNotifications,
  useInboxNotifications,
  useMarkAllInboxNotificationsAsRead,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Loader from "@/common/Loader";
import { createPortal } from "react-dom";
import InboxIcon from "@/Icons/InboxIcon";

function Inbox({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const { inboxNotifications } = useInboxNotifications();

  return inboxNotifications.length === 0 ? (
    <div className={clsx(className, "empty")}>
      There aren’t any notifications yet.
    </div>
  ) : (
    <div className={className} {...props}>
      <InboxNotificationList className="inbox-list">
        {inboxNotifications.map((inboxNotification) => {
          return (
            <InboxNotification
              key={inboxNotification.id}
              inboxNotification={inboxNotification}
              //   components={{ Anchor: Link }}
            />
          );
        })}
      </InboxNotificationList>
    </div>
  );
}

function InboxPopoverUnreadCount() {
  const { count } = useUnreadInboxNotificationsCount();

  return count ? <div className="inbox-unread-count">{count}</div> : null;
}

export function Notifications({
  className,
  ...props
}: Popover.PopoverContentProps) {
  const [isOpen, setOpen] = useState(false);
  const markAllInboxNotificationsAsRead = useMarkAllInboxNotificationsAsRead();
  const deleteAllInboxNotifications = useDeleteAllInboxNotifications();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const JSX = (
    <Popover.Root open={isOpen} onOpenChange={setOpen}>
      <Popover.Trigger className={clsx(className, "button square")}>
        <ErrorBoundary fallback={null}>
          <ClientSideSuspense fallback={null}>
            <InboxPopoverUnreadCount />
          </ClientSideSuspense>
        </ErrorBoundary>
        <InboxIcon />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="inbox"
          collisionPadding={16}
          sideOffset={8}
          {...props}
        >
          <div className="inbox-header">
            <span className="inbox-title">Notifications</span>
            <div className="inbox-buttons">
              <button
                className="button"
                onClick={markAllInboxNotificationsAsRead}
              >
                Mark all as read
              </button>
              <button
                className="button destructive"
                onClick={deleteAllInboxNotifications}
              >
                Delete all
              </button>
            </div>
          </div>
          <ErrorBoundary
            fallback={
              <div className="error">
                There was an error while getting notifications.
              </div>
            }
          >
            <ClientSideSuspense fallback={<Loader />}>
              <Inbox />
            </ClientSideSuspense>
          </ErrorBoundary>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
  return (
    <>
      {createPortal(
        JSX,
        document.getElementById("notification-wrapper") as HTMLElement
      )}
    </>
  );
}

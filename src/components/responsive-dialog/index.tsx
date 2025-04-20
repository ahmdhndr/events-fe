import * as React from "react";

import { Root } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useModal } from "@/context/modal-context";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveDialogProps {
  title?: string;
  description?: string;
  visuallyHidden?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ResponsiveDialog({
  children,
  title = "",
  description = "",
  className,
  visuallyHidden = false,
}: ResponsiveDialogProps) {
  // const [open, setOpen] = React.useState(false);
  const { isOpen, open, close } = useModal();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(val) => (val ? open() : close())}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            {visuallyHidden ? (
              <Root>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </Root>
            ) : (
              <>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </>
            )}
          </DrawerHeader>
          <div className="max-h-[580px] overflow-y-auto px-4 pb-4">
            {children}
          </div>
          {/* <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(val) => (val ? open() : close())}>
      <DialogContent className={className}>
        <DialogHeader>
          {visuallyHidden ? (
            <Root>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </Root>
          ) : (
            <>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

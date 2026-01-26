import type { SheetDetent } from "@lodev09/react-native-true-sheet";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";


type BottomSheetContextType = {
  open: (context: React.ReactNode, detents?: SheetDetent[]) => void;
  close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export function BottomSheetProvider(
  { children }: { children: React.ReactNode }
) {

  const sheetRef = useRef<TrueSheet>(null);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detents, setDetents] = useState<SheetDetent[]>(["auto"]);

  const open = (node: React.ReactNode, newDetents?: SheetDetent[]) => {
    if (newDetents) setDetents(newDetents);
    setContent(node);
    setIsOpen(true);
  }

  const close = () => setIsOpen(false);

  // sync state with imperative sheet control. 
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    if (isOpen) {
      sheet.present();
    } else {
      sheet.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetContext.Provider value={{
      open,
      close
    }}>
      {children}
      {/* Provide true sheet */}
      <TrueSheet
        ref={sheetRef}
        detents={detents}
        onDidDismiss={() => setIsOpen(false)}
      >
        {content}
      </TrueSheet>
    </BottomSheetContext.Provider>
  )
}



export function useBottomSheetContext() {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be defined within BottomSheetProvider");
  }
  return context;
}
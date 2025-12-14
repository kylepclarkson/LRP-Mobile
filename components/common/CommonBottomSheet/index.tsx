import { snapPointValues } from "@/lib/util";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { forwardRef, JSX } from "react";

type CommonBottomSheetProps = {
  snapPoints?: (string | number)[];
  content: JSX.Element | null;
  onClose?: () => void;
};

const CommonBottomSheet = forwardRef<BottomSheetMethods, CommonBottomSheetProps>(


  ({ snapPoints = snapPointValues, content, onClose }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={0} // always start closed
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
        onChange={(index) => {
          if (index === -1) onClose?.();
        }}
      >
        {content}
      </BottomSheet>
    );
  }
);

export default CommonBottomSheet;
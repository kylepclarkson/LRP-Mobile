import { BaseButton, BaseButtonProps } from "./BaseButton"

export interface PrimaryButtonProps extends BaseButtonProps {}

export function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <BaseButton
      {...props}
      backgroundClassName={`bg-blue-600 ${props.backgroundClassName ?? ""}`}
      textClassName={`text-white ${props.textClassName ?? ""}`}
    />
  )
}
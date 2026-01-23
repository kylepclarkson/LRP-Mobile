import { BaseButton, BaseButtonProps } from "./BaseButton"

export interface SecondaryButtonProps extends BaseButtonProps { }

export function SecondaryButton(props: SecondaryButtonProps) {
  return (
    <BaseButton
      {...props}
      backgroundClassName={`bg-gray-200 ${props.backgroundClassName ?? ""}`}
      textClassName={`text-gray-800 ${props.textClassName ?? ""}`}
    />
  )
}
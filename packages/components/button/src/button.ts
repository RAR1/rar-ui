import { buildProps } from '@rar-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const buttonProps = buildProps({
  /**
   * @description disable the button
   */
  disabled: Boolean,
  /**
   * @description determine whether it's loading
   */
  loading: Boolean,
  tag: {
    type: String,
    default: 'button',
  },
})

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

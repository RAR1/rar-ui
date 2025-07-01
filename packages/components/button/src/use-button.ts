import { ref } from 'vue'
import { ButtonEmits, ButtonProps } from './button'
import type { SetupContext } from 'vue'

export const useButton = (
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>['emit'],
) => {
  const _ref = ref<HTMLButtonElement>()

  const handleClick = (evt: MouseEvent) => {
    if (props.disabled || props.loading) {
      evt.stopPropagation()
      return
    }

    emit('click', evt)
  }

  return {
    _ref,
    handleClick,
  }
}

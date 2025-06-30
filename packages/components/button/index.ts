import { withInstall } from '@rar-ui/utils'
import Button from './src/button.vue'
import type { SFCWithInstall } from '@rar-ui/utils'

export const ElButton: SFCWithInstall<typeof Button> = withInstall(Button)
export default ElButton

declare module 'vue' {
    export interface GlobalComponents {
        ElButton: typeof import('@rar-ui/components')['ElButton']
        ElInput: typeof import('@rar-ui/components')['ElInput']
    }
}

export {}
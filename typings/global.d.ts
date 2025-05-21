declare module 'vue' {
    export interface GlobalComponents {
        ElButton: typeof import('@test-ui/components')['ElButton']
        ElInput: typeof import('@test-ui/components')['ElInput']
    }
}

export {}
export interface ISelectedData {
    value: string
    id: number
}

export interface IInputSelectProps {
    title: string
    placeholder: string
    selectedItem: ISelectedData | null
    error: string | null
    selectList: ISelectedData[]
    onChange: (value: ISelectedData) => void
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

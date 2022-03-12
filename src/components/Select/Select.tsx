import React from 'react'

import style from './Select.module.scss'

import { ModelsView } from 'types'

/* START - View Select additional imports and module code. */

const Select: React.FC<ModelsView.IInputSelectProps> = ({
    title,
    placeholder,
    selectedItem,
    error,
    selectList,
    onChange,
}) => {
    const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
    const dropdownRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    const dropdownClickHandler = (value: ModelsView.ISelectedData): void => {
        onChange(value)
        setDropdownOpen(false)
    }

    return (
        <div className={style.wrapper}>
            <p className={style.title}>{title}</p>
            {selectedItem === null ? <p className={style.placeholder}>{placeholder}</p> : null}
            <input
                className={error ? `${style.input} ${style.inputError}` : style.input}
                type={'button'}
                value={selectedItem ? selectedItem.value : ''}
                onClick={() => setDropdownOpen(true)}
            />
            {/* <div className={error ? `${style.input} ${style.inputError}` : style.input}>{value ? value : ''}</div> */}

            {isDropdownOpen ? (
                <div className={style.dropdownWrapper} ref={dropdownRef}>
                    {selectList.length > 0 ? (
                        selectList.map(
                            (selectItem: ModelsView.ISelectedData): JSX.Element => (
                                <div
                                    className={`${style.dropdownItem} ${
                                        selectedItem && selectedItem.value === selectItem.value
                                            ? style.dropdownItemActive
                                            : null
                                    }`}
                                    key={`InputSelect-Item-${selectItem.id}`}
                                    onClick={() => dropdownClickHandler(selectItem)}
                                >
                                    {selectItem.value}
                                </div>
                            ),
                        )
                    ) : (
                        <div className={style.empty_error_wrapper}>
                            {/* <div className={style.empty_error_title}>{emptyErrorTitle}</div> */}
                        </div>
                    )}
                </div>
            ) : null}
            {error ? <p className={style.error}>{error}</p> : null}
        </div>
    )
}

export default Select

import React from 'react'

import style from './Select.module.scss'

import { ModelsView } from 'types'

/* START - View Select additional imports and module code. */

const DROPDOWN_OFFSET = 10
const DROPDOWN_ITEM_HEIGHT = 37

const Select: React.FC<ModelsView.IInputSelectProps> = ({
    title,
    placeholder,
    selectedItem,
    error,
    selectList,
    numberOfLines = 5,
    onChange,
}) => {
    const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
    const [hoverItemIndex, setHoverItemIndex] = React.useState<number>(0)
    const dropdownRef = React.useRef<HTMLDivElement | null>(null)

    /* START - Tracking side-effects. */
    React.useEffect(() => {
        if (selectedItem) {
            setHoverItemIndex(-1)
        }
    }, [isDropdownOpen])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (isDropdownOpen) {
                    dropdownClickHandler(selectList[hoverItemIndex])
                } else {
                    setDropdownOpen(true)
                }
            } else if (event.key === 'ArrowDown' && isDropdownOpen) {
                const newHoverItemIndex = selectList.length === hoverItemIndex + 1 ? 0 : hoverItemIndex + 1
                setHoverItemIndex(newHoverItemIndex)

                scrollDropdownItems(newHoverItemIndex)
            } else if (event.key === 'ArrowUp' && isDropdownOpen) {
                const newHoverItemIndex = hoverItemIndex === 0 ? selectList.length - 1 : hoverItemIndex - 1
                setHoverItemIndex(newHoverItemIndex)

                scrollDropdownItems(newHoverItemIndex)
            }
        },
        [hoverItemIndex, isDropdownOpen],
    )

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])
    /* END - Tracking side-effects. */

    const scrollDropdownItems = (itemIndex: number) => {
        if (dropdownRef.current) {
            dropdownRef.current.scroll({
                // @ts-ignore
                top: dropdownRef.current.children[itemIndex].offsetTop - DROPDOWN_OFFSET,
                left: 0,
                behavior: 'smooth',
            })
        }
    }

    const dropdownClickHandler = (value: ModelsView.ISelectedData) => {
        onChange(value)
        setDropdownOpen(false)
    }

    const inputClickHandler = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        // if the click was made with the mouse
        if (event.detail !== 0) {
            setDropdownOpen(true)
        }
    }

    return (
        <div className={style.wrapper}>
            <p className={style.title}>{title}</p>
            {selectedItem === null ? <p className={style.placeholder}>{placeholder}</p> : null}
            <input
                className={error ? `${style.input} ${style.input_error}` : style.input}
                type={'submit'}
                value={selectedItem ? selectedItem.value : ''}
                onClick={inputClickHandler}
            />

            <div
                className={`${style.dropdown} ${isDropdownOpen ? style.dropdown_open : ''}`}
                ref={dropdownRef}
                style={{ maxHeight: numberOfLines * DROPDOWN_ITEM_HEIGHT + DROPDOWN_OFFSET }}
            >
                {selectList.length > 0 ? (
                    selectList.map((selectItem: ModelsView.ISelectedData, index: number): JSX.Element => {
                        let hoverClassName: string = hoverItemIndex === index ? style.dropdown__item_hover : ''
                        let activeClassName: string =
                            selectedItem && selectedItem.value === selectItem.value ? style.dropdown__item_active : ''

                        return (
                            <div
                                className={`${style.dropdown__item} ${hoverClassName} ${activeClassName}`}
                                key={`InputSelect-Item-${selectItem.id}`}
                                onClick={() => dropdownClickHandler(selectItem)}
                                onMouseEnter={() => setHoverItemIndex(index)}
                            >
                                {selectItem.value}
                            </div>
                        )
                    })
                ) : (
                    <div className={style.empty}>
                        <div className={style.empty__title}>Нет данных</div>
                    </div>
                )}
            </div>

            {error ? <p className={style.error}>{error}</p> : null}
        </div>
    )
}

export default Select

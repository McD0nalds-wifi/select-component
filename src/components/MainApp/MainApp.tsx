import React from 'react'

import style from './MainApp.module.scss'

import { ModelsView } from 'types'

/* START - View MainApp additional imports and module code. */
import { Select } from 'components'

const MainApp: React.FC = () => {
    const cities: ModelsView.ISelectedData[] = [
        {
            value: 'Москва',
            id: 1,
        },
        {
            value: 'Воронеж',
            id: 2,
        },
        {
            value: 'Челябинск',
            id: 3,
        },
        {
            value: 'Магнитогорск',
            id: 4,
        },
        {
            value: 'Саратов',
            id: 5,
        },
        // {
        //     value: 'Ижевск',
        //     id: 6,
        // },
    ]

    const [selectedCity, setSelectedCity] = React.useState<ModelsView.ISelectedData | null>(null)

    return (
        <div className={style.wrapper}>
            <div style={{ width: '200px' }}>
                <Select
                    title={'Город'}
                    placeholder={'Выберите город'}
                    selectList={cities}
                    selectedItem={selectedCity}
                    error={null}
                    onChange={(value: ModelsView.ISelectedData) => setSelectedCity(value)}
                />
            </div>
        </div>
    )
}

export default MainApp

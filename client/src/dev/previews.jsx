import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import PrivateRoute from "../componetnts/auth/PrivateRoute";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/PrivateRoute">
                <PrivateRoute/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
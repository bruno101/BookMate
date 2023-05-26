import SettingsController from '../controller/SettingsController'
import { useState } from 'react'

const SettingsModel = ({ navigation }) => {

    const [nightMode, setNightMode] = useState(false)
    const [fontSize, setFontSize] = useState(12)
    const [fontSizePickerOpen, setFontSizePickerOpen] = useState(false)
    const [fontFamily, setFontFamily] = useState("normal")
    const [fontFamilyPickerOpen, setFontFamilyPickerOpen] = useState(false)
    const [reviewNotifications, setReviewNotifications] = useState(false)
    const [readingNotifications, setReadingNotifications] = useState(false)

    return (
        <SettingsController navigation={navigation} nightMode={nightMode} setNightMode={setNightMode} fontSize={fontSize} setFontSize={setFontSize} fontFamily={fontFamily} setFontFamily={setFontFamily} reviewNotifications={reviewNotifications} setReviewNotifications={setReviewNotifications} readingNotifications={readingNotifications} setReadingNotifications={setReadingNotifications} fontSizePickerOpen={fontSizePickerOpen} setFontSizePickerOpen={setFontSizePickerOpen} fontFamilyPickerOpen={fontFamilyPickerOpen} setFontFamilyPickerOpen={setFontFamilyPickerOpen} />
    )
}

export default SettingsModel;
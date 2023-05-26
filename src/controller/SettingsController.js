import Settings from '../view/Settings/index'

const SettingsController = (props) => {

    const setNightMode = () => {
        props.setNightMode(!props.nightMode)
    }

    const setFontSize = (size) => {
        props.setFontSize(size)
    }

    const setFontFamily = (font) => {
        props.setFontFamily(font)
    }

    const setReadingNotifications = () => {
        props.setReadingNotifications(!props.readingNotifications)
    }

    const setReviewNotifications = () => {
        props.setReviewNotifications(!props.reviewNotifications)
    }

    return (
        <Settings navigation={props.navigation} nightMode={props.nightMode} setNightMode={setNightMode} fontSize={props.fontSize} setFontSize={setFontSize} fontFamily={props.fontFamily} setFontFamily={setFontFamily} reviewNotifications={props.reviewNotifications} setReviewNotifications={setReviewNotifications} readingNotifications={props.readingNotifications} setReadingNotifications={setReadingNotifications} fontSizePickerOpen={props.fontSizePickerOpen} setFontSizePickerOpen={props.setFontSizePickerOpen} fontFamilyPickerOpen={props.fontFamilyPickerOpen} setFontFamilyPickerOpen={props.setFontFamilyPickerOpen} />
    )

}

export default SettingsController;
